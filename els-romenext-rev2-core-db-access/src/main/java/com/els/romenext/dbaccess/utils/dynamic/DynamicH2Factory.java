package com.els.romenext.dbaccess.utils.dynamic;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.log4j.Logger;


public class DynamicH2Factory extends NewBaseManagerFactory {

	private static Logger log = Logger.getLogger(DynamicH2Factory.class);

//	private static NewBaseManagerFactory instance = null;
//
//	public static NewBaseManagerFactory getInstance( String database ) {
//		
//		if( instance == null ) {
//			// initialize?
//			instance = new DynamicH2Factory( database );
//		}
//		return instance;
//	}
	
	public static void createInstance( String namespace, String database ) {
		
		DynamicH2Factory factory = new DynamicH2Factory();
		
		factory.namespace = namespace;
		
		try {
			Properties properties = new Properties();

			// default attempt to get the name, should we simply default this to a value?
			InputStream resourceAsStream = DynamicH2Factory.class.getResourceAsStream("/com/jpl/data/persistence.properties");

			try {
				properties.load(resourceAsStream);
			} catch (IOException e) {
				log.error("unable to load persistence.properties file", e);
			}
			
			/**
			 * We now try to inject the dynamic database elements
			 */
			
			/**
			 * Normal MYSQL db
			 */
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
//			properties.put("javax.persistence.jdbc.driver", "com.mysql.cj.jdbc.Driver" );
//			properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect" );
//			properties.put("javax.persistence.jdbc.url", "jdbc:mysql://localhost:3306/" + database );
//			properties.put("hibernate.hbm2ddl.auto", "update" );
//			properties.put("javax.persistence.jdbc.user", "romenext" );
//			properties.put("javax.persistence.jdbc.password", "superman" );
			
			
			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
			properties.put("javax.persistence.jdbc.driver", "org.h2.Driver" );
			properties.put("hibernate.dialect", "org.hibernate.dialect.H2Dialect" );
			properties.put("javax.persistence.jdbc.url", "jdbc:h2:mem:" + database );
			properties.put("hibernate.hbm2ddl.auto", "update" );
			properties.put("javax.persistence.jdbc.user", "romenext" );
			properties.put("javax.persistence.jdbc.password", "superman" );
			
			try {
//				this.entityManagerFactory  = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				EntityManagerFactory emf = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				NewBaseManagerFactory.managerFactory.put( namespace,  emf  );
				
			} catch(RuntimeException t) {
				log.fatal(t);
				throw t;
			}

			log.debug("IN DefaultEntityManagerUtil Created EntityManagerFactory Successfully with properties......... :" + properties);
		} catch (Throwable x) {
			x.printStackTrace();
			log.error("ERROR", x);
		}
	}
	
	public static NewBaseManagerFactory getInstance( String namespace  ) {
		
		System.out.println("Am i here?");
		
		
		try {
			EntityManagerFactory emf = DynamicH2Factory.managerFactory.get( namespace );
			
			if( emf != null ) {
				DynamicH2Factory factory = new DynamicH2Factory();
				factory.namespace = namespace;
				factory.entityManagerFactory = emf;
				
				return factory;
			}	
			
			return null;
			
		} catch (Throwable x) {
			x.printStackTrace();
			log.error("ERROR", x);
		}
		
		return null;
	}
	
	public static void closeAll() {
		NewBaseManagerFactory.closeAll();
	}
	
	public static Set<String> getAllNamespaces() {
		return NewBaseManagerFactory.managerFactory.keySet();
	}

//	/**
//	 * DO NOT CREATE THIS METHOD
//	 * 
//	 * This method was originally private (and should be private) but the updated version of this requires some reflection to be used in the test cases
//	 * that causes issues when constructing this class.
//	 * 
//	 * WARNING: DO NOT CREATE THIS METHOD, USE THE GETINSTANCE() METHOD
//	 */
//	public DynamicH2Factory( String database ) {
//
//		System.out.println("Am i here?");
//		this.namespace = database;
//		
//		try {
//			Properties properties = new Properties();
//
//			// default attempt to get the name, should we simply default this to a value?
//			InputStream resourceAsStream = DynamicH2Factory.class.getResourceAsStream("/com/jpl/data/persistence.properties");
//
//			try {
//				properties.load(resourceAsStream);
//			} catch (IOException e) {
//				log.error("unable to load persistence.properties file", e);
//			}
//			
//			/**
//			 * We now try to inject the dynamic database elements
//			 */
//			
//			/**
//			 * Normal MYSQL db
//			 */
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
//			properties.put("javax.persistence.jdbc.driver", "com.mysql.cj.jdbc.Driver" );
//			properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect" );
//			properties.put("javax.persistence.jdbc.url", "jdbc:mysql://localhost:3306/" + database );
//			properties.put("hibernate.hbm2ddl.auto", "update" );
//			properties.put("javax.persistence.jdbc.user", "romenext" );
//			properties.put("javax.persistence.jdbc.password", "superman" );
//			
//			/**
//			 * Testing DB
//			 */
////			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
////			properties.put("javax.persistence.jdbc.driver", "org.h2.Driver" );
////			properties.put("hibernate.dialect", "org.hibernate.dialect.H2Dialect" );
////			properties.put("javax.persistence.jdbc.url", "jdbc:h2:mem:test" );
////			properties.put("hibernate.hbm2ddl.auto", "update" );
////			properties.put("javax.persistence.jdbc.user", "romenext" );
////			properties.put("javax.persistence.jdbc.password", "superman" );
//			
////		    properties.put("javax.persistence.jtaDataSource" , "java:/company_12_dataSource");  
////	        properties.put("javax.persistence.transactionType", "RESOURCE_LOCAL");  
////	        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");  
////	        properties.put("hibernate.show_sql", "true");  
////	        properties.put("hibernate.format_sql", "true"); 
//
//			
//			// From the original testing persistence.xml
////			<provider>org.hibernate.ejb.HibernatePersistence</provider>
////	        <property name="javax.persistence.jdbc.driver" value="com.mysql.cj.jdbc.Driver" />  
////	        <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLDialect" /> 
////	        <property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/romenext" /> 
////			<property name="hibernate.hbm2ddl.auto" value="update" />
////			<property name="javax.persistence.jdbc.user" value="romenext" />
////			<property name="javax.persistence.jdbc.password" value="superman" />
//	        
//	        // from the Live persistence.xml file
//			//             <jta-data-source>java:jboss/romenext</jta-data-source>
//
//			
//			try {
////				this.entityManagerFactory  = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
//				
//				NewBaseManagerFactory.managerFactory.put("default",  this.entityManagerFactory );
//				
//			} catch(RuntimeException t) {
//				log.fatal(t);
//				throw t;
//			}
//
//			log.debug("IN DefaultEntityManagerUtil Created EntityManagerFactory Successfully with properties......... :" + properties);
//		} catch (Throwable x) {
//			x.printStackTrace();
//			log.error("ERROR", x);
//		}
//	}
}
