package com.els.romenext.api.connection.req;

import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class CreateGenericConnectionRequest extends GroupRequest {

	public Long originId;
	public Long destinationId;
	public String ruleClassification;
	public Integer minRel;
	public Integer maxRel;

	public String validateRequest(JSONObject json) {
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		// TODO: permission need to be implemented
		return RomeJSONUtils.findEmptyJson(json, "originId", "destinationId", "ruleClassification");
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		
		this.originId = json.getLong("originId");
		this.destinationId = json.getLong("destinationId");
		this.ruleClassification = json.getString("ruleClassification");
		
		if( json.has("minRel") ) {
			this.minRel = json.getInt( "minRel" );			
		} else {
			this.minRel = 0;
		}
		
		if( json.has( "maxRel" ) ) {
			this.maxRel = json.getInt( "maxRel" );
		} else {
			this.maxRel = -1;			
		}
		
	}

}
