package com.els.romenext.core.model;


public enum ModelShapeEnum {

	LINE( 1, "LINE" ),
	CIRCLE( 3, "CIRCLE"),
	RECTANGLE( 5, "RECTANGLE"),
	TRIANGLE( 7, "TRIANGLE"),
	SMALLARC( 11, "SMALLARC"),
	BIGARC( 17, "BIGARC"),
	POLYGON( 19, "POLYGON"),
	TEXT( 23, "TEXT");
	

	private int interalId;
	private String valueType;

	private ModelShapeEnum( int legacyId, String valueType ) {
		this.interalId = legacyId;
		this.valueType = valueType;
	}
	
	public int getInteralId() {
		return interalId;
	}

	public String getValueType() {
		return valueType;
	}



	public static ModelShapeEnum getEnum( Integer i ) {
		switch( i ) {
		case 1: return ModelShapeEnum.LINE;
		case 3: return ModelShapeEnum.CIRCLE;
		case 5: return ModelShapeEnum.RECTANGLE;
		case 7: return ModelShapeEnum.TRIANGLE;
		case 11: return ModelShapeEnum.SMALLARC;
		case 17: return ModelShapeEnum.BIGARC;
		case 19: return ModelShapeEnum.POLYGON;
		case 23: return ModelShapeEnum.TEXT;
		}
		return null;
	}
	
	public static ModelShapeEnum getEnum(String valueType) {
		if (valueType.equals(ModelShapeEnum.LINE.getValueType())) {
			return ModelShapeEnum.LINE;
		} else if (valueType.equals(ModelShapeEnum.CIRCLE.getValueType())) {
			return ModelShapeEnum.CIRCLE;
		}if (valueType.equals(ModelShapeEnum.RECTANGLE.getValueType())) {
			return ModelShapeEnum.RECTANGLE;
		}if (valueType.equals(ModelShapeEnum.TRIANGLE.getValueType())) {
			return ModelShapeEnum.TRIANGLE;
		}if (valueType.equals(ModelShapeEnum.SMALLARC.getValueType())) {
			return ModelShapeEnum.SMALLARC;
		}if (valueType.equals(ModelShapeEnum.BIGARC.getValueType())) {
			return ModelShapeEnum.BIGARC;
		}if (valueType.equals(ModelShapeEnum.POLYGON.getValueType())) {
			return ModelShapeEnum.POLYGON;
		}if (valueType.equals(ModelShapeEnum.TEXT.getValueType())) {
			return ModelShapeEnum.TEXT;
		}

		return null;
	}
}
