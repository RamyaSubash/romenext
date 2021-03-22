package com.els.romenext.api.type.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetTypeByGroupRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetTypeByGroupRequest.class);
	
	public Long typeId;

	public String validateRequest(JSONObject json ) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
	
		return RomeJSONUtils.findEmptyJson( json, "typeId" );

	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);
		
		this.typeId = json.getLong( "typeId");
		
	}
	
	public Response preprocessor() {
		
		
		return null;
		
	}

}
