package com.els.romenext.core.db.dao;

import org.junit.Ignore;
import org.junit.Test;

import com.els.romenext.core.db.dao.embedded.ADatabaseEmbedded;
import com.els.romenext.dbaccess.utils.H2InMemoryDatabaseEntityManagerFactory;

@Ignore
public class RomeTypeDaoTest extends ADatabaseEmbedded {
	
	public RomeTypeDao romeTypeDao = new RomeTypeDao( new H2InMemoryDatabaseEntityManagerFactory() );

	@Test
	public void generalTest () {
		
//		DynamicH2Factory.createInstance("test1",  "test1db" );

		
		
		RomeTypeDao rtDao = new RomeTypeDao( new H2InMemoryDatabaseEntityManagerFactory() );
	}
	
}
