package com.els.romenext.api.workspace.req;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.node.req.search.EntryNodeRequest;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;

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
public class CreateWorkspaceRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(CreateWorkspaceRequest.class);
	
	private String name;
	
	private List<GuiNodeRequestPayload> nodes;
	
	
	private List<EntryNodeRequest> edges;
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<GuiNodeRequestPayload> getNodes() {
		return nodes;
	}

	public void setNodes(List<GuiNodeRequestPayload> nodes) {
		this.nodes = nodes;
	}

	public List<EntryNodeRequest> getEdges() {
		return edges;
	}

	public void setEdges(List<EntryNodeRequest> edges) {
		this.edges = edges;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "name","nodes", "edges" );
		if (empty != null) {
			return empty;
		} 
				
		if( json.has("nodes") ) {
//			JSONObject en = json.getJSONObject( "nodes" );
//			empty = new EntryNodeRequest().validateRequest( en );
			
			JSONObject jsonObject = json.getJSONObject( "nodes" );
			
			Iterator<String> keys = jsonObject.keys();
			
			while( keys.hasNext() ) {
				String next = keys.next();
				
				// should be a json object
				
				
				JSONObject jsonObj = (JSONObject) jsonObject.get( next );
				empty = new GuiNodeRequestPayload().validateRequest( jsonObj );
				
				if( empty != null ) {
					return empty;
				}
				
			}
			
//			JSONArray en = json.getJSONArray( "nodes" );
//			for( int i = 0; i < en.length(); i++ ) {
//				JSONObject jsonObj = (JSONObject) en.get( i );
//				empty = new EntryNodeRequest().validateRequest( jsonObj );
//				
//				if( empty != null ) {
//					return empty;
//				}
//			}
		}
		
		if( json.has("edges") ) {
//			JSONObject en = json.getJSONObject( "edges" );
//			empty = new EntryNodeRequest().validateRequest( en );
		}
		
		return empty;
	
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);
		
		this.name = json.getString("name");
		
		this.nodes = new ArrayList<>();
		
		if (json.has("nodes")) {
			JSONObject jsonObject = json.getJSONObject( "nodes" );
			
			Iterator<String> keys = jsonObject.keys();
			
			while( keys.hasNext() ) {
				String next = keys.next();
				
				// should be a json object
				
				
				JSONObject jsonObj = (JSONObject) jsonObject.get( next );
				
				GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
				newNode.parseRequest( jsonObj );
				
				this.nodes.add( newNode );
				
			}
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
