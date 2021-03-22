package com.els.romenext.core.enums.utils;


public enum RomeTypeOptionEnum {

	ISINTERNAL( "ISINTERNAL", 2 ),
	RESTRICTION_STATUS( "RESTRICTSTATUS", 1 );
	
	
	private String key;
	private int value;
	private Object expectedType;
	
	private RomeTypeOptionEnum( String key, int val ) {
		this.key = key;
		this.value = val;
	}

	public String getKey() {
		return key;
	}

	public int getValue() {
		return value;
	}
	
	public static RomeTypeOptionEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return RESTRICTION_STATUS;
		case 2: return ISINTERNAL;

		}
		return null;
	}
	
	public static RomeTypeOptionEnum getEnum(String valueType) {
		
		if( valueType == null ) {
			return null;
		}
		
		for( RomeTypeOptionEnum e : RomeTypeOptionEnum.values() ) {
			if (valueType.equals( e.getValue())) {
				return e;
			}
		}

		return null;
	}
	
	
}
