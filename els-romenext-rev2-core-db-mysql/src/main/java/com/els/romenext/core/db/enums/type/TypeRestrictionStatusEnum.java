package com.els.romenext.core.db.enums.type;


public enum TypeRestrictionStatusEnum {

	ROOTONLY(1);
	
	private int legacyId;

	private TypeRestrictionStatusEnum( int legacyId ) {
		this.legacyId = legacyId;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public static TypeRestrictionStatusEnum getType( Integer i ) {
		switch( i ) {
		case 1: return TypeRestrictionStatusEnum.ROOTONLY;
		}
		return null;
	}
}
