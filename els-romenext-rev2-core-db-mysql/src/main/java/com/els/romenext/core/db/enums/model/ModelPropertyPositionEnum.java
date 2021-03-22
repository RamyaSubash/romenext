package com.els.romenext.core.db.enums.model;

public enum ModelPropertyPositionEnum {
	
	START( 1, "START" ),
	MIDDLE( 3, "MIDDLE" ),
	END( 5, "END" );
	
	private int internalId;
	private String classification;

	private ModelPropertyPositionEnum( int internalId, String classification ) {
		this.internalId = internalId;
		this.classification = classification;
	}

	public int getInternalId() {
		return this.internalId;
	}

	public String getClassification() {
		return classification;
	}

	public static ModelPropertyPositionEnum getEnum(Integer i) {
		switch( i ) {
			case 1: return ModelPropertyPositionEnum.START;
			case 3: return ModelPropertyPositionEnum.MIDDLE;
			case 5: return ModelPropertyPositionEnum.END;
		}
		
		return null;
	}
	
	public static ModelPropertyPositionEnum getEnum(String classification) {
		
		if (classification.equals(ModelPropertyPositionEnum.START.getClassification())) {
			return ModelPropertyPositionEnum.START;
		}
		
		if (classification.equals(ModelPropertyPositionEnum.MIDDLE.getClassification())) {
			return ModelPropertyPositionEnum.MIDDLE;
		}
		
		if (classification.equals(ModelPropertyPositionEnum.END.getClassification())) {
			return ModelPropertyPositionEnum.END;
		}

		return null;
	}

}
