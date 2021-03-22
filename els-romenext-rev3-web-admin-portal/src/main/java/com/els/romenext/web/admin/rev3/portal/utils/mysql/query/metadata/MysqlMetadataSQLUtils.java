package com.els.romenext.web.admin.rev3.portal.utils.mysql.query.metadata;

import java.util.HashSet;
import java.util.Set;

public class MysqlMetadataSQLUtils {

	
	private static final String CORE_METADATA_TABLE_NAME = "els_romenext_metadata";
	
	
	
	public static String getMetdataInfo( final String schema ) {
		// SELECT * FROM romenext.els_romenext_metadata;

		return "SELECT * FROM " + schema + "." + CORE_METADATA_TABLE_NAME + ";";
	}
	
}
