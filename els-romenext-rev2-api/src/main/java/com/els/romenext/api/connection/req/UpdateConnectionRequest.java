package com.els.romenext.api.connection.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class UpdateConnectionRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateConnectionRequest.class);
	
	private Long id;
	private String name;
	private Integer minRel;
	private Integer maxRel;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getMinRel() {
		return minRel;
	}

	public void setMinRel(Integer minRel) {
		this.minRel = minRel;
	}

	public Integer getMaxRel() {
		return maxRel;
	}

	public void setMaxRel(Integer maxRel) {
		this.maxRel = maxRel;
	}
	
	public String validateRequest(JSONObject json) {
		
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson(json, "id");
		
		if( empty != null ) {
			return empty;
		}
		
		return empty;
	
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);
		
		this.setId(json.getLong("id"));
		
		if (json.has("name")) {
			this.setName(json.getString("name"));
		}
		
		if (json.has("minRel")) {
			this.setMinRel(json.getInt("minRel"));
		}
		
		if (json.has("maxRel")) {
			this.setMaxRel(json.getInt("maxRel"));
		}
		
	}
	
	public Response preprocessor() {		
		return null;
	}
	
}
