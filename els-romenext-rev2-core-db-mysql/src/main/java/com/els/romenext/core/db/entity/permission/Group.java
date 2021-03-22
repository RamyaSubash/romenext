package com.els.romenext.core.db.entity.permission;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries ({
	@NamedQuery(name="Group.findByHostAndName", query="SELECT g FROM Group g WHERE g.host = :host AND g.name = :name")
})

@Entity
@Table(name = "els_romenext_mysql_group")
public class Group {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
//	@Column(name="uuid") // nullable = false, unique=true
//	private String uuid;
	
	@Column(name="host")
	private String host;
	
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;

	@Basic
	@Column(name = "S", columnDefinition = "BIT", length = 1)
	private Boolean S;
	
	@Basic
	@Column(name = "I", columnDefinition = "BIT", length = 1)
	private Boolean I;
	
	@Basic
	@Column(name = "U", columnDefinition = "BIT", length = 1)
	private Boolean U;
	
	@Basic
	@Column(name = "D", columnDefinition = "BIT", length = 1)
	private Boolean D;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Boolean getS() {
		return S;
	}

	public void setS(Boolean s) {
		S = s;
	}

	public Boolean getI() {
		return I;
	}

	public void setI(Boolean i) {
		I = i;
	}

	public Boolean getU() {
		return U;
	}

	public void setU(Boolean u) {
		U = u;
	}

	public Boolean getD() {
		return D;
	}

	public void setD(Boolean d) {
		D = d;
	}

}
