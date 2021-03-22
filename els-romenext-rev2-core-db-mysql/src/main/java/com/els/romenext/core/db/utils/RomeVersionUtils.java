package com.els.romenext.core.db.utils;

import com.els.romenext.core.db.entity.version.RomeVersion;

public class RomeVersionUtils {

	
	public static String makeVersion( RomeVersion version ) {
		
		if( version == null ) {
			return "NULL";
		}
		
		return ( version.getMajor() == null ? "0" : version.getMajor().toString() ) 
				+ "." 
				+ ( version.getMinor() == null ? "0" : version.getMinor().toString() )  
				+ "." 
				+ ( version.getRev() == null ? "0" : version.getRev().toString() );
		
	}
}
