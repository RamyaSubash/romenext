package com.els.romenext.api.dct.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;

public class GetAllDCTAndConnectionsByGroupRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetAllDCTAndConnectionsByGroupRequest.class);

	public String validateRequest(JSONObject json ) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
	
		return null;
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);
		
	}
	
	public Response preprocessor() {
		
		
		return null;
		
	}

}
