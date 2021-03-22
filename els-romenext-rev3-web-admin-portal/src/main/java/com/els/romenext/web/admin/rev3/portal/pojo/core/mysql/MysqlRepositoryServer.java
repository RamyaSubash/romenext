package com.els.romenext.web.admin.rev3.portal.pojo.core.mysql; 

import java.util.Date;

import com.els.romenext.web.admin.rev3.portal.utils.enums.mysql.MysqlRepositoryColumnEnum;
 

public class MysqlRepositoryServer {

	
	private Long id;
	private Date createdDate;
	private Date modifiedDate;
	private String description;
	private String ip;
	private String password;
	private String username;
	
	private String name;
	private String token;
	
	private String userGroup;
	private Long neo4jInstance;
	 
	private Long metadataId;
	
	public void assignValue( Object val, MysqlRepositoryColumnEnum e ) {
		
		if( e == MysqlRepositoryColumnEnum.ID ) {
//			Long i = Long.valueOf( (String) val );

			this.setId( (Long) val );
		} else if( e == MysqlRepositoryColumnEnum.CREATED_DATE ) {
			this.setCreatedDate( (Date) val );
		} else if( e == MysqlRepositoryColumnEnum.MODIFIED_DATE ) {
			this.setModifiedDate( (Date) val );
		} else if( e == MysqlRepositoryColumnEnum.NAME ) {
			this.setName( (String) val );
		} else if( e == MysqlRepositoryColumnEnum.TOKEN ) {
			this.setToken( (String) val );
		} else if( e == MysqlRepositoryColumnEnum.IP ) {
			this.setIp( (String) val );
		} else if( e == MysqlRepositoryColumnEnum.PASSWORD ) {
			this.setPassword( (String) val );
		} else if( e == MysqlRepositoryColumnEnum.USERNAME ) {
			this.setUsername( (String) val );
		} else if( e == MysqlRepositoryColumnEnum.DESCRIPTION ) {
			this.setDescription( (String) val );
		} else if( e == MysqlRepositoryColumnEnum.METADATA_ID ) {
			this.setMetadataId( (Long) val );
		}else if ( e == MysqlRepositoryColumnEnum.NEO4J_INSTANCE)  {
			this.setNeo4jInstance((Long) val);
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


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getIp() {
		return ip;
	}


	public void setIp(String ip) {
		this.ip = ip;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
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


	public String getUserGroup() {
		return userGroup;
	}


	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}


	public Long getNeo4jInstance() {
		return neo4jInstance;
	}


	public void setNeo4jInstance(Long neo4jInstance) {
		this.neo4jInstance = neo4jInstance;
	}


	public Long getMetadataId() {
		return metadataId;
	}


	public void setMetadataId(Long metadataId) {
		this.metadataId = metadataId;
	}
	
	
//	public String getBaseIp() {
//		
//	}
//	
//	public String getBasePort() {
//		
//	}
//	
	@Override
	public String toString() {
		return "repo [id=" + id + ", description=" + description + ", ip=" + ip + ", name=" + name + ", token=" + token +
				", userGroup=" + userGroup + ", username=" + username+ ", password=" + password+ ", neo4jInstance=" + neo4jInstance+"]";
	}
	
}
