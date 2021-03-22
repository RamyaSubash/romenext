package com.els.romenext.api.workspace.req.pojo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.core.entity.flatstyle.Property;

public class WorkspaceGuiNodeRequestPayload extends GuiNodeRequestPayload {
	
	private List<Property> referenceProperties = new ArrayList<>();

	public List<Property> getReferenceProperties() {
		return referenceProperties;
	}

	public void setReferenceProperties(List<Property> referenceProperties) {
		this.referenceProperties = referenceProperties;
	}
	
	@Override
	public String validateRequest(JSONObject json) {
		// TODO Auto-generated method stub
		String check = super.validateRequest(json);
		
		if( check != null ) {
			return check;
		}
		
		if (json.has("referenceProperties")) {
			
			JSONArray jsonArr = json.getJSONArray( "referenceProperties" );
			
			
			check = this.validateListOfProperties( jsonArr, "name", "value", "propertyType" );
			
			if( check != null ) {
				return check;
			} 
			
//			for( int i = 0; i <= jsonArr.length(); i++ ) {
//				
//				JSONObject jsonObj = jsonArr.getJSONObject( i );
//				
//				check = this.validateMapOfProperties( jsonObj, "name", "value", "propertyType" );
//
////				check = this.validateListOfProperties( jsonObj, "name", "value", "propertyType" );
//				if( check != null ) {
//					return check;
//				} 
//				 
//				
//			}
			
			
			
//			JSONObject jsonObject = json.getJSONObject( "referenceProperties" );
//
////			check = this.validateMapOfProperties( jsonObject, "id", "value", "propertyType" );
//			// note that for the workspace, these properties it is trying to save MIGHT not be created yet, so for reference properties, the ID is optional, but the NAME must be vound.
//			check = this.validateMapOfProperties( jsonObject, "name", "value", "propertyType" );
//			
//			if( check != null ) {
//				return check;
//			} 
		}
		
		
		return check;
	}
	
	@Override 
	public void parseRequest(JSONObject json) throws JSONException { 
		super.parseRequest(json);
		
		
		if (json.has("referenceProperties")) { 

			// we need to iterate over every entry to see if they are valid
			
			JSONArray jsonArr = json.getJSONArray( "referenceProperties" );
			
			
			for( int i = 0; i < jsonArr.length(); i++ ) {
				
				JSONObject jsonObj = jsonArr.getJSONObject( i );
				
				Property property = PropertyJSONUtils.parseTypePropertyJSONObject( jsonObj ); 
				if (property != null) {
					referenceProperties.add(property);
				}
				
			}
			
			
//			JSONObject jsonObject = json.getJSONObject("referenceProperties");
//			Iterator<String> keys = jsonObject.keys();
//
//			while( keys.hasNext() ) {
//				String key = keys.next();
//
//				JSONObject jsonProperty = jsonObject.getJSONObject( key );
//				Property property = PropertyJSONUtils.parseTypePropertyJSONObject( jsonProperty ); 
//				if (property != null) {
//					referenceProperties.add(property);
//				}
//			}
		} 
		
	}

}
