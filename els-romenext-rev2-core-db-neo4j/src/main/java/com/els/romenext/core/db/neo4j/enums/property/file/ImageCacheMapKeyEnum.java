package com.els.romenext.core.db.neo4j.enums.property.file;

public enum ImageCacheMapKeyEnum {
	
	FILE( 2, "file", "file data" ),
	FILENAME( 3, "filename", "name of file" ),
	CHECKSUM( 5, "checksum", "current valid checksum" );

	private int legacyId;
	private String valueType;
	private String desc;

	private ImageCacheMapKeyEnum( int legacyId, String valueType, String desc ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
		this.desc = desc;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public String getDesc() {
		return desc;
	}
	
	public static ImageCacheMapKeyEnum getEnum( Integer i ) {
		switch( i ) {
		case 2: return ImageCacheMapKeyEnum.FILE;
		case 3: return ImageCacheMapKeyEnum.FILENAME;
		case 5: return ImageCacheMapKeyEnum.CHECKSUM;
		}
		
		return null;
	}
	
	public static ImageCacheMapKeyEnum getEnum(String valueType) {
		
		for( ImageCacheMapKeyEnum i : ImageCacheMapKeyEnum.values() ) {
			if( i.getValueType().equals( valueType ) ) {
				return i;
			}
		}
		
		return null;
	}
	
}
