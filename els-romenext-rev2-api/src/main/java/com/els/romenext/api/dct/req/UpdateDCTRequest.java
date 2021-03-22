package com.els.romenext.api.dct.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.entities.general.EntryNodeRequest;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;

public class UpdateDCTRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateDCTRequest.class);
	
	private Long dctId;
	private EntryNodeRequest updateDct;
//	private GuiNodeRequestPayload updateDct;

	
	
	public EntryNodeRequest getUpdateDct() {
		return updateDct;
	}

	public Long getDctId() {
		return dctId;
	}

	public String validateRequest(JSONObject json ) {
		// TODO: permission need to be implemented
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson( json, "dctId", "updateDct" );
		
		if( empty != null ) {
			return empty;
		}
		
//		JSONObject jsonObj = (JSONObject) json.get( "updateDct" );
//		empty = new GuiNodeRequestPayload().validateRequest( jsonObj );
//		
//		if( empty != null ) {
//			return empty;
//		}
//		
		
		
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		JSONObject jsonObj = json.getJSONObject( "updateDct" );
		
		
		this.dctId = json.getLong( "dctId" );
//		GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
//		newNode.parseRequest( jsonObj );
		
		this.updateDct = new EntryNodeRequest();
		this.updateDct.parseRequest( jsonObj );
		
		
//		this.updateDct = newNode;
		
		
//		this.updateDct = new EntryNodeRequest();
//		
//		this.updateDct.parseRequest( nodeObj );
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
