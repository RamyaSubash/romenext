package com.els.romenext.dbaccess.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.Query;

import com.els.romenext.dbaccess.utils.dynamic.DefaultMysqlEMFactory;
import com.els.romenext.dbaccess.utils.dynamic.DynamicEMFactory;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class DynamicGenericDao<T, ID extends Serializable>  {

	private Class<T> type;
	private NewBaseManagerFactory entityManagerFactory;

	
	
	protected String namespace;

//	public DynamicGenericDao(Class<T> type ) {
//		this(type, DefaultMysqlEMFactory.getInstance());
//	}
	
	public DynamicGenericDao(Class<T> type ) {
		this(type, DynamicEMFactory.getInstance());
	}

	public DynamicGenericDao(Class<T> type, NewBaseManagerFactory entityManagerFactory ) {
		System.out.println("Entered Dynamic Generic Dao");
		Class<?> enclosingClass = getClass().getEnclosingClass();
		String classname = "UNKNOWN";
		if (enclosingClass != null) {
			classname = enclosingClass.getName();
		} else {
			classname = getClass().getName();
		}
		
		System.out.println("Entered the generic dao constructor [2] " + classname + " - " + Thread.currentThread().getId() );
		this.type = type;
		this.entityManagerFactory = entityManagerFactory;
	}
	
	public DynamicGenericDao( Class<T> type, String namespace ) {
		
		NewBaseManagerFactory instance = DynamicEMFactory.getInstance(namespace);
		Class<?> enclosingClass = getClass().getEnclosingClass();
		String classname = "UNKNOWN";
		if (enclosingClass != null) {
			classname = enclosingClass.getName();
		} else {
			classname = getClass().getName();
		}
		
		System.out.println("Entered the generic dao constructor [2] " + classname + " - " + Thread.currentThread().getId() );
		this.type = type;
		this.entityManagerFactory = instance;	
	}

	public NewBaseManagerFactory getEntityManagerUtil() {
		return entityManagerFactory;
	}

	public void setEntityManagerUtil(NewBaseManagerFactory entityManagerFactory) {
		this.entityManagerFactory = entityManagerFactory;
	}

	// @Transactional
	public void delete(T entity) {
		entityManagerFactory.getEntityManager( ).remove(entity);
	}

	// @Transactional
	public T get(ID id) {
		if (id == null) {
			return null;
		} else {
			return entityManagerFactory.getEntityManager(  ).find(type, id);
		}
	}

	@SuppressWarnings("unchecked")
	// @Transactional
	public List<T> getAll( ) {
		
		EntityManager em = entityManagerFactory.getEntityManager();
		Query createQuery = em.createQuery( "select o from " + type.getName() + " o " );
		
		List resultList = createQuery.getResultList();
		
		return entityManagerFactory.getEntityManager().createQuery("select o from " + type.getName() + " o ").getResultList();
	}

	// @Transactional
	public T save(T entity) {
		preprocess(entity);
		return entityManagerFactory.getEntityManager(   ).merge(entity);
	}

	// @Transactional
	public void insert(T entity) {
		preprocess(entity);
		entityManagerFactory.getEntityManager(  ).persist(entity);
	}

	protected T preprocess(T entity) {
		return entity;
	}
	
	public EntityTransaction getTransaction() {
		return entityManagerFactory.getEntityManager().getTransaction();
	}
	
	public void refresh( T entity ) {
		entityManagerFactory.getSession(   ).refresh( entity );		
	}
	
	public T getFromSession( Class<T> clazz, ID id) {
		if (id == null) {
			return null;
		} else {
			return entityManagerFactory.getSession().get( clazz, id);

//			return entityManagerFactory.getEntityManager(  ).find(type, id);
		}
	}
	
	
//	public void addNewDatabase( String namespace, Class<T> type, NewBaseManagerFactory entityManagerFactory ) {
//		entityManagerFactory.a
//	}
	
	

}