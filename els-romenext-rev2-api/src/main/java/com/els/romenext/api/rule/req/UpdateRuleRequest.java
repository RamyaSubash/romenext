package com.els.romenext.api.rule.req;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class UpdateRuleRequest extends GroupRequest {
	
private Logger log = Logger.getLogger(UpdateRuleRequest.class);
	
//	private String owner;
	
	private Long ruleId;
	private String newName;
//	private Long cardinality;
//	private String classification;
//	private List<Property> properties;
	
	
	
	public String validateRequest(JSONObject json) {
		// TODO: permission need to be implemented
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		return RomeJSONUtils.findEmptyJson(json, "ruleId", "newName" );
	}
	
	public Logger getLog() {
		return log;
	} 

	public Long getRuleId() {
		return ruleId;
	}

	public String getNewName() {
		return newName;
	} 

	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		
		this.newName = json.getString("newName");
		this.ruleId = json.getLong( "ruleId" );
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
		
		ResponseBuilder responseBuilder;
		
//		if (classification == null || !(classification.equals(RomeRuleClassificationEnum.LINK.getClassification())
//				|| classification.equals(RomeRuleClassificationEnum.PARENTCHILD.getClassification()))) {
//				
//			log.error("Bad Rule Classification! " + classification);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_RULE_CLASSIFICATION, null).getResponseBuilder();
//			return responseBuilder.build();
//			
//		}
		
//		if (properties != null) {
//			for (Property property : properties) {
//				
//				if (property.getPropertyType() == null || ValueTypeEnum.getEnum(property.getPropertyType()) == null) {
//					log.error("Bad Property Type " + property.getPropertyType());
//					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_PROPERTY_TYPE, null).getResponseBuilder();
//					return responseBuilder.build();
//				}
//			}
//		}
		
		return null;
		
	}
	

}
