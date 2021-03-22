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

import com.els.romenext.core.db.entity.RomeTypeProperty;

@NamedQueries ({
	@NamedQuery(name="TabObjectProperty.findByTabContainer",             query="SELECT p FROM TabObjectProperty p WHERE p.tabContainer = :tabContainer"),
	@NamedQuery(name="TabObjectProperty.findByTabObject",                query="SELECT p FROM TabObjectProperty p WHERE p.tabObject = :tabObject"),
	@NamedQuery(name="TabObjectProperty.findByRomeTypeProperty",         query="SELECT p FROM TabObjectProperty p WHERE p.romeTypeProperty = :romeTypeProperty"),
	@NamedQuery(name="TabObjectProperty.findByRomeTypePropertyAndTabContainer", query="SELECT p FROM TabObjectProperty p WHERE p.romeTypeProperty = :romeTypeProperty AND p.tabContainer = :tabContainer"),
	@NamedQuery(name="TabObjectProperty.findByTabObjectAndTabContainer", query="SELECT p FROM TabObjectProperty p WHERE  p.tabObject = :tabObject AND p.tabContainer = :tabContainer")
})

@Entity
@Table(name = "els_romenext_tabObject_properties")
public class TabObjectProperty {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="tab_container")
	private TabContainer tabContainer;
	
	@ManyToOne
	@JoinColumn(name="tab_object")
	private TabObject tabObject;
	
	@ManyToOne
	@JoinColumn(name="rome_typeProperty")
	private RomeTypeProperty romeTypeProperty;
	
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

	public TabContainer getTabContainer() {
		return tabContainer;
	}

	public void setTabContainer(TabContainer tabContainer) {
		this.tabContainer = tabContainer;
	}
	
	public TabObject getTabObject() {
		return tabObject;
	}

	public void setTabObject(TabObject tabObject) {
		this.tabObject = tabObject;
	}
	

	public RomeTypeProperty getRomeTypeProperty() {
		return romeTypeProperty;
	}

	public void setRomeTypeProperty(RomeTypeProperty romeTypeProperty) {
		this.romeTypeProperty = romeTypeProperty;
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
		return "Tab_Object_Properties [id=" + id + ", createdDate=" + createdDate + ", modifiedDate="+ modifiedDate 
				+", tabContainer="+ tabContainer +", tabObject="+ tabObject + ", romeTypeProperty=" + romeTypeProperty	+  "]";
	}

}