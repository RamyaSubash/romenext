package com.els.romenext.core.db.dao.mysql;
import javax.persistence.Query;
import javax.persistence.NoResultException;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.mysql.RomeMysqlUser;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeMysqlUserDao extends DynamicGenericDao<RomeMysqlUser, Long> {
	
	private Logger logger = Logger.getLogger( RomeMysqlUserDao.class );
 
	
	public RomeMysqlUserDao( NewBaseManagerFactory factory ) {
		super( RomeMysqlUser.class, factory );
	}
	
	public RomeMysqlUserDao() {
		super( RomeMysqlUser.class );
	}
	
	public RomeMysqlUserDao( String namespace ) {
		super( RomeMysqlUser.class, namespace );
		this.namespace = namespace;
	} 
	
	public RomeMysqlUser findByUsername( String username ) {
		if( username == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeMysqlUser.findByUsername");
		query.setParameter("username", username );
		
		RomeMysqlUser user = null;
	
		try {
			user = (RomeMysqlUser) query.getSingleResult();
		} catch (NoResultException e) {
			System.out.println("No results found for els_romenext_users!" );
		}
		
		
		return user;
	}
	
}