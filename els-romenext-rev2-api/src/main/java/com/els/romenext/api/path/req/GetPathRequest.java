package com.els.romenext.api.path.req;

import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

/**
 * Request for the searching based on entry node
 * 
 * should be:
 * 
 * ENTRY NODE : uuid/props/labels
 * 
 * @author jlee
 *
 */
public class GetPathRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetPathRequest.class);
	
	private Long pathId;
	
	private List<Property> properties;
	
//	private List<GuiNodeRequestPayload> nodes;
//	private List<EntryNodeRequest> edges;
	

//	public List<GuiNodeRequestPayload> getNodes() {
//		return nodes;
//	}
//
//	public void setNodes(List<GuiNodeRequestPayload> nodes) {
//		this.nodes = nodes;
//	}
//
//	public List<EntryNodeRequest> getEdges() {
//		return edges;
//	}
//
//	public void setEdges(List<EntryNodeRequest> edges) {
//		this.edges = edges;
//	}
	
	public Long getPathId() {
		return pathId;
	}

	public void setPathId(Long pathId) {
		this.pathId = pathId;
	}

	public List<Property> getProperties() {
		return properties;
	}

	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "pathId" );
		if (empty != null) {
			return empty;
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
		
		
		return empty;
	
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);
		
		
		this.pathId = json.getLong("pathId");
		
		if (json.has("properties")) {
			
			List<Property> propertyList = PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE );
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
		
	}
	
	public Response preprocessor() {		
		
//		ResponseBuilder responseBuilder;
//		
//		Response response = entryNode.preprocessor();
//		if (response != null) {
//			return response;
//		}
//		
//		if (CollectionUtils.isNotEmpty(this.typeIds)) {
//			if (RomeCollectionUtils.containsDuplication(this.typeIds)) {
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
//		
//		if (CollectionUtils.isNotEmpty(this.connIds)) {
//			if (RomeCollectionUtils.containsDuplication(this.connIds)) {
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
		
		return null;
	
	}
	
}
