package com.els.romenext.api.connection.req;

import org.json.JSONObject;

import com.els.romenext.api.utils.RomeJSONUtils;

public class CreateGenericConnectionRequestOLD {

	public Long originId;
	public Long destinationId;
	public String ruleClassification;
	public Integer minRel;
	public Integer maxRel;

	public String validateRequest(JSONObject json) {
		
		// TODO: permission need to be implemented
		return RomeJSONUtils.findEmptyJson(json, "originId", "destinationId", "ruleClassification");
	}
	
	public void parseRequest(JSONObject json) {
		
		this.originId = json.getLong("originId");
		this.destinationId = json.getLong("destinationId");
		this.ruleClassification = json.getString("ruleClassification");
		
		this.minRel = 0;
		this.maxRel = -1;
		
	}

}
