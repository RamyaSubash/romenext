package com.els.romenext.api.rule.service;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.UpdateRuleRequest;
import com.els.romenext.api.rule.resp.UpdateRuleResponse;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.rule.RuleService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class UpdateRuleService {

    private Logger log = Logger.getLogger(UpdateRuleService.class);
	
	public Response runService( UpdateRuleRequest req, Long metadataId ) {
		
		
		ResponseBuilder responseBuilder;
		
		UserLogDao dao = new UserLogDao(req.namespace);
		dao.getEntityManagerUtil().getSession().clear();
		
		
		CoreServices coreServices = new CoreServices( req.namespace );
		MetadataServices metadataService = new MetadataServices( req.namespace );
		
		MetadataContainerDao metaDao = new MetadataContainerDao( req.namespace );
		MetadataContainer metadataContainer = metaDao.get( metadataId );
//		MetadataRepoContainer repo = metadataService.getMetadataRepoContainerById(repoId);
		
		if (metadataContainer == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
//		if (repo == null) {
//			log.error("No Metadata Found!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		// first check if the type to updated exists or not
//		if(!coreServices.typeNodeExists(RomeNodeClassEnum.RULE, oldName, metadataContainer ))) {
//			log.error("The Rule [" + oldName + "] to Updated Not Exist!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_RULE_FOUND, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		
		RomeRuleDao romeRuleDao = new RomeRuleDao( req.namespace );
		
		
		// check the new rule name been occupied or not
		if ( StringUtils.isNotEmpty(  req.getNewName() ) ) {
			
			// we grab this and check to see if this exists based on the name
			
			List<RomeRule> nameCheck = romeRuleDao.findByName(  req.getNewName(), metadataContainer );

			if( !CollectionUtils.isEmpty( nameCheck ) ) {
				
				if( nameCheck.size() > 1 ) {
					// if more than 1 exists, than this is a problem
					log.error("The New Rule Name [" + req.getNewName() + "] Has Been Occupied!");
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RULE_ALREADY_EXISTS, null).getResponseBuilder();
					return responseBuilder.build();
				} else {
					// ensure that it's not the same rule
					RomeRule romeRule = nameCheck.get( 0 );
					
					if( romeRule.getId() != req.getRuleId() ) {
						// if the id's don't match, this is a duplicate
						log.error("The New Rule Name [" + req.getNewName() + "] Has Been Occupied!");
						responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RULE_ALREADY_EXISTS, null).getResponseBuilder();
						return responseBuilder.build();
					}
				}

				
			}
			
//			// sanity check
//			if(coreServices.checkIfNameExists(RomeNodeClassEnum.RULE, req.getNewName(),  metadataId )) {
//				log.error("The New Rule Name [" + req.getNewName() + "] Has Been Occupied!");
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RULE_ALREADY_EXISTS, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
		}
		

		RuleService ruleServ = new RuleService( req.namespace );
		
		Node rule = ruleServ.updateRule( req.getRuleId(), req.getNewName(), null, metadataId);
		
//		Node rule = coreServices.updateTypeNode(RomeNodeClassEnum.RULE, oldName, req.getName(), null, req.getClassification(), null, repo.getMetadata().getId());
		
		if (rule == null) {
			log.error("Multiple Rule Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MULTIPLE_RULE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateRuleResponse resp = new UpdateRuleResponse();
		
		resp.rule = rule;
		
		
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson( resp )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();

	}
}
