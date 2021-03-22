package com.els.romenext.core.entity.neo4j;

public class TNeo4jServerInstance {
	
	public Long id;
	public String description;
	public String url;
	public String up;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUp() {
		return up;
	}
	public void setUp(String up) {
		this.up = up;
	}

}
