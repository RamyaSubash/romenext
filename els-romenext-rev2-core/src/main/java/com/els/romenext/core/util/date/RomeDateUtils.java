package com.els.romenext.core.util.date;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class RomeDateUtils {
	
//	public static final String ROME_DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
//	public static final String ROME_OPTIONAL_DATE_FORMAT1 = "MMM dd, yyyy";		// Mar 28, 2018"
//	public static final String ROME_OPTIONAL_DATE_FORMAT2 = "MMM dd, yyyy hh:mm:ss aa"; 	// Mar 28, 2018 12:50:36 PM
	
	public static final String ROME_DEFAULT_DATE_FORMAT = "MMM dd, yyyy hh:mm:ss:SSS aa"; 	// Mar 28, 2018 12:50:36 PM
	public static final String ROME_OPTIONAL_DATE_FORMAT1 = "yyyy-MM-dd";
	public static final String ROME_OPTIONAL_DATE_FORMAT2 = "MMM dd, yyyy";		// Mar 28, 2018"

	public static final DateFormat dateFormat = new SimpleDateFormat( RomeDateUtils.ROME_DEFAULT_DATE_FORMAT );
	public static final DateFormat DATEFORMAT_optional1 = new SimpleDateFormat( RomeDateUtils.ROME_OPTIONAL_DATE_FORMAT1 );
	public static final DateFormat DATEFORMAT_optional2 = new SimpleDateFormat( RomeDateUtils.ROME_OPTIONAL_DATE_FORMAT2 );

	public static String fisBuildFormatedDate( int date, int month, int year ) {
		Calendar c = Calendar.getInstance();
		c.set(year, month, date);
		return RomeDateUtils.formatToRomeDate( c.getTime() );
	}

	public static Date formatDate(String date) {

		try {
			Date newDate = RomeDateUtils.dateFormat.parse( date );

			return newDate;
		} catch (ParseException e) {
			e.printStackTrace();
			
//			Assert.fail();
		}

		return null;
	}
	
	public static Date formatDate_optional1(String date) {

		try {
			Date newDate = RomeDateUtils.DATEFORMAT_optional1.parse( date );

			return newDate;
		} catch (ParseException e) {
			e.printStackTrace();
			
//			Assert.fail();
		}

		return null;
	}
	
	public static Date formatDate_optional2(String date) {

		try {
			Date newDate = RomeDateUtils.DATEFORMAT_optional2.parse( date );

			return newDate;
		} catch (ParseException e) {
			e.printStackTrace();
			
//			Assert.fail();
		}

		return null;
	}

	public static String formatToRomeDate(Date date) {
		return RomeDateUtils.dateFormat.format( date );		
	}
	
	public static Date formatDateForced( String date ) {
		// will attempt to force parse this date
		Date result = RomeDateUtils.formatDate( date );
		
		if( result == null ) {
			result = RomeDateUtils.formatDate_optional1(date);
			
			if( result == null ) {
				result = RomeDateUtils.formatDate_optional2(date);
				
//				if( result == null ) {
//					
//				}
			}
		}
		
		return result;
	}
	
	public static void main(String[] args) {
		
		String date = "Mar 28, 2018";
		
		Date formatDate = RomeDateUtils.formatDate_optional1( date );
		
		System.out.println("Formated : " + formatDate );
		
		Long l = 1522255847134L;
		
		Date toDate = new Date( l );
		
		System.out.println("Date : " + toDate );
		
		String newFormat = RomeDateUtils.formatToRomeDate( toDate );
		
		System.out.println("New format: " + newFormat );
		
		
	}
}
