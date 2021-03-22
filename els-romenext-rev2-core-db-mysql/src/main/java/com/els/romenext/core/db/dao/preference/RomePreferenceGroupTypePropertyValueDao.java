package com.els.romenext.core.db.dao.preference;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypePropertyValue;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomePreferenceGroupTypePropertyValueDao extends DynamicGenericDao<RomePreferenceGroupTypePropertyValue, Long> {
	
	private Logger logger = Logger.getLogger( RomePreferenceGroupTypePropertyValueDao.class );

	public RomePreferenceGroupTypePropertyValueDao( NewBaseManagerFactory factory ) {
		super( RomePreferenceGroupTypePropertyValue.class, factory );
	}
	
	public RomePreferenceGroupTypePropertyValueDao() {
		super( RomePreferenceGroupTypePropertyValue.class );
	}
	
	public RomePreferenceGroupTypePropertyValueDao( String namespace ) {
		super( RomePreferenceGroupTypePropertyValue.class, namespace );
		this.namespace = namespace;
	}
	
	public List<RomePreferenceGroupTypePropertyValue> findByRomeType(RomeGroupType romeGroupType) {
		
		if(romeGroupType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomePreferenceGroupTypePropertyValue.findByRomeGroupType");
		query.setParameter("romeGroupType", romeGroupType);
		
		List<RomePreferenceGroupTypePropertyValue> result = null;
		
		try{
			result = (List<RomePreferenceGroupTypePropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomePreferenceGroupTypePropertyValue.findByRomeGroupType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomePreferenceGroupTypePropertyValue> findByRomeTypeAndPref(RomeGroupType romeGroupType, RomePreferenceGroupTypePropertyValue pref ) {
		
		if(romeGroupType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomePreferenceGroupTypePropertyValue.findByRomeTypeAndPreferenceProperty");
		query.setParameter("romeGroupType", romeGroupType);
		query.setParameter("romePreferenceProperty", pref);

		
		List<RomePreferenceGroupTypePropertyValue> result = null;
		
		try{
			result = (List<RomePreferenceGroupTypePropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomePreferenceGroupTypePropertyValue.findByRomeGroupType, Exception thrown.", e);
		}
		
		return result;
	}
	
}
