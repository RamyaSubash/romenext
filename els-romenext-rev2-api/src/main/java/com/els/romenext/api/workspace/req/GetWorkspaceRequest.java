package com.els.romenext.api.workspace.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;

/**
 * Request for the searching based on entry node
 * 
 * should be:
 * 
 * ENTRY NODE : uuid/props/labels
 * 
 * api payload example:
 * 
 * 
 * {
	"grouphost": "all",
	"groupname": "group_romenextall",
	"namespace": "user1",
	"workspaceNode": {
		"typeId":90,
		"systemProperties": {
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "3c7e2555-34fc-4ef1-9df4-c207cb25b981",
					"propertyType": "STRING"
				}
			}
	}
}
 * 
 * @author jlee
 *
 */
public class GetWorkspaceRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetWorkspaceRequest.class);
	
	private GuiNodeRequestPayload workspaceNode;
	

	public GuiNodeRequestPayload getWorkspaceNode() {
		return workspaceNode;
	}

	public void setWorkspaceNode(GuiNodeRequestPayload workspaceNode) {
		this.workspaceNode = workspaceNode;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		

		String empty = RomeJSONUtils.findEmptyJson(json, "workspaceNode"  );
		if (empty != null) {
			return empty;
		} 
				
		if( json.has("workspaceNode") ) { 
			
			JSONObject jsonObject = json.getJSONObject( "workspaceNode" );
			
			empty = new GuiNodeRequestPayload().validateRequest( jsonObject );
			
			if( empty != null ) {
				return empty;
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
		
		
		if (json.has("workspaceNode")) {
			JSONObject jsonObject = json.getJSONObject( "workspaceNode" );
			
			GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
			newNode.parseRequest( jsonObject );
			
			this.workspaceNode = newNode;
			
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
