package com.els.romenext.core.db.dao.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.ModelShape;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class ModelShapeDao extends DynamicGenericDao<ModelShape, Long> {
	
	private Logger logger = Logger.getLogger( ModelShapeDao.class );

	public ModelShapeDao( NewBaseManagerFactory factory ) {
		super( ModelShape.class, factory );
	}
	
	public ModelShapeDao() {
		super( ModelShape.class );
	}
	
	public ModelShapeDao( String namespace ) {
		super( ModelShape.class, namespace );
		this.namespace = namespace;
	}

	public List<ModelShape> findByName( String name) {
		
		if (name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelShape.findByName");
		query.setParameter("name", name);

		List<ModelShape> result = null;
		
		try {
			result = (List<ModelShape>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	public Integer getMaxShapeGroup( Model model ) {
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelShape.findMaxGroupId");
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
	
	public Map<Integer,List<ModelShape>> getOnlyGroupShapes( Model model ) {
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelShape.findOnlyGroupShapes");
		query.setParameter("model", model);

		
		List<ModelShape> result = null;
		
		try {
			result = (List<ModelShape>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		Map<Integer,List<ModelShape>> map = new HashMap<Integer, List<ModelShape>>();
		
		for( ModelShape s : result ) {
			Integer group = s.getGroup();
			
			List<ModelShape> list = map.get( group );
			
			if( list == null ) {
				list = new ArrayList<ModelShape>();
			}
			list.add( s );
			
			map.put( group,  list );
		}
		
		return map;
	}
	
	public List<ModelShape> getOnlyGroupShapes( Model model, Integer groupShapeId ) {
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelShape.findOnlyGroupShapesAndId");
		query.setParameter("model", model);
		query.setParameter("group", groupShapeId );
		
		List<ModelShape> result = null;
		
		try {
			result = (List<ModelShape>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		
		return result;
//		
//		Map<Integer,List<ModelShape>> map = new HashMap<Integer, List<ModelShape>>();
//		
//		for( ModelShape s : result ) {
//			Integer group = s.getGroup();
//			
//			List<ModelShape> list = map.get( group );
//			
//			if( list == null ) {
//				list = new ArrayList<ModelShape>();
//			}
//			list.add( s );
//			
//			map.put( group,  list );
//		}
//		
//		return map;
	}
	
	public List<ModelShape> getNonGroupShape( Model model ) {
		
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelShape.findNonGroupShapes");
		query.setParameter("model", model);
		
		
		List<ModelShape> result = null;
		
		try {
			result = (List<ModelShape>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<ModelShape> findByModel(Model model) {
		
		if (model == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("ModelShape.findByModel");
		query.setParameter("model", model);
		
		
		List<ModelShape> result = null;
		
		try {
			result = (List<ModelShape>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
}
