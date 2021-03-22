package com.els.romenext.api.core;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.api.utils.RomeJSONUtils;

public class GroupRequest extends CoreRequest {
	
	public String grouphost;
	public String groupname; 

	public String validateRequest(JSONObject json) {
		
		System.out.println("Inside group request validate");
		
		String validate = super.validateRequest(json);
		
		if( validate != null ) {
			return validate;
		}
		
		validate = RomeJSONUtils.findEmptyJson(json, "grouphost", "groupname" );
		
		if( validate != null ) {
			return validate;
		}
		
		// ensure there's a value
		validate = json.getString("grouphost");
		
		if( StringUtils.isEmpty( validate ) ) {
			return "grouphost";
		}
		
		validate = json.getString("groupname");
		
		if( StringUtils.isEmpty( validate ) ) {
			return "groupname";
		}
	
		return null;
	}

	public void parseRequest(JSONObject json) {
		
		super.parseRequest( json );

		if (json.getString("grouphost").equals("all")) {
			this.setGrouphost("%");
		}else{
			this.setGrouphost(json.getString("grouphost"));
		}
		
		this.groupname = json.getString("groupname");

	};

	public String getGrouphost() {
		return grouphost;
	}

	public void setGrouphost(String grouphost) {
		this.grouphost = grouphost;
	}

	public String getGroupname() {
		return groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
}
