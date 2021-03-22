package com.els.romenext.web.general.enums;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

public enum BaseGroupEnum {

	ADMIN( "ADMIN", "group_romenextadmin", "ALL PRIVILEGES ", false ),
	CONFIG( "CONFIG", "group_romenextcfg", "SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER ", false ),
	READ( "READ", "group_romenextr", "SELECT ", true ),
	EDIT( "EDIT", "group_romenextrw", "SELECT, INSERT", true ),
	UPDATE( "UPDATE", "group_romenextrwu", "SELECT, INSERT, UPDATE ", true ),
	CRUD( "CRUD", "group_romenextall", "SELECT, INSERT, UPDATE, DELETE ", true );
//	Root( "root");
	
	private String friendlyName;
	private String internalMysqlName;
	private String privilegeText;
	
	private boolean assignable;
	
	private BaseGroupEnum( String friendlyName, String internalMysqlName, String privilegeText, boolean isAssignable ) {
		this.friendlyName = friendlyName;
		this.internalMysqlName = internalMysqlName;
		this.privilegeText     = privilegeText;
		this.assignable = isAssignable;
	}
	
	
	
	public String getInternalMysqlName() {
		return internalMysqlName;
	}
	
	public String getPrivilegeText() {
		return privilegeText;
	}
	
	public String getName() {
		return this.name();
	} 

	public String getFriendlyName() {
		return friendlyName;
	}



	public boolean isAssignable() {
		return assignable;
	}

	
	public static BaseGroupEnum getFriendlyName( String friendlyName ) {
		for( BaseGroupEnum e : BaseGroupEnum.values() ) {
			if( e.getFriendlyName().equalsIgnoreCase( friendlyName ) ) {
				return e;
			}
		}
		return null;
	}

	public static BaseGroupEnum get( String internalName ) {
		for( BaseGroupEnum e : BaseGroupEnum.values() ) {
			if( e.getInternalMysqlName().equalsIgnoreCase( internalName ) ) {
				return e;
			}
		}
		return null;
	}
	
	public static List<BaseGroupEnum> getAssignable() {
		
		List<BaseGroupEnum> returns = new ArrayList<BaseGroupEnum>();
		
		for( BaseGroupEnum e : BaseGroupEnum.values() ) {
			if( e.isAssignable() ) {
				returns.add( e );
			}
		}
		
		return returns;
		
	}
	
	public static BaseGroupEnum findByPrivString( String privileges ) {
		
		if( StringUtils.isEmpty( privileges ) ) {
			return null;
		}
		
		for( BaseGroupEnum e : BaseGroupEnum.values() ) {
			
			if( e.getPrivilegeText().equalsIgnoreCase( privileges ) ) {
				return e;
			}
			
		}
		
		return null;
		
	}
}
