package com.els.romenext.web.general.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.log4j.Logger;

public class ResultSetUtils {
	
	private static final Logger logger = Logger.getLogger( ResultSetUtils.class );

	public static void prettyPrint( ResultSet r ) throws SQLException {
		
		ResultSetUtils.prettyPrint( null, r);
		
		
	}
	
	public static void prettyPrint( String prefix, ResultSet r ) throws SQLException {
		
		if( prefix == null ) {
			prefix = "";
		}
		
		ResultSetMetaData metaData = r.getMetaData();
		
		int columnCount = metaData.getColumnCount();
		
		
		
		while( r.next() ) {
			for( int i = 1; i <= columnCount; i++ ) {
			
				
				String columnLabel = metaData.getColumnLabel( i );
				
				String string = r.getString( i );
				
				logger.info( prefix + "[" + columnLabel + "]:" + string  );
				System.out.println( prefix + "[" + columnLabel + "]:" + string );
			}
		}
		
		
	}
	
	
	public static void print( Connection c, String s ) throws SQLException {
		System.out.println("SQL: " + s);
	    PreparedStatement prepareStatement = c.prepareStatement( s );
	    
	    ResultSet executeQuery = prepareStatement.executeQuery();
	    
	    ResultSetUtils.prettyPrint( executeQuery );
	}
	
	public static Object getColumn( ResultSet r, Class valueType, String colToFind ) {
		ResultSetMetaData metaData;
		try {
			metaData = r.getMetaData();
			
			int columnCount = metaData.getColumnCount();
			
			
			r.first();
			
			for( int i = 1; i <= columnCount; i++ ) {
				String columnLabel = metaData.getColumnLabel( i );
				
				if( columnLabel != null && columnLabel.equalsIgnoreCase( colToFind ) ) {
					// found the column id, just return it
					
					// create an instance we can compare it to? 
					
					if( valueType.isAssignableFrom( String.class ) ) {
						return r.getString( i ); 
					} else if( valueType.isAssignableFrom( Date.class ) ) {
						return r.getDate( i );
					} else if( valueType.isAssignableFrom( Long.class ) ) {
						return r.getLong( i ); 
					} else if( valueType.isAssignableFrom( Integer.class ) ) {
						return r.getInt( i ); 
					} else if( valueType.isAssignableFrom( Double.class ) ) {
						return r.getDouble( i );
					}
				}
			}
			
			r.beforeFirst();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	public static Object getColumnNoChange( ResultSet r, Class valueType, String colToFind ) {
		ResultSetMetaData metaData;
		try {
			metaData = r.getMetaData();
			
			int columnCount = metaData.getColumnCount();
			
			
//			r.first();
			
			for( int i = 1; i <= columnCount; i++ ) {
				String columnLabel = metaData.getColumnLabel( i );
				
				if( columnLabel != null && columnLabel.equalsIgnoreCase( colToFind ) ) {
					// found the column id, just return it
					
					// create an instance we can compare it to? 
					
					if( valueType.isAssignableFrom( String.class ) ) {
						return r.getString( i ); 
					} else if( valueType.isAssignableFrom( Date.class ) ) {
						return r.getDate( i );
					} else if( valueType.isAssignableFrom( Long.class ) ) {
						return r.getLong( i ); 
					} else if( valueType.isAssignableFrom( Integer.class ) ) {
						return r.getInt( i ); 
					} else if( valueType.isAssignableFrom( Double.class ) ) {
						return r.getDouble( i );
					}
				}
			}
			
//			r.beforeFirst();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static Integer getColumnNoChange_Int( ResultSet r, String colToFind ) {
		Object obj = ResultSetUtils.getColumnNoChange(r, Integer.class, colToFind );
		
		if( obj == null || !(obj instanceof Integer ) ) {
			
			return null;
		}
		return (Integer) obj;
	}
	
	public static String getColumnNoChange_String( ResultSet r, String colToFind ) {
		Object obj = ResultSetUtils.getColumnNoChange(r, String.class, colToFind );
		
		if( obj == null || !(obj instanceof String ) ) {
			
			return null;
		}
		return (String) obj;
	}
	
	public static Long getColumnNoChange_Long( ResultSet r, String colToFind ) {
		Object obj = ResultSetUtils.getColumnNoChange(r, Long.class, colToFind );
		
		if( obj == null || !(obj instanceof Long ) ) {
			
			return null;
		}
		return (Long) obj;
	}
	
	public static Double getColumnNoChange_Double( ResultSet r, String colToFind ) {
		Object obj = ResultSetUtils.getColumnNoChange(r, Double.class, colToFind );
		
		if( obj == null || !(obj instanceof Double ) ) {
			
			return null;
		}
		return (Double) obj;
	}
	
	public static Date getColumnNoChange_Date( ResultSet r, String colToFind ) {
		Object obj = ResultSetUtils.getColumnNoChange(r, Date.class, colToFind );
		
		if( obj == null || !(obj instanceof Date ) ) {
			
			return null;
		}
		return (Date) obj;
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
	
	/**
	 * This is only if the result set only has a single column of data
	 * @param r
	 * @param toFind
	 * @return
	 */
	public static List<String> getAllValues( ResultSet r  ) {
		ResultSetMetaData metaData;
		try {
			metaData = r.getMetaData();
			
			int columnCount = metaData.getColumnCount();
			List<String> results = new ArrayList<>();
			
			while( r.next() ) {
				results.add( r.getString( 1 ) );
			} 
			
			return results;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static void main(String[] args) {
		
		Class test = Long.class;
		
		System.out.println( "What is this : " + test.isAssignableFrom( String.class ));
		System.out.println( "What is this : " + test.isAssignableFrom( Double.class ));
		System.out.println( "What is this : " + test.isAssignableFrom( Integer.class ));
		System.out.println( "What is this : " + test.isAssignableFrom( StringBuffer.class ));
		System.out.println( "What is this : " + test.isAssignableFrom( Long.class ));

		
	}
}
