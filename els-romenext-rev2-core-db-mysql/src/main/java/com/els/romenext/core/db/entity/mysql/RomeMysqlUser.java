package com.els.romenext.core.db.entity.mysql; 

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries ({
	@NamedQuery(name="RomeMysqlUser.findByUsername", query="SELECT t FROM RomeMysqlUser t WHERE t.username = :username")
})

/**
 * CREATE TABLE `els_romenext_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 * @author jplee
 *
 */

@Entity
@Table(name = "els_romenext_users")
public class RomeMysqlUser {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	// original name given to register
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="pw")
	private String pw;
	
	@Column(name="username")
	private String username;
	
	@Column(name="status")
	private Integer status;
	
	@Column(name="is_redirected",columnDefinition = "BIT", length = 1) 
	private Boolean isRedirected;
	
	@Column(name="redirect_ip")
	private String redirectIp;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Boolean getIsRedirected() {
		return isRedirected;
	}

	public void setIsRedirected(Boolean isRedirected) {
		this.isRedirected = isRedirected;
	}

	public String getRedirectIp() {
		return redirectIp;
	}

	public void setRedirectIp(String redirectIp) {
		this.redirectIp = redirectIp;
	}

	
	
	
}