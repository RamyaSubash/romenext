package com.els.romenext.api.utils.login;

import com.els.romenext.core.db.dao.version.RomeVersionDao;

public class ApiLoginUtils {

	
	public boolean isAuthorized( String namespace ) {
		
		
		try {
			
			// just pick a random thing to check against
			RomeVersionDao dao = new RomeVersionDao( namespace );
			
			if( dao.getEntityManagerUtil() == null ) {
				return false;
			}
			
			return true;
			
		} catch( Exception e ) {
			
		}
		
		
		return false;
		
	}
	
	
}
