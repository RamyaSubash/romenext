package com.els.romenext.core.db.enums.model;


public enum ModelPropertyModifierEnum {

	RELATIVE_X( 1, "RELATIVE_X" ), 
	RELATIVE_Y( 3, "RELATIVE_Y" ), 
	ABSOLUTE_X( 5, "ABSOLUTE_X" ), 
	ABSOLUTE_Y( 7, "ABSOLUTE_Y" ),
	RELATIVE_Z( 11, "RELATIVE_Z" ), 
	ABSOLUTE_Z( 17, "ABSOLUTE_Z" );
	
	private int internalId;
	private String classification;

	private ModelPropertyModifierEnum( int internalId, String classification ) {
		this.internalId = internalId;
		this.classification = classification;
	}

	public int getInternalId() {
		return this.internalId;
	}

	public String getClassification() {
		return classification;
	}

	public static ModelPropertyModifierEnum getEnum(Integer i) {
		switch( i ) {
			case 1: return ModelPropertyModifierEnum.RELATIVE_X;
			case 3: return ModelPropertyModifierEnum.RELATIVE_Y;
			case 5: return ModelPropertyModifierEnum.ABSOLUTE_X;
			case 7: return ModelPropertyModifierEnum.ABSOLUTE_Y;
			case 11: return ModelPropertyModifierEnum.RELATIVE_Z;
			case 17: return ModelPropertyModifierEnum.ABSOLUTE_Z;
		}
		
		return null;
	}
	
	public static ModelPropertyModifierEnum getEnum(String classification) {
		
		if (classification.equals(ModelPropertyModifierEnum.RELATIVE_X.getClassification())) {
			return ModelPropertyModifierEnum.RELATIVE_X;
		}
		
		if (classification.equals(ModelPropertyModifierEnum.RELATIVE_Y.getClassification())) {
			return ModelPropertyModifierEnum.RELATIVE_Y;
		}
		
		if (classification.equals(ModelPropertyModifierEnum.ABSOLUTE_X.getClassification())) {
			return ModelPropertyModifierEnum.ABSOLUTE_X;
		}
		
		if (classification.equals(ModelPropertyModifierEnum.ABSOLUTE_Y.getClassification())) {
			return ModelPropertyModifierEnum.ABSOLUTE_Y;
		}
		
		if (classification.equals(ModelPropertyModifierEnum.RELATIVE_Z.getClassification())) {
			return ModelPropertyModifierEnum.RELATIVE_Z;
		}
		
		if (classification.equals(ModelPropertyModifierEnum.ABSOLUTE_Z.getClassification())) {
			return ModelPropertyModifierEnum.ABSOLUTE_Z;
		}
		
		return null;
	}
}