package com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.els.romenext.web.general.utils.ResultSetUtils;

public class RawGroupRecord {


	/**
	 * 				Integer id = ResultSetUtils.getColumnNoChange_Int( res, "id" ); 
				Integer d = ResultSetUtils.getColumnNoChange_Int( res, "D" ); 
				Integer i = ResultSetUtils.getColumnNoChange_Int( res, "I" ); 
				Integer s = ResultSetUtils.getColumnNoChange_Int( res, "S" ); 
				Integer u = ResultSetUtils.getColumnNoChange_Int( res, "U" ); 
				Date created_date = ResultSetUtils.getColumnNoChange_Date( res, "created_date" );
				Date modified_date = ResultSetUtils.getColumnNoChange_Date( res, "modified_date" );

				String host = ResultSetUtils.getColumnNoChange_String( res, "host" ); 
				String name = ResultSetUtils.getColumnNoChange_String( res, "name" ); 
	 */

	private Long id = null; 
	private Integer d =  null; 
	private Integer i =   null; 
	private Integer s =  null; 
	private Integer u =  null; 
	private Date created_date =  null;
	private Date modified_date = null;

	private String host = null; 
	private String name = null;
	
	/**
	 * These entries below are NOT raw columns
	 * 
	 */
	private List<RawTypeRecord> types = new ArrayList<>();
	
	
	public Long getId() {
		return id;
	}


	public static RawGroupRecord build( ResultSet res ) {
		
		if( res == null ) {
			return null;
		}
		
		RawGroupRecord r = new RawGroupRecord();
		
		r.id = ResultSetUtils.getColumnNoChange_Long( res, "id" ); 
		r.d = ResultSetUtils.getColumnNoChange_Int( res, "D" ); 
		r.i = ResultSetUtils.getColumnNoChange_Int( res, "I" ); 
		r.s = ResultSetUtils.getColumnNoChange_Int( res, "S" ); 
		r.u = ResultSetUtils.getColumnNoChange_Int( res, "U" ); 
		r.created_date = ResultSetUtils.getColumnNoChange_Date( res, "created_date" );
		r.modified_date = ResultSetUtils.getColumnNoChange_Date( res, "modified_date" );

		r.host = ResultSetUtils.getColumnNoChange_String( res, "host" ); 
		r.name = ResultSetUtils.getColumnNoChange_String( res, "name" ); 
		
		return r;
	}


	public void setId(Long id) {
		this.id = id;
	}
	public Integer getD() {
		return d;
	}
	public void setD(Integer d) {
		this.d = d;
	}
	public Integer getI() {
		return i;
	}
	public void setI(Integer i) {
		this.i = i;
	}
	public Integer getS() {
		return s;
	}
	public void setS(Integer s) {
		this.s = s;
	}
	public Integer getU() {
		return u;
	}
	public void setU(Integer u) {
		this.u = u;
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
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	public List<RawTypeRecord> getTypes() {
		return types;
	}


	public void setTypes(List<RawTypeRecord> types) {
		this.types = types;
	}

	public void addType( RawTypeRecord r ) {
		if( this.types == null ) {
			this.types = new ArrayList<>();
		}
		this.types.add( r );
	}

	@Override
	public String toString() {
		return "group [id=" + id + ", name=" + name + ", host=" + host + ", d="
				+ d + ", i="+ i + ", s="+ s + ", u="+ u +  ", created_date=" + created_date + ", modified_date=" + modified_date +"]";
	}
	
}



