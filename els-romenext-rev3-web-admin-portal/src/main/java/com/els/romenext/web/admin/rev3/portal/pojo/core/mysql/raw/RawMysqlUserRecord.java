package com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw; 

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.els.romenext.web.general.utils.ResultSetUtils;

public class RawMysqlUserRecord {

//	INSERT INTO `romenext`.`els_romenext_users`
//	(`id`,
//	`created_date`,
//	`modified_date`,
//	`pw`,
//	`status`,
//	`username`,
//	`name`,
//	`redirect_ip`,
//	`is_redirected`)
//	VALUES
//	(<{id: }>,
//	<{created_date: }>,
//	<{modified_date: }>,
//	<{pw: }>,
//	<{status: }>,
//	<{username: }>,
//	<{name: }>,
//	<{redirect_ip: }>,
//	<{is_redirected: }>);


	private Long id = null;  
	private Date created_date =  null;
	private Date modified_date = null; 
	private String name = null;
	private String username;
	 

	public static RawMysqlUserRecord build( ResultSet res ) {
		
		if( res == null ) {
			return null;
		}
		
		RawMysqlUserRecord r = new RawMysqlUserRecord();
		
		r.id = ResultSetUtils.getColumnNoChange_Long( res, "id" );  
		r.created_date = ResultSetUtils.getColumnNoChange_Date( res, "created_date" );
		r.modified_date = ResultSetUtils.getColumnNoChange_Date( res, "modified_date" ); 
		r.name = ResultSetUtils.getColumnNoChange_String( res, "name" ); 
		r.username = ResultSetUtils.getColumnNoChange_String(res, "username");
		
		return r;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public Date getCreated_date() {
		return created_date;
	}



	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}



	public Date getModified_date() {
		return modified_date;
	}



	public void setModified_date(Date modified_date) {
		this.modified_date = modified_date;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}


	

}



