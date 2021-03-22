package com.els.romenext.core.db.dao.version;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.version.RomeVersion;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeVersionDao extends DynamicGenericDao<RomeVersion, Long> {
	
	private Logger logger = Logger.getLogger( RomeVersionDao.class );

	public RomeVersionDao( NewBaseManagerFactory factory ) {
		super( RomeVersion.class, factory );
	}
	
	public RomeVersionDao() {
		super( RomeVersion.class );
	}
	
	public RomeVersionDao( String namespace ) {
		super( RomeVersion.class, namespace );
		this.namespace = namespace;
	}
	
	public RomeVersion findLatest() {
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeVersion.findLatestVersion");

		query.setMaxResults( 1 );
		
		RomeVersion result = null;
		try {
			result = (RomeVersion) query.getSingleResult();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
			return null;
		}		
		return result;
	}
	
}
