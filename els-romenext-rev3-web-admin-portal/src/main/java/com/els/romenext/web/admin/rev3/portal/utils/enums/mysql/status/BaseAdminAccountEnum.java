package com.els.romenext.web.admin.rev3.portal.utils.enums.mysql.status;

public enum BaseAdminAccountEnum {

	
	ROME_ADMIN("RomenextAdmin","romenextadmin"),
	ROME_ADMIN_CONFIG("RomenextConfig","romenextconfig");
	
	
	private String name;
	private String defaultPassword;
	
	private BaseAdminAccountEnum( String name, String defaultPassword ) {
		this.name = name;
		this.defaultPassword = defaultPassword;
	}

	public String getName() {
		return name;
	}

	public String getDefaultPassword() {
		return defaultPassword;
	}
	
	
	
}
