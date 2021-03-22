package com.els.romenext.api.dct.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetAllDCTByGroupRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetAllDCTByGroupRequest.class);

	public String validateRequest(JSONObject json ) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
	
//		return RomeJSONUtils.findEmptyJson( json, "dctId" );
		return null;

	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);
		
//		this.dctId = json.getLong( "dctId");
		
	}
	
	public Response preprocessor() {
		
		
		return null;
		
	}

}
