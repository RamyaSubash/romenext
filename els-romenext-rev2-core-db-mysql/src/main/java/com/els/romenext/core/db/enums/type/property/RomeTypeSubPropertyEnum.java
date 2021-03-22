package com.els.romenext.core.db.enums.type.property;

import com.els.romenext.core.db.enums.RomeTypePropertyEnum;

public enum RomeTypeSubPropertyEnum {

	CUR_TYPE_CAD( RomeTypePropertyEnum.CURRENCY, "CAD", 2 ),
	CUR_TYPE_USD( RomeTypePropertyEnum.CURRENCY, "USD", 3 ),

	CUR_TYPE_LOYALTY( RomeTypePropertyEnum.CURRENCY, "LOYALTY", 1002 );
	
//	INTEGER( 3, "INTEGER" ),
//	DOUBLE( 7, "DOUBLE" ),
//	DATE( 11, "DATE" ),
//	STRING( 13, "STRING" ),
//	BOOLEAN(17, "BOOLEAN"),
//	REFERENCE( 19, "REFERENCE" ),
//	DATETREE( 23, "DATETREE" ),
//	FILE( 29, "FILE" ),
//	CURRENCY( 31, "CURRENCY" );

	private RomeTypePropertyEnum parentType;
	private int legacyId;
	private String valueType;

	private RomeTypeSubPropertyEnum( RomeTypePropertyEnum parentType, String valueType, int legacyId  ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
		this.parentType = parentType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public RomeTypePropertyEnum getParentType() {
		return parentType;
	}

	public static RomeTypeSubPropertyEnum getEnum( Integer i ) {
		
		switch( i ) {
		case 2: return RomeTypeSubPropertyEnum.CUR_TYPE_CAD;
		case 3: return RomeTypeSubPropertyEnum.CUR_TYPE_USD;
		case 1002: return RomeTypeSubPropertyEnum.CUR_TYPE_LOYALTY;
		
		}
		return null;
	}
	
	public static RomeTypeSubPropertyEnum getEnum(String valueType) {
		
		for( RomeTypeSubPropertyEnum t : RomeTypeSubPropertyEnum.values() ) {
			if (valueType.equals( t.getValueType())) {
				return t;
			}
		}
//		
//		if (valueType.equals(RomeTypeSubPropertyEnum.INTEGER.getValueType())) {
//			return RomeTypeSubPropertyEnum.INTEGER;
//		}
//
//		if (valueType.equals(RomeTypeSubPropertyEnum.DOUBLE.getValueType())) {
//			return RomeTypeSubPropertyEnum.DOUBLE;
//		}
//
//		if (valueType.equals(RomeTypeSubPropertyEnum.DATE.getValueType())) {
//			return RomeTypeSubPropertyEnum.DATE;
//		}
//
//		if (valueType.equals(RomeTypeSubPropertyEnum.STRING.getValueType())) {
//			return RomeTypeSubPropertyEnum.STRING;
//		}
//
//		if (valueType.equals(RomeTypeSubPropertyEnum.BOOLEAN.getValueType())) {
//			return RomeTypeSubPropertyEnum.BOOLEAN;
//		}
//
//		if (valueType.equals(RomeTypeSubPropertyEnum.REFERENCE.getValueType())) {
//			return RomeTypeSubPropertyEnum.REFERENCE;
//		}
//		
//		if (valueType.equals(RomeTypeSubPropertyEnum.DATETREE.getValueType())) {
//			return RomeTypeSubPropertyEnum.DATETREE;
//		}

		return null;
	}
}