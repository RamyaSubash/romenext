package com.els.romenext.core.db.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries ({
	@NamedQuery(name="MetadataRepoContainer.findByName", query="SELECT t FROM MetadataRepoContainer t WHERE t.name = :name"),
	@NamedQuery(name="MetadataRepoContainer.findByMetadataContainer", query="SELECT t FROM MetadataRepoContainer t WHERE t.metadata = :metadata")
})

@Entity
@Table(name = "els_romenext_metadata_repo")
public class MetadataRepoContainer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	// original name given to register
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="token")
	private String token;
	
	@Column(name="ip")
	private String ip;
	
	@Column(name="username")
	private String username;
	
	@Column(name="password")
	private String password;
	
	@ManyToOne
	private MetadataContainer metadata;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public MetadataContainer getMetadata() {
		return metadata;
	}

	public void setMetadata(MetadataContainer metadata) {
		this.metadata = metadata;
	}
	
}