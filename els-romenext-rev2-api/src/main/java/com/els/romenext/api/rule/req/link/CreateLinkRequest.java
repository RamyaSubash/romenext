package com.els.romenext.api.rule.req.link;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class CreateLinkRequest extends GroupRequest {

	public String name;
	public List<Property> fields = new ArrayList<Property>();
	public Integer minRel;
	public Integer maxRel;
	
	public List<Property> decoratorProperties = new ArrayList<>();

	public String validateRequest(JSONObject json) {
		// TODO: permission need to be implemented
		
		String validateRequest = super.validateRequest(json);

		if( validateRequest != null ) {
			return validateRequest;
		}
		
		if( json.has( "fields" ) ) {
			JSONArray arr = json.getJSONArray("fields");
			
			for( int i = 0 ; i < arr.length(); i++ ) {
				JSONObject jsonObject = arr.getJSONObject( i );
				
				String v = RomeJSONUtils.findEmptyJson(jsonObject, "name", "propertyType");
				
				if( v != null ) {
					return v;
				}
			}
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
		
		return RomeJSONUtils.findEmptyJson( json, "name" );
	}
	
	public void parseRequest( JSONObject json ) {
		
		super.parseRequest(json);

		this.name = json.getString("name");

		
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
		
		if( json.has("decoratorProperties")) {
			JSONArray arr = json.getJSONArray("decoratorProperties");
			
			decoratorProperties.addAll(PropertyJSONUtils.parseProperties( arr, Neo4jPropertyTypeEnum.DECORATOR));

//			for( int i = 0 ; i < arr.length(); i++ ) {
//				JSONObject jsonObject = arr.getJSONObject( i );
//				
//				String v = RomeJSONUtils.findEmptyJson(jsonObject, "id", "name", "propertyType");
//				
//				if( v != null ) {
//					return v;
//				}
//				
//				decoratorProperties.addAll(PropertyJSONUtils.parseProperties( tmpArray, Neo4jPropertyTypeEnum.DECORATOR));
//
//			}
//			
//			
//			
//			JSONObject jsonDecoPropertyObject = json.getJSONObject( "decoratorProperties" );
//			
//			JSONArray tmpArray = new JSONArray();
//			
//			Set<String> keys = jsonDecoPropertyObject.keySet();
//			for( String key : keys ) {
//				JSONObject o = (JSONObject) jsonDecoPropertyObject.get( key );
//				
//				tmpArray.put( o );
//			}
//			
//			
//			decoratorProperties.addAll(PropertyJSONUtils.parseProperties( tmpArray, Neo4jPropertyTypeEnum.DECORATOR));
		}
		
//		if( json.has("fields") ) {
//			JSONArray arr = json.getJSONArray("fields");
//			
//			for( int i = 0 ; i < arr.length(); i++ ) {
//				JSONObject jsonObject = arr.getJSONObject( i );
//				
//				GeneralRomeRulePropertyRequest r = new GeneralRomeRulePropertyRequest();
//				r.parseRequest( jsonObject );
//				
//				fields.add( r );
//			}
//		}
//		this.originId = json.getLong("originId");
//		this.destinationId = json.getLong("destinationId");
//		
//		this.minRel = 0;
//		this.maxRel = -1;
		
	}

}
