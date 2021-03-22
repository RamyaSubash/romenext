package com.els.romenext.api.edge.req;

import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.payloads.GuiEdgeRequestPayload;

/**
 * Note, that this is created to match against an api that is currently being called.
 * 
 * request expected:
 * 	{
	"connection": 1,
	"startNode": {
		"typeIds": [105],
		"sysProperties": [{
			"propertyName": "uuid",
			"propertyType": "STRING",
			"value": "9adaa8a0-b9cd-4db7-bbf8-ae89c695c518"
		}]
	},
	"endNode": {
		"typeIds": [106],
		"sysProperties": [{
			"propertyName": "uuid",
			"propertyType": "STRING",
			"value": "9ac7eb25-c819-4efb-bc2f-1cdbbfbdffc7"
		}]
	},
	"toDeleteEdge": {
		"connection": "1",
		"sysProperties": [{
			"propertyName": "uuid",
			"propertyType": "STRING",
			"value": "83934a43-65e5-4a8a-a806-39a64a82ba7f"
		}]
	}
 * 
 * @author jplee
 *
 */
public class DeleteEdgeRequest extends GroupRequest {

	
//	private Node startNode;
//	private Node endNode;
//	private Relatsionship connection;
	private GuiEdgeRequestPayload connection; 
	
	public GuiEdgeRequestPayload getConnection() {
		return connection;
	}
	public void setConnection(GuiEdgeRequestPayload connection) {
		this.connection = connection;
	}
	
	
	
	
	
	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
		
		
		empty = RomeJSONUtils.findEmptyJson(json, "connection"); 
		
		if (empty != null) {
			return empty;
		}
		
		// validate the nodes 
		// note: we want both start and end node to exist
		
		

		JSONObject nodeJson = json.getJSONObject( "connection" );
		empty = new GuiEdgeRequestPayload().validateRequest( nodeJson );
		
		
		if( empty != null ) {
			return empty;
		}
		
		
		
		
					
		return empty;
		
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		
		super.parseRequest(json);

		
		
		JSONObject originJSON = json.getJSONObject( "connection" );
		
		GuiEdgeRequestPayload newEdge = new GuiEdgeRequestPayload();
		newEdge.parseRequest( originJSON ); 
		
		connection = newEdge;
		
					
	}

	public Response preprocessor() {
		
//		ResponseBuilder responseBuilder;
//		
//		if (PropertyJSONUtils.containsDuplicationPropertyId(edgeProperties)) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_EDGE_PROPERTY, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
		return null;
	}
	
	
}
