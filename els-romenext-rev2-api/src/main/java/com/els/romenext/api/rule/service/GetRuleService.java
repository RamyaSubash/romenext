package com.els.romenext.api.rule.service; 

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.GetRuleRequest;
import com.els.romenext.api.rule.resp.GetRuleResponse;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.rule.RuleService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GetRuleService {
	
	private static Logger log = Logger.getLogger(GetRuleService.class);
	 
	
	public Response runService( GetRuleRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// get all types based on group
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		
		
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao( req.namespace );
		List<RomeGroupType> rgtList = rgtDao.findByGroup(g);
		List<Long> rtIdList = new ArrayList<Long>();
		for (RomeGroupType rgt : rgtList) {
			rtIdList.add(rgt.getRomeType().getId());
		}
		
		// retrieve all rules by group
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );
		
		RomeRule romeRule = ruleDao.get( req.getRuleId() );
		
		if( romeRule == null ) {
			log.error("No rule Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_FOUND, null).getResponseBuilder();
			return responseBuilder.build(); 
		}
		
		// permission check?
		// Sicne this is ONLY rules, there are no types as they are associated with the connections.
		// If we want to return the connections, we should check the permissions.
		
		
		// retrieve all rules
		RuleService ruleService = new RuleService( req.namespace );

		Node rule = ruleService.getRule( req.getRuleId(), mc );
		
		GetRuleResponse resp = new GetRuleResponse();
		resp.rule = rule;
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson(resp)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
