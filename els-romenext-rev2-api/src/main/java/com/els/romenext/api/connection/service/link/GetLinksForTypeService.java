package com.els.romenext.api.connection.service.link;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.connection.resp.link.GetLinksForTypeResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
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
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class GetLinksForTypeService {

	private static Logger log = Logger.getLogger(GetLinksForTypeService.class);
	
	public Response runService( Long metadataId, String groupName, String groupHost, Long typeId, String namespace ) {
		
		ResponseBuilder responseBuilder;
		
		UserLogDao dao = new UserLogDao(namespace);
		dao.getEntityManagerUtil().getSession().clear();
		
		MetadataContainerDao mcDao = new MetadataContainerDao( namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( namespace );

		RomeType type = typeDao.get( typeId );
//		RomeType destination = typeDao.get(req.destinationId);
		if (type == null  ) {
			log.error("No Type Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// sanity check?
		// ensure this user has access to the given types?
		
		
		
		
		GroupDao gDao = new GroupDao( namespace );
		Group g = gDao.findByHostAndName( groupHost, groupName );
		
		
		if (g == null) {
			log.error("No Group Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao( namespace );
		RomeGroupType rgtO = rgtDao.findByGroupAndType(g, type);
		
		if (rgtO == null ) {
			log.error("Permission Denied!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		// get the rule 
		RomeRuleDao ruleDao = new RomeRuleDao( namespace );
		RomeConnectionDao connDao = new RomeConnectionDao( namespace );
		
		List<RomeConnection> conns = connDao.findByTypeClassificationMetadata( RomeRuleClassificationEnum.LINK, type, mc );
		
		
		
		
		GetLinksForTypeResponse rsp = new GetLinksForTypeResponse();
		
		Set<Long > uniqueSet = new HashSet<>();
		
		rsp.rules = new ArrayList<>();
		NodeBuilder builder = new NodeBuilder(  namespace );
		
		for( RomeConnection c : conns ) {
			if( !uniqueSet.contains( c.getRomeRule().getId() )) {
				uniqueSet.add( c.getRomeRule().getId() );
				rsp.rules.add( builder.build( c.getRomeRule() ) );				
			}
		}
		
		
//		for( RomeConnection c : conns ) {
//			rsp.rules.add( NodeBuilder.build( c.getRomeRule() ) );
//		}
		
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
