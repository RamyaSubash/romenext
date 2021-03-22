package com.els.romenext.core.db.dao.workspace;

import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.workspace.DisplayWorkspace;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class DisplayWorkspaceDao extends DynamicGenericDao<DisplayWorkspace, Long> {
	
	private Logger logger = Logger.getLogger( DisplayWorkspaceDao.class );

	public DisplayWorkspaceDao( NewBaseManagerFactory factory ) {
		super( DisplayWorkspace.class, factory );
	}
	
	public DisplayWorkspaceDao() {
		super( DisplayWorkspace.class );
	}
	
	public DisplayWorkspaceDao( String namespace ) {
		super( DisplayWorkspace.class, namespace );
		this.namespace = namespace;
	}

	public List<DisplayWorkspace> getByUserNameAndGroupName( String username, String groupname ) {
		if( StringUtils.isAnyEmpty( username, groupname ) ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("DisplayWorkspace.findByUserNameAndGroupName");
		query.setParameter("userName", username);
		query.setParameter("userGroup", groupname);
		
		List<DisplayWorkspace> result = null;
		
		try{
			result = (List<DisplayWorkspace>) query.getResultList();
		} catch (Exception e) {
			logger.error("DisplayWorkspace.findByRomeRule, Exception thrown.", e);
		}
		
		return result;
	}
	
//	public List<DisplayWorkspace> findByRomeRuleAndName(RomeRule romeRule, String name) {
//		if(romeRule == null || name == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("DisplayWorkspace.findByRomeRuleAndName");
//		query.setParameter("romeRule", romeRule);
//		query.setParameter("name", name);
//		
//		List<DisplayWorkspace> result = null;
//		
//		try{
//			result = (List<DisplayWorkspace>) query.getResultList();
//		} catch (Exception e) {
//			logger.error("DisplayWorkspace.findByRomeRuleAndName, Exception thrown.", e);
//		}
//		
//		return result;
//	}
//	
//	public DisplayWorkspace findByRomeRuleAndId(RomeRule romeRule, Long propId ) {
//		if(romeRule == null || propId == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("DisplayWorkspace.findByRomeRuleAndId");
//		query.setParameter("romeRule", romeRule);
//		query.setParameter("id", propId);
//		
//		DisplayWorkspace result = null;
//		
//		try{
//			result = (DisplayWorkspace) query.getSingleResult();
//		} catch (Exception e) {
//			logger.error("DisplayWorkspace.findByRomeRuleAndName, Exception thrown.", e);
//		}
//		
//		return result;
//	}
}