package com.els.romenext.core.db.dao.model;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.ModelProperty;
import com.els.romenext.core.db.entity.model.Part;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class PartDao extends DynamicGenericDao<Part, Long> {
	
	private Logger logger = Logger.getLogger( PartDao.class );

	public PartDao( NewBaseManagerFactory factory ) {
		super( Part.class, factory );
	}
	
	public PartDao() {
		super( Part.class );
	}
	
	public PartDao( String namespace ) {
		super( Part.class, namespace );
		this.namespace = namespace;
	}

	public List<Part> findByName( String name) {
		
		if (name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Part.findByName");
		query.setParameter("name", name);

		List<Part> result = null;
		
		try {
			result = (List<Part>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<Part> findByModelProperty( ModelProperty property ) {
		
		if (property == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Part.findByModelProperty");
		query.setParameter("modelProperty", property);

		List<Part> result = null;
		
		try {
			result = (List<Part>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<Part> findByModel( Model model ) {
		
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Part.findByModel");
		query.setParameter("model", model);

		List<Part> result = null;
		
		try {
			result = (List<Part>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<Part> findByGroupPart( Model model, Integer group ) {

		if (model == null || group == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Part.findByModelAndGroup");
		query.setParameter("model", model);
		query.setParameter("group", group);

		List<Part> result = null;
		
		try {
			result = (List<Part>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public Integer findMaxGroupId( Model model ) {
		
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Part.findMaxGroupId");
		query.setParameter("model", model);

		query.setMaxResults( 1 );
		
		
		Integer result = null;
		
		try {
			result = (Integer) query.getSingleResult();
		} catch (Exception  e) {
			logger.warn("Exception thrown but probably nothing", e );
		}
		
		
		return result;
		
		
		
	}
	
}
