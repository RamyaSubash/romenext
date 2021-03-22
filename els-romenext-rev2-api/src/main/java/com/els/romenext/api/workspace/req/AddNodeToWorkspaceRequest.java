package com.els.romenext.api.workspace.req;  

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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
 * @author jlee
 *
 */
public class AddNodeToWorkspaceRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(AddNodeToWorkspaceRequest.class);
	
	private GuiNodeRequestPayload workspaceNode; 
	private List<GuiNodeRequestPayload> nodes; 
	 
	 
 

	public GuiNodeRequestPayload getWorkspaceNode() {
		return workspaceNode;
	}

	public void setWorkspaceNode(GuiNodeRequestPayload workspaceNode) {
		this.workspaceNode = workspaceNode;
	}

	public List<GuiNodeRequestPayload> getNodes() {
		return nodes;
	}

	public void setNodes(List<GuiNodeRequestPayload> nodes) {
		this.nodes = nodes;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "workspaceNode", "nodes"  );
		if (empty != null) {
			return empty;
		} 
				
		try { 
			if( json.has("nodes") ) { 
				
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
				 
			}
			 
			if( json.has("workspaceNode") ) { 
				
				JSONObject jsonObject = json.getJSONObject( "workspaceNode" );
				
				empty = new GuiNodeRequestPayload().validateRequest( jsonObject );
				
				if( empty != null ) {
					return empty;
				}
				
			}
		} catch( Exception e ) {
			log.error("SOmething threw an exception", e );
			e.printStackTrace();
			return null;
		}
		
		
		
		
		return empty;
	
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json); 
		
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
		
		if (json.has("workspaceNode")) {
			JSONObject jsonObject = json.getJSONObject( "workspaceNode" );
			
			GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
			newNode.parseRequest( jsonObject );
			
			this.workspaceNode = newNode;
			
		}

		
		
	}
	
	public Response preprocessor() {		
		 
		
		return null;
	
	}
	
}
