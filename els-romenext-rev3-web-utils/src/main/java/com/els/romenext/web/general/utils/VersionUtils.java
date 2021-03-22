package com.els.romenext.web.general.utils;

import java.io.IOException;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

import javax.servlet.ServletContext;

import org.apache.commons.lang3.StringUtils;

public class VersionUtils {

	private static String version = null;
	
	public static String getOrSet( ServletContext context ) {
		
		if( StringUtils.isBlank( VersionUtils.version ) ) {
			Manifest man = new Manifest();
			
			try {
				man.read( context.getResourceAsStream("/META-INF/MANIFEST.MF"));
				
				Attributes attrs = man.getMainAttributes();
				
				String value = attrs.getValue("version");
				
				VersionUtils.version = value;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return VersionUtils.version;	
	}
	
	public static String getVersion() {
		return VersionUtils.version;
	}
}
