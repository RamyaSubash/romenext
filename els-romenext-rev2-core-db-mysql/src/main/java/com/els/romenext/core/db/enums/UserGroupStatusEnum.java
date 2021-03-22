package com.els.romenext.core.db.enums;


public enum UserGroupStatusEnum {
	ENABLED( 1, "ENABLED" ),
	DISABLED( 3, "DISABLED" );

	private int legacyId;
	private String valueType;

	private UserGroupStatusEnum( int legacyId, String valueType ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public static UserGroupStatusEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return UserGroupStatusEnum.ENABLED;
		case 3: return UserGroupStatusEnum.DISABLED;
		}
		return null;
	}
	
	public static UserGroupStatusEnum getEnum(String valueType) {
		if (valueType.equals(UserGroupStatusEnum.ENABLED.getValueType())) {
			return UserGroupStatusEnum.ENABLED;
		}

		if (valueType.equals(UserGroupStatusEnum.DISABLED.getValueType())) {
			return UserGroupStatusEnum.DISABLED;
		}

		return null;
	}
}
