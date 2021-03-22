package com.els.romenext.api.rule.req.link;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetAlinkRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetAlinkRequest.class);

	private Long linkId;
	
	
	
	public Long getLinkId() {
		return linkId;
	}

	public String validateRequest(JSONObject json) {
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null; 
		
		empty = RomeJSONUtils.findEmptyJson( json, "linkId" );

		if( empty != null ) {
			return empty;
		} 
		
		return null;
	}
	
	public void parseRequest( JSONObject json ) {
		
		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);

		
		this.linkId = json.getLong( "linkId" ); 
		
		
	}

}
