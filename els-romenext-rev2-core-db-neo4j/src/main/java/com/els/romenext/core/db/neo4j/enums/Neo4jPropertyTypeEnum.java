package com.els.romenext.core.db.neo4j.enums;

public enum Neo4jPropertyTypeEnum {
	
	SYSTEM( "sys_", 1 ),
	TYPE( "tp", 3 ),
	DECORATOR( "d", 5 ),
	RULE( "rp", 7),
	PREFERENCE( "pref", 11 );		// preferences are arrays for now
	
	private String name;
	private int internalValue;
	
	public String getName() {
		return name;
	}
	
	public int getInternalValue() {
		return internalValue;
	}

	private Neo4jPropertyTypeEnum(String name, int value ) {
		this.name = name;
		this.internalValue = value;
	}
	
//	public static boolean isType( String comparison ) {
//		if( comparison == null ) {
//			return false;
//		}
//		return comparison.startsWith( TYPE.getName() );
//	}
	
	public boolean isOf( String comparison ) {
		if( comparison == null ) {
			return false;
		}
		return comparison.trim().startsWith( this.getName() );
	}
	
	/**
	 * Converts a given name to the internal ID name
	 * ie.
	 * TYPE: name: 32, --> tp32
	 * 
	 * note:
	 * for 
	 * TYPE: name = Long id
	 * DECO: name = Long id
	 * RULE: name = Long id
	 * 
	 * SYSTEM: name = String nameofType
	 * @param name
	 * @return
	 */
	public String convertNakedName( String name ) {
		
		if( name == null ) {
			return null;
		}
		return this.getName() + name.trim();
	}
	
	public String convertNonSystemName( Long id ) {
		
		if( id == null ) {
			return null;
		}
		
		return this.convertNakedName( id.toString() );
	}
}
