package com.els.romenext.core.db.dao.embedded;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Table;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;

import org.hibernate.Session;
import org.hibernate.jdbc.ReturningWork;
import org.junit.Before;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.dbaccess.utils.BaseEMFactory;
import com.els.romenext.dbaccess.utils.H2InMemoryDatabaseEntityManagerFactory;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public abstract class ADatabaseEmbedded {
	
//	public BaseEMFactory factory = null;
	public NewBaseManagerFactory factory = null;

	
//	public ADatabaseEmbedded() {
//		
//	}
//	
	public ADatabaseEmbedded() {
		this( new H2InMemoryDatabaseEntityManagerFactory() );
	}
	
	public ADatabaseEmbedded( NewBaseManagerFactory factory ) {
		this.factory = factory;
	}
	
	
	
//	public T createType() {
//		System.out.println("Entered this 22 " + this.clazz.getSuperclass()  );
//		
//		System.out.println("Class type : " + this.clazz + "T:"  );
//		try {
//			return clazz.newInstance();
//		} catch (InstantiationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
	
	public boolean isTestRelationalDatabase() {
		return true;
	}
	
	@Before
	public void defaultTruncateDatabase() {
		RomeTypeDao dao = new RomeTypeDao( factory ); 
		Session s = dao.getEntityManagerUtil().getSession();
		
		List<String> tables = new ArrayList<String>();

		
//		@SuppressWarnings("deprecation")
//		// THIS WON'T COMPLILE ON HIBERNATE 5.2!!
//		Map<String, ClassMetadata> map = s.getSessionFactory().getAllClassMetadata();
//		
//
//		for( ClassMetadata c : map.values() ) {
//			SingleTableEntityPersister p = (SingleTableEntityPersister) c;
//			tables.add( p.getTableName() );
//		}
		
		
		// UPDATED FOR HIBERNATE 5.2

		Metamodel metamodel = s.getEntityManagerFactory().getMetamodel();
		
		Set<EntityType<?>> entities = metamodel.getEntities();
//		Set<ManagedType<?>> managedTypes = metamodel.getManagedTypes();
		
		
		for( EntityType<?> m : entities ) {
			
			Class<?> bindableJavaType = m.getBindableJavaType();
			
			Table t = bindableJavaType.getAnnotation( Table.class );
			
			String tablename = t.name();
			
			tables.add( tablename );
			
		}
		
		
		
		
		
		
		if( this.isTestRelationalDatabase() ) {
			this.h2DbCall( "SET REFERENTIAL_INTEGRITY FALSE" );
			
			this.h2Db_truncate( tables );
			this.h2DbCall( "SET REFERENTIAL_INTEGRITY TRUE" );
		}

	}
	

	private List<String> h2DbCall( final String sql ) {
		RomeTypeDao romeTypeDao = new RomeTypeDao( factory );
		RomeTypePropertyDao romeTypePropertyDao = new RomeTypePropertyDao( factory );
		
		Session session = romeTypeDao.getEntityManagerUtil().getSession();
		
		// not sure if we want to run a transaction stmt here or not
		List<String> fields = session.doReturningWork(
				new ReturningWork<List<String>>() {

					@Override
					public List<String> execute(Connection connection) throws SQLException {
//						String sumStatement = "TRUNCATE SCHEMA PUBLIC RESTART IDENTITY AND COMMIT NO CHECK;";
						String refIntegrity = "SET REFERENTIAL_INTEGRITY ? ";
						String truncate = "TRUNCATE  ? ";

						
						PreparedStatement refIntegrity_ps = null;
						PreparedStatement table_ps = null;

						// load columns
						try {
							
							connection.setAutoCommit( false );
							
							refIntegrity_ps = connection.prepareStatement(  sql  );
							refIntegrity_ps.executeUpdate();
							connection.commit();

						} catch( Exception e ) {
							e.printStackTrace();
							connection.rollback();

						}
						
						connection.setAutoCommit( true );

						return null;
					}
				});
		
		// if we have reached here, we return the previous table
		return fields;
	}
	
	
	private List<String> h2Db_truncate( final List<String> tables ) {
		RomeTypeDao romeTypeDao = new RomeTypeDao( factory );
		Session session = romeTypeDao.getEntityManagerUtil().getSession();
		
		// not sure if we want to run a transaction stmt here or not
		List<String> fields = session.doReturningWork(
				new ReturningWork<List<String>>() {

					@Override
					public List<String> execute(Connection connection) throws SQLException {
						PreparedStatement table_ps = null;

						// load columns
						try {
							
							connection.setAutoCommit( false );
							
							
							for( String table : tables ) {
								String nativeSql_table = connection.nativeSQL( "TRUNCATE TABLE " + table );
								table_ps = connection.prepareStatement( nativeSql_table );
								table_ps.executeUpdate();
							}
							connection.commit();
						} catch( Exception e ) {
							e.printStackTrace();
							connection.rollback();
						}
						
						connection.setAutoCommit( true );

						return null;
					}
				});
		
		return fields;
	}
	
	
}
