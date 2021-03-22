package com.els.romenext.dbaccess.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.persistence.Persistence;

import org.apache.log4j.Logger;

public class DefaultEMFactory extends BaseEMFactory {

	private static Logger log = Logger.getLogger(DefaultEMFactory.class);

	private static BaseEMFactory instance = new DefaultEMFactory();

	public static BaseEMFactory getInstance() {
		return instance;
	}

	private DefaultEMFactory() {

		try {
			Properties properties = new Properties();

			// default attempt to get the name, should we simply default this to a value?
			InputStream resourceAsStream = DefaultEMFactory.class.getResourceAsStream("/com/els/data/persistence.properties");

			try {
				properties.load(resourceAsStream);
			} catch (IOException e) {
				log.error("unable to load persistence.properties file", e);
			}

			try {
				entityManagerFactory  = Persistence.createEntityManagerFactory(properties.getProperty(PERSISTENCE_UNIT_KEY), properties);
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
