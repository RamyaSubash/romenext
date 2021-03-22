package com.els.romenext.api.entities.general;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.RomeNodeClassEnum;

public class EntryNodeRequest {
	
	private static Logger log = Logger.getLogger(EntryNodeRequest.class);
	
	private String id;
//	private String type;		// ???? WTF IS THIS FOR
	
	/**
	 * This is all type specific information
	 */
	private String name;
	private RomeNodeClassEnum romeClass;
	private String classification;
	private Boolean isRoot;
	
	
	private List<Property> properties;
	private List<Property> decoProperties;
	private List<Property> sysProperties;
	
	
	
	public String getId() {
		return id;
	}

//	public String getType() {
//		return type;
//	}
	
	public List<Property> getProperties() {
		return properties;
	}

	public List<Property> getDecoProperties() {
		return decoProperties;
	}

	public List<Property> getSysProperties() {
		return sysProperties;
	}
	
	
	public String getName() {
		return name;
	}

	public RomeNodeClassEnum getRomeClass() {
		return romeClass;
	}

	public String getClassification() {
		return classification;
	}

	public Boolean getIsRoot() {
		return isRoot;
	}

	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
//		if (!json.has("type")) {
//			return "type";
//		}
		
		if (json.has("properties")) {
			JSONArray jsonArray = json.getJSONArray("properties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("decoProperties")) {			
			JSONArray jsonArray = json.getJSONArray("decoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "value", "propertyType", "romeDecoPropId");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("sysProperties")) {	
			JSONArray jsonArray = json.getJSONArray("sysProperties");
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
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
		
//		ResponseBuilder responseBuilder;
//		
//		if (PropertyUtils.containsDuplication(properties)) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
//		if( json.has("type") ) {
//			type = json.getString("type");			
//		}
		
		if( json.has("id" ) ) {
			this.id = json.getString( "id" );
		}
		
		if( json.has("name")) {
			this.name = json.getString("name");
		}
		
		properties = new ArrayList<Property>();
		if (json.has("properties")) {
			
			// check to see if any properties exists
			JSONArray arr = json.getJSONArray("properties");
			
			if( arr != null ) {
				List<Property> props = PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE);
				
				if( props != null ) {
					properties.addAll( props );									
				}
				
//				properties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));				
			}
//			JSONArray jsonArray = json.getJSONArray("properties");			
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodePropertyJSONObject(jsonObject);
//					if (property != null) {
//						properties.add(property);
//					}
//				}
//			}
		}
		
		decoProperties = new ArrayList<Property>();
		if (json.has("decoProperties")) {
			
			// check to see if any properties exists
			JSONArray arr = json.getJSONArray("decoProperties");
			
			if( arr != null ) {
				List<Property> props = PropertyJSONUtils.parseProperties(json.getJSONArray("decoProperties"), Neo4jPropertyTypeEnum.DECORATOR);
				
				if( props != null ) {
					decoProperties.addAll( props );									
				}
			}
			
//			JSONArray jsonArray = json.getJSONArray("decoProperties");			
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObjectWithDeco(jsonObject);
//					if (property != null) {
//						decoProperties.add(property);
//					}
//				}
//			}
		}
		
		sysProperties = new ArrayList<Property>();
		if (json.has("sysProperties")) {
			
			// check to see if any properties exists
			JSONArray arr = json.getJSONArray("sysProperties");
			
			if( arr != null ) {
				List<Property> props = PropertyJSONUtils.parseProperties(json.getJSONArray("sysProperties"), Neo4jPropertyTypeEnum.SYSTEM);
				
				if( props != null ) {
					sysProperties.addAll( props );									
				}
				
//				sysProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("sysProperties"), Neo4jPropertyTypeEnum.SYSTEM));				
			}
//			JSONArray jsonArray = json.getJSONArray("sysProperties");
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
//					if (property != null) {
//						sysProperties.add(property);
//					}
//				}
//			}
		}
		
	}

}
