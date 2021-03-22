package com.els.romenext.api.rule.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetRuleRequest extends GroupRequest {
	
private Logger log = Logger.getLogger(GetRuleRequest.class);
	 
	private Long ruleId; 
	
	
	
	public String validateRequest(JSONObject json) { 
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		return RomeJSONUtils.findEmptyJson(json, "ruleId"  );
	} 
	public Long getRuleId() {
		return ruleId;
	} 

	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);
 
		this.ruleId = json.getLong( "ruleId" );
	}
	
	public Response preprocessor() { 
		return null;
		
	}
	

}
