package com.els.romenext.core.db.neo4j.enums;

public enum Neo4jRESTAPIEndpointEnum {
	
	AUTHENTICATION_ENDPOINT("/user/neo4j"),
	TRANSACTIONAL_ENDPOINT("/db/data/transaction/commit"),
	NODE_ENDPOINT("/db/data/node"),
	BATCH_ENDPOINT("/db/data/batch"),
	DB_DATA("/db/data"),
	VERSION("/db/manage/server/version");
	
	private String endpoint;

	public String getEndpoint() {
		return endpoint;
	}

	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}
	
	private Neo4jRESTAPIEndpointEnum(String endpoint) {
		this.endpoint = endpoint;
	}
	
}
