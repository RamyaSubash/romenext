package com.els.romenext.api.type.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;

public class AddTypePropertiesRequest_OLD {
	
	private static Logger log = Logger.getLogger(AddTypePropertiesRequest_OLD.class);
	
	private List<Property> properties;
	
	
	
	public List<Property> getProperties() {
		return properties;
	}

	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}
	

	public String validateRequest(JSONArray jsonArray) {
		// TODO: permission need to be implemented
		String empty = null;
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject json = jsonArray.getJSONObject(0);
			empty = RomeJSONUtils.findEmptyJson(json, "name", "propertyType");
			if (empty != null) {
				return empty;
			}
		}
		return empty;
	}
	
	public void parseRequest(JSONArray jsonArray) {
		
		properties = new ArrayList<Property>();
		
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject json = jsonArray.getJSONObject(i);
			Property propertyToAdd = PropertyJSONUtils.parseJSONObject(json);
			properties.add(propertyToAdd);
		}
		
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
		if (properties == null) {
			return null;
		}
		
		ResponseBuilder responseBuilder;
		
//		if (PropertyUtils.containsDuplication(properties)) {
//			log.error("Duplicate Property Type Names");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		for (Property propertyToAdd : properties) {
		
			if (propertyToAdd.getPropertyType() == null || ValueTypeEnum.getEnum(propertyToAdd.getPropertyType()) == null) {
				log.error("Bad Property Type" + propertyToAdd.getPropertyType());
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_PROPERTY_TYPE, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		
		return null;
		
	}
	

}
