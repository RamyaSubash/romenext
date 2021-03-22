package com.els.romenext.api.type.req;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.property.PropertyValidatorUtils;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;

public class AddTypePropertiesRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(AddTypePropertiesRequest.class);
	
	private List<Property> properties;
	private Long typeId;
	
	
	
	
	

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
		
		String empty = RomeJSONUtils.findEmptyJson(json, "typeId", "properties" );
		if (empty != null) {
			return empty;
		} 
		
		// grab the properties
		JSONArray jsonArray = json.getJSONArray("properties");
		
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonProp = jsonArray.getJSONObject( i );
			
			
			empty = PropertyValidatorUtils.validateProperty( jsonProp );
			
		}
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		

		super.parseRequest(json);

		
		properties = new ArrayList<Property>();
		
		JSONArray jsonArray = json.getJSONArray("properties");
		
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonProp = jsonArray.getJSONObject(i);
			Property propertyToAdd = PropertyJSONUtils.parseJSONObject(jsonProp);
			properties.add(propertyToAdd);
		}
		
		this.typeId = json.getLong( "typeId" );
		
	}
	
	

}
