package com.els.romenext.web.general.session;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import com.els.romenext.web.general.pojo.session.VersionHolder;


public class ManifestUtils {

	public List<String> loadManifestFile( HttpServlet servletCtx ) {
		String relativeWARPath = "/META-INF/MANIFEST.MF";
		String absoluteDiskPath = servletCtx.getServletContext().getRealPath(relativeWARPath);
		File file = new File(absoluteDiskPath);
		
		if( !file.exists() ) {
			return null;
		}
		
		try {
			List<String> lines = FileUtils.readLines( file,  "UTF-8" );
			
			return lines;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	/**
	 * -02-19 18:24:25,063 INFO  [stdout] (default task-2) Line: Manifest-Version: 1.0
2018-02-19 18:24:25,063 INFO  [stdout] (default task-2) Line: Archiver-Version: Plexus Archiver
2018-02-19 18:24:25,063 INFO  [stdout] (default task-2) Line: Created-By: Apache Maven
2018-02-19 18:24:25,064 INFO  [stdout] (default task-2) Line: Built-By: jplee
2018-02-19 18:24:25,064 INFO  [stdout] (default task-2) Line: Build-Jdk: 1.8.0_151
2018-02-19 18:24:25,064 INFO  [stdout] (default task-2) Line: Specification-Title: els-romenext-rev2-web-admin-portalUpdate
2018-02-19 18:24:25,064 INFO  [stdout] (default task-2) Line: Specification-Version: SNAPSHOT
2018-02-19 18:24:25,064 INFO  [stdout] (default task-2) Line: Implementation-Title: els-romenext-rev2-web-admin-portalUpdate
2018-02-19 18:24:25,065 INFO  [stdout] (default task-2) Line: Implementation-Version: SNAPSHOT
2018-02-19 18:24:25,065 INFO  [stdout] (default task-2) Line: Implementation-Vendor-Id: com.els
2018-02-19 18:24:25,065 INFO  [stdout] (default task-2) Line: build-time: 2018-02-19T23:23:52Z
2018-02-19 18:24:25,065 INFO  [stdout] (default task-2) Line: version: SNAPSHOT



	 * @param lines
	 * @return
	 */
	public VersionHolder setVersionHolder( List<String> lines ) {
		
		// things we want to grab:
		// String dateString;
		// String version;
		// String buildTarget;
		
		VersionHolder v = new VersionHolder();
		
		for( String s : lines ) {
			// split the string
			
//			String[] split = StringUtils.split( s, ':' );
			// find the FIRST : 
			int indexOf = StringUtils.indexOf( s,  ':' );
			
			System.out.println("Index : " + indexOf );
			
			if( indexOf > 0 ) {

				String key = s.substring(0,  indexOf );
				String val = s.substring( indexOf, s.length() );
				
				System.out.println("Raw string :" + s ); 
				
				if( key != null && StringUtils.isNotEmpty( val ) ) {
					
					System.out.println("Check this[" + key + "]");
					
					switch( key ) {
					case "version":
							v.setVersion( val );
							break;
					case "build-target":
							v.setBuildTarget( val );
							break;
					case "build-time":
							v.setDateString( val );
							break;
					}
					
				}
			}
			
		}
		
		return v;
		
		
		
	}
	
}
