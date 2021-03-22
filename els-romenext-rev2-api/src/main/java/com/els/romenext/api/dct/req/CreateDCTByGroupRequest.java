package com.els.romenext.api.dct.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class CreateDCTByGroupRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(CreateDCTByGroupRequest.class);
	
	private String name;
	private Boolean isRoot;
	private String restrictionStatus;
	
	private List<Property> properties;
	private List<Long> decorators;
	private List<Property> decoPropertyValues;

	public static Logger getLog() {
		return log;
	}

	public String getName() {
		return name;
	}

	public Boolean getIsRoot() {
		return isRoot;
	}

	public String getRestrictionStatus() {
		return restrictionStatus;
	}

	public List<Property> getProperties() {
		return properties;
	}

	public List<Long> getDecorators() {
		return decorators;
	}

	public List<Property> getDecoPropertyValues() {
		return decoPropertyValues;
	}

	public String validateRequest(JSONObject json) {

		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "name", "isRoot", "decorators");
		if (empty != null) {
			return empty;
		} 
		
		// TODO: validate properties' format
//		else if (json.has("properties")) {
//			JSONArray jsonArray = json.getJSONArray("properties");
//			for (int i = 0; i < jsonArray.length(); i++) {
//				JSONObject jsonObject = jsonArray.getJSONObject(i);
//				empty = PropertyUtils.validateJSONObject(jsonObject);
//				if (empty != null) {
//					break;
//				}
//			}
//			return empty;
//		} 

		return empty;
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		
		ResponseBuilder responseBuilder;
		
		// TODO: preprocessing for properties
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
//		
//		if (PropertyUtils.containsDuplication(properties)) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		super.parseRequest(json);

		
		this.name = json.getString("name");
		this.isRoot = json.getBoolean("isRoot");
		
		if (json.has("restrictionStatus")) {
			restrictionStatus = json.getString("restrictionStatus");
		} else {
			restrictionStatus = null;
		}
		
		decorators = new ArrayList<Long>();
		if (json.has("decorators")) {
			JSONArray jsonDecoArray = json.getJSONArray("decorators");
			if (jsonDecoArray != null && jsonDecoArray.length() >= 1) {
				for (int i = 0; i < jsonDecoArray.length(); i++) {
					String decoId = jsonDecoArray.getString(i);
					if (StringUtils.isNotBlank(decoId)) {
						decorators.add(Long.valueOf(decoId));
					}
				}
			}
		}
	
		// TODO: parse properties
//		properties = new ArrayList<Property>();
//		if (json.has("properties")) {
//			JSONArray jsonArray = json.getJSONArray("properties");
//			
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseJSONObject(jsonObject);
//					if (property != null) {
//						properties.add(property);
//					}
//				}
//			}
//		}
		
	}

}
