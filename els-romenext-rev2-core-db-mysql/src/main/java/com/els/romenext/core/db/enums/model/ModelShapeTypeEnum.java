package com.els.romenext.core.db.enums.model;

public enum ModelShapeTypeEnum {

	X_LINE( 1, "X-LINE" ), 
	Y_LINE( 3, "Y_LINE" ), 
	Z_LINE( 5, "Z_LINE" );
	
	private int internalId;
	private String classification;

	private ModelShapeTypeEnum( int internalId, String classification ) {
		this.internalId = internalId;
		this.classification = classification;
	}

	public int getInternalId() {
		return this.internalId;
	}

	public String getClassification() {
		return classification;
	}

	public static ModelShapeTypeEnum getEnum(Integer i) {
		switch( i ) {
			case 1: return ModelShapeTypeEnum.X_LINE;
			case 3: return ModelShapeTypeEnum.Y_LINE;
			case 5: return ModelShapeTypeEnum.Z_LINE;
		}
		
		return null;
	}
	
	public static ModelShapeTypeEnum getEnum(String classification) {
		
		if (classification.equals(ModelShapeTypeEnum.X_LINE.getClassification())) {
			return ModelShapeTypeEnum.X_LINE;
		}
		
		if (classification.equals(ModelShapeTypeEnum.Y_LINE.getClassification())) {
			return ModelShapeTypeEnum.Y_LINE;
		}
		
		if (classification.equals(ModelShapeTypeEnum.Z_LINE.getClassification())) {
			return ModelShapeTypeEnum.Z_LINE;
		}
		return null;
	}
	
}
