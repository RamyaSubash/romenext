package com.els.romenext.core.db.dao.deco;

import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.enums.deco.RomeDecoratorClassification;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeDecoratorDao extends DynamicGenericDao<RomeDecorator, Long> {
	
	private Logger logger = Logger.getLogger( RomeDecoratorDao.class );

	public RomeDecoratorDao( NewBaseManagerFactory factory ) {
		super( RomeDecorator.class, factory );
	}
	
	public RomeDecoratorDao() {
		super( RomeDecorator.class );
	}
	
	public RomeDecoratorDao( String namespace ) {
		super( RomeDecorator.class, namespace );
		this.namespace = namespace;
	}

	@Deprecated
	public List<RomeDecorator> findByName( String name ) {
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecorator.findByName");
		
		List<RomeDecorator> RomeDecorators = null;
		query.setParameter("name", name );

		RomeDecorators = (List<RomeDecorator>) query.getResultList();
		
		return RomeDecorators;
	}
	
	public List<RomeDecorator> findByClassification( RomeDecoratorClassification classification ) {
		
		if( classification == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecorator.findByClassification");
		
		List<RomeDecorator> RomeDecorators = null;
		query.setParameter("classification", classification.getClassification() );

		RomeDecorators = (List<RomeDecorator>) query.getResultList();
		
		return RomeDecorators;
	}
	
	@Deprecated
	public List<RomeDecorator> findByNameAndGrouping (String name, String grouping) {
		
		if(StringUtils.isAnyBlank(name, grouping)) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecorator.findByNameAndGrouping");
		
		List<RomeDecorator> RomeDecorators = null;
		query.setParameter("name", name);
		query.setParameter("grouping", grouping);

		RomeDecorators = (List<RomeDecorator>) query.getResultList();
		
		return RomeDecorators;
	}
	
	public List<RomeDecorator> findByClassification( RomeDecoratorClassification classification, String grouping ) {
		
		if( classification == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecorator.findByClassificationAndGrouping");
		
		List<RomeDecorator> RomeDecorators = null;
		query.setParameter("classification", classification.getClassification() );
		query.setParameter("grouping", grouping);

		RomeDecorators = (List<RomeDecorator>) query.getResultList();
		
		return RomeDecorators;
	}
	
}