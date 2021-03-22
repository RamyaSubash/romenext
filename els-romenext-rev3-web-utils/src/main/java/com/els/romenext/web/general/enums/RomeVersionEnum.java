package com.els.romenext.web.general.enums;

import org.apache.commons.lang3.StringUtils;

public enum RomeVersionEnum {

	VERSION_1( 1,0,0, "RMNXT1002018", "1.0.0.SQL.rn", "Baseline", null, null );
	
	private Integer major;
	private Integer minor;
	private Integer rev;
	private String tag;
	private String sql_script;
	private String desc;
	private RomeVersionEnum previousVersion;
	private RomeVersionEnum nextVersion;
	
	private RomeVersionEnum( Integer major, Integer minor, Integer rev, String tag, String sql_script, String desc, RomeVersionEnum previousVersion, RomeVersionEnum nextVerseion ) {
		this.major = major;
		this.minor = minor;
		this.rev = rev;
		this.tag = tag;
		
		this.sql_script = sql_script;
		this.desc = desc;
		this.previousVersion = previousVersion;
		this.nextVersion = nextVerseion;
	}
	
	
	
	
	public Integer getMajor() {
		return major;
	} 

	public Integer getMinor() {
		return minor;
	} 

	public Integer getRev() {
		return rev;
	} 

	public String getTag() {
		return tag;
	} 

	public String getSql_script() {
		return sql_script;
	} 

	public String getDesc() {
		return desc;
	} 

	public RomeVersionEnum getPreviousVersion() {
		return previousVersion;
	} 
	public RomeVersionEnum getNextVersion() {
		return nextVersion;
	} 

	public static RomeVersionEnum findViaTag( String tag ) {
		if( StringUtils.isEmpty( tag ) ) {
			return null;
		}
		
		for( RomeVersionEnum e : RomeVersionEnum.values() ) {
			if( e.getTag().equals( tag ) ) {
				return e;
			}
		}
		return null;
	}
	
	public static RomeVersionEnum findViaScriptName( String scriptName ) {
		if( StringUtils.isEmpty( scriptName ) ) {
			return null;
		}
		
		for( RomeVersionEnum e : RomeVersionEnum.values() ) {
			if( e.getSql_script().equals( scriptName ) ) {
				return e;
			}
		}
		return null;
	}
	
	public boolean canUpgradeTo( RomeVersionEnum check ) {
		if( check == null ) {
			return false;
		}
		
		if( this.getNextVersion() == null ) {
			return false;
		}
		
		if( this.getNextVersion() == check ) {
			return true;
		}
		
		return false; 
	}
}
