package com.els.romenext.core.db.dao.permission;

import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class GroupDao extends DynamicGenericDao<Group, Long> {

	private Logger logger = Logger.getLogger( GroupDao.class );

	public GroupDao( NewBaseManagerFactory factory ) {
		super( Group.class, factory );
	}
	
	public GroupDao() {
		super( Group.class );
	}
	
	public GroupDao( String namespace ) {
		super( Group.class, namespace );
		this.namespace = namespace;
	}
	
	public Group findByHostAndName (String host, String name) {
		
		if(StringUtils.isBlank(host) || StringUtils.isBlank(name)) {
			return null;
		}
		
		System.out.println("Getting results for " + name + "@" + host);
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("Group.findByHostAndName");
		query.setParameter("host", host);
		query.setParameter("name", name);
		
		try {
			return (Group) query.getSingleResult();			
		} catch( Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return null;
		
	}
	
}
