package com.els.romenext.core.db.enums.rule;

public enum RuleTypeEnum {

	NODETONODE( 1, "NODETONODE" ),
	PATHTONODE( 3, "PATHTONODE" );

	private int legacyId;
	private String valueType;

	private RuleTypeEnum( int legacyId, String valueType ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public static RuleTypeEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return RuleTypeEnum.NODETONODE;
		case 3: return RuleTypeEnum.PATHTONODE;
		}
		return null;
	}
	
	public static RuleTypeEnum getEnum(String valueType) {
		
		for( RuleTypeEnum t : RuleTypeEnum.values() ) {
			if (valueType.equals( t.getValueType())) {
				return t;
			}
		}


		return null;
	}
}