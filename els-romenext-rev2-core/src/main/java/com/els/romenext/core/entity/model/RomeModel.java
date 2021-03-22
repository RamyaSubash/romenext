package com.els.romenext.core.entity.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.Session;

import com.els.romenext.core.db.dao.model.ModelDao;
import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.ModelShape;

public class RomeModel {

	public Long id;
	public String name;
	public Date createdDate;
	public Date modifiedDate;
	public List<RomeModelProperty> fields = new ArrayList<RomeModelProperty>();
	public List<RomeShape> shapes = new ArrayList<RomeShape>();
	//	public RomeType romeType;

	public Boolean childEnabled;

	public static List<RomeModel> convert( List<Model> oldModels ) {
		
		List<RomeModel> models = new ArrayList<RomeModel>();
		
		for( Model m : oldModels ) {
			models.add( RomeModel.convert( m ) );
		}
		
		return models;
	}

	public static RomeModel convert( Model oldModel ) {
		
		RomeModel m = new RomeModel();
		
		m.createdDate = oldModel.getCreatedDate();
		m.id = oldModel.getId();
		m.modifiedDate = oldModel.getModifiedDate();
		m.name = oldModel.getName();
		
		m.childEnabled = oldModel.getChildEnabled();
		
		m.shapes = new ArrayList<RomeShape>();
		
		// conver the shapes
//		ModelDao dao = new ModelDao();
//		dao.getTransaction().begin();
//		//		System.out.println( "CHECK : " +  Hibernate.isInitialized( oldModel.getShapes() ) );
//		dao.getEntityManagerUtil().getSession().refresh( oldModel );
////		Hibernate.initialize( oldModel.getShapes() );
//		dao.getTransaction().commit();
		
		for( ModelShape s : oldModel.getShapes() ) {
			m.shapes.add( RomeShape.convert( s ) );
		}
		
		return m;
		
	}
}
