package com.els.romenext.api.rule.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.property.RuleAddPropertyRequest;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.RomeRuleUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class RulePropertyAddService {
	
	private static Logger log = Logger.getLogger(RulePropertyAddService.class);
	
	public Response runService( RuleAddPropertyRequest req, Long metadataId  ) {
		
		ResponseBuilder responseBuilder;
		 
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// sanity check?
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );
		
		
		RomeRule rule = ruleDao.get( req.ruleid );
		
		if( rule == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		ruleDao.refresh( rule );
		
		
		// build the properties
		List<RomeRuleProperty> toAdd = new ArrayList<>();
		
		List<RomeRuleProperty> currentFieldList = rule.getFields();
		Map<String,RomeRuleProperty> currentFieldMap = new HashMap<>();
		// create a map
		for( RomeRuleProperty p : currentFieldList ) {
			currentFieldMap.put( p.getName(),  p );
		}
		
		RomeRuleUtils ruleUtils = new RomeRuleUtils();
		// not going to check for duplicates for now
		for( Property pp : req.fields ) {
			
			// build the property
//			RomeRuleProperty prop = GeneralRomeRulePropertyRequest.build( rule, r );
			RomeRuleProperty newProp = RomeRuleUtils.build( pp );
			
			if( newProp != null ) {
				if( StringUtils.isEmpty( newProp.getName() ) ) {
					log.error("Rule Property Name does not Exists: " + newProp.getName());
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ADD_RUlE_PROPERTY_FAILED, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				// if there is another property with this name, do not insert
				if( currentFieldMap.containsKey( newProp.getName() ) ) {
					log.error("Rule Property Already Exists: " + newProp.getName());
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RULE_PROPERTY_ALREADY_EXISTS, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				newProp.setRomeRule( rule );
				toAdd.add( newProp );
			} else {
				// ? 
			}
			
		}
		
		
//		if (coreServices.typeNodePropertyExists(RomeNodeClassEnum.RULE, ruleName, property.getName(), repo.getMetadata().getId())) {
//			log.error("Rule Property Already Exists: " + property.getName());
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RULE_PROPERTY_ALREADY_EXISTS, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		
		
		// add the properties
		for( RomeRuleProperty p : toAdd ) {
			rule.getFields().add( p );
		}
		
		ruleDao.getTransaction().begin();
		ruleDao.save( rule );
		ruleDao.getTransaction().commit();
		
		ruleDao.refresh( rule );
		
		NodeBuilder builder = new NodeBuilder( req.namespace );

		Node ruleNode = builder.build( rule );
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson( ruleNode )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
