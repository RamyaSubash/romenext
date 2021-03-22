package com.els.romenext.core.db.neo4j.enums.search;

public enum SearchTypeEnum {
	
	WILDCARD( 1, "WILDCARD"  ),
	STARTSWITH( 3, "STARTSWITH" ),
	ENDSWITH( 5, "ENDSWITH" ),
	GREATERTHAN( 7, "GREATERTHAN" ),
	LESSTHAN( 11, "LESSTHAN"  );

	private int legacyId;
	private String valueType;

	private SearchTypeEnum( int legacyId, String valueType ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	
	public static SearchTypeEnum getEnum( Integer i ) {
		
		switch( i ) {
		case 1: return SearchTypeEnum.WILDCARD;
		case 3: return SearchTypeEnum.STARTSWITH;
		case 5: return SearchTypeEnum.ENDSWITH;
		case 7: return SearchTypeEnum.GREATERTHAN;
		case 11: return SearchTypeEnum.LESSTHAN;
		}
		return null;
	}
	
	public static SearchTypeEnum getEnum(String valueType) {
		
		SearchTypeEnum[] values = SearchTypeEnum.values();
		
		for( SearchTypeEnum val : values ) {
			if (valueType.equals( val.getValueType())) {
				return val;
			}
		}
		return null;
	}
	
}
