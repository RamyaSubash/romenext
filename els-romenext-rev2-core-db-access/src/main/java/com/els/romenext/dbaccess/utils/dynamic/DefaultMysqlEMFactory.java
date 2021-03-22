package com.els.romenext.dbaccess.utils.dynamic;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.persistence.Persistence;

import org.apache.log4j.Logger;


public class DefaultMysqlEMFactory extends NewBaseManagerFactory {

	private static Logger log = Logger.getLogger(DefaultMysqlEMFactory.class);

	private static NewBaseManagerFactory instance = new DefaultMysqlEMFactory();

	public static NewBaseManagerFactory getInstance() {
		return instance;
	}

	/**
	 * DO NOT CREATE THIS METHOD
	 * 
	 * This method was originally private (and should be private) but the updated version of this requires some reflection to be used in the test cases
	 * that causes issues when constructing this class.
	 * 
	 * WARNING: DO NOT CREATE THIS METHOD, USE THE GETINSTANCE() METHOD
	 */
	public DefaultMysqlEMFactory( ) {
		
		this.namespace = "default";
		
		try {
			Properties properties = new Properties();

			// default attempt to get the name, should we simply default this to a value?
			InputStream resourceAsStream = DefaultMysqlEMFactory.class.getResourceAsStream("/com/els/data/persistence.properties");

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
			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
			properties.put("javax.persistence.jdbc.driver", "com.mysql.cj.jdbc.Driver" );
			properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect" );
			properties.put("javax.persistence.jdbc.url", "jdbc:mysql://localhost:3306/romenext?serverTimezone=UTC&useSSL=false" );
			properties.put("hibernate.hbm2ddl.auto", "update" );
			properties.put("javax.persistence.jdbc.user", "romenext" );
			properties.put("javax.persistence.jdbc.password", "superman" );
			
			/**
			 * Testing DB
			 */
//			properties.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
//			properties.put("javax.persistence.jdbc.driver", "org.h2.Driver" );
//			properties.put("hibernate.dialect", "org.hibernate.dialect.H2Dialect" );
//			properties.put("javax.persistence.jdbc.url", "jdbc:h2:mem:test" );
//			properties.put("hibernate.hbm2ddl.auto", "update" );
//			properties.put("javax.persistence.jdbc.user", "romenext" );
//			properties.put("javax.persistence.jdbc.password", "superman" );
			
//		    properties.put("javax.persistence.jtaDataSource" , "java:/company_12_dataSource");  
//	        properties.put("javax.persistence.transactionType", "RESOURCE_LOCAL");  
//	        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");  
//	        properties.put("hibernate.show_sql", "true");  
//	        properties.put("hibernate.format_sql", "true"); 

			
			// From the original testing persistence.xml
//			<provider>org.hibernate.ejb.HibernatePersistence</provider>
//	        <property name="javax.persistence.jdbc.driver" value="com.mysql.cj.jdbc.Driver" />  
//	        <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLDialect" /> 
//	        <property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/romenext" /> 
//			<property name="hibernate.hbm2ddl.auto" value="update" />
//			<property name="javax.persistence.jdbc.user" value="romenext" />
//			<property name="javax.persistence.jdbc.password" value="superman" />
	        
	        // from the Live persistence.xml file
			//             <jta-data-source>java:jboss/romenext</jta-data-source>

			
			try {
				this.entityManagerFactory  = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
				
				NewBaseManagerFactory.managerFactory.put( this.namespace,  this.entityManagerFactory );
				
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
}
