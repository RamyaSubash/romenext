package com.els.romenext.api.utils;

import org.apache.commons.lang3.StringUtils;

public class RomeStringUtils {
	
	public static String valueOf(Object o) {
		if (o == null) {
			return "";
		}
		return o.toString();
	}
	
	public static boolean isAnyEmpty(String... strings) {
		
		for (String string : strings) {
			if (StringUtils.isEmpty(string)) {
				return true;
			}
		}
		
		return false;
		
	}

}
