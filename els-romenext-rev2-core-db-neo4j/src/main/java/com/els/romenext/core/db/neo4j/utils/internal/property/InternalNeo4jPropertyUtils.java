package com.els.romenext.core.db.neo4j.utils.internal.property;

import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;


public class InternalNeo4jPropertyUtils {

	public static Neo4jProperty buildType( String internalPropertyName, String name, Neo4jPropertyEnum type, Object value  ) {
		return new Neo4jProperty(internalPropertyName, name, type, Neo4jPropertyTypeEnum.TYPE , value);
	}
	
	public static Neo4jProperty buildSystem( String internalPropertyName, String name, Neo4jPropertyEnum type, Object value  ) {
		return new Neo4jProperty(internalPropertyName, name, type, Neo4jPropertyTypeEnum.SYSTEM , value);
	}
	
	public static Neo4jProperty buildDeco( String internalPropertyName, String name, Neo4jPropertyEnum type, Object value  ) {
		return new Neo4jProperty(internalPropertyName, name, type, Neo4jPropertyTypeEnum.DECORATOR , value);
	}
	
	public static Neo4jProperty generateProperty( RomeNodeSystemPropertyEnum enumType, Object value ) {
		
		Neo4jProperty p = InternalNeo4jPropertyUtils.buildSystem( enumType.getValueType(), enumType.getValueType(), enumType.getNeo4jType(), value );
//		p.setId( enumType.getValueType() );
		
		return p;
	}
}
