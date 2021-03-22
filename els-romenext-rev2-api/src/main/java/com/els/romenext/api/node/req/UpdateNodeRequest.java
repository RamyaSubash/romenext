package com.els.romenext.api.node.req;

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

public class UpdateNodeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateNodeRequest.class);
	
	private Long typeId;
	private List<Property> properties;
	private List<Property> decoProperties;
	private List<Property> sysProperties;	
	
	private List<Property> newProperties;
	private List<Property> newDecoProperties;
	private List<Property> newSysProperties;
	
	private List<Property> preferences;

	
	private List<Long> decorators;
	private Long defaultDecoId;
	private Long partGroup;
	private Long modelId;
	
	public Long getTypeId() {
		return typeId;
	}
	public List<Property> getProperties() {
		return properties;
	}
	public List<Property> getNewProperties() {
		return newProperties;
	}
	public List<Property> getDecoProperties() {
		return decoProperties;
	}
	public List<Property> getNewDecoProperties() {
		return newDecoProperties;
	}
	public List<Property> getSysProperties() {
		return sysProperties;
	}
	public List<Property> getNewSysProperties() {
		return newSysProperties;
	}
	public List<Long> getDecorators() {
		return decorators;
	}
	public Long getDefaultDecoId() {
		return defaultDecoId;
	}
	public Long getPartGroup() {
		return partGroup;
	}
	public Long getModelId() {
		return modelId;
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
		
//		if (!json.has("defaultDecorator")) {
//			return "defaultDecorator";
//		}
		
		partGroup = null;
		if (json.has("partGroup")) {
			partGroup = Long.valueOf(json.getString("partGroup"));
		}
		
		modelId = null;
		if (json.has("modelId")) {
			modelId = Long.valueOf(json.getString("modelId"));
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
		
		if (json.has("newProperties")) {
			JSONArray jsonArray = json.getJSONArray("newProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyType" );
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
		
		if (json.has("newDecoProperties")) {
			JSONArray jsonArray = json.getJSONArray("newDecoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "value", "propertyType", "id");

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
		
		
		if (json.has("newSysProperties")) {
			JSONArray jsonArray = json.getJSONArray("newSysProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "name", "value", "propertyType");
				if (empty != null) {
					return empty;
				}
			}
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
		if (json.has("defaultDecorator")) {
			defaultDecoId = Long.valueOf(json.getString("defaultDecorator"));
		}
		
		if (json.has("properties")) {
			properties = new ArrayList<Property>();
			properties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));
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
		
		if (json.has("newProperties")) {
			
			List<Property> propertyList = PropertyJSONUtils.parseProperties(json.getJSONArray("newProperties"), Neo4jPropertyTypeEnum.TYPE);
			if (propertyList != null) {
				newProperties = new ArrayList<Property>();
				newProperties.addAll(propertyList);
			} else {
				throw new JSONException("Wrong Data");
			}
			
//			newProperties = new ArrayList<Property>();
//			newProperties.addAll(PropertyUtils.parseProperties(json.getJSONArray("newProperties"), Neo4jPropertyTypeEnum.TYPE));
//			JSONArray jsonArray = json.getJSONArray("newProperties");
//			newProperties = new ArrayList<Property>();
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodePropertyJSONObjectAndRemoveUUID(jsonObject);
//					if (property != null) {
//						newProperties.add(property);
//					}
//				}
//			}
		}
		
		decorators = new ArrayList<Long>();
//		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();  
		
		if (json.has("decoProperties")) {
			decoProperties = new ArrayList<Property>();
			decoProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("decoProperties"), Neo4jPropertyTypeEnum.DECORATOR));
//			JSONArray jsonArray = json.getJSONArray("decoProperties");			
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObjectWithDeco(jsonObject);
//					if (property != null) {
//						decoProperties.add(property);
//					}
//					Long decoId = rdpDao.get(property.getRomeDecoPropId()).getRomeDecorator().getId();
//					if (decoId != null && !decorators.contains(decoId)) {
//						decorators.add(decoId);
//					} 
//				}
//			}
		}
		
		if (json.has("newDecoProperties")) {
			newDecoProperties = new ArrayList<Property>();
			newDecoProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("newDecoProperties"), Neo4jPropertyTypeEnum.DECORATOR));
//			JSONArray jsonArray = json.getJSONArray("newDecoProperties");
//			newDecoProperties = new ArrayList<Property>();
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObjectWithDeco(jsonObject);
//					if (property != null) {
//						newDecoProperties.add(property);
//					}
//					Long decoId = rdpDao.get(property.getRomeDecoPropId()).getRomeDecorator().getId();
//					if (decoId != null && !decorators.contains(decoId)) {
//						decorators.add(decoId);
//					} 
//				}
//			}
		}
		
		if (json.has("sysProperties")) {
			sysProperties = new ArrayList<Property>();
			sysProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("sysProperties"), Neo4jPropertyTypeEnum.SYSTEM));
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
		
		if (json.has("newSysProperties")) {
			newSysProperties = new ArrayList<Property>();
			newSysProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("newSysProperties"), Neo4jPropertyTypeEnum.SYSTEM));			
//			JSONArray jsonArray = json.getJSONArray("newSysProperties");
//			newSysProperties = new ArrayList<Property>();
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
//					if (property != null) {
//						newSysProperties.add(property);
//					}
//				}
//			}
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
