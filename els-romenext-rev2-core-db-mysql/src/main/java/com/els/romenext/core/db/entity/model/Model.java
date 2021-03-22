package com.els.romenext.core.db.entity.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.els.romenext.core.db.entity.RomeType;

@NamedQueries ({
	@NamedQuery(name="Model.findByName", query="SELECT t FROM Model t WHERE t.name = :name"),
	@NamedQuery(name="Model.findByType", query="SELECT t FROM Model t WHERE t.romeType = :type"),
})

@Entity
@Table(name = "els_romenext_model")
public class Model {

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
	
	@OneToMany(cascade={CascadeType.REFRESH,CascadeType.ALL}, fetch=FetchType.LAZY, mappedBy = "model")
	private List<ModelProperty> fields = new ArrayList<ModelProperty>();
	
	@OneToMany(cascade={CascadeType.REFRESH,CascadeType.ALL}, fetch=FetchType.LAZY, mappedBy = "model")
	private List<ModelShape> shapes = new ArrayList<ModelShape>();

	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_type")	
	private RomeType romeType;
	
	@Basic
	@Column(name = "childEnabled", columnDefinition = "BIT", length = 1)
	private Boolean childEnabled;
	
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

	public List<ModelProperty> getFields() {
		return fields;
	}

	public void setFields(List<ModelProperty> fields) {
		this.fields = fields;
	}
	
	public void addField( ModelProperty field ) {
		if( this.fields == null ) {
			this.fields = new ArrayList<ModelProperty>();
		}
		this.fields.add( field );
	}

	public RomeType getRomeType() {
		return romeType;
	}

	public void setRomeType(RomeType romeType) {
		this.romeType = romeType;
	}
 
	public List<ModelShape> getShapes() {
		return shapes;
	}

	public void setShapes(List<ModelShape> shapes) {
		this.shapes = shapes;
	}
	
	public void addShape( ModelShape shape ) {
		if( this.shapes == null ) {
			this.shapes = new ArrayList<ModelShape>();
		}
		this.shapes.add( shape );
	}

	public Boolean getChildEnabled() {
		return childEnabled;
	}

	public void setChildEnabled(Boolean childEnabled) {
		this.childEnabled = childEnabled;
	}

}
