package com.els.romenext.api.entities.utils;

import org.apache.log4j.Logger;

import com.els.romenext.api.entities.UserGroup;
import com.els.romenext.core.db.entity.permission.Group;

public class UserGroupUtils {

	private static Logger log = Logger.getLogger( UserGroupUtils.class );
	
	public UserGroupUtils() {
		
	}
	
	public UserGroup build(Group group) {
		
		if (group == null) {
			System.out.println("Group Null");
			return null;
		}
		
		UserGroup userGroup = new UserGroup();
		
		userGroup.setId(group.getId());
		userGroup.setHost(group.getHost());
		userGroup.setName(group.getName());
		
		userGroup.setCREATE(group.getI());
		userGroup.setREAD(group.getS());
		userGroup.setUPDATE(group.getU());
		userGroup.setDELETE(group.getD());
		
		return userGroup;
	}

}
