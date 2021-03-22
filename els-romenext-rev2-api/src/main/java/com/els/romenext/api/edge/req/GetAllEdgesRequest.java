package com.els.romenext.api.edge.req; 

import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetAllEdgesRequest extends GroupRequest  {
 
	public Long connectionId;

	
	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson(json, "connectionId"  );
		
		if (empty != null) {
			return empty;
		} 
		
		
		return empty;
		
	}
	
	public Response preprocessor() {
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		super.parseRequest(json);

		
		this.connectionId = json.getLong("connectionId"); 
		
		
				
	}
}
