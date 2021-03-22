package com.els.romenext.core.db.entity.workspace;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;

@NamedQueries ({
	@NamedQuery(name="DisplayWorkspace.findByUserNameAndGroupName", query="SELECT v FROM DisplayWorkspace v WHERE v.userName = :userName and v.userGroup = :userGroup")
})

@Entity
@Table(name = "els_romenext_workspace_dislay")
public class DisplayWorkspace {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
//	@ManyToOne
//	@JoinColumn(name="rome_type")
//	private RomeType romeType;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_repo")
	private MetadataRepoContainer romeRepo;
	
//	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
//	@JoinColumn(name="rome_group_type")
//	private RomeGroupType romeGroupType;
	
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="user_group")
	private String userGroup;
	
	
	@Column(name="workspace")
	private String workspace;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public MetadataRepoContainer getRomeRepo() {
		return romeRepo;
	}


	public void setRomeRepo(MetadataRepoContainer romeRepo) {
		this.romeRepo = romeRepo;
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


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getUserGroup() {
		return userGroup;
	}


	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}


	public String getWorkspace() {
		return workspace;
	}


	public void setWorkspace(String workspace) {
		this.workspace = workspace;
	}



	
	
}
