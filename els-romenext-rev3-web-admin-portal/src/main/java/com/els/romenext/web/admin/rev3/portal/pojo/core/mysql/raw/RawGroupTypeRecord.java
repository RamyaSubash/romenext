package com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw;  

import java.sql.ResultSet;
import java.util.Date;

import com.els.romenext.web.general.utils.ResultSetUtils;

public class RawGroupTypeRecord {

//	INSERT INTO `romenext`.`els_romenext_mysql_group_type`
//	(`id`,
//	`mysql_group`,
//	`rome_type`)
//	VALUES
//	(<{id: }>,
//	<{mysql_group: }>,
//	<{rome_type: }>);

	private Long id = null;  
	private Long mysqlGroupId = null;
	private Long romeTypeId = null;
	 
	


	public static RawGroupTypeRecord build( ResultSet res ) {
		
		if( res == null ) {
			return null;
		}
		
		RawGroupTypeRecord r = new RawGroupTypeRecord();
		
		r.id = ResultSetUtils.getColumnNoChange_Long( res, "id" );  
		r.mysqlGroupId = ResultSetUtils.getColumnNoChange_Long( res, "mysql_group" );  
		r.romeTypeId = ResultSetUtils.getColumnNoChange_Long( res, "rome_type" );  

		
		return r;
	}




	public Long getId() {
		return id;
	}




	public void setId(Long id) {
		this.id = id;
	}




	public Long getMysqlGroupId() {
		return mysqlGroupId;
	}




	public void setMysqlGroupId(Long mysqlGroupId) {
		this.mysqlGroupId = mysqlGroupId;
	}




	public Long getRomeTypeId() {
		return romeTypeId;
	}




	public void setRomeTypeId(Long romeTypeId) {
		this.romeTypeId = romeTypeId;
	}



	


}



