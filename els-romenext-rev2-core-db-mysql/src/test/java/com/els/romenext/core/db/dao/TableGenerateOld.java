package com.els.romenext.core.db.dao;


import org.junit.Ignore;
import org.junit.Test;

import com.els.romenext.dbaccess.utils.dynamic.DynamicEMFactory;

@Ignore
public class TableGenerateOld {

	@Test
	public void test() {
		
		try {
			DynamicEMFactory.createInstance( "default", "romenext", "localhost", "3306", "root", "superman", "update" );
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		RomeTypeDao dao = new RomeTypeDao();
		
		dao.getAll();
	}
}
