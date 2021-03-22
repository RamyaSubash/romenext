package com.els.romenext.web.admin.rev3.portal.utils.enums.mysql;

import java.util.Date;

public enum MysqlRepositoryColumnEnum {
	
	ID( "id", Long.class ), 
	CREATED_DATE( "created_date", Date.class),
	DESCRIPTION( "description", String.class),
	IP( "ip", String.class),
	MODIFIED_DATE( "modified_date", Date.class),
	NAME( "name", String.class),
	PASSWORD( "password", String.class),
	TOKEN( "token", String.class),
	USERNAME( "username", String.class),
	METADATA_ID( "metadata_id", Long.class),
	USER_GROUP( "user_group", String.class),
	NEO4J_INSTANCE( "neo4j_instance", Long.class);
	
	private String columnName;
	private Class columnType;
	
	private MysqlRepositoryColumnEnum( String columnName, Class columnType ) {
		this.columnName = columnName;
		this.columnType = columnType;
	}

	public String getColumnName() {
		return columnName;
	}

	public Class getColumnType() {
		return columnType;
	} 

	
	
}
