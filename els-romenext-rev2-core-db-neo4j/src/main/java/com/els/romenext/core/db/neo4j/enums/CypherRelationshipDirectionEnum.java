package com.els.romenext.core.db.neo4j.enums;

public enum CypherRelationshipDirectionEnum {
	
	LTR( 2, "LTR", "-", "->" ),
	RTL( 3, "RTL", "<-", "-" ),
	BI( 5, "BI", "-", "-" );
	
	private String name;
	private String prefix;
	private String postfix;
	private int internalValue;
	
	public String getName() {
		return name;
	}
	
	public int getInternalValue() {
		return internalValue;
	}

	
	public String getPrefix() {
		return prefix;
	}

	public String getPostfix() {
		return postfix;
	}

	private CypherRelationshipDirectionEnum(int value, String name, String prefix, String postfix ) {
		this.name = name;
		this.internalValue = value;
		this.prefix = prefix;
		this.postfix = postfix;
	}

}
