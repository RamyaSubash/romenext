package com.els.romenext.api.edge.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class CreateEdgeRequest {
	
	private static Logger log = Logger.getLogger(CreateEdgeRequest.class);
	
	private Long connection;
	private String originType;
	private String destinationType;
	private List<Property> edgeProperties;
	private List<Property> originProperties;
	private List<Property> destinationProperties;
	
	public Long getConnection() {
		return connection;
	}
	
	public String getOriginType() {
		return originType;
	}
	
	public String getDestinationType() {
		return destinationType;
	}
	
	public List<Property> getEdgeProperties() {
		return edgeProperties;
	}
	
	public List<Property> getOriginProperties() {
		return originProperties;
	}
	
	public List<Property> getDestinationProperties() {
		return destinationProperties;
	}
	
	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson(json, "connection", "originType", "destinationType", "originNodeUuid", "destinationNodeUuid");
		
		if (empty != null) {
			return empty;
		}
		
		return empty;
		
	}
	
	public Response preprocessor() {
	
		// currently, I just checked if there is any duplicate property name
		
		ResponseBuilder responseBuilder;
		
//		if (PropertyUtils.containsDuplication(edgeProperties)) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_EDGE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		if (PropertyJSONUtils.containsDuplicationPropertyId(edgeProperties)) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_EDGE_PROPERTY, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		connection = Long.parseLong(json.getString("connection"));
		originType = json.getString("originType");
		destinationType = json.getString("destinationType");
		originProperties = new ArrayList<Property>();
		destinationProperties = new ArrayList<Property>();
		Property originProperty = Property.buildNodeProperty("uuid", "STRING", json.getString("originNodeUuid"));
		originProperty.setName("uuid");
		Property destinationProperty = Property.buildNodeProperty("uuid", "STRING", json.getString("destinationNodeUuid"));
		destinationProperty.setName("uuid");
		originProperties.add(originProperty);
		destinationProperties.add(destinationProperty);
		
		if (json.has("edgeProperties")) {
			edgeProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("edgeProperties"), Neo4jPropertyTypeEnum.RULE);
		}
				
	}
	
}
