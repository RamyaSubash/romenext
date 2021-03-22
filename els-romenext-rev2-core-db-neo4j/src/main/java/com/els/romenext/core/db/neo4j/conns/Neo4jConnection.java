package com.els.romenext.core.db.neo4j.conns;

import java.util.List;
import java.util.Map;

public interface Neo4jConnection <T> {

	public List<T> execute( String cypher, Class<T> clazz  );
	public List<T> executeList( List<String> cypherList, Class<T> clazz );
//	public List<T> executeList( String cypher, Map<String,Object> cypherList, Class<T> clazz );

	public List<T> convert( Object result, Class<T> clazz );
	
	public String getVersion();
	
}
