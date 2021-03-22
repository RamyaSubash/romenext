package com.els.romenext.core.db.enums.pref;

public enum RomePreferencePropertyEnum {
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
	private String valueType;

	private RomePreferencePropertyEnum( int legacyId, String valueType ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public static RomePreferencePropertyEnum getEnum( Integer i ) {
		switch( i ) {
		case 3: return RomePreferencePropertyEnum.INTEGER;
		case 7: return RomePreferencePropertyEnum.DOUBLE;
		case 11: return RomePreferencePropertyEnum.DATE;
		case 13: return RomePreferencePropertyEnum.STRING;
		case 17: return RomePreferencePropertyEnum.BOOLEAN;
		case 19: return RomePreferencePropertyEnum.REFERENCE;
		case 23: return RomePreferencePropertyEnum.DATETREE;
		case 29: return RomePreferencePropertyEnum.FILE;
		case 31: return RomePreferencePropertyEnum.CURRENCY;
		}
		return null;
	}
	
	public static RomePreferencePropertyEnum getEnum(String valueType) {
		
		for( RomePreferencePropertyEnum t : RomePreferencePropertyEnum.values() ) {
			if (valueType.equals( t.getValueType())) {
				return t;
			}
		}
//		
//		if (valueType.equals(RomeTypePropertyEnum.INTEGER.getValueType())) {
//			return RomeTypePropertyEnum.INTEGER;
//		}
//
//		if (valueType.equals(RomeTypePropertyEnum.DOUBLE.getValueType())) {
//			return RomeTypePropertyEnum.DOUBLE;
//		}
//
//		if (valueType.equals(RomeTypePropertyEnum.DATE.getValueType())) {
//			return RomeTypePropertyEnum.DATE;
//		}
//
//		if (valueType.equals(RomeTypePropertyEnum.STRING.getValueType())) {
//			return RomeTypePropertyEnum.STRING;
//		}
//
//		if (valueType.equals(RomeTypePropertyEnum.BOOLEAN.getValueType())) {
//			return RomeTypePropertyEnum.BOOLEAN;
//		}
//
//		if (valueType.equals(RomeTypePropertyEnum.REFERENCE.getValueType())) {
//			return RomeTypePropertyEnum.REFERENCE;
//		}
//		
//		if (valueType.equals(RomeTypePropertyEnum.DATETREE.getValueType())) {
//			return RomeTypePropertyEnum.DATETREE;
//		}

		return null;
	}
}
