package com.els.romenext.core.db.enums.deco;


public enum RomeDecoratorClassification {
	TYPE( 1, "TYPE" ), INSTANCE( 2, "INSTANCE" ), ALL( 3, "ALL" );
	
	private int internalId;
	private String classification;

	private RomeDecoratorClassification( int internalId, String classification ) {
		this.internalId = internalId;
		this.classification = classification;
	}

	public int getInternalId() {
		return this.internalId;
	}

	public String getClassification() {
		return classification;
	}

	public static RomeDecoratorClassification getEnum(Integer i) {
		switch( i ) {
			case 1: return RomeDecoratorClassification.TYPE;
			case 2: return RomeDecoratorClassification.INSTANCE;
			case 3: return RomeDecoratorClassification.ALL;
		}
		
		return null;
	}
	
	public static RomeDecoratorClassification getEnum(String classification) {
		if (classification.equals(RomeDecoratorClassification.TYPE.getClassification())) {
			return RomeDecoratorClassification.TYPE;
		}
		
		if (classification.equals(RomeDecoratorClassification.INSTANCE.getClassification())) {
			return RomeDecoratorClassification.INSTANCE;
		}
		
		if (classification.equals(RomeDecoratorClassification.ALL.getClassification())) {
			return RomeDecoratorClassification.ALL;
		}
		
		return null;
	}
}
