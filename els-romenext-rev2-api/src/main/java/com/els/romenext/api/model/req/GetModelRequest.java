package com.els.romenext.api.model.req;

import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.CoreRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetModelRequest extends CoreRequest {

	public String typeName;
	public Long metaid;
	
	public String validateRequest(JSONObject json) {
		
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson( json, "typeName", "metaid"  );
		if (empty != null) {
			return empty;
		}
		
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		super.parseRequest(json);
		
		this.typeName = json.getString( "typeName" );
		this.metaid = json.getLong( "metaid" );
	}
}
