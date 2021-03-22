package com.els.romenext.core.db.dao.log;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.log.UserLog;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class UserLogDao extends DynamicGenericDao<UserLog, Long> {
	
	private Logger logger = Logger.getLogger( UserLogDao.class );

	public UserLogDao( NewBaseManagerFactory factory ) {
		super( UserLog.class, factory );
	}
	
	public UserLogDao() {
		super( UserLog.class );
	}
	
	public UserLogDao( String namespace ) {
		super( UserLog.class, namespace );
		this.namespace = namespace;
	}
	
	public List<UserLog> findByUserUuid (String userUuid) {
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("UserLog.findByUserUuid");
		
		List<UserLog> userLogs = null;
		query.setParameter("userUuid", userUuid );

		userLogs = (List<UserLog>) query.getResultList();
		
		return userLogs;
		
	}
	
}
