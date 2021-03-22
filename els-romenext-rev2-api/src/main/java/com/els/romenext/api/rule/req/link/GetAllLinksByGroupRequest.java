package com.els.romenext.api.rule.req.link;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;

public class GetAllLinksByGroupRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetAllLinksByGroupRequest.class);

//	public GuiNodeRequestPayload link;
	
	public String validateRequest(JSONObject json) {
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
		
//		if( !json.has("link")) {
//			return "link";
//		} else {
//			JSONObject jsonObject = json.getJSONObject( "link" );
//			empty = new GuiNodeRequestPayload().validateRequest( jsonObject );
//			
//			if( empty != null ) {
//				return empty;
//			}
//		}
		
		return null;
	}
	
	public void parseRequest( JSONObject json ) {
		
		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);

//		this.link = new GuiNodeRequestPayload();
//		JSONObject jsonObject = json.getJSONObject( "link" );
//		
//		GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
//		newNode.parseRequest( jsonObject );
//		
//		this.link = newNode;
		
		
	}

}
