package com.els.romenext.api.type.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.core.CoreRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class AddTypeDecoRequest extends CoreRequest {
	
	private Logger log = Logger.getLogger(AddTypeDecoRequest.class);
	
	private List<Long> decorators;

	public List<Long> getDecorators() {
		return decorators;
	}

	public void setDecorators(List<Long> decorators) {
		this.decorators = decorators;
	}

	public String validateRequest(JSONObject json) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		return RomeJSONUtils.findEmptyJson(json, "decorators");	
	}
	
	public void parseRequest(JSONObject json) {
		super.parseRequest(json);
					
		if (json.has("decorators")) {
			decorators = new ArrayList<Long>();
			JSONArray jsonDecoArray = json.getJSONArray("decorators");
			if (jsonDecoArray != null) {
				for (int i = 0; i < jsonDecoArray.length(); i++) {
					String decoId = jsonDecoArray.getString(i);
					if (decoId != null) {
						decorators.add(Long.valueOf(decoId));
					}
				}
			}
		}
		
	}
	
	public Response preprocessor() {
		// TODO: more verification logic could be added into this part
		// TODO: what can we verify here?
		return null;
	}	

}
