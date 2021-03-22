package com.els.romenext.api.workspace.req; 

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;

public class GetWorkspaceTypeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetWorkspaceTypeRequest.class);
	

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
	
	
}
