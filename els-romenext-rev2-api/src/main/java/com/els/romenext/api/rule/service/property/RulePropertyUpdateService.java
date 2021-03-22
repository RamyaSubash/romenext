package com.els.romenext.api.rule.service.property;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.property.RulePropertyUpdateRequest;
import com.els.romenext.api.rule.resp.property.RulePropertyUpdateResponse;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeRulePropertyDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.rule.RuleService;
import com.els.romenext.core.util.RomeRuleUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class RulePropertyUpdateService {
	
	private static Logger log = Logger.getLogger(RulePropertyUpdateService.class);
	
	public Response runService(  RulePropertyUpdateRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		UserLogDao dao = new UserLogDao(req.namespace);
		dao.getEntityManagerUtil().getSession().clear();
		
		CoreServices coreServices = new CoreServices(req.namespace );
		
		MetadataServices metadataService = new MetadataServices( req.namespace );
		MetadataContainer mc = metadataService.getMetadataContainerById( metadataId );
		
		
		if ( mc == null ) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATA_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// load property id
		Long propId = null;
		try {
			propId = Long.valueOf( req.getUpdateProperty().getId() );
		} catch( Exception e ) {
			log.error("The Rule Property [" + req.getUpdateProperty().getId() + "] to Updated Not Exist!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_PROPERTY_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// get the rule
		Long ruleId = req.getRuleId();
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );

		RomeRule romeRule = ruleDao.get( ruleId );
		if(romeRule == null) {
			log.error("The Rule Property [" + propId + "] to Updated Not Exist!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// first check if the rule to updated exists or not
		RomeRuleUtils ruleUtils = new RomeRuleUtils( req.namespace );
		RomeRulePropertyDao propDao = new RomeRulePropertyDao( req.namespace );
		
		RomeRuleProperty oldValue = propDao.findByRomeRuleAndId(romeRule, propId);
		
		if( oldValue == null ) {
			log.error("The Rule Property [" + propId + "] to Updated Not Exist!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_PROPERTY_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// if the name is being changed, we need to make sure the name does not already exists
		
		// check if the new name occupied
		if (!oldValue.getName().equalsIgnoreCase( req.getUpdateProperty().getName())) {
			List<RomeRuleProperty> sanitycheck = propDao.findByRomeRuleAndName(romeRule, req.getUpdateProperty().getName());
			
			if( sanitycheck == null || sanitycheck.size() > 0 ) {
				log.error("The New Rule Property's Name [" + req.getUpdateProperty().getName() + "] Has Been Occupied!");
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RULE_PROPERTY_ALREADY_EXISTS, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		RomeRuleProperty updated = ruleUtils.updateRomeRuleProperty(romeRule, propId, req.getUpdateProperty() );
		
		
//		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//		return responseBuilder.build();
		
		
		RuleService ruleService = new RuleService( req.namespace );
		
		Node rule = ruleService.getRule(ruleId, mc);
		
		
		RulePropertyUpdateResponse rsp = new RulePropertyUpdateResponse();
		rsp.rule = rule;
		
		
		
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson(rsp)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
