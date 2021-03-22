package com.els.romenext.core.model;

public enum ConvertModelDirectionEnum {
	PARENT( 1, "PARENT" ),
	CHILD( 3, "CHILD");
	

	private int interalId;
	private String valueType;

	private ConvertModelDirectionEnum( int legacyId, String valueType ) {
		this.interalId = legacyId;
		this.valueType = valueType;
	}
	
	public int getInteralId() {
		return interalId;
	}

	public String getValueType() {
		return valueType;
	}



	public static ConvertModelDirectionEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return ConvertModelDirectionEnum.PARENT;
		case 3: return ConvertModelDirectionEnum.CHILD;
		}
		return null;
	}
	
	public static ConvertModelDirectionEnum getEnum(String valueType) {
		if (valueType.equals(ConvertModelDirectionEnum.PARENT.getValueType())) {
			return ConvertModelDirectionEnum.PARENT;
		} else if (valueType.equals(ConvertModelDirectionEnum.CHILD.getValueType())) {
			return ConvertModelDirectionEnum.CHILD;
		}

		return null;
	}
}
