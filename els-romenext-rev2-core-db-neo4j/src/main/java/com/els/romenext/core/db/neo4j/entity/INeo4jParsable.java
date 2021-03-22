package com.els.romenext.core.db.neo4j.entity;

import java.util.List;

public interface INeo4jParsable <T> {

	public List<T> parseNeo4jAPIResults( Object results );
}
