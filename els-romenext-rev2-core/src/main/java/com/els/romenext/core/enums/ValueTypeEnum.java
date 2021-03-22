package com.els.romenext.core.enums;

import com.els.romenext.core.db.enums.RomeRulePropertyEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.db.enums.pref.RomePreferencePropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;

public enum ValueTypeEnum {

	INTEGER( 3, "INTEGER" ),
	DOUBLE( 7, "DOUBLE" ),
	DATE( 11, "DATE" ),
	STRING( 13, "STRING" ),
	BOOLEAN(17, "BOOLEAN"),
	REFERENCE( 19, "REFERENCE" ),
	FILE( 23, "FILE" ),
	CURRENCY( 29, "CURRENCY" ),
	STATUS( 31, "STATUS" ),
	PARENTVALUE( 37, "PARENTVALUE"),
	CONCAT( 41, "CONCAT" ),
	ARRAY( 43, "ARRAY");
	
	

	private int legacyId;
	private String valueType;

	private ValueTypeEnum( int legacyId, String valueType ) {
		this.legacyId = legacyId;
		this.valueType = valueType;
	}

	public int getLegacyId() {
		return this.legacyId;
	}

	public String getValueType() {
		return this.valueType;
	}
	
	public static ValueTypeEnum getEnum( Integer i ) {
		switch( i ) {
		case 3: return ValueTypeEnum.INTEGER;
		case 7: return ValueTypeEnum.DOUBLE;
		case 11: return ValueTypeEnum.DATE;
		case 13: return ValueTypeEnum.STRING;
		case 17: return ValueTypeEnum.BOOLEAN;
		case 19: return ValueTypeEnum.REFERENCE;
		case 23: return ValueTypeEnum.FILE;
		case 29: return ValueTypeEnum.CURRENCY;
		case 31: return ValueTypeEnum.STATUS;
		case 37: return ValueTypeEnum.PARENTVALUE;
		case 41: return ValueTypeEnum.CONCAT;
		case 43: return ValueTypeEnum.ARRAY;

		}
		return null;
	}
	
	public static ValueTypeEnum getEnum(String valueType) {
		
		
		for( ValueTypeEnum v : ValueTypeEnum.values() ) {
			if( v.valueType.equalsIgnoreCase( valueType ) ) {
//			if( valueType.equals( v.getValueType() ) ) {
				return v;
			}
		}
//		
//		
//		if (valueType.equals(ValueTypeEnum.INTEGER.getValueType())) {
//			return ValueTypeEnum.INTEGER;
//		}
//
//		if (valueType.equals(ValueTypeEnum.DOUBLE.getValueType())) {
//			return ValueTypeEnum.DOUBLE;
//		}
//
//		if (valueType.equals(ValueTypeEnum.DATE.getValueType())) {
//			return ValueTypeEnum.DATE;
//		}
//
//		if (valueType.equals(ValueTypeEnum.STRING.getValueType())) {
//			return ValueTypeEnum.STRING;
//		}
//
//		if (valueType.equals(ValueTypeEnum.BOOLEAN.getValueType())) {
//			return ValueTypeEnum.BOOLEAN;
//		}
//
//		if (valueType.equals(ValueTypeEnum.REFERENCE.getValueType())) {
//			return ValueTypeEnum.REFERENCE;
//		}
//
		return null;
	}
	
	public static ValueTypeEnum convert( Neo4jPropertyEnum neo4jEnum ) {
		
		if( neo4jEnum == Neo4jPropertyEnum.NUMERIC ) {
			return ValueTypeEnum.INTEGER;
		} 
		
		if( neo4jEnum == Neo4jPropertyEnum.DECIMAL ) {
			return ValueTypeEnum.DOUBLE;
		}
		if( neo4jEnum == Neo4jPropertyEnum.DATE ) {
			return ValueTypeEnum.DATE;
		}
		if( neo4jEnum == Neo4jPropertyEnum.STRING ) {
			return ValueTypeEnum.STRING;
		}
		if( neo4jEnum == Neo4jPropertyEnum.FILE ) {
			return ValueTypeEnum.FILE;
		}
		if( neo4jEnum == Neo4jPropertyEnum.BOOLEAN ) {
			return ValueTypeEnum.BOOLEAN;
		}	
		if( neo4jEnum == Neo4jPropertyEnum.LIST ) {
			return ValueTypeEnum.ARRAY;
		}	
		
		/**
		 * NOTE: STATUS, CONCACT, PARENTVALUE are not here!!
		 */
		
		if( neo4jEnum == Neo4jPropertyEnum.CURRENCY ) {
			return ValueTypeEnum.CURRENCY;
		}	
		
		
		return null;
	}
	
	
	public static ValueTypeEnum convert( RomeTypePropertyEnum typePropEnum ) {
		
		if( typePropEnum == RomeTypePropertyEnum.INTEGER ) {
			return ValueTypeEnum.INTEGER;
		} 
		
		if( typePropEnum == RomeTypePropertyEnum.STRING ) {
			return ValueTypeEnum.STRING;
		} 
		if( typePropEnum == RomeTypePropertyEnum.DOUBLE ) {
			return ValueTypeEnum.DOUBLE;
		} 
		if( typePropEnum == RomeTypePropertyEnum.DATE ) {
			return ValueTypeEnum.DATE;
		} 
		if( typePropEnum == RomeTypePropertyEnum.REFERENCE ) {
			return ValueTypeEnum.REFERENCE;
		} 
		if( typePropEnum == RomeTypePropertyEnum.FILE ) {
			return ValueTypeEnum.FILE;
		} 
		if( typePropEnum == RomeTypePropertyEnum.BOOLEAN ) {
			return ValueTypeEnum.BOOLEAN;
		}
		if( typePropEnum == RomeTypePropertyEnum.CURRENCY ) {
			return ValueTypeEnum.CURRENCY;
		}
		
		if( typePropEnum == RomeTypePropertyEnum.ARRAY ) {
			return ValueTypeEnum.ARRAY;
		}	
		
		return null;
	}
	
	public static ValueTypeEnum convert( RomeRulePropertyEnum rulePropEnum ) {
		
		if( rulePropEnum == RomeRulePropertyEnum.INTEGER ) {
			return ValueTypeEnum.INTEGER;
		} 
		
		if( rulePropEnum == RomeRulePropertyEnum.STRING ) {
			return ValueTypeEnum.STRING;
		} 
		if( rulePropEnum == RomeRulePropertyEnum.DOUBLE ) {
			return ValueTypeEnum.DOUBLE;
		} 
		if( rulePropEnum == RomeRulePropertyEnum.DATE ) {
			return ValueTypeEnum.DATE;
		} 
		if( rulePropEnum == RomeRulePropertyEnum.REFERENCE ) {
			return ValueTypeEnum.REFERENCE;
		} 
		if( rulePropEnum == RomeRulePropertyEnum.BOOLEAN ) {
			return ValueTypeEnum.BOOLEAN;
		}
		return null;
	}
	
	public static ValueTypeEnum convert( RomePreferencePropertyEnum prefEnum ) {
		
		if( prefEnum == RomePreferencePropertyEnum.INTEGER ) {
			return ValueTypeEnum.INTEGER;
		} 
		
		if( prefEnum == RomePreferencePropertyEnum.STRING ) {
			return ValueTypeEnum.STRING;
		} 
		if( prefEnum == RomePreferencePropertyEnum.DOUBLE ) {
			return ValueTypeEnum.DOUBLE;
		} 
		if( prefEnum == RomePreferencePropertyEnum.DATE ) {
			return ValueTypeEnum.DATE;
		} 
		if( prefEnum == RomePreferencePropertyEnum.REFERENCE ) {
			return ValueTypeEnum.REFERENCE;
		} 
		if( prefEnum == RomePreferencePropertyEnum.BOOLEAN ) {
			return ValueTypeEnum.BOOLEAN;
		}
		return null;
	}
	
	public static RomeRulePropertyEnum convertToRulePropertyEnum( ValueTypeEnum webEnum ) {
		if( webEnum == ValueTypeEnum.INTEGER ) {
			return RomeRulePropertyEnum.INTEGER;
		} 
		
		if( webEnum == ValueTypeEnum.STRING ) {
			return RomeRulePropertyEnum.STRING;
		} 
		if( webEnum == ValueTypeEnum.DOUBLE ) {
			return RomeRulePropertyEnum.DOUBLE;
		} 
		if( webEnum == ValueTypeEnum.DATE ) {
			return RomeRulePropertyEnum.DATE;
		} 
		if( webEnum == ValueTypeEnum.REFERENCE ) {
			return RomeRulePropertyEnum.REFERENCE;
		} 
		if( webEnum == ValueTypeEnum.BOOLEAN ) {
			return RomeRulePropertyEnum.BOOLEAN;
		}
		if( webEnum == ValueTypeEnum.FILE ) {
			return RomeRulePropertyEnum.FILE;
		} 
		if( webEnum == ValueTypeEnum.CURRENCY ) {
			return RomeRulePropertyEnum.CURRENCY;
		}
		return null;
	}
	
	public static RomeTypePropertyEnum convertToTypePropertyEnum( ValueTypeEnum webEnum ) {
		if( webEnum == ValueTypeEnum.INTEGER ) {
			return RomeTypePropertyEnum.INTEGER;
		} 
		
		if( webEnum == ValueTypeEnum.STRING ) {
			return RomeTypePropertyEnum.STRING;
		} 
		if( webEnum == ValueTypeEnum.DOUBLE ) {
			return RomeTypePropertyEnum.DOUBLE;
		} 
		if( webEnum == ValueTypeEnum.DATE ) {
			return RomeTypePropertyEnum.DATE;
		} 
		if( webEnum == ValueTypeEnum.REFERENCE ) {
			return RomeTypePropertyEnum.REFERENCE;
		} 
		if( webEnum == ValueTypeEnum.BOOLEAN ) {
			return RomeTypePropertyEnum.BOOLEAN;
		}
		if( webEnum == ValueTypeEnum.FILE ) {
			return RomeTypePropertyEnum.FILE;
		} 
		if( webEnum == ValueTypeEnum.CURRENCY ) {
			return RomeTypePropertyEnum.CURRENCY;
		}
		return null;
	}
	
	public static RomePreferencePropertyEnum convertToPreferencePropertyEnum( ValueTypeEnum webEnum ) {
		if( webEnum == ValueTypeEnum.INTEGER ) {
			return RomePreferencePropertyEnum.INTEGER;
		} 
		
		if( webEnum == ValueTypeEnum.STRING ) {
			return RomePreferencePropertyEnum.STRING;
		} 
		if( webEnum == ValueTypeEnum.DOUBLE ) {
			return RomePreferencePropertyEnum.DOUBLE;
		} 
		if( webEnum == ValueTypeEnum.DATE ) {
			return RomePreferencePropertyEnum.DATE;
		} 
		if( webEnum == ValueTypeEnum.REFERENCE ) {
			return RomePreferencePropertyEnum.REFERENCE;
		} 
		if( webEnum == ValueTypeEnum.BOOLEAN ) {
			return RomePreferencePropertyEnum.BOOLEAN;
		}
		if( webEnum == ValueTypeEnum.FILE ) {
			return RomePreferencePropertyEnum.FILE;
		} 
		if( webEnum == ValueTypeEnum.CURRENCY ) {
			return RomePreferencePropertyEnum.CURRENCY;
		}
		return null;
	}
	
}