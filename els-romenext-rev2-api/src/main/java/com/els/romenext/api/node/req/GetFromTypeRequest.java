package com.els.romenext.api.node.req; 

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetFromTypeRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetFromTypeRequest.class);
	
	private Long typeId; 
	
	public Long getTypeId() {
		return typeId;
	}
	
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	} 
	
	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
		empty = super.validateRequest(json);
		if( empty != null ) {
			return empty;
		}
		
		empty = RomeJSONUtils.findEmptyJson(json, "typeId"  );
		
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
