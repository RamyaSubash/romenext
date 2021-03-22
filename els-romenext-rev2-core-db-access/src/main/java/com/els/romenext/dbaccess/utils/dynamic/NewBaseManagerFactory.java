package com.els.romenext.dbaccess.utils.dynamic;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.ejb.HibernateEntityManager;

import com.els.romenext.dbaccess.utils.BaseEntityManager;

/**
 * Base entity manager factory, holds a thread local implementation of the entity managers
 * @author jlee
 *
 */
public class NewBaseManagerFactory {  

	protected static String PERSISTENCE_UNIT_KEY = "persistence_unit_name";
	protected  EntityManagerFactory entityManagerFactory ;
	protected SessionFactory sessionFactory;
	protected String namespace = null;
	
//	public static final ThreadLocal<EntityManager> entitymanager = new ThreadLocal<EntityManager>();
	
	protected static ConcurrentHashMap< String, ThreadLocal<EntityManager> > manager = new ConcurrentHashMap<String, ThreadLocal<EntityManager>>();
	protected static ConcurrentHashMap< String, EntityManagerFactory > managerFactory = new ConcurrentHashMap<String, EntityManagerFactory>();
	
	
	public EntityManagerFactory getEntityManagerFactory() {
		
		
		
//		Map<String,Object> configs = new HashMap<String, Object>();
//		configs.put("javax.persistence.provider","org.hibernate.ejb.HibernatePersistence");
//		configs.put("javax.persistence.jdbc.driver", "com.mysql.cj.jdbc.Driver" );
//		configs.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect" );
//		configs.put("javax.persistence.jdbc.url", "jdbc:mysql://localhost:3306/romenext2" );
//		configs.put("hibernate.hbm2ddl.auto", "update" );
//		configs.put("javax.persistence.jdbc.user", "romenext" );
//		configs.put("javax.persistence.jdbc.password", "superman" );
//		
//		
//		
//		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Manager1", configs );
//		
//		return emf;
		
		String ns = null;
		if( StringUtils.isEmpty( this.namespace ) ) {
			ns = "default";
		} else {
			ns = this.namespace;
		}
		
		
		return this.managerFactory.get( ns );
		
		
		
		/**
		 * Old code below
		 */
//		 return entityManagerFactory;
	}

	public Session getSession() {
		
		String ns = null;
		if( StringUtils.isEmpty( this.namespace ) ) {
			ns = "default";
		} else {
			ns = this.namespace;
		}
		EntityManager em = this.getEntityManager();
		Session session = em.unwrap(Session.class);
		return session;
	}
	
	public EntityManager getEntityManager() {
		
		
		String ns = null;
		if( StringUtils.isEmpty( this.namespace ) ) {
			ns = "default";
		} else {
			ns = this.namespace;
		}
		
		System.out.println("Loading this namespace : " + ns );
		
		ThreadLocal<EntityManager> threadLocal = manager.get( ns );
		
		// do we need to null check the threadlocal?
		if( threadLocal == null ) {
			System.out.println("Resetting threadlocal");
			manager.put( ns,  new ThreadLocal<EntityManager>() );
			threadLocal = manager.get( ns );
		}
		
		// retrieve the entity manager if there is one
		EntityManager em = threadLocal.get();

		// if no entity manager is found or if it's closed, create a new one
		if( em == null || !em.isOpen() ) {
			EntityManagerFactory emFacttmp = getEntityManagerFactory();
			
			EntityManager emTmp = emFacttmp.createEntityManager();
			
			em = new BaseEntityManager( emTmp );
			
			
//			em = new BaseEntityManager( getEntityManagerFactory().createEntityManager() );
			threadLocal.set( em );
			System.out.println("Create new EM");
		}
		return em;
		
		
		
		/**
		 * Old code below
		 */
		
//		// retrieve the entity manager if there is one
//		
//		
//		// can we see the factory that was created
//		
//		EntityManager em = entitymanager.get();
//
//		
//		// if no entity manager is found or if it's closed, create a new one
//		if( em == null
//				|| !em.isOpen() ) {
//			em = new BaseEntityManager( getEntityManagerFactory().createEntityManager() );
//			entitymanager.set( em );
//		}
//		System.out.println("Super class: " + em.getClass().getSuperclass() );
//		return em;
		
	}

	/**
	 * Do we care which entity manager we close for this thread?
	 * @param key
	 */
	public void closeEntityManager( final String... namespace ) {
		String ns = null;
		if( namespace == null || namespace.length == 0 ) {
			ns = "default";
		} else {
			ns = namespace[0];
		}
		
		ThreadLocal<EntityManager> threadLocal = manager.get( ns );
		
		if( threadLocal == null ) {
			// if it's null....do we need to do anything? no?
			return;
		}
		
		EntityManager em = threadLocal.get();

		// if any entity managers were in threadlocal, kill them 
		if (em != null && em.isOpen()) {
			em.close();
			em = null;
		}
		
		// kill all entity managers
		threadLocal.set(null);
		
		manager.put( ns,  threadLocal );
		
		/**
		 * Old code below
		 */
		
//		EntityManager em = entitymanager.get();
//
//		// if any entity managers were in threadlocal, kill them 
//		if (em != null && em.isOpen()) {
//			em.close();
//			em = null;
//		}
//		
//		// kill all entity managers
//		entitymanager.set(null);
	}
	
	public static void closeAll() {
		
		NewBaseManagerFactory.manager = new ConcurrentHashMap<String, ThreadLocal<EntityManager>>();
		NewBaseManagerFactory.managerFactory = new ConcurrentHashMap<String, EntityManagerFactory>();
		
		
	}
}