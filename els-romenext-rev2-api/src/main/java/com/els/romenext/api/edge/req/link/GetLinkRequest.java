package com.els.romenext.api.edge.req.link;

import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;

public class GetLinkRequest extends GroupRequest  {

	public GuiNodeRequestPayload originNode;
	public GuiNodeRequestPayload destNode;
	
	
	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson(json, "originNode", "destNode" );
		
		if (empty != null) {
			return empty;
		}
		
		
		
		JSONObject originJsonNode = json.getJSONObject( "originNode" );
		empty = new GuiNodeRequestPayload().validateRequest( originJsonNode );
		
		if( empty != null ) {
			return empty;
		}
		
		JSONObject destJsonNode = json.getJSONObject( "destNode" );
		empty = new GuiNodeRequestPayload().validateRequest( destJsonNode );
		
		if( empty != null ) {
			return empty;
		}
		
		
		return empty;
		
	}
	
	public Response preprocessor() {
		return null;
	}
	
	public void parseRequest(JSONObject json) throws JSONException {
		
		super.parseRequest(json);

		
		JSONObject originJSON = json.getJSONObject( "originNode" );
		
		GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
		newNode.parseRequest( originJSON );
		
		this.originNode = newNode;
		
		
		JSONObject destJSON = json.getJSONObject( "destNode" );
		
		GuiNodeRequestPayload newDestNode = new GuiNodeRequestPayload();
		newDestNode.parseRequest( destJSON );
		
		this.destNode = newDestNode;	
		
		
				
	}
}
