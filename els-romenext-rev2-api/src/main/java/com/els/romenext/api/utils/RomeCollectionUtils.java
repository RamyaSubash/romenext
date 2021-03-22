package com.els.romenext.api.utils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;

public class RomeCollectionUtils {

	public static boolean containsDuplication(List<Long> longList) {
		
		if (CollectionUtils.isEmpty(longList)) {
			return false;
		}
		
		Set<Long> longSet = new HashSet<Long>();
		
		for (Long l : longList) {
			if (longSet.contains(l)) {
				return true;
			}
			longSet.add(l);
		}
		
		return false;
	}
	
	public static boolean containsDuplicationString(List<String> strList) {
		
		if (CollectionUtils.isEmpty(strList)) {
			return false;
		}
		
		Set<String> strSet = new HashSet<String>();
		
		for (String s : strList) {
			if (strSet.contains(s)) {
				return true;
			}
			strSet.add(s);
		}
		
		return false;
	}

}
