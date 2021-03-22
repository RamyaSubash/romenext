package com.els.romenext.core.util.property;

import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.enums.ValueTypeEnum;

public class RomeTypePropertyUtils {

	public static RomeTypePropertyEnum convert( ValueTypeEnum valueType ) {
		
		
		if( valueType == ValueTypeEnum.INTEGER ) {
			return RomeTypePropertyEnum.INTEGER;
		} 
		
		if( valueType == ValueTypeEnum.STRING ) {
			return RomeTypePropertyEnum.STRING;
		} 
		if( valueType == ValueTypeEnum.DOUBLE ) {
			return RomeTypePropertyEnum.DOUBLE;
		} 
		if( valueType == ValueTypeEnum.DATE ) {
			return RomeTypePropertyEnum.DATE;
		} 
		if( valueType == ValueTypeEnum.REFERENCE ) {
			return RomeTypePropertyEnum.REFERENCE;
		} 
		if( valueType == ValueTypeEnum.FILE ) {
			return RomeTypePropertyEnum.FILE;
		} 
		if( valueType == ValueTypeEnum.BOOLEAN ) {
			return RomeTypePropertyEnum.BOOLEAN;
		}
		if( valueType == ValueTypeEnum.CURRENCY ) {
			return RomeTypePropertyEnum.CURRENCY;
		}
		
		
		
		return null;
	}
}
