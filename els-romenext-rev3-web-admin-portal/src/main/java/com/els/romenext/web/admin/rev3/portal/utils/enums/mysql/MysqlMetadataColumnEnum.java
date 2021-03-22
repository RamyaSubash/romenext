package com.els.romenext.web.admin.rev3.portal.utils.enums.mysql;

import java.util.Date;

public enum MysqlMetadataColumnEnum {
	
	ID("id", Long.class ), 
	CREATED_DATE( "created_date", Date.class ), 
	MODIFIED_DATE( "modified_date", Date.class ), 
	NAME( "name", String.class ), 
	TOKEN( "token", String.class ), 
	UUID( "uuid", String.class), 
	USER_GROUP( "user_group", String.class );
	
	private String columnName;
	private Class baseValueType; 
	
	private MysqlMetadataColumnEnum( String name, Class baseType ) {
		this.columnName = name;
		this.baseValueType = baseType;
	}

	public String getColumnName() {
		return columnName;
	}

	public Class getBaseValueType() {
		return baseValueType;
	}

	
	
	
}
