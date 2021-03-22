package com.els.romenext.core.db.neo4j.dao;

import java.util.List;

import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.entity.INeo4jParsable;

public class Neo4jGenericDao<T extends INeo4jParsable<T>> {
	
	private Neo4jConnection<T> conn;
	private Class<T> type;

	public Neo4jGenericDao(Class<T> type, String neo4jServerUrl, String usernamePassword) {
		this(type, new Neo4jServerConnection<T>(neo4jServerUrl, usernamePassword));
	}

	public Neo4jGenericDao(Class<T> type, Neo4jConnection<T> conn ) {
		this.type = type;
		this.conn = conn;
	}
	
	public List<T> execute( String cypher) {
		return conn.execute(cypher, type );
	}
	
	public List<T> executeList( List<String> cypherList) {
		return conn.executeList(cypherList, type );
	}
	
	public String getVersionStatus() {
		return conn.getVersion();
	}
}
