package com.els.romenext.web.admin.rev3.portal.utils.mysql.query;

public class MysqlVersionSQLUtils {

	
	/**
	 * SELECT `els_romenext_version`.`id`,
    `els_romenext_version`.`build`,
    `els_romenext_version`.`changes`,
    `els_romenext_version`.`description`,
    `els_romenext_version`.`latest_sql_file`,
    `els_romenext_version`.`major`,
    `els_romenext_version`.`minor`,
    `els_romenext_version`.`rev`,
    `els_romenext_version`.`tag`,
    `els_romenext_version`.`created_date`
FROM `romenext`.`els_romenext_version`;

	 * @return
	 */
	public static String getSQL_Version_get( final String schema ) {
		return "SELECT `id`, `build`, `changes`, `description`, `latest_sql_file`, `major`, `minor`, `rev`, `tag`, `created_date` FROM `" + schema + "`.`els_romenext_version`;";
	}
	
	public static String getSQL_Version_latest( final String schema ) {
		return "SELECT `id`, `build`, `changes`, `description`, `latest_sql_file`, `major`, `minor`, `rev`, `tag`, `created_date` FROM `" + schema + "`.`els_romenext_version` order by id desc limit 1;";
	}
	
	public static String getSQL_Version_count( final String schema ) {
		return "SELECT count(*) as total FROM `" + schema + "`.`els_romenext_version`;";
	}
}
