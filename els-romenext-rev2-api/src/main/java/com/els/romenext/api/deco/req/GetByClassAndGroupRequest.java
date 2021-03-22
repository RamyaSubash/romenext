package com.els.romenext.api.deco.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetByClassAndGroupRequest extends GroupRequest {
	
	private Logger log = Logger.getLogger(GetByClassAndGroupRequest.class);
	
	private String classification;
	private String grouping; 

	public String getClassification() {
		return classification;
	}

	public String getGrouping() {
		return grouping;
	}

	public String validateRequest(JSONObject json) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty =  RomeJSONUtils.findEmptyJson(json, "classification", "grouping");
		
		if( empty != null ) {
			return empty;
		}
		
		return null;
		
		// check to seee if the VALUES are empty now
		
	}
	
	public void parseRequest(JSONObject json) {
		super.parseRequest(json);
		
		this.classification = json.getString("classification");
		this.grouping = json.getString("grouping");
					
//		if (json.has("decorators")) {
//			decorators = new ArrayList<Long>();
//			JSONArray jsonDecoArray = json.getJSONArray("decorators");
//			if (jsonDecoArray != null) {
//				for (int i = 0; i < jsonDecoArray.length(); i++) {
//					String decoId = jsonDecoArray.getString(i);
//					if (decoId != null) {
//						decorators.add(Long.valueOf(decoId));
//					}
//				}
//			}
//		}
		
	}
	
	public Response preprocessor() {
		// TODO: more verification logic could be added into this part
		// TODO: what can we verify here?
		return null;
	}	

}
