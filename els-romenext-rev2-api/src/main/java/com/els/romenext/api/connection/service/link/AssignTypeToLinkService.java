package com.els.romenext.api.connection.service.link;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.connection.req.link.AssignTypeToLinkRequest;
import com.els.romenext.api.connection.resp.link.AssignTypeToLinkResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.google.gson.Gson;

public class AssignTypeToLinkService {

	private static Logger log = Logger.getLogger(AssignTypeToLinkService.class);
	
	public Response runService( AssignTypeToLinkRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UserLogDao dao = new UserLogDao(req.namespace );
		dao.getEntityManagerUtil().getSession().clear();
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// get the rule 
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );
		
		RomeRule romeRule = ruleDao.get( req.ruleId );
		
		if( romeRule == null ) {
			log.debug("No Rule Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		
		RomeType type = typeDao.get(req.typeId);
//		RomeType destination = typeDao.get(req.destinationId);
		if (type == null  ) {
			log.error("No Type Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// sanity check?
		// ensure this user has access to the given types?
		
		
		
		
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		
		
		if (g == null) {
			log.error("No Group Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao( req.namespace );
		RomeGroupType rgtO = rgtDao.findByGroupAndType(g, type);
		
		if (rgtO == null ) {
			log.error("Permission Denied!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// we have access
		// for this rule
		// we add a new connection for all permutations: 
		// type -> type
		// type -> (ALL OTHER TYPES)
		// (ALL OTHER TYPES) -> type
		
		// ensure that the type does not already exist
		RomeConnectionDao connDao = new RomeConnectionDao( req.namespace );
		
		
		List<RomeConnection> sanityCheck = connDao.findByRomeRuleWithStartOREndRomeType(romeRule, type, mc );
		
		/**
		 * We will probably have to refactor this when we allow users to pick and choose what they want to allow in links
		 */
		if (sanityCheck != null && sanityCheck.size() > 0 ) {
			log.error("This type is already in this rule already?!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_ALREADY_EXSITS, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// if we got here, no type exists in link
		List<RomeConnection> conns = romeRule.getConnections();
//		List<RomeConnection> conns = connDao.findByRule(romeRule, mc);
		
		Map<Long, RomeType> toAddWith = new HashMap<>();
		
		for( RomeConnection c : conns ) {
			if( !toAddWith.containsKey( c.getStartRomeType().getId() ) ) {
				toAddWith.put( c.getStartRomeType().getId(),  c.getStartRomeType() );
			}
			
			if( !toAddWith.containsKey( c.getEndRomeType().getId() ) ) {
				toAddWith.put( c.getEndRomeType().getId(),  c.getEndRomeType() );
			}
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		// now add all the new permutations
		for( RomeType toAdd : toAddWith.values() ) {
			RomeConnection c = new RomeConnection();
			

			String finalTokenedName1 = this.getBestName( "",  "", type.getName(),  toAdd.getName());
			String finalTokenedName2 = this.getBestName( "",  "", toAdd.getName(),  type.getName());

			RomeConnection newConn1 = coreServices.createConnection( finalTokenedName1 + "CONN" , romeRule, type, toAdd, RomeRuleClassificationEnum.LINK, mc );
			RomeConnection newConn2 = coreServices.createConnection( finalTokenedName2 + "CONN" , romeRule, toAdd, type, RomeRuleClassificationEnum.LINK, mc );
			
			romeRule.getConnections().add( newConn1 );
			romeRule.getConnections().add( newConn2 );

		}
		
		// we have to add the base connection
		String finalTokenedName = this.getBestName( "",  "", type.getName(),  type.getName());
		RomeConnection newConn = coreServices.createConnection( finalTokenedName + "CONN" , romeRule, type, type, RomeRuleClassificationEnum.LINK, mc );

		romeRule.getConnections().add( newConn );
		
		// save it
		ruleDao.getTransaction().begin();
		ruleDao.save( romeRule );
		ruleDao.getTransaction().commit();
		ruleDao.refresh(romeRule);
		
		
		
		// build the response
		Node rule = coreServices.getTypeNode(RomeNodeClassEnum.RULE, romeRule.getId(), mc.getId() );
		
		
		AssignTypeToLinkResponse rsp = new AssignTypeToLinkResponse();
		rsp.rule = rule;
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(rsp)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}
	
	/**
	 * Try to make the best name 
	 * 
	 * pre + ( add1 of max 5 characters, and not less than 1 ) + ( add2 of max 5 chars and not less than 2 ) + post 
	 * 
	 * @param name
	 * @return
	 */
	private String getBestName( String pre, String post, String add1, String add2 ) {
		
		String finalAdd1 = "T1";
		String finalAdd2 = "T2";
		
		if( !StringUtils.isEmpty( add1 ) ) {
			if( add1.length() > 5 ) {
				finalAdd1 = add1.substring( 0,  5 );
			} else {
				finalAdd1 = add1;
			}
		}
		if( !StringUtils.isEmpty( add2 ) ) {
			if( add2.length() > 5 ) {
				finalAdd2 = add2.substring( 0,  5 );
			} else {
				finalAdd2 = add2;
			}
		}
		return pre + finalAdd1 + "_" + finalAdd2 + post;
		
	}
	
}
