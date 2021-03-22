package com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw; 

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.els.romenext.web.general.utils.ResultSetUtils;

public class RawTypeRecord {

//	INSERT INTO `romenext`.`els_romenext_types`
//	(`id`,
//	`classification`,
//	`created_date`,
//	`is_internal`,
//	`is_root_type`,
//	`modified_date`,
//	`name`,
//	`restrictionStatus`,
//	`version`,
//	`metadata_id`)
//	VALUES
//	(<{id: }>,
//	<{classification: }>,
//	<{created_date: }>,
//	<{is_internal: }>,
//	<{is_root_type: }>,
//	<{modified_date: }>,
//	<{name: }>,
//	<{restrictionStatus: }>,
//	<{version: }>,
//	<{metadata_id: }>);

	private Long id = null;  
	private Date created_date =  null;
	private Date modified_date = null; 
	private String name = null;
	private Integer isInternal = null;
	
	/**
	 * These variables are NOT raw entries to mysql
	 */
	private List<RawGroupRecord> groups = new ArrayList<>();
	private Map<Long, RawGroupRecord> groupsAsMap = new HashMap<Long, RawGroupRecord>();

	public static RawTypeRecord build( ResultSet res ) {
		
		if( res == null ) {
			return null;
		}
		
		RawTypeRecord r = new RawTypeRecord();
		
		r.id = ResultSetUtils.getColumnNoChange_Long( res, "id" );  
		r.created_date = ResultSetUtils.getColumnNoChange_Date( res, "created_date" );
		r.modified_date = ResultSetUtils.getColumnNoChange_Date( res, "modified_date" ); 
		r.name = ResultSetUtils.getColumnNoChange_String( res, "name" ); 
		r.isInternal = ResultSetUtils.getColumnNoChange_Int(res, "is_internal");
		
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



	public Integer getIsInternal() {
		return isInternal;
	}



	public void setIsInternal(Integer isInternal) {
		this.isInternal = isInternal;
	}



	public List<RawGroupRecord> getGroups() {
		return groups;
	}



	public void setGroups(List<RawGroupRecord> groups) {
		this.groups = groups;
	}
	

	public Map<Long, RawGroupRecord> getGroupsAsMap() {
		return groupsAsMap;
	}



	public void setGroupsAsMap(Map<Long, RawGroupRecord> groupsAsMap) {
		this.groupsAsMap = groupsAsMap;
	}



	public void addGroup( RawGroupRecord r ) {
		if( this.groups == null ) {
			this.groups = new ArrayList<>();
		}
		
		if( this.groupsAsMap == null ) {
			this.groupsAsMap = new HashMap<>();
		}
		
		this.groups.add( r );
		
		RawGroupRecord rawGroupRecord = this.groupsAsMap.get( r.getD() );
		
		
	}
	
	@Override
	public String toString() {
		return "type [id=" + id + ", name=" + name + ", groups=" + groups + ", isInternal="
				+ isInternal + ", created_date=" + created_date + ", modified_date=" + modified_date +"]";
	}

}



