package com.els.romenext.core.db.entity.model;

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

@NamedQueries ({
	@NamedQuery(name="Part.findByName", query="SELECT p FROM Part p WHERE p.name = :name "),
	@NamedQuery(name="Part.findByModelProperty", query="SELECT p FROM Part p WHERE p.modelProperty = :modelProperty "),
	@NamedQuery(name="Part.findByModel", query="SELECT p FROM Part p WHERE p.model = :model "),
	@NamedQuery(name="Part.findByModelAndGroup", query="SELECT p FROM Part p WHERE p.model = :model and p.group = :group"),	
	@NamedQuery(name="Part.findMaxGroupId", query="SELECT c.group FROM Part c WHERE c.model = :model and c.group is not null ORDER BY c.group DESC "),
})

@Entity
@Table(name = "els_romenext_model_part")
public class Part {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="rome_model")
	private Model model;
	
	@Column(name="name")
	private String name;
	
	@Column(name="part_group")
	private Integer group;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="value")
	private String value;
	
	/**
	 * use case 1:
	 * user assigns a model variable to the type value
	 * @return
	 */
	
	@ManyToOne
	@JoinColumn(name="rome_model_property")
	private ModelProperty modelProperty;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
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

	public ModelProperty getModelProperty() {
		return modelProperty;
	}

	public void setModelProperty(ModelProperty modelProperty) {
		this.modelProperty = modelProperty;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Integer getGroup() {
		return group;
	}

	public void setGroup(Integer group) {
		this.group = group;
	}
	
}