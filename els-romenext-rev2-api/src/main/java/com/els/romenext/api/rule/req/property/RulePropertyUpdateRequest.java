package com.els.romenext.api.rule.req.property;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.entity.flatstyle.Property;

public class RulePropertyUpdateRequest extends GroupRequest {

	private static Logger log = Logger.getLogger( RulePropertyUpdateRequest.class  );
	
	private Long ruleId;
	private Property updateProperty;
	
	public Property getUpdateProperty() {
		return updateProperty;
	}

	public Long getRuleId() {
		return ruleId;
	}


	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		return RomeJSONUtils.findEmptyJson(json, "ruleId", "updateProperty" );
	}
	
	public void parseRequest(JSONObject json) {
		super.parseRequest(json);

		this.ruleId = json.getLong( "ruleId" );
		this.updateProperty = PropertyJSONUtils.parseJSONObject(json.getJSONObject("updateProperty"));

	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
//		if (propertyToUpdate == null) {
//			return null;
//		}
//		
//		ResponseBuilder responseBuilder;
//		
//		if (propertyToUpdate.getPropertyType() == null || ValueTypeEnum.getEnum(propertyToUpdate.getPropertyType()) == null) {
//			log.error("Bad Property Type " + propertyToUpdate.getPropertyType());
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_PROPERTY_TYPE, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		
		return null;
		
	}
}
