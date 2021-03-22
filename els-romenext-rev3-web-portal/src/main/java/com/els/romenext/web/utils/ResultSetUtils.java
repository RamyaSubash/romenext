package com.els.romenext.web.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class ResultSetUtils {

	public static void prettyPrint( ResultSet r ) throws SQLException {
		
		ResultSetMetaData metaData = r.getMetaData();
		
		int columnCount = metaData.getColumnCount();
		
		
		
		while( r.next() ) {
			for( int i = 1; i <= columnCount; i++ ) {
			
				
				String columnLabel = metaData.getColumnLabel( i );
				
				String string = r.getString( i );
				
				System.out.println("[" + columnLabel + "]:" + string );
			}
		}
		
		
	}
	
	
	public static void print( Connection c, String s ) throws SQLException {
		System.out.println("SQL: " + s);
	    PreparedStatement prepareStatement = c.prepareStatement( s );
	    
	    ResultSet executeQuery = prepareStatement.executeQuery();
	    
	    ResultSetUtils.prettyPrint( executeQuery );
	}
	
	public static String getColumn( ResultSet r, String toFind ) {
		ResultSetMetaData metaData;
		try {
			metaData = r.getMetaData();
			
			int columnCount = metaData.getColumnCount();
			
			
			r.first();
			
			for( int i = 1; i <= columnCount; i++ ) {
				String columnLabel = metaData.getColumnLabel( i );
				
				if( columnLabel != null && columnLabel.equalsIgnoreCase( toFind ) ) {
					// found the column id, just return it
					return r.getString( i );
				}
			}
			
			r.beforeFirst();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
}
