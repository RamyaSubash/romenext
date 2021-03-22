package com.els.romenext.api.utils;

import org.json.JSONObject;

public class RomeJSONUtils {
	
	public static String findEmptyJson(JSONObject json, String... toCheck) {
		
		for (String check : toCheck) {
			if(!json.has(check)) {
				return check;
			}
		}
		return null;
	}
	
//	/**
//	 * Will check to see if there is a VALUE
//	 * @param json
//	 * @param toCheck
//	 * @return
//	 */
//	public static String findEmptyJsonValues(JSONObject json, String... toCheck) {
//		
//		for (String check : toCheck) {
//			if(!json.has(check)) {
//				return check;
//			}
//		}
//		return null;
//	}
	
	/**
	 * Will attempt to find object, otherwise will return null
	 * @param json
	 * @param toFind
	 * @return
	 */
	public static String getString( JSONObject json, String toFind ) {
		if( json.has( toFind )) {
			return json.getString( toFind );
		}
		
		return null;
	}
	
	public static Boolean getBoolean( JSONObject json, String toFind ) {
		if( json.has( toFind )) {
			return json.getBoolean( toFind );
		}
		
		return null;
	}

	public static Long getLong( JSONObject json, String toFind ) {
		if( json.has( toFind )) {
			return json.getLong( toFind );
		}
		
		return null;
	}
	
	public static Integer getInteger( JSONObject json, String toFind ) {
		if( json.has( toFind )) {
			return json.getInt( toFind );
		}
		
		return null;
	}
	
	public static Double getDouble( JSONObject json, String toFind ) {
		if( json.has( toFind )) {
			return json.getDouble( toFind );
		}
		
		return null;
	}
}
