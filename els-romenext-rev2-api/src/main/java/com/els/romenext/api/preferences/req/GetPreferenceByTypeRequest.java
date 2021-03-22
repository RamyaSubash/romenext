package com.els.romenext.api.preferences.req;


import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetPreferenceByTypeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetPreferenceByTypeRequest.class);
	
	private Long typeId;
	
	public Long getTypeId() {
		return typeId;
	}

	public String validateRequest(JSONObject json) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "typeId" );

		if( empty != null ) {
			return empty;
		}
		
	
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		this.typeId = json.getLong("typeId");
		
	
		
	}
	
	public Response preprocessor() {
		
		return null;
		
	}
	

}
