package com.els.romenext.api.entities;

public class UserGroup {
	
	private long id;
	private String name;
	private String host;
	
	private boolean CREATE;
	private boolean READ;
	private boolean UPDATE;
	private boolean DELETE;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public boolean isCREATE() {
		return CREATE;
	}
	public void setCREATE(boolean cREATE) {
		CREATE = cREATE;
	}
	public boolean isREAD() {
		return READ;
	}
	public void setREAD(boolean rEAD) {
		READ = rEAD;
	}
	public boolean isUPDATE() {
		return UPDATE;
	}
	public void setUPDATE(boolean uPDATE) {
		UPDATE = uPDATE;
	}
	public boolean isDELETE() {
		return DELETE;
	}
	public void setDELETE(boolean dELETE) {
		DELETE = dELETE;
	}
	
}
