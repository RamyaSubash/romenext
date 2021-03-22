package com.els.romenext.web.general.utils;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

public class EStringUtils {
	private final static Charset UTF_8_CHARSET = StandardCharsets.UTF_8;

	/*
	 * Check if any of the passed in Strings is empty
	 */
	public static boolean isAnyStringEmpty( String... stringArray ) {
				
		for( String s : stringArray ) {
			if( StringUtils.isEmpty( s ) ) {
				return true;
			}
		}
		
		return false;
	}
	
	public static boolean isAnyStringNotEmpty( String... stringArray ) {
		
		for( String s : stringArray ) {
			if( !StringUtils.isEmpty( s ) ) {
				return true;
			}
		}
		
		return false;
	}

	/*
	 * Check if any of the passed in Strings is blank
	 */
	public static boolean isAnyStringBlank( String... stringArray ) {
		
		for( String s : stringArray ) {
			if( StringUtils.isBlank( s ) ) {
				return true;
			}
		}
		
		return false;
	}

	public static String findStringBlank( String... stringArray ) {
		
		for( String s : stringArray ) {
			if( StringUtils.isBlank( s ) ) {
				return s;
			}
		}
		
		return null;
	}

	
	/*
	 * Check if all of the passed in Strings are blank
	 */
	public static boolean areAllStringBlank( String... stringArray ) {
				
		for( String s : stringArray ) {
			if( !StringUtils.isBlank( s ) ) {
				return false;
			}
		}
		
		return true;
	}
	
	public static String padFrontOfString( String toPad, String padder, int maxSize  ) {
		
		
		return StringUtils.leftPad(toPad, maxSize, padder);
	}
	
	public static boolean isEqualsToAll( String original, String... compareTo ) {
		
		for( String s : compareTo ) {
			if( !original.equalsIgnoreCase( s ) ) {
				return false;
			}
		}
		return true;
	}
	
	public static boolean isEqualsToAny( String original, String... compareTo ) {
		
		for( String s : compareTo ) {
			if( original.equalsIgnoreCase( s ) ) {
				return true;
			}
		}
		return false;
	}
	
	public static String toBase64String(String originalString) {
		byte[] originalBytes = originalString.getBytes(UTF_8_CHARSET);
		return Base64.encodeBase64String(originalBytes);
	}
	
	public static String maskString(String originalString, int leaveOutFrontChars, int leaveOutEndChars, char mask) {
		if (StringUtils.isBlank(originalString)) {
			return originalString;
		}
		
		int length = originalString.length();
		int beginningOfEndIndex = length - leaveOutEndChars;
		int padLength = beginningOfEndIndex;
		
		if (length <= (leaveOutFrontChars + leaveOutEndChars)) {
			return originalString;
		}
		
		return StringUtils.rightPad(originalString.substring(0, leaveOutFrontChars), padLength, mask) +
				originalString.substring(beginningOfEndIndex, length) ;
	}
}