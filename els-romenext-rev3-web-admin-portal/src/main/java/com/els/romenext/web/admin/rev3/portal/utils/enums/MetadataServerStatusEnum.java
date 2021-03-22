package com.els.romenext.web.admin.rev3.portal.utils.enums;

import java.util.List;

public enum MetadataServerStatusEnum {

	DB_CONNECTABLE( 1, "Connectable", Boolean.class ),
	SCHEMA_CONNECTABLE( 2, "Schema Connectable", Boolean.class ),
	ADMIN_ACCOUNTS_FOUND( 3, "Admin Validated", Boolean.class ),
	SCHEMA_VALIDATED( 4, "Schema Validated", Boolean.class ),
	CORE_GROUP_INIT( 5, "Core RomeGroup", Boolean.class );

	
	private String name;
	private Class valueType;
	private int order;
	
	private MetadataServerStatusEnum( int order, String name, Class valueType ) {
		this.order = order;
		this.name = name;
		this.valueType = valueType;
	}

	public String getName() {
		return name;
	}

	public Class getValueType() {
		return valueType;
	}

	public int getOrder() {
		return order;
	} 

	
	
}
