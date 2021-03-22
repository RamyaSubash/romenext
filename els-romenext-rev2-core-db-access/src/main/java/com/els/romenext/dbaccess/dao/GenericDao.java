package com.els.romenext.dbaccess.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityTransaction;

import com.els.romenext.dbaccess.utils.BaseEMFactory;
import com.els.romenext.dbaccess.utils.DefaultEMFactory;

public class GenericDao<T, ID extends Serializable>  {

	private Class<T> type;
	private BaseEMFactory entityManagerFactory;

	public GenericDao(Class<T> type) {
		this(type, DefaultEMFactory.getInstance());
	}

	public GenericDao(Class<T> type, BaseEMFactory entityManagerFactory ) {

		Class<?> enclosingClass = getClass().getEnclosingClass();
		String classname = "UNKNOWN";
		if (enclosingClass != null) {
			classname = enclosingClass.getName();
		} else {
			classname = getClass().getName();
		}
		
//		System.out.println("Entered the generic dao constructor [2] " + classname + " - " + Thread.currentThread().getId() );
		this.type = type;
		this.entityManagerFactory = entityManagerFactory;
	}

	public BaseEMFactory getEntityManagerUtil() {
		return entityManagerFactory;
	}

	public void setEntityManagerUtil(BaseEMFactory entityManagerFactory) {
		this.entityManagerFactory = entityManagerFactory;
	}

	// @Transactional
	public void delete(T entity) {
		entityManagerFactory.getEntityManager().remove(entity);
	}

	// @Transactional
	public T get(ID id) {
		if (id == null) {
			return null;
		} else {
			return entityManagerFactory.getEntityManager().find(type, id);
		}
	}

	@SuppressWarnings("unchecked")
	// @Transactional
	public List<T> getAll() {
		return entityManagerFactory.getEntityManager().createQuery("select o from " + type.getName() + " o ").getResultList();
	}

	// @Transactional
	public T save(T entity) {
		preprocess(entity);
		return entityManagerFactory.getEntityManager().merge(entity);
	}

	// @Transactional
	public void insert(T entity) {
		preprocess(entity);
		entityManagerFactory.getEntityManager().persist(entity);
	}

	protected T preprocess(T entity) {
		return entity;
	}
	
	public EntityTransaction getTransaction() {
		return entityManagerFactory.getEntityManager().getTransaction();
	}
	
	public void refresh( T entity ) {
		entityManagerFactory.getSession().refresh( entity );		
	}

}