package com.els.romenext.web.admin.rev3.portal.utils.mysql.query.repo;

import org.apache.commons.lang3.StringUtils;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;

public class MysqlRepositorySQLUtils {

	private static final String CORE_REPOSITORY_TABLE_NAME = "els_romenext_metadata_repo";
	
	
	
	public static String getRepositoryInfo( final String schema ) {
		// SELECT * FROM romenext.els_romenext_metadata;

		return "SELECT * FROM " + schema + "." + CORE_REPOSITORY_TABLE_NAME + ";";
	}
	 
	
	public static String updateRepositoryInfo( final String schema, final MysqlRepositoryServer repo ) {
		// SELECT * FROM romenext.els_romenext_metadata;

		String query = "UPDATE `" + schema + "`.`" + CORE_REPOSITORY_TABLE_NAME + "` SET ";
		
		
		if( !StringUtils.isEmpty( repo.getIp() ) ) {
			query += " `ip` = '" + repo.getIp() + "',";
		} else {
			query += " `ip` = '',";
		}
		
		if( !StringUtils.isEmpty( repo.getDescription() ) ) {
			query += " `description` = '" + repo.getDescription() + "',";
		} else {
			query += " `description` = '',";
		}
		
		if( !StringUtils.isEmpty( repo.getName() ) ) {
			query += " `name` = '" + repo.getName() + "',";
		} else {
			query += " `name` = '',";
		}
		
		if( !StringUtils.isEmpty( repo.getUsername() ) ) {
			query += " `username` = '" + repo.getUsername() + "',";
		} else {
			query += " `username` = '',";
		}
		
		if( !StringUtils.isEmpty( repo.getPassword() ) ) {
			query += " `password` = '" + repo.getPassword() + "',";
		} else {
			query += " `password` = '',";
		}
		
		query += " `modified_date` = now() ";
		query += " WHERE `id`= '" + repo.getId() + "';";
		
		
		
		return query;
	}
}
