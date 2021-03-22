package com.els.romenext.api.node.req.search;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeCollectionUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class EntryNodeRequest {

	private static Logger log = Logger.getLogger(EntryNodeRequest.class);
	
	private List<Long> types;
	private List<Long> connections;
	private List<Property> properties;
	private List<Property> systemProperties;
	private List<Property> decoProperties;
	
	public List<Long> getTypes() {
		return types;
	}

	public void setTypes(List<Long> types) {
		this.types = types;
	}

	public List<Long> getConnections() {
		return connections;
	}

	public void setConnections(List<Long> connections) {
		this.connections = connections;
	}

	public List<Property> getProperties() {
		return properties;
	}

	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}
	
	public List<Property> getSystemProperties() {
		return systemProperties;
	}

	public void setSystemProperties(List<Property> systemProperties) {
		this.systemProperties = systemProperties;
	}

	public List<Property> getDecoProperties() {
		return decoProperties;
	}

	public void setDecoProperties(List<Property> decoProperties) {
		this.decoProperties = decoProperties;
	}

	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
		if (!json.has("typeIds")) {
			return "typeIds";
		}
		
		if (json.has("properties")) {
			JSONArray jsonArray = json.getJSONArray("properties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyName", "value", "propertyType");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("systemProperties")) {
			JSONArray jsonArray = json.getJSONArray("systemProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyName", "value", "propertyType");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("decoProperties")) {
			JSONArray jsonArray = json.getJSONArray("decoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyName", "value", "propertyType");
				if (empty != null) {
					return empty;
				}
			}
		}
			
		return empty;
	
	}
	
	public void parseRequest( JSONObject json ) throws JSONException {

		properties = new ArrayList<Property>();
		if (json.has("properties")) {
			properties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));
//			JSONArray jsonArray = json.getJSONArray("properties");
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
//					if (property != null) {
//						properties.add(property);
//					}
//				}
//			}
		}
		
		systemProperties = new ArrayList<Property>();
		if (json.has("systemProperties")) {
			systemProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("systemProperties"), Neo4jPropertyTypeEnum.SYSTEM));
//			JSONArray jsonArray = json.getJSONArray("systemProperties");
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
//					if (property != null) {
//						systemProperties.add(property);
//					}
//				}
//			}
		}
		
		decoProperties = new ArrayList<Property>();
		if (json.has("decoProperties")) {		
			decoProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("decoProperties"), Neo4jPropertyTypeEnum.DECORATOR));
//			JSONArray jsonArray = json.getJSONArray("decoProperties");
//			if (jsonArray != null) {
//				for (int i = 0; i < jsonArray.length(); i++) {
//					JSONObject jsonObject = jsonArray.getJSONObject(i);
//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
//					if (property != null) {
//						decoProperties.add(property);
//					}
//				}
//			}
		}
		
		types = new ArrayList<Long>();
		if (json.has("typeIds")) {
			JSONArray jsonArray = json.getJSONArray("typeIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					types.add(jsonArray.getLong(i));
				}
			}
		}
		
		connections = new ArrayList<Long>();
		if (json.has("connIds")) {
			JSONArray jsonArray = json.getJSONArray("connIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					connections.add(jsonArray.getLong(i));
				}
			}
		}
		
	}
	
	public Response preprocessor() {		
		
		ResponseBuilder responseBuilder;
		
		if (this.types.size() < 1) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if (CollectionUtils.isNotEmpty(this.types)) {
			if (RomeCollectionUtils.containsDuplication(this.types)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		if (CollectionUtils.isNotEmpty(this.connections)) {
			if (RomeCollectionUtils.containsDuplication(this.connections)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		return null;
		
	}
	
}
