package com.els.romenext.core.util;

import com.els.romenext.core.enums.ValueTypeEnum;

public class ValueConvertor {

	// Convert string value to object value based on value type
	
	public Object convertStrToObj (String value, String valueType) {
		
		Object obj = new Object();
		
    	switch (ValueTypeEnum.getEnum(valueType)) {
    	
    	case INTEGER:
    		obj = Integer.parseInt(value);
    		break;
    	
    	case DOUBLE:
    		obj = Double.parseDouble(value);
    		break;
    	
    	case STRING:
    		obj = value;
    	    break;
    	
    	case BOOLEAN:
    		obj = Boolean.parseBoolean(value);
    	    break;
    	
    	case DATE:
    		obj = value; // TODO: Handle date format
    	    break;
    	
    	case REFERENCE:
    		obj = value; // TODO: Handle reference format
    	    break;
    	
    	}
    	
    	return obj;
		
	}

	public Object convertStrToObj (String value, int valueType) {
		
		Object obj = new Object();
		
    	switch (ValueTypeEnum.getEnum(valueType)) {
    	
    	case INTEGER:
    		obj = Integer.parseInt(value);
    		break;
    	
    	case DOUBLE:
    		obj = Double.parseDouble(value);
    		break;
    	
    	case STRING:
    		obj = value;
    	    break;
    	
    	case BOOLEAN:
    		obj = Boolean.parseBoolean(value);
    	    break;
    	
    	case DATE:
    		obj = value; // TODO: Handle date format
    	    break;
    	
    	case REFERENCE:
    		obj = value; // TODO: Handle reference format
    	    break;
    	
    	}
    	
    	return obj;
		
	}

}
