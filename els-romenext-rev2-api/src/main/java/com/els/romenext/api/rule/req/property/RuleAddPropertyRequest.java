package com.els.romenext.api.rule.req.property;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.entity.flatstyle.Property;

public class RuleAddPropertyRequest extends GroupRequest {

	public Long ruleid;
	public List<Property> fields = new ArrayList<Property>();

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		
		String empty = RomeJSONUtils.findEmptyJson( json, "ruleid", "fields" );
		
		if( empty != null ) {
			return empty;
		}
		
		// need to check the fields are valid
		if( json.has( "fields" ) ) {
			JSONArray arr = json.getJSONArray("fields");
			
			for( int i = 0 ; i < arr.length(); i++ ) {
				JSONObject jsonObject = arr.getJSONObject( i );
				
				String validateRequest = RomeJSONUtils.findEmptyJson(jsonObject, "name", "propertyType");
				
				if( validateRequest != null ) {
					return validateRequest;
				}
			}
		}
		
		return null;
	}
	
	public void parseRequest( JSONObject json ) {
		
		super.parseRequest(json);

		this.ruleid = json.getLong("ruleid");

		
		if( json.has("fields") ) {
			JSONArray arr = json.getJSONArray("fields");
			
			for (int i = 0; i < arr.length(); i++) {
				JSONObject jsonProp = arr.getJSONObject(i);
				
				Property propertyToAdd = PropertyJSONUtils.parseJSONObject( jsonProp );
				fields.add( propertyToAdd );
			}
			
//			for( int i = 0 ; i < arr.length(); i++ ) {
//				JSONObject jsonObject = arr.getJSONObject( i );
//				
//				GeneralRomeRulePropertyRequest r = new GeneralRomeRulePropertyRequest();
//				r.parseRequest( jsonObject );
//				
//				fields.add( r );
//			}
		}
//		this.originId = json.getLong("originId");
//		this.destinationId = json.getLong("destinationId");
//		
//		this.minRel = 0;
//		this.maxRel = -1;
		
	}
}
