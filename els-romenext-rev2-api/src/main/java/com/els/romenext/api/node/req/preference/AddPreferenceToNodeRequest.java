package com.els.romenext.api.node.req.preference;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class AddPreferenceToNodeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(AddPreferenceToNodeRequest.class);
	
	private Long typeId;
	private List<Property> properties;
//	private List<Property> decoProperties;
	private List<Property> sysProperties;	
	
	private List<Property> preferences;

	
	
	public static Logger getLog() {
		return log;
	}

	public Long getTypeId() {
		return typeId;
	}

	public List<Property> getProperties() {
		return properties;
	}

//	public List<Property> getDecoProperties() {
//		return decoProperties;
//	}

	public List<Property> getSysProperties() {
		return sysProperties;
	}

	public List<Property> getPreferences() {
		return preferences;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
		
		if (!json.has("typeId")) {
			return "typeId";
		}
		
		if (json.has("properties")) {
			JSONArray jsonArray = json.getJSONArray("properties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "value", "propertyType" );
				if (empty != null) {
					return empty;
				}
			}
		}
		
		
		if (json.has("decoProperties")) {
			JSONArray jsonArray = json.getJSONArray("decoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "id", "value", "propertyType" );
				if (empty != null) {
					return empty;
				}
			}
		}
		
		
		// 
		
		if (json.has("sysProperties")) {
			JSONArray jsonArray = json.getJSONArray("sysProperties");
			
			boolean hasUUID = false;
			
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "name", "value", "propertyType" );
				if (empty != null) {
					return empty;
				}
				
				// check to see if uuid 
				String uuidCheck = jsonProperty.getString("name");
				
				if( !hasUUID && uuidCheck != null && uuidCheck.equalsIgnoreCase("uuid" ) ) {
					hasUUID = true;
				}
				
				// we can also be passed this via id was well
				if( jsonProperty.has("id") ) {
					String uuidCheckID = jsonProperty.getString("id");
					if( !hasUUID && uuidCheckID != null && uuidCheckID.equalsIgnoreCase("uuid" ) ) {
						hasUUID = true;
					}
				}
			
			}
			
			if( !hasUUID ) {
				return "uuid";
			}
		} else {
			// we MUST have system properties
			return "sysProperties";
		}
		
		if (json.has("preferences")) {
			JSONArray jsonArray = json.getJSONArray("preferences");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "name", "value", "propertyType");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		return empty;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);

		
		typeId = json.getLong("typeId");
		
		if (json.has("properties")) {
			properties = new ArrayList<Property>();
			properties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));
		}
		
//		if (json.has("decoProperties")) {
//			decoProperties = new ArrayList<Property>();
//			decoProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("decoProperties"), Neo4jPropertyTypeEnum.DECORATOR));
//		}
		
		if (json.has("sysProperties")) {
			sysProperties = new ArrayList<Property>();
			sysProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("sysProperties"), Neo4jPropertyTypeEnum.SYSTEM));
		}
		
		if (json.has("prefProperties")) {
			sysProperties = new ArrayList<Property>();
			sysProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("prefProperties"), Neo4jPropertyTypeEnum.PREFERENCE));
		}
		
	}
	
	public Response preprocessor() {
		
		ResponseBuilder responseBuilder;
		
//		if (PropertyUtils.containsDuplication(properties)) {
//			log.error("Duplicate Node Property Names");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_NODE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		return null;
	}

}
