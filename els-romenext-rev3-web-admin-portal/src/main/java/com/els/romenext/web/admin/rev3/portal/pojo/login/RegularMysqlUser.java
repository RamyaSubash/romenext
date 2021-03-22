package com.els.romenext.web.admin.rev3.portal.pojo.login;

import org.apache.commons.codec.digest.DigestUtils;

import com.els.romenext.web.general.enums.BaseGroupEnum;

public class RegularMysqlUser {

	private String username;
	private String host;
	private BaseGroupEnum group;
	private String groupName;
			
	private boolean isLocked = false; 
	public RegularMysqlUser() {
		
	} 
	public RegularMysqlUser( String username, String host ) {
		this.username = username;
		this.host = host;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public BaseGroupEnum getGroup() {
		return group;
	}
	public void setGroup(BaseGroupEnum group) {
		this.group = group;
	}
	
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	
	
	public boolean isLocked() {
		return isLocked;
	}

	public void setLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}
	
	public String getHash() {
		return this.getHash( "" );
	}
	
	public String getHash( String salt ) {
		return DigestUtils.md5Hex( this.getUsername() + this.getHost()  + this.getGroupName() + salt );
	}

	public boolean compareHash( String salt, String compare ) {
		if( compare == null ) {
			return false;
		}
		
		String hash = this.getHash( salt );
		
		return compare.equals( hash );
	}
	
	@Override
	public String toString() {
		return "RegularMysqlUser [username=" + username + ", host=" + host + ", group=" + group + ", groupName="
				+ groupName + ", isLocked=" + isLocked + "]";
	}
}
