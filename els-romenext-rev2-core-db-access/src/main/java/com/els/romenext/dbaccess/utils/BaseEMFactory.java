package com.els.romenext.dbaccess.utils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.Session;
import org.hibernate.ejb.HibernateEntityManager;

/**
 * Base entity manager factory, holds a thread local implementation of the entity managers
 * @author jlee
 *
 */
public class BaseEMFactory {  

	protected static String PERSISTENCE_UNIT_KEY = "persistence_unit_name";
	protected  EntityManagerFactory entityManagerFactory ;
	public static final ThreadLocal<EntityManager> entitymanager = new ThreadLocal<EntityManager>();

	public EntityManagerFactory getEntityManagerFactory() {
		return entityManagerFactory;
	}

	public Session getSession() {
		EntityManager em = this.getEntityManager();
		Session session = em.unwrap(Session.class);
		return session;
	}
	
	public EntityManager getEntityManager() {
		// retrieve the entity manager if there is one
		
		
		// can we see the factory that was created
		
		EntityManager em = entitymanager.get();

		
		// if no entity manager is found or if it's closed, create a new one
		if( em == null
				|| !em.isOpen() ) {
			em = new BaseEntityManager( getEntityManagerFactory().createEntityManager() );
			entitymanager.set( em );
		}
		return em;
	}

	public void closeEntityManager() {
		EntityManager em = entitymanager.get();

		// if any entity managers were in threadlocal, kill them 
		if (em != null && em.isOpen()) {
			em.close();
			em = null;
		}
		
		// kill all entity managers
		entitymanager.set(null);
	}
}