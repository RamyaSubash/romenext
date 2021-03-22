package com.els.romenext.core.db.dao.tab;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.tab.TabActionsContainer;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class TabActionsContainerDao extends DynamicGenericDao<TabActionsContainer, Long> {
	
	private Logger logger = Logger.getLogger( TabActionsContainerDao.class );

	public TabActionsContainerDao( NewBaseManagerFactory factory ) {
		super( TabActionsContainer.class, factory );
	}
	
	public TabActionsContainerDao() {
		super( TabActionsContainer.class );
	}
	
	public TabActionsContainerDao( String namespace ) {
		super( TabActionsContainer.class, namespace );
		this.namespace = namespace;
	}
    
    public List<TabActionsContainer> findByActionLabel(String actionLabel ) {
		
		if(actionLabel == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabActionsContainer.findByActionLabel");
		query.setParameter("actionLabel", actionLabel);
			
		List<TabActionsContainer> result = null;
		
		try{
			result = (List<TabActionsContainer>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabActionsContainer.findByActionLabel, Exception thrown.", e);
		}
		
		return result;
	}
	 
    public List<TabActionsContainer> findByOnclickScript(String onclickScript ) {
		
		if(onclickScript == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabActionsContainer.findByOnclickScript");
		query.setParameter("onclickScript", onclickScript);
			
		List<TabActionsContainer> result = null;
		
		try{
			result = (List<TabActionsContainer>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabActionsContainer.findByOnclickScript, Exception thrown.", e);
		}
		
		return result;
	}
    
    public List<TabActionsContainer> findByMetadata( MetadataContainer metadata ) {
		
		if (metadata == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabActionsContainer.findByMetadata");
		query.setParameter("metadata", metadata );

		List<TabActionsContainer> result = null;
		
		try {
			result = (List<TabActionsContainer>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			logger.error("TabActionsContainer.findByMetadata, Exception thrown.", e);
			e.printStackTrace();
		}
		
		return result;
		
	}
    
}