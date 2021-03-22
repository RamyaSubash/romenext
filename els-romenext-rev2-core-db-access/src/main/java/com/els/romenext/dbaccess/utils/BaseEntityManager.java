package com.els.romenext.dbaccess.utils;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.LockModeType;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.metamodel.Metamodel;

import org.apache.log4j.Logger;

public class BaseEntityManager implements EntityManager {

	private Logger logger = Logger.getLogger(BaseEntityManager.class);
	
	private final EntityManager entityManager;
//	protected List<ConnectionListener> listeners = new ArrayList<ConnectionListener>();
//	private boolean hasCloseListeneresBeenCalled ;
//	private boolean hasCommitListeneresBeenCalled ;
//	private boolean hasRollbackListeneresBeenCalled ;
	
	public BaseEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
//		hasCloseListeneresBeenCalled = false;
//		hasCommitListeneresBeenCalled = false;
//		hasRollbackListeneresBeenCalled = false;
	}
	
	public void persist(Object entity) {
		this.entityManager.persist( entity );
	}

	public <T> T merge(T entity) {
		return this.entityManager.merge( entity );
		// TODO Auto-generated method stub
	}

	public void remove(Object entity) {
		this.entityManager.remove( entity );
	}

	public <T> T find(Class<T> entityClass, Object primaryKey) {
		return this.entityManager.find( entityClass, primaryKey );
	}

	public <T> T find(Class<T> entityClass, Object primaryKey,
			Map<String, Object> properties) {
		return this.entityManager.find(entityClass, primaryKey, properties );
	}

	public <T> T find(Class<T> entityClass, Object primaryKey,
			LockModeType lockMode) {
		return this.entityManager.find(entityClass, primaryKey, lockMode );
	}

	public <T> T find(Class<T> entityClass, Object primaryKey,
			LockModeType lockMode, Map<String, Object> properties) {
		return this.entityManager.find(entityClass, primaryKey, lockMode, properties);
	}

	public <T> T getReference(Class<T> entityClass, Object primaryKey) {
		return this.entityManager.getReference(entityClass, primaryKey);
	}

	public void flush() {
		this.entityManager.flush();
	}

	public void setFlushMode(FlushModeType flushMode) {
		this.entityManager.setFlushMode( flushMode );
	}

	public FlushModeType getFlushMode() {
		return this.entityManager.getFlushMode();
	}

	public void lock(Object entity, LockModeType lockMode) {
		this.entityManager.lock( entity, lockMode);
	}

	public void lock(Object entity, LockModeType lockMode,
			Map<String, Object> properties) {
		this.entityManager.lock(entity, lockMode, properties);
	}

	public void refresh(Object entity) {
		this.entityManager.refresh(entity);
	}

	public void refresh(Object entity, Map<String, Object> properties) {
		this.entityManager.refresh(entity, properties);
	}

	public void refresh(Object entity, LockModeType lockMode) {
		this.entityManager.refresh(entity, lockMode );
	}

	public void refresh(Object entity, LockModeType lockMode,
			Map<String, Object> properties) {
		this.entityManager.refresh(entity, lockMode, properties);
	}

	public void clear() {
		this.entityManager.clear();
	}

	public void detach(Object entity) {
		this.entityManager.detach(entity);
	}

	public boolean contains(Object entity) {
		return this.entityManager.contains(entity);
	}

	public LockModeType getLockMode(Object entity) {
		return this.entityManager.getLockMode(entity);
	}

	public void setProperty(String propertyName, Object value) {
		this.entityManager.setProperty(propertyName, value);
	}

	public Map<String, Object> getProperties() {
		return this.entityManager.getProperties();
	}

	public Query createQuery(String qlString) {
		return this.entityManager.createQuery(qlString);
	}

	public <T> TypedQuery<T> createQuery(CriteriaQuery<T> criteriaQuery) {
		return this.entityManager.createQuery(criteriaQuery);
	}

	public <T> TypedQuery<T> createQuery(String qlString, Class<T> resultClass) {
		return this.entityManager.createQuery(qlString, resultClass);
	}

	public Query createNamedQuery(String name) {
		return this.entityManager.createNamedQuery(name);
	}

	public <T> TypedQuery<T> createNamedQuery(String name, Class<T> resultClass) {
		return this.entityManager.createNamedQuery(name, resultClass);
	}

	public Query createNativeQuery(String sqlString) {
		return this.entityManager.createNativeQuery(sqlString);
	}

	public Query createNativeQuery(String sqlString, Class resultClass) {
		return this.entityManager.createNativeQuery(sqlString, resultClass);
	}

	public Query createNativeQuery(String sqlString, String resultSetMapping) {
		return this.entityManager.createNativeQuery(sqlString, resultSetMapping);
	}

	public void joinTransaction() {
		this.entityManager.joinTransaction();
	}

	public <T> T unwrap(Class<T> cls) {
		return this.entityManager.unwrap(cls);
	}

	public Object getDelegate() {
		return this.entityManager.getDelegate();
	}

	public void close() {
		this.entityManager.close();
	}

	public boolean isOpen() {
		return this.entityManager.isOpen();
	}

	public EntityTransaction getTransaction() {
		return this.entityManager.getTransaction();
	}

	public EntityManagerFactory getEntityManagerFactory() {
		return this.entityManager.getEntityManagerFactory();
	}

	public CriteriaBuilder getCriteriaBuilder() {
		return this.entityManager.getCriteriaBuilder();
	}

	public Metamodel getMetamodel() {
		return this.entityManager.getMetamodel();
	}
	
	
	

	@Override
	public <T> EntityGraph<T> createEntityGraph(Class<T> arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public EntityGraph<?> createEntityGraph(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StoredProcedureQuery createNamedStoredProcedureQuery(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Query createQuery(CriteriaUpdate arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Query createQuery(CriteriaDelete arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StoredProcedureQuery createStoredProcedureQuery(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StoredProcedureQuery createStoredProcedureQuery(String arg0, Class... arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public StoredProcedureQuery createStoredProcedureQuery(String arg0, String... arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public EntityGraph<?> getEntityGraph(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> List<EntityGraph<? super T>> getEntityGraphs(Class<T> arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isJoinedToTransaction() {
		// TODO Auto-generated method stub
		return false;
	}
	
	/**
	 * Added entites
	 */

	

}
