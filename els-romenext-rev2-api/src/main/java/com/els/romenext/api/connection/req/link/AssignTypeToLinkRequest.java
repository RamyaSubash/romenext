package com.els.romenext.api.connection.req.link;

import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class AssignTypeToLinkRequest extends GroupRequest {
	
	public Long ruleId;
	public Long typeId;
//	public Long destinationId;

	public String validateRequest(JSONObject json) {
		String val = super.validateRequest( json );
		
		if( val != null ) {
			return val;
		}
		
		// TODO: permission need to be implemented
		return RomeJSONUtils.findEmptyJson( json, "ruleId", "typeId" );
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		this.ruleId = json.getLong( "ruleId" );
		this.typeId = json.getLong("typeId");
		
		
	}
}
