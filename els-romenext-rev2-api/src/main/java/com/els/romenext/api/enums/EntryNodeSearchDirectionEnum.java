package com.els.romenext.api.enums;

public enum EntryNodeSearchDirectionEnum {

	PARENTS( 3, "PARENTS" ),
	CHILDREN( 5, "CHILDREN" ),
	ALL( 7, "ALL" );
	
	private int legacyId;
	private String searchDirection;

	private EntryNodeSearchDirectionEnum( int legacyId, String searchDirection ) {
		this.legacyId = legacyId;
		this.searchDirection = searchDirection;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getSearchDirection() {
		return this.searchDirection;
	}
	
	public static EntryNodeSearchDirectionEnum getEnum( Integer i ) {
		switch( i ) {
		case 3: return EntryNodeSearchDirectionEnum.PARENTS;
		case 5: return EntryNodeSearchDirectionEnum.CHILDREN;
		case 7: return EntryNodeSearchDirectionEnum.ALL;
		}
		return null;
	}
	
	public static EntryNodeSearchDirectionEnum getEnum(String searchDirection) {
		for( EntryNodeSearchDirectionEnum d : EntryNodeSearchDirectionEnum.values() ) {
			if( searchDirection.equals( d.getSearchDirection() ) ) {
				return d;
			}
		}
		return null;
	}
	
}
