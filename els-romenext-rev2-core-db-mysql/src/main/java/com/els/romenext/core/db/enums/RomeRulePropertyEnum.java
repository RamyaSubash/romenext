package com.els.romenext.core.db.enums;


public enum RomeRulePropertyEnum {

//	INTEGER( 4 ), 
//	DOUBLE( 7 ), 
//	DATE( 8 ), 
//	CHARACTER( 10 ), 
//	REFERENCE( 16 );
	
	INTEGER( 3, "INTEGER" ),
	DOUBLE( 7, "DOUBLE" ),
	DATE( 11, "DATE" ),
	STRING( 13, "STRING" ),
	BOOLEAN(17, "BOOLEAN"),
	REFERENCE( 19, "REFERENCE" ),
	DATETREE( 23, "DATETREE" ),
	FILE( 29, "FILE" ),
	CURRENCY( 31, "CURRENCY" );

	private int legacyId;
	private String value;

	private RomeRulePropertyEnum( int legacyId, String value ) {
		this.legacyId = legacyId;
		this.value = value;
	}

	public int getLegacyId() {
		return this.legacyId;
	}
	
	

//	public static RomeRulePropertyEnum getType( Integer i ) {
//		switch( i ) {
//		case 4: return RomeRulePropertyEnum.INTEGER;
//		case 7: return RomeRulePropertyEnum.DOUBLE;
//		case 8: return RomeRulePropertyEnum.DATE;
//		case 10: return RomeRulePropertyEnum.CHARACTER;
//		case 16: return RomeRulePropertyEnum.REFERENCE;
//		}
//		return null;
//	}
	
	public String getValue() {
		return value;
	}

	public static RomeRulePropertyEnum getType( Integer i ) {
		switch( i ) {
		case 3: return RomeRulePropertyEnum.INTEGER;
		case 7: return RomeRulePropertyEnum.DOUBLE;
		case 11: return RomeRulePropertyEnum.DATE;
		case 13: return RomeRulePropertyEnum.STRING;
		case 17: return RomeRulePropertyEnum.BOOLEAN;
		case 19: return RomeRulePropertyEnum.REFERENCE;
		case 23: return RomeRulePropertyEnum.DATETREE;
		case 29: return RomeRulePropertyEnum.FILE;
		case 31: return RomeRulePropertyEnum.CURRENCY;
		}
		return null;
	}
	
	public static RomeRulePropertyEnum getEnum(String valueType) {
		
		for( RomeRulePropertyEnum v : RomeRulePropertyEnum.values() ) {
			if( valueType.equals( v.getValue() ) ) {
				return v;
			}
		}

		return null;
	}
}
