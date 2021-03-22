package com.els.romenext.core.db.neo4j.enums;

import java.io.File;
import java.util.Date;
import java.util.Map;


public enum Neo4jPropertyEnum {
	
	NUMERIC( "numeric", 1 ),
	STRING("string", 2 ),
	BOOLEAN("boolean", 3 ),
	NODE( "node", 4 ),
	RELATIONSHIP( "relationship", 5 ),
	PATH( "PATH", 6 ),
	MAP( "map", 7 ),
	LIST( "list", 8 ),		// Is this an aray?
	DECIMAL( "decimal", 9 ),
	DATE( "date", 10 ),
	FILE( "file", 11 ),
	CURRENCY( "currency", 13 );
//	CURRENCY( "currency", 13 );
;
	
	private String name;
	private int internalValue;
	
	public String getName() {
		return name;
	}
	
	public int getInternalValue() {
		return internalValue;
	}

	private Neo4jPropertyEnum(String name, int value ) {
		this.name = name;
		this.internalValue = value;
	}
	
	public static Neo4jPropertyEnum inferType( Object o ) {
		
		if( o instanceof Integer || o instanceof Long ) {
			return Neo4jPropertyEnum.NUMERIC;
		} else 	if( o instanceof String ) {
			return Neo4jPropertyEnum.STRING;
		} else 	if( o instanceof Boolean ) {
			return Neo4jPropertyEnum.BOOLEAN;
		} else 	if( o instanceof Float || o instanceof Double ) {
			return Neo4jPropertyEnum.DECIMAL;
		} else 	if( o instanceof Date ) {
			return Neo4jPropertyEnum.DATE;
		} else 	if( o instanceof Map ) {
			return Neo4jPropertyEnum.MAP;
		} else if( o instanceof File ) {
			return Neo4jPropertyEnum.FILE;
		}
		
		return null;
	}
}
