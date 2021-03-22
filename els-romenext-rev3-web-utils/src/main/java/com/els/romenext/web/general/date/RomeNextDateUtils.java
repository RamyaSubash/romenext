package com.els.romenext.web.general.date; 

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class RomeNextDateUtils {
	
	public static final String ROME_DEFAULT_DATE_FORMAT_SHORT = "yyyy-MM-dd";
	public static final String ROME_DEFAULT_DATE_FORMAT_LONG = "yyyy-MM-dd HH:mm:ss:SSS";

	public static final DateFormat dateFormat_short = new SimpleDateFormat( RomeNextDateUtils.ROME_DEFAULT_DATE_FORMAT_SHORT );
	public static final DateFormat dateFormat_long = new SimpleDateFormat( RomeNextDateUtils.ROME_DEFAULT_DATE_FORMAT_LONG );


	public static Date formatDate_short(String date) {

		try {
			Date newDate = RomeNextDateUtils.dateFormat_short.parse( date );

			return newDate;
		} catch (ParseException e) {
			e.printStackTrace(); 
		}

		return null;
	}

	public static String formatToRomeDate_short(Date date) {
		return RomeNextDateUtils.dateFormat_short.format( date );		
	}
	
	public static Date formatDate_long(String date) {

		try {
			Date newDate = RomeNextDateUtils.dateFormat_long.parse( date );

			return newDate;
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String formatToRomeDate_long(Date date) {
		return RomeNextDateUtils.dateFormat_long.format( date );		
	}
}
