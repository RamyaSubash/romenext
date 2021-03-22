package com.els.romenext.core.db.neo4j.enums;

public enum Neo4jCypherClauseEnum {
	
	CREATE(" CREATE "),
	MATCH(" MATCH "),
	RETURN(" RETURN "),
	SET(" SET "),
	REMOVE(" REMOVE "),
	DELETE(" DELETE "),
	WHERE(" WHERE "),
	OPTIONAL_MATCH(" OPTIONAL MATCH "),
	MERGE( " MERGE "),
	ON_CREATE( " ON CREATE " ),
	ON_MATCH( " ON MATCH " );

	
	private String cypherClause;

	public String getCypherClause() {
		return cypherClause;
	}

	public void setCypherClause(String cypherClause) {
		this.cypherClause = cypherClause;
	}
	
	private Neo4jCypherClauseEnum(String cypherClause) {
		this.cypherClause = cypherClause;
	}

}
