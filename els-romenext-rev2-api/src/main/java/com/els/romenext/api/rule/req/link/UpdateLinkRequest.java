package com.els.romenext.api.rule.req.link;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class UpdateLinkRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateLinkRequest.class);

	public Long linkId = null;
	public List<Property> decoratorProperties = new ArrayList<>();
	
//	public GuiNodeRequestPayload link;
	
	public String validateRequest(JSONObject json) {
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
		
		empty = RomeJSONUtils.findEmptyJson( json, "linkId" );

		if( empty != null ) {
			return empty;
		}
		
		if( json.has("decoratorProperties")) {
			JSONArray arr = json.getJSONArray("decoratorProperties");
			
			for( int i = 0 ; i < arr.length(); i++ ) {
				JSONObject jsonObject = arr.getJSONObject( i );
				
				String v = RomeJSONUtils.findEmptyJson(jsonObject, "id", "name", "propertyType");
				
				if( v != null ) {
					return v;
				}
			}
		}
		
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
		
		this.linkId = json.getLong("linkId");
		
		if( json.has("decoratorProperties")) {
			JSONArray arr = json.getJSONArray("decoratorProperties");
			
			decoratorProperties.addAll(PropertyJSONUtils.parseProperties( arr, Neo4jPropertyTypeEnum.DECORATOR));
		}

//		this.link = new GuiNodeRequestPayload();
//		JSONObject jsonObject = json.getJSONObject( "link" );
//		
//		GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
//		newNode.parseRequest( jsonObject );
//		
//		this.link = newNode;
		
		
	}

}
