package com.els.romenext.api.node.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@Deprecated
public class GetNodesAndEdgesSimplifiedRequest {
	
	private static Logger log = Logger.getLogger(GetNodesAndEdgesSimplifiedRequest.class);
	
	private List<Long>typeIds;
	private List<Long> connIds;
	
	public List<Long> getTypeIds() {
		return typeIds;
	}

	public void setTypeIds(List<Long> typeIds) {
		this.typeIds = typeIds;
	}

	public List<Long> getConnIds() {
		return connIds;
	}

	public void setConnIds(List<Long> connIds) {
		this.connIds = connIds;
	}

	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
//		if (!json.has("typeIds")) {
//			return "type";
//		}
//		
//		if (!json.has("connIds")) {
//			return "type";
//		}		
		
		return empty;
	
	}
	
	public Response preprocessor() {		
		ResponseBuilder responseBuilder;
		// TODO: Check if there exist duplicate ids
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		typeIds = new ArrayList<Long>();
		if (json.has("typeIds")) {
			JSONArray jsonArray = json.getJSONArray("typeIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					typeIds.add(jsonArray.getLong(i));
				}
			}
		}
		
		connIds = new ArrayList<Long>();
		if (json.has("connIds")) {
			JSONArray jsonArray = json.getJSONArray("connIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					connIds.add(jsonArray.getLong(i));
				}
			}
		}
		
	}

}
