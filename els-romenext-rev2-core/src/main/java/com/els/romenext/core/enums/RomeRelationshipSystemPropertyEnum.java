package com.els.romenext.core.enums;

import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public enum RomeRelationshipSystemPropertyEnum {
	
	UUID( 1, "uuid", Neo4jPropertyEnum.STRING ),
	EDGE_CLASSIFICATION( 3 , "edge_classification", Neo4jPropertyEnum.NUMERIC );

	private int legacyId;
	private String valueType;
	private Neo4jPropertyEnum neo4jType;

	private RomeRelationshipSystemPropertyEnum( int legacyId, String valueType, Neo4jPropertyEnum neo4jEnum ) {
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
	
	public static RomeRelationshipSystemPropertyEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return RomeRelationshipSystemPropertyEnum.UUID;
		case 3: return RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION;
		}
		return null;
	}
	
	public static RomeRelationshipSystemPropertyEnum getEnum(String valueType) {
		if (valueType.equals(RomeRelationshipSystemPropertyEnum.UUID.getValueType())) {
			return RomeRelationshipSystemPropertyEnum.UUID;
		}

		if (valueType.equals(RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION.getValueType())) {
			return RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION;
		}
		

		return null;
	}
	
	public Property generateProperty( Object value ) {
		
		Property p = Property.build( this.getValueType() , ValueTypeEnum.convert( this.getNeo4jType() ).getValueType(), null, null, value, null, null, null, null);
		p.setId( this.getValueType() );
		
		return p;
	}
}
