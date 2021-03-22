package com.els.romenext.web.general.enums;

public enum MysqlInternalUsers {

	ROOT( "root", false, "ALL PRIVILEGES " ),
	MYSQL_SESSION( "mysql.session", false, "TRIGGER "),
	MYSQL_SYS( "mysql.sys", false, "SELECT "),
	DEBIAN_SYS_MAINT( "debian-sys-maint", false, "SELECT, INSERT");
//	Root( "root");
	
	private String internalMysqlName;
	private boolean isUser;
	private String privilegeText;
	
	private MysqlInternalUsers( String internalMysqlName, boolean isUser, String privilegeText) {
		this.internalMysqlName = internalMysqlName;
		this.privilegeText     = privilegeText;
		this.isUser = isUser;
	}
	
	
	
	public boolean isUser() {
		return isUser;
	}

	public String getInternalMysqlName() {
		return internalMysqlName;
	}
	
	public String getPrivilegeText() {
		return privilegeText;
	}

	public static MysqlInternalUsers get( String name ) {
		for( MysqlInternalUsers e : MysqlInternalUsers.values() ) {
			if( e.getInternalMysqlName().equalsIgnoreCase( name ) ) {
				return e;
			}
		}
		return null;
	}
}
