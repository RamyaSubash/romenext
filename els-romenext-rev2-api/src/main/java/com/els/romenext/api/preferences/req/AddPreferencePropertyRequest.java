package com.els.romenext.api.preferences.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.entity.flatstyle.Property;

public class AddPreferencePropertyRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(AddPreferencePropertyRequest.class);
	
	private Long typeId;
	private List<Property> properties;
	
	
	
	public List<Property> getProperties() {
		return properties;
	}
	public Long getTypeId() {
		return typeId;
	}

	public String validateRequest(JSONObject json) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "properties", "typeId" );

		if( empty != null ) {
			return empty;
		}
		
		JSONArray jsonArray = json.getJSONArray("properties");
		
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject prop = jsonArray.getJSONObject(0);
			empty = RomeJSONUtils.findEmptyJson(prop, "id", "name");
			if (empty != null) {
				return empty;
			}
		}
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		this.typeId = json.getLong("typeId");
		
		JSONArray jsonArray = json.getJSONArray("properties");

		properties = new ArrayList<Property>();
		
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject p = jsonArray.getJSONObject(i);
			Property propertyToAdd = PropertyJSONUtils.parseJSONObject( p );
			
			// add the value as well
			// for some reason it's not being set in the PropertyJSONUtils
			String val = p.getString("value");
			propertyToAdd.setValue( val );;
			
			properties.add(propertyToAdd);
		}
		
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
//		if (properties == null) {
//			return null;
//		}
//		
//		ResponseBuilder responseBuilder;
//		
////		if (PropertyUtils.containsDuplication(properties)) {
////			log.error("Duplicate Property Type Names");
////			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE_PROPERTY, null).getResponseBuilder();
////			return responseBuilder.build();
////		}
//		
//		for (Property propertyToAdd : properties) {
//		
//			if (propertyToAdd.getPropertyType() == null || ValueTypeEnum.getEnum(propertyToAdd.getPropertyType()) == null) {
//				log.error("Bad Property Type" + propertyToAdd.getPropertyType());
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_PROPERTY_TYPE, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
		
		
		return null;
		
	}
	

}
