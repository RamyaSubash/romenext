package com.els.romenext.api.type.req;

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

public class CreateTypeByGroupRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(CreateTypeByGroupRequest.class);
	
	private String typeName;
	private String classification;
	private Boolean isRoot;
	private String restrictionStatus;
	
	private List<Property> properties;
	
	private List<Long> decorators;
	
	private List<Property> decoPropertyValues;
	
	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getClassification() {
		return classification;
	}

	public void setClassification(String classification) {
		this.classification = classification;
	}

	public Boolean getIsRoot() {
		return isRoot;
	}

	public void setIsRoot(Boolean isRoot) {
		this.isRoot = isRoot;
	}

	public String getRestrictionStatus() {
		return restrictionStatus;
	}

	public void setRestrictionStatus(String restrictionStatus) {
		this.restrictionStatus = restrictionStatus;
	}

	public List<Property> getProperties() {
		return properties;
	}

	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}

	public List<Long> getDecorators() {
		return decorators;
	}

	public void setDecorators(List<Long> decorators) {
		this.decorators = decorators;
	}

	public List<Property> getDecoPropertyValues() {
		return decoPropertyValues;
	}

	public void setDecoPropertyValues(List<Property> decoPropertyValues) {
		this.decoPropertyValues = decoPropertyValues;
	}

	public String validateRequest(JSONObject json) {

		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "name", "isRoot", "classification", "decorators");
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
		
		if (classification == null || (!classification.equals(RomeTypeClassificationEnum.NODE.getClassification())
							&& !classification.equals(RomeTypeClassificationEnum.PATH.getClassification()) && !classification.equals(RomeTypeClassificationEnum.SYSTEM.getClassification()))) {
			
			log.error("Bad Type Classification! " + classification);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_TYPE_CLASSIFICATION, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
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

		
		typeName = json.getString("name");
		isRoot = json.getBoolean("isRoot");
		classification = json.getString("classification");

		if (json.getString("grouphost").equals("all")) {
			this.setGrouphost("%");
		}
		
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
