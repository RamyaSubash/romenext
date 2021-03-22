package com.els.romenext.web.admin.rev3.portal.pojo.core.mysql;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.els.romenext.web.admin.rev3.portal.utils.enums.mysql.MysqlMetadataColumnEnum;

public class MysqlMetadataServer {

	
	private Long id;
	private Date createdDate;
	private Date modifiedDate;
	private String name;
	private String token;
	private String uuid;
	private String userGroup;
	
	private Map<Long,MysqlRepositoryServer> repo;
	
	public void assignValue( Object val, MysqlMetadataColumnEnum e ) {
		
		if( e == MysqlMetadataColumnEnum.ID ) {
			this.setId( (long) val );
		} else if( e == MysqlMetadataColumnEnum.CREATED_DATE ) {
			this.setCreatedDate( (Date) val );
		} else if( e == MysqlMetadataColumnEnum.MODIFIED_DATE ) {
			this.setModifiedDate( (Date) val );
		} else if( e == MysqlMetadataColumnEnum.NAME ) {
			this.setName( (String) val );
		} else if( e == MysqlMetadataColumnEnum.TOKEN ) {
			this.setToken( (String) val );
		} else if( e == MysqlMetadataColumnEnum.UUID ) {
			this.setUuid( (String) val );
		} else if( e == MysqlMetadataColumnEnum.USER_GROUP ) {
			this.setUserGroup( (String) val );
		} 
		
	}
	
	
	public void assignValue( Object val, String id ) {
		if( "id".equalsIgnoreCase( id ) ) {
			this.setId( (Long) val );
		} else if( "created_date".equalsIgnoreCase( id ) ) {
			this.setCreatedDate( (Date) val );
		} else if( "modified_date".equalsIgnoreCase( id ) ) {
			this.setModifiedDate( (Date) val );
		} else if( "name".equalsIgnoreCase( id ) ) {
			this.setName( (String) val );
		} else if( "token".equalsIgnoreCase( id ) ) {
			this.setToken( (String) val );
		} else if( "uuid".equalsIgnoreCase( id ) ) {
			this.setUuid( (String) val );
		} else if( "user_group".equalsIgnoreCase( id ) ) {
			this.setUserGroup( (String) val );
		}
		
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getUserGroup() {
		return userGroup;
	}
	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	} 

	
	
	public Map<Long, MysqlRepositoryServer> getRepo() {
		return repo;
	} 
	
	public void setRepo(Map<Long, MysqlRepositoryServer> repo) {
		this.repo = repo;
	}

	public void addRepo( MysqlRepositoryServer repo ) {
		
		if( this.getRepo() == null ) {
			this.setRepo( new HashMap<>() );
		}
		
		Map<Long, MysqlRepositoryServer> updated = this.getRepo();
		
		Long id = repo.getId();
		
		if( id != null ) {
			updated.put( id,  repo );
		}
	}
	
	@Override
	public String toString() {
		return "Metadata [id=" + id + ", name=" + name + ", token=" + token + ", uuid="
				+ uuid + ", userGroup=" + userGroup +  ", repo=" + repo + "]";
	}
}
