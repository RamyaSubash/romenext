package com.els.romenext.web.admin.rev3.portal.pojo.login; 

public class MysqlGroup {
	
	
	private String groupname;
	private String host;
	private Long  id;
	public String getGroupname() {
		return groupname;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	} 

	@Override
	public String toString() {
		return "MysqGroup [groupname=" + groupname + ", host="+ host + ", id="+id+"]";
	}
	
	
	
}
