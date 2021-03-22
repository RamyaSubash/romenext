package com.els.romenext.api.node.req; 

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;

public class DeleteNodeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(DeleteNodeRequest.class);
	
	
	private GuiNodeRequestPayload node;
	
	
	
	public GuiNodeRequestPayload getNode() {
		return node;
	}

	public void setNode(GuiNodeRequestPayload node) {
		this.node = node;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
	
		if( !json.has("node" ) ) {
			return "node";
		}
		
		JSONObject nodeJson = json.getJSONObject( "node" );
		empty = new GuiNodeRequestPayload().validateRequest( nodeJson );
		
		if( empty != null ) {
			return empty;
		}
		
		return empty;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);

	
		JSONObject originJSON = json.getJSONObject( "node" );
		
		GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
		newNode.parseRequest( originJSON );
		
		this.node = newNode;
		
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
