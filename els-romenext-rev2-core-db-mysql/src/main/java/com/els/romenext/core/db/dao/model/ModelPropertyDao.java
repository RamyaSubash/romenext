package com.els.romenext.core.db.dao.model;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.ModelProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class ModelPropertyDao extends DynamicGenericDao<ModelProperty, Long> {
	
	private Logger logger = Logger.getLogger( ModelPropertyDao.class );

	public ModelPropertyDao( NewBaseManagerFactory factory ) {
		super( ModelProperty.class, factory );
	}
	
	public ModelPropertyDao() {
		super( ModelProperty.class );
	}
	
	public ModelPropertyDao( String namespace ) {
		super( ModelProperty.class, namespace );
		this.namespace = namespace;
	}

	public List<ModelProperty> findByName( String name) {
		
		if (name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelProperty.findByName");
		query.setParameter("name", name);

		List<ModelProperty> result = null;
		
		try {
			result = (List<ModelProperty>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<ModelProperty> findByModel( Model model ) {
		
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelProperty.findByModel");
		query.setParameter("model", model);

		List<ModelProperty> result = null;
		
		try {
			result = (List<ModelProperty>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
