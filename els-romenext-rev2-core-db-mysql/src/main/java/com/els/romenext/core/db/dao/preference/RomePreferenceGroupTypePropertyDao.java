package com.els.romenext.core.db.dao.preference;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypeProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomePreferenceGroupTypePropertyDao extends DynamicGenericDao<RomePreferenceGroupTypeProperty, Long> {
	
	private Logger logger = Logger.getLogger( RomePreferenceGroupTypePropertyDao.class );

	public RomePreferenceGroupTypePropertyDao( NewBaseManagerFactory factory ) {
		super( RomePreferenceGroupTypeProperty.class, factory );
	}
	
	public RomePreferenceGroupTypePropertyDao() {
		super( RomePreferenceGroupTypeProperty.class );
	}
	
	public RomePreferenceGroupTypePropertyDao( String namespace ) {
		super( RomePreferenceGroupTypeProperty.class, namespace );
		this.namespace = namespace;
	}
	
	public List<RomePreferenceGroupTypeProperty> findByRomeType(RomeType romeType) {
		
		if(romeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomePreferenceGroupTypeProperty.findByRomeType");
		query.setParameter("romeType", romeType);
		
		List<RomePreferenceGroupTypeProperty> result = null;
		
		try{
			result = (List<RomePreferenceGroupTypeProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomePreferenceGroupTypePropertyValue.findByRomeGroupType, Exception thrown.", e);
		}
		
		return result;
	}
	
	
}
