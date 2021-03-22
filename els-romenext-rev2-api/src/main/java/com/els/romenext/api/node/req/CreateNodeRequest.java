package com.els.romenext.api.node.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.deco.RomeDecoratorPropertyDao;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

@Deprecated
public class CreateNodeRequest {

	private static Logger log = Logger.getLogger(CreateNodeRequest.class);
	
	private Long typeId;
	private List<Property> properties;
	private List<Property> decoProperties;
	private List<Long> decorators;
	private Long defaultDecoId;
	private Long partGroup;
	private Long modelId;
	
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public List<Property> getProperties() {
		return properties;
	}
	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}
	public List<Property> getDecoProperties() {
		return decoProperties;
	}
	public void setDecoProperties(List<Property> decoProperties) {
		this.decoProperties = decoProperties;
	}
	public List<Long> getDecorators() {
		return decorators;
	}
	public void setDecorators(List<Long> decorators) {
		this.decorators = decorators;
	}
	public Long getDefaultDecoId() {
		return defaultDecoId;
	}
	public void setDefaultDecoId(Long defaultDecoId) {
		this.defaultDecoId = defaultDecoId;
	}	
	public Long getPartGroup() {
		return partGroup;
	}
	public void setPartGroup(Long partGroup) {
		this.partGroup = partGroup;
	}
	public Long getModelId() {
		return modelId;
	}
	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}
	
	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
		if (!json.has("typeId")) {
			return "typeId";
		}
		
		if (!json.has("defaultDecorator")) {
			return "defaultDecorator";
		}
				
		if (json.has("properties")) {
			JSONArray jsonArray = json.getJSONArray("properties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "value", "propertyType");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("decoProperties")) {
			
//			Map<String, Object> son = RomeGsonUtils.getDefaultGson().fromJson(easyString, mapType);
			
			JSONArray jsonArray = json.getJSONArray("decoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "value", "propertyType", "id");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		return empty;
		
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		typeId = Long.valueOf(json.getString("typeId"));
		defaultDecoId = Long.valueOf(json.getString("defaultDecorator"));
		properties = new ArrayList<Property>();
		decoProperties = new ArrayList<Property>();
		decorators = new ArrayList<Long>();
		
		partGroup = null;
		if (json.has("partGroup")) {
			partGroup = Long.valueOf(json.getString("partGroup"));
		}
		
		modelId = null;
		if (json.has("modelId")) {
			modelId = Long.valueOf(json.getString("modelId"));
		}
		
		if (json.has("properties")) {
			
			List<Property> propertyList = PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE);
			if (propertyList != null) {
				properties.addAll(propertyList);
			} else {
				throw new JSONException("Wrong Data");
			}
			
//			properties.addAll(PropertyUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));			
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
			
		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();  
		if (json.has("decoProperties")) {
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
		
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
		
		ResponseBuilder responseBuilder;
		
//		if (PropertyUtils.containsDuplication(properties)) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		return null;
	}	

}
