package com.els.romenext.core.db.enums;

public enum RomeTypePropertyEnum {

	INTEGER( 3, "INTEGER" ),
	DOUBLE( 7, "DOUBLE" ),
	DATE( 11, "DATE" ),
	STRING( 13, "STRING" ),
	BOOLEAN(17, "BOOLEAN"),
	REFERENCE( 19, "REFERENCE" ),
	DATETREE( 23, "DATETREE" ),
	FILE( 29, "FILE" ),
	CURRENCY( 31, "CURRENCY" ),
	ARRAY( 37, "ARRAY");

	private int legacyId;
	private String valueType;

	private RomeTypePropertyEnum( int legacyId, String valueType ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public static RomeTypePropertyEnum getEnum( Integer i ) {
		switch( i ) {
		case 3: return RomeTypePropertyEnum.INTEGER;
		case 7: return RomeTypePropertyEnum.DOUBLE;
		case 11: return RomeTypePropertyEnum.DATE;
		case 13: return RomeTypePropertyEnum.STRING;
		case 17: return RomeTypePropertyEnum.BOOLEAN;
		case 19: return RomeTypePropertyEnum.REFERENCE;
		case 23: return RomeTypePropertyEnum.DATETREE;
		case 29: return RomeTypePropertyEnum.FILE;
		case 31: return RomeTypePropertyEnum.CURRENCY;
		case 37: return RomeTypePropertyEnum.ARRAY;

		}
		return null;
	}
	
	public static RomeTypePropertyEnum getEnum(String valueType) {
		
		for( RomeTypePropertyEnum t : RomeTypePropertyEnum.values() ) {
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