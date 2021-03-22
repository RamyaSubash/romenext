package com.els.romenext.dbaccess.utils.dynamic;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUtil;

import org.apache.log4j.Logger;


public class DynamicEMFactory extends NewBaseManagerFactory {

	private static Logger log = Logger.getLogger(DynamicEMFactory.class);

//	private static NewBaseManagerFactory instance = null;
//
//	public static NewBaseManagerFactory getInstance( String database ) {
//		
//		if( instance == null ) {
//			// initialize?
//			instance = new DynamicEMFactory( database );
//		}
//		return instance;
//	}
	
	public static void createInstance( String namespace, String database, String ip, String port, String username, String password, String hbmstate ) throws Throwable {
		
		DynamicEMFactory factory = new DynamicEMFactory();
		factory.namespace = namespace;
		
		try {
			Properties properties = new Properties();

			// default attempt to get the name, should we simply default this to a value?
			InputStream resourceAsStream = DynamicEMFactory.class.getResourceAsStream("/com/els/data/persistence.properties");

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
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistenceProvider");
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
			properties.put("javax.persistence.provider","org.hibernate.jpa.HibernatePersistenceProvider");

			properties.put("javax.persistence.jdbc.driver", "com.mysql.cj.jdbc.Driver" );
//			properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect" );
			properties.put("hibernate.dialect", "com.els.romenext.core.db.utils.Mysql5BitBooleanDialect" );

			properties.put("org.hibernate.flushMode", "ALWAYS" );
			
			properties.put("javax.persistence.jdbc.url", "jdbc:mysql://" + ip + ":" + port + "/" + database + "?serverTimezone=UTC&useSSL=false");
			properties.put("hibernate.hbm2ddl.auto", hbmstate );
			properties.put("javax.persistence.jdbc.user", username );
			properties.put("javax.persistence.jdbc.password", password );
			
			
			try {
				
				
//				Configuration c = new Configuration();
//				
//				c.addPackage("com.els.romenext.core.db.entity.user");
////				c.addAnnotatedClass( RomeUser.class );
//				
//				
//				Ejb3Configuration cfg = new Ejb3Configuration();
//				EntityManagerFactory emf = 
//				  cfg.addProperties(properties)                  // add some properties
////				     .setInterceptor(myInterceptorImpl)          // set an interceptor
//				     .addAnnotatedClass(MyAnnotatedClass.class)  // add a class to be mapped
////				     .addClass(NonAnnotatedClass.class)          // add an hbm.xml file using the Hibernate convention
////				     .addResource("mypath/MyOtherCLass.hbm.xml") // add an hbm.xml file
////				     .addResource("mypath/orm.xml" )             // add an EJB3 deployment descriptor
////				     .configure("/mypath/hibernate.cfg.xml")     // add a regular hibernate.cfg.xml
//				     .buildEntityManagerFactory();               // create the entity manager factory
//				
//				
				PersistenceUtil utils = Persistence.getPersistenceUtil();
				
//				this.entityManagerFactory  = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				EntityManagerFactory emf = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				
		
				
				NewBaseManagerFactory.managerFactory.put( namespace,  emf  );
				
			} catch(RuntimeException t) {
				System.out.println("ISNIDE RUNTIME EXCEPTION");
//				log.fatal(t);
				throw t;
			}

			log.debug("IN DefaultEntityManagerUtil Created EntityManagerFactory Successfully with properties......... :" + properties);
		} catch (Throwable x) {
//			x.printStackTrace();
//			log.error("ERROR", x);
			System.out.println("INSIDE THROABLE EXCEPTION");
			throw x;
		}
	}
	
	/**
	 * Build a EntityManager with the JTA data source
	 * 
	 * ie. In the persistence.xml
	 *             <jta-data-source>java:jboss/romenext</jta-data-source>


	 * @param namespace
	 * @param jndiName
	 * @param username
	 * @param password
	 * @param hbmstate
	 * @throws Throwable
	 */
	public static void createInstance( String namespace, String dataSource, String hbmstate ) throws Throwable {
		
		DynamicEMFactory factory = new DynamicEMFactory();
		factory.namespace = namespace;
		
		try {
			Properties properties = new Properties();

			// default attempt to get the name, should we simply default this to a value?
			
			
//			DynamicEMFactory.class.get
			
			InputStream resourceAsStream = DynamicEMFactory.class.getResourceAsStream("/com/els/data/persistence.properties");
//			InputStream resourceAsStream1 = DynamicEMFactory.class.getResourceAsStream("/com/jpl/data/persistence.properties");
//			InputStream resourceAsStream2 = DynamicEMFactory.class.getResourceAsStream("persistence.properties");
//			InputStream resourceAsStream3 = DynamicEMFactory.class.getResourceAsStream("/com/els/data/persistence.properties");

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
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistenceProvider");

			
//			properties.put("jta-data-source","java:/mysqlDS_" + namespace );
//			properties.put("jta-data-source","java:/jboss/romenext22" );
//			properties.put("jta-data-source","java:jboss/romenext" );

//			                                  java:/jboss/romenext22
			
//			properties.put("hibernate.transaction.jta.platform", "JBossAS" );
//			properties.put("hibernate.transaction.coordinator_class", "org.hibernate.resource.transaction.backend.jta.internal.JtaTransactionCoordinatorImpl" );
//			properties.put("hibernate.transaction.manager_lookup_class","org.hibernate.transaction.JBossTransactionManagerLookup");

			
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
			properties.put("javax.persistence.jdbc.driver", "com.mysql.cj.jdbc.Driver" );
//			properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect" );
			properties.put("hibernate.dialect", "com.els.romenext.core.db.utils.Mysql5BitBooleanDialect" );

//			properties.put("javax.persistence.jdbc.url", "jdbc:mysql://" + ip + ":" + port + "/" + database );
//			properties.put("hibernate.hbm2ddl.auto", hbmstate );
//			properties.put("javax.persistence.jdbc.user", username );
//			properties.put("javax.persistence.jdbc.password", password );
			
			
			try {
				
				
//				Configuration c = new Configuration();
//				
//				c.addPackage("com.els.romenext.core.db.entity.user");
////				c.addAnnotatedClass( RomeUser.class );
//				
//				
//				Ejb3Configuration cfg = new Ejb3Configuration();
//				EntityManagerFactory emf = 
//				  cfg.addProperties(properties)                  // add some properties
////				     .setInterceptor(myInterceptorImpl)          // set an interceptor
//				     .addAnnotatedClass(MyAnnotatedClass.class)  // add a class to be mapped
////				     .addClass(NonAnnotatedClass.class)          // add an hbm.xml file using the Hibernate convention
////				     .addResource("mypath/MyOtherCLass.hbm.xml") // add an hbm.xml file
////				     .addResource("mypath/orm.xml" )             // add an EJB3 deployment descriptor
////				     .configure("/mypath/hibernate.cfg.xml")     // add a regular hibernate.cfg.xml
//				     .buildEntityManagerFactory();               // create the entity manager factory
//				
//				
				PersistenceUtil utils = Persistence.getPersistenceUtil();
				
//				this.entityManagerFactory  = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				EntityManagerFactory emf = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				NewBaseManagerFactory.managerFactory.put( namespace,  emf  );
				
			} catch(RuntimeException t) {
				System.out.println("ISNIDE RUNTIME EXCEPTION");
//				log.fatal(t);
				throw t;
			}

			log.debug("IN DefaultEntityManagerUtil Created EntityManagerFactory Successfully with properties......... :" + properties);
		} catch (Throwable x) {
//			x.printStackTrace();
//			log.error("ERROR", x);
			System.out.println("INSIDE THROABLE EXCEPTION");
			throw x;
		}
	}
	
	/**
	 * SHOULD WE HAVE THIS?
	 * @return
	 */
	public static NewBaseManagerFactory getInstance() {
		
		try {
			
			String namespace = "default";
			
			EntityManagerFactory emf = DynamicEMFactory.managerFactory.get( namespace );
			
			if( emf != null ) {
				DynamicEMFactory factory = new DynamicEMFactory();
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
	
	public static NewBaseManagerFactory getInstance( String namespace  ) {
		
		try {
			EntityManagerFactory emf = DynamicEMFactory.managerFactory.get( namespace );
			
			if( emf != null ) {
				DynamicEMFactory factory = new DynamicEMFactory();
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
	
//public static NewBaseManagerFactory getInstance( String namespace  ) {
//		
//		try {
//			EntityManagerFactory emf = DynamicEMFactoryV2.managerFactory.get( namespace );
//			
//			if( emf != null ) {
//				DynamicEMFactoryV2 factory = new DynamicEMFactoryV2();
//				factory.namespace = namespace;
//				factory.entityManagerFactory = emf;
//				
//				return factory;
//			}	
//			
//			return null;
//			
//		} catch (Throwable x) {
//			x.printStackTrace();
//			log.error("ERROR", x);
//		}
//		
//		return null;
//	}
	
	public static void deleteInstance( String namespace ) {
		try {
			DynamicEMFactory.managerFactory.remove( namespace );
			
			
		} catch (Throwable x) {
			x.printStackTrace();
			log.error("ERROR", x);
		}
	}

//	/**
//	 * DO NOT CREATE THIS METHOD
//	 * 
//	 * This method was originally private (and should be private) but the updated version of this requires some reflection to be used in the test cases
//	 * that causes issues when constructing this class.
//	 * 
//	 * WARNING: DO NOT CREATE THIS METHOD, USE THE GETINSTANCE() METHOD
//	 */
//	public DynamicEMFactory( String database ) {
//
//		System.out.println("Am i here?");
//		this.namespace = database;
//		
//		try {
//			Properties properties = new Properties();
//
//			// default attempt to get the name, should we simply default this to a value?
//			InputStream resourceAsStream = DynamicEMFactory.class.getResourceAsStream("/com/jpl/data/persistence.properties");
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
