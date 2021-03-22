package com.els.romenext.api.type.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.entities.general.EntryNodeRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class UpdateTypeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateTypeRequest.class);
	
	private EntryNodeRequest node;

	public EntryNodeRequest getNode() {
		return node;
	}

	public String validateRequest(JSONObject json ) {
		// TODO: permission need to be implemented
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson( json, "node" );
		
		if( empty != null ) {
			return empty;
		}
		
		
		
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		JSONObject nodeObj = json.getJSONObject( "node" );
		
		this.node = new EntryNodeRequest();
		
		this.node.parseRequest( nodeObj );
//		this.node = NodeUtils.parseNodeJSONObjectForDecoView(json);
		
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
//		if (nodes == null) {
//			return null;
//		}
//		
//		ResponseBuilder responseBuilder;
//		
//		if (NodeUtils.containsDuplication(nodes)) {
//			log.error("Duplicate Types");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		for (Node nodeToAdd : nodes) {
//		
//			if (nodeToAdd.getId() == null) {
//				log.error("Bad Type" + nodeToAdd.getId());
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_TYPE_COORDINATES, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
		
		return null;
		
	}

}
