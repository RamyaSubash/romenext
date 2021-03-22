package com.els.romenext.core.db.entity.tab;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.els.romenext.core.db.entity.RomeType;

@NamedQueries ({
	@NamedQuery(name="TabObject.findByRomeType", query = "SELECT t FROM TabObject t where t.romeType = :romeType"),
	@NamedQuery(name="TabObject.findByName", query="SELECT t FROM TabObject t WHERE t.name = :name"),
	@NamedQuery(name="TabObject.findByTabContainer", query="SELECT p FROM TabObject p WHERE p.tabContainer = :tabContainer"),
	@NamedQuery(name="TabObject.findByRomeTypeAndTabContainer", query="SELECT p FROM TabObject p WHERE p.romeType = :romeType  AND p.tabContainer = :tabContainer ")        	
})

@Entity
@Table(name = "els_romenext_tabObjects")
public class TabObject {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="rome_type")
	private RomeType romeType;
	
	@ManyToOne
	@JoinColumn(name="tab_container")
	private TabContainer tabContainer;
	
	@Column(name="name")
	private String name;
			
	@Column(name="created_date")
	private Date createdDate;		
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public RomeType getRomeType() {
		return romeType;
	}

	public void setRomeType(RomeType romeType) {
		this.romeType = romeType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public TabContainer getTabContainer() {
		return tabContainer;
	}

	public void setTabContainer(TabContainer tabContainer) {
		this.tabContainer = tabContainer;
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
	
	@Override
	public String toString() {
		return "Object [id:" + id + ", name:" + name + ", createdDate:" + createdDate + ", modifiedDate:="+ modifiedDate 
				+", tabContainer:="+ tabContainer + ", romeType:" + romeType	+  "]";
	}
	
}