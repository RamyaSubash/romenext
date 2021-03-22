package com.els.romenext.api.workspace.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;

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
public class GetAllWorkspaceRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetAllWorkspaceRequest.class);
	

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		return null;
	
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);
		
	}
	
	public Response preprocessor() {		
		return null;
	
	}
	
}
