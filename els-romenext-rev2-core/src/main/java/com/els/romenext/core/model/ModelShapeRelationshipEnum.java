package com.els.romenext.core.model;

public enum ModelShapeRelationshipEnum {
	
	PARENT( 1, "PARENT" ),
	CHILD( 3, "CHILD");
	

	private int interalId;
	private String valueType;

	private ModelShapeRelationshipEnum( int legacyId, String valueType ) {
		this.interalId = legacyId;
		this.valueType = valueType;
	}
	
	public int getInteralId() {
		return interalId;
	}

	public String getValueType() {
		return valueType;
	}



	public static ModelShapeRelationshipEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return ModelShapeRelationshipEnum.PARENT;
		case 3: return ModelShapeRelationshipEnum.CHILD;
		}
		return null;
	}
	
	public static ModelShapeRelationshipEnum getEnum(String valueType) {
		if (valueType.equals(ModelShapeRelationshipEnum.PARENT.getValueType())) {
			return ModelShapeRelationshipEnum.PARENT;
		} else if (valueType.equals(ModelShapeRelationshipEnum.CHILD.getValueType())) {
			return ModelShapeRelationshipEnum.CHILD;
		}

		return null;
	}
}
