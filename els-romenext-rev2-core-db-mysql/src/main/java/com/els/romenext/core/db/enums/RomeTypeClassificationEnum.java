package com.els.romenext.core.db.enums;

import org.apache.commons.lang3.StringUtils;



public enum RomeTypeClassificationEnum {

	NODE( 1 , "node"), 
	PATH( 2, "path" ),
	SYSTEM( 3, "system" ),
	XMETA( 5, "XMETA"),
	XREPO( 7, "XREPO"),
	XTYPE( 11, "XTYPE"),
	INTERNAL( 13, "INTERNAL" ),
	WORKSPACE( 17, "WORKSPACE"),
	DCT( 23, "DCT");
	
	private int internalId;
	private String classification;

	private RomeTypeClassificationEnum( int internalId, String classification ) {
		this.internalId = internalId;
		this.classification = classification;
	}

	public int getInternalId() {
		return this.internalId;
	}

	public String getClassification() {
		return classification;
	}

	public static RomeTypeClassificationEnum getEnum( Integer i ) {
		
		if( i == null ) {
			return null;
		}
		
//		for( RomeTypeClassificationEnum e : RomeTypeClassificationEnum.values()  ) {
//			if( i.intValue() == e.getInternalId() ) {
//				return e;
//			}
//		}
		
		switch( i ) {
			case 1: return RomeTypeClassificationEnum.NODE;
			case 2: return RomeTypeClassificationEnum.PATH;
			case 3: return RomeTypeClassificationEnum.SYSTEM;
			case 5: return RomeTypeClassificationEnum.XMETA;
			case 7: return RomeTypeClassificationEnum.XREPO;
			case 11: return RomeTypeClassificationEnum.XTYPE;
			case 13: return RomeTypeClassificationEnum.INTERNAL;
			case 17: return RomeTypeClassificationEnum.WORKSPACE;
			case 23: return RomeTypeClassificationEnum.DCT;

		}
		
		return null;
	}
	
	public static RomeTypeClassificationEnum getEnum(String classification) {
		
		if( classification == null ) {
			return null;
		}
		
		for( RomeTypeClassificationEnum s : RomeTypeClassificationEnum.values() ) {
			if (classification.equals( s.getClassification())) {
				return s;
			}
		}
		return null;
	}
	
	/**
	 * This will search the given classification for any of the classifications as an entire whole AND if it starts with
	 * 
	 * ie. XMETA23
	 * will match XMETA as a starts with
	 * 
	 * @param classification
	 * @return
	 */
	public static RomeTypeClassificationEnum getEnumStartsWith(String classification) {
		
		if( classification == null ) {
			return null;
		}
		
		for( RomeTypeClassificationEnum s : RomeTypeClassificationEnum.values() ) {
			if (classification.equalsIgnoreCase( s.getClassification()) || StringUtils.startsWithIgnoreCase( classification,  s.getClassification() )  ) {
				return s;
			}
		}
		return null;
	}
}