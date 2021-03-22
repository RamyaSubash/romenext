package com.els.romenext.api.connection.service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.connection.req.CreateGenericConnectionRequest;
import com.els.romenext.api.connection.req.CreateGenericConnectionRequestOLD;
import com.els.romenext.api.connection.resp.CreateConnectionResponse;
import com.els.romenext.api.connection.resp.CreateGenericConnectionResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
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
import com.els.romenext.core.rule.RuleService;
import com.google.gson.Gson;

public class CreateGenericConnectionService {

	private static Logger log = Logger.getLogger(CreateGenericConnectionService.class);
	
	public Response runService(CreateGenericConnectionRequestOLD req, Long metadataId, String groupName, String groupHost, String username) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UserLogDao dao = new UserLogDao(username );
		dao.getEntityManagerUtil().getSession().clear();
		
		MetadataContainerDao mcDao = new MetadataContainerDao(username);
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RomeTypeDao typeDao = new RomeTypeDao(username);
		RomeType originator = typeDao.get(req.originId);
		RomeType destination = typeDao.get(req.destinationId);
		if (originator == null || destination == null) {
			log.error("No Type Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GroupDao gDao = new GroupDao(username);
		Group g = gDao.findByHostAndName(groupHost, groupName);
		if (g == null) {
			log.error("No Group Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao(username);
		RomeGroupType rgtO = rgtDao.findByGroupAndType(g, originator);
		RomeGroupType rgtD = rgtDao.findByGroupAndType(g, destination);
		if (rgtO == null || rgtD == null) {
			log.error("Permission Denied!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// for generic creation, we will be doing
		// 1. create a generic rule
		// 2. create a generic connection
		// 3. create a connection between the two types
		
		CoreServices coreServices = new CoreServices(username);
		RuleService ruleService = new RuleService(username);
		
		// try to make a reasonable name
		String origName = originator.getName();
		String destName = destination.getName();
		String finalTokenedName = this.getBestName( "",  "", origName,  destName );
			
		int count = 0;
		String baseRuleName = "RULE";
		String finalRuleName = baseRuleName + count;
		while(ruleService.doesRuleExist(finalTokenedName + finalRuleName, mc)) {
			finalRuleName = baseRuleName + (++count);
			System.out.println("Final erule name : " + finalRuleName );
		};
		
		RomeRuleClassificationEnum romeRuleClassificationEnum = RomeRuleClassificationEnum.getEnum(req.ruleClassification);
		if (romeRuleClassificationEnum == null) {
			log.error("Bad Rule Classification!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_RULE_CLASSIFICATION, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RomeRule rule = ruleService.createRuleNode(finalTokenedName + finalRuleName, true, romeRuleClassificationEnum, mc);
		RomeConnection connection = coreServices.createConnection(finalTokenedName + "CONN", rule, req.originId, req.destinationId, romeRuleClassificationEnum, req.minRel, req.maxRel, mc);
		
		// build the response
		CreateGenericConnectionResponse rsp = new CreateGenericConnectionResponse();
		rsp.connection = new CreateConnectionResponse();
		rsp.connection.build( connection );
		
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
