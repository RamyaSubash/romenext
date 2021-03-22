package com.els.romenext.api.connection.req.link; 
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class DeleteLinkRequest extends GroupRequest {

	private Long connectionId = null; 
	
	/**
	 * If this is passed, the system will do a validation check against the repo to see if any connections are being used.
	 */
	private Long repoId = null;
	
	
	
	public Long getConnectionId() {
		return connectionId;
	} 
	
	
	public Long getRepoId() {
		return repoId;
	}

	public String validateRequest(JSONObject json) {
		
		System.out.println("Inside the delete request validate");
		
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		return RomeJSONUtils.findEmptyJson(json, "connectionId" );
	
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);
		
		this.connectionId = json.getLong( "connectionId" ); 
		
		if( json.has("repoId" ) ) {
			this.repoId = json.getLong("repoId");
		}
	}
}
