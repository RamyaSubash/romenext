package com.els.romenext.core.db.neo4j.enums.property.system;

import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;

public enum RomeNodeSystemPropertyEnum {
	
	UUID( 1, "uuid", Neo4jPropertyEnum.STRING ),
	MODELID( 3, "model_id", Neo4jPropertyEnum.NUMERIC ),
	DEFAULTDECOID( 5, "default_decorator_id", Neo4jPropertyEnum.NUMERIC ),
	GROUPPARTID( 7, "group_part_id", Neo4jPropertyEnum.NUMERIC ),
	CREATEDATE( 11, "created_date", Neo4jPropertyEnum.DATE ),
	MODIFIEDDATE( 13, "modified_date", Neo4jPropertyEnum.DATE );

	private int legacyId;
	private String valueType;
	private Neo4jPropertyEnum neo4jType;

	private RomeNodeSystemPropertyEnum( int legacyId, String valueType, Neo4jPropertyEnum neo4jEnum ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
		this.neo4jType = neo4jEnum;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public Neo4jPropertyEnum getNeo4jType() {
		return neo4jType;
	}
	
	public static RomeNodeSystemPropertyEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return RomeNodeSystemPropertyEnum.UUID;
		case 3: return RomeNodeSystemPropertyEnum.MODELID;
		case 5: return RomeNodeSystemPropertyEnum.DEFAULTDECOID;
		case 7: return RomeNodeSystemPropertyEnum.GROUPPARTID;
		case 11: return RomeNodeSystemPropertyEnum.CREATEDATE;
		case 13: return RomeNodeSystemPropertyEnum.MODIFIEDDATE;

		}
		return null;
	}
	
	public static RomeNodeSystemPropertyEnum getEnum(String valueType) {
		
		for( RomeNodeSystemPropertyEnum e :  RomeNodeSystemPropertyEnum.values() ) {
			if( e.getValueType().equals( valueType ) ) {
				return e;
			}
		}

		return null;
	}
	
}
