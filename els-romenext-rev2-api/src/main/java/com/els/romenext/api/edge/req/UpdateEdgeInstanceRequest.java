package com.els.romenext.api.edge.req;

import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class UpdateEdgeInstanceRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateEdgeInstanceRequest.class);
	
	private Long connection;
	private List<Property> edgeProperties;
	private List<Property> edgeSysProperties;
	private List<Property> edgeDecoProperties;
	private List<Property> newEdgeProperties;
	private List<Property> newEdgeSysProperties;
	private List<Property> newEdgeDecoProperties;

	private Long originType;
	private Long destinationType;
//	private List<Property> originProperties;
	private List<Property> originSysProperties;
//	private List<Property> originDecoProperties;
//	private List<Property> destinationProperties;
	private List<Property> destinationSysProperties;
//	private List<Property> destinationDecoProperties;

	public Long getConnection() {
		return connection;
	}

	public void setConnection(Long connection) {
		this.connection = connection;
	}

	public List<Property> getEdgeProperties() {
		return edgeProperties;
	}

	public void setEdgeProperties(List<Property> edgeProperties) {
		this.edgeProperties = edgeProperties;
	}

	public List<Property> getEdgeSysProperties() {
		return edgeSysProperties;
	}

	public void setEdgeSysProperties(List<Property> edgeSysProperties) {
		this.edgeSysProperties = edgeSysProperties;
	}

	public List<Property> getEdgeDecoProperties() {
		return edgeDecoProperties;
	}

	public void setEdgeDecoProperties(List<Property> edgeDecoProperties) {
		this.edgeDecoProperties = edgeDecoProperties;
	}

	public List<Property> getNewEdgeProperties() {
		return newEdgeProperties;
	}

	public void setNewEdgeProperties(List<Property> newEdgeProperties) {
		this.newEdgeProperties = newEdgeProperties;
	}

	public List<Property> getNewEdgeSysProperties() {
		return newEdgeSysProperties;
	}

	public void setNewEdgeSysProperties(List<Property> newEdgeSysProperties) {
		this.newEdgeSysProperties = newEdgeSysProperties;
	}

	public List<Property> getNewEdgeDecoProperties() {
		return newEdgeDecoProperties;
	}

	public void setNewEdgeDecoProperties(List<Property> newEdgeDecoProperties) {
		this.newEdgeDecoProperties = newEdgeDecoProperties;
	}
	
	public Long getOriginType() {
		return originType;
	}

	public void setOriginType(Long originType) {
		this.originType = originType;
	}

	public Long getDestinationType() {
		return destinationType;
	}

	public void setDestinationType(Long destinationType) {
		this.destinationType = destinationType;
	}

//	public List<Property> getOriginProperties() {
//		return originProperties;
//	}
//
//	public void setOriginProperties(List<Property> originProperties) {
//		this.originProperties = originProperties;
//	}

	public List<Property> getOriginSysProperties() {
		return originSysProperties;
	}

	public void setOriginSysProperties(List<Property> originSysProperties) {
		this.originSysProperties = originSysProperties;
	}

//	public List<Property> getOriginDecoProperties() {
//		return originDecoProperties;
//	}
//
//	public void setOriginDecoProperties(List<Property> originDecoProperties) {
//		this.originDecoProperties = originDecoProperties;
//	}
//
//	public List<Property> getDestinationProperties() {
//		return destinationProperties;
//	}
//
//	public void setDestinationProperties(List<Property> destinationProperties) {
//		this.destinationProperties = destinationProperties;
//	}

	public List<Property> getDestinationSysProperties() {
		return destinationSysProperties;
	}

	public void setDestinationSysProperties(List<Property> destinationSysProperties) {
		this.destinationSysProperties = destinationSysProperties;
	}

//	public List<Property> getDestinationDecoProperties() {
//		return destinationDecoProperties;
//	}
//
//	public void setDestinationDecoProperties(
//			List<Property> destinationDecoProperties) {
//		this.destinationDecoProperties = destinationDecoProperties;
//	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
		
		// TODO: Need to be fixed
		empty = RomeJSONUtils.findEmptyJson(json, "connection");
//		empty = RomeJSONUtils.findEmptyJson(json, "connection", "startNode", "startNodeType", "endNode", "endNodeType");
		
		if (empty != null) {
			return empty;
		}
		
		if (json.has("edgeProperties")) {
			JSONArray jsonArray = json.getJSONArray("edgeProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("edgeSysProperties")) {
			JSONArray jsonArray = json.getJSONArray("edgeSysProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "name", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("edgeDecoProperties")) {
			JSONArray jsonArray = json.getJSONArray("edgeDecoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "id", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("newEdgeProperties")) {
			JSONArray jsonArray = json.getJSONArray("newEdgeProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("newEdgeSysProperties")) {
			JSONArray jsonArray = json.getJSONArray("newEdgeSysProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "name", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
		
		if (json.has("newEdgeDecoProperties")) {
			JSONArray jsonArray = json.getJSONArray("newEdgeDecoProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "id", "propertyType", "value");
				if (empty != null) {
					return empty;
				}
			}
		}
					
		return empty;
		
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		
		super.parseRequest(json);

		
		
		
		connection = json.getLong("connection");
		
		if (json.has("startNodeType") && json.has("endNodeType") && json.has("startNodeSysProperties") && json.has("endNodeSysProperties")) {
			
			originType =  json.getLong("startNodeType");
			originSysProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("startNodeSysProperties"), Neo4jPropertyTypeEnum.SYSTEM);

			destinationType = json.getLong("endNodeType");
			destinationSysProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("endNodeSysProperties"), Neo4jPropertyTypeEnum.SYSTEM);
			
		}
		
		if (json.has("edgeProperties")) {
			edgeProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("edgeProperties"), Neo4jPropertyTypeEnum.RULE);
		}
		
		if (json.has("newEdgeProperties")) {
			newEdgeProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("newEdgeProperties"), Neo4jPropertyTypeEnum.RULE);
		}
		
		if (json.has("edgeDecoProperties")) {
			edgeDecoProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("edgeDecoProperties"), Neo4jPropertyTypeEnum.DECORATOR);
		}
		
		if (json.has("newEdgeDecoProperties")) {
			newEdgeDecoProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("newEdgeDecoProperties"), Neo4jPropertyTypeEnum.DECORATOR);
		}
		
		if (json.has("edgeSysProperties")) {
			edgeSysProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("edgeSysProperties"), Neo4jPropertyTypeEnum.SYSTEM);
		}
		
		if (json.has("newEdgeSysProperties")) {
			newEdgeSysProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("newEdgeSysProperties"), Neo4jPropertyTypeEnum.SYSTEM);
		}
					
	}

	public Response preprocessor() {
		
		ResponseBuilder responseBuilder;
		
		if (PropertyJSONUtils.containsDuplicationPropertyId(edgeProperties)) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_EDGE_PROPERTY, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		return null;
	}
	
}
