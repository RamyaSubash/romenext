package com.els.romenext.core.db.dao;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.dbaccess.enums.RomeAdminPersistenceUnit;
import com.els.romenext.dbaccess.utils.DatabaseManager;
import com.els.romenext.dbaccess.utils.dynamic.DynamicEMFactory;

//@Ignore
public class TableGenerate {
	
	@Test
	public void test() {
		
		String namespace = "user1";
		
		DatabaseManager db = DatabaseManager.get( namespace );
			
	//		if( db == null ) {
	//			db = new DatabaseManager( username,  username, ip, port, username, password, "GOOD", "", "update", persistenceUnit)
	//		}
			
			if( db != null ) {
				DynamicEMFactory.deleteInstance( db.getNamespace() );	    			
			} else {
				db = new DatabaseManager( namespace,  namespace, "localhost", "3306", namespace, "superman", "GOOD", "", "update", RomeAdminPersistenceUnit.FULL ); 
			}
		
		boolean successful = false;
		String dberror = "";
		try {
			DynamicEMFactory.createInstance( "root", "romenext", "localhost", "3306", "root", "superman", "update" );

			DynamicEMFactory.createInstance( "user1", "romenext", "localhost", "3306", "user1", "superman", "update" );

//			DynamicEMFactory.createInstance( req.getUsername(), datasource, "update");

//			DynamicEMFactoryV2.createInstance(namespace, name, ip, port, username, password, "validate");
			//					DynamicEMFactory.createInstance(namespace, name, ip, port, username, password, "validate");

			// just try a random connection
//			RomeUserDao userDao = new RomeUserDao( namespace );
//
//			List<RomeUser> all = userDao.getAll();
//
//			System.out.println("All : " + all );
			successful = true;
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dberror = e.getCause().getMessage();
		}

		String status = "GOOD";
		if( !successful ) {
			status = "INVALID";
		}
		
		db.setStatus( status );
		db.setDbMessage( dberror );
		db.setHbmStatus( "update" );
		
		
		
		DatabaseManager.put( namespace, db);
		
		
		
		RomeTypeDao dao = new RomeTypeDao( namespace );
		
		List<RomeType> all = dao.getAll();
		
		System.out.println("What is this : " + all.size() );
		
		RomeTypeDecoratorPropertyValueDao vdao = new RomeTypeDecoratorPropertyValueDao( namespace );
		
		RomeTypeDecoratorPropertyValue v = new RomeTypeDecoratorPropertyValue();
		
		v.setRomeDecoratorProperty( null );;
		v.setRomeType( all.get( 0 ) );
		v.setRomeGroupType( null );;
		
		vdao.getTransaction().begin();
		vdao.insert( v );;
		vdao.getTransaction().commit();
	}

}
