package com.els.romenext.api.core;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.api.utils.RomeJSONUtils;

public abstract class CoreRequest {

	
	public String namespace;
	
	public String validateRequest(JSONObject json) {
		String test = RomeJSONUtils.findEmptyJson(json, "namespace");
		
		if( test != null ) {
			return test;
		}
		
		// ensure there's a value
		String namespace = json.getString("namespace");
		
		if( StringUtils.isEmpty( namespace ) ) {
			return "namespace";
		}
		return null;
	}

	public void parseRequest(JSONObject json) {
		if( json.has( "namespace" ) ) {
			
			this.namespace = json.getString("namespace");
			
		}
	};
	
}
