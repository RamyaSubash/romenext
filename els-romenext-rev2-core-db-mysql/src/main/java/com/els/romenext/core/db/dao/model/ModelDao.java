package com.els.romenext.core.db.dao.model;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class ModelDao extends DynamicGenericDao<Model, Long> {
	
	private Logger logger = Logger.getLogger( ModelDao.class );

	public ModelDao( NewBaseManagerFactory factory ) {
		super( Model.class, factory );
	}
	
	public ModelDao() {
		super( Model.class );
	}
	
	public ModelDao( String namespace ) {
		super( Model.class, namespace );
		this.namespace = namespace;
	}
	
	public List<Model> findByName( String name) {
		
		if (name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Model.findByName");
		query.setParameter("name", name);

		List<Model> result = null;
		
		try {
			result = (List<Model>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<Model> findByRomeType( RomeType type ) {
		
		if (type == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Model.findByType");
		query.setParameter("type", type);

		List<Model> result = null;
		
		try {
			result = (List<Model>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	
}
