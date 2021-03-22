package com.els.romenext.core.db.entity.model;

import java.util.Date;

import javax.persistence.Basic;
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
import com.els.romenext.core.db.enums.model.ModelPropertyModifierEnum;
import com.els.romenext.core.db.enums.model.ModelPropertyPositionEnum;

@NamedQueries ({
	@NamedQuery(name="ModelProperty.findByName", query="SELECT p FROM ModelProperty p WHERE p.name = :name "),
	@NamedQuery(name="ModelProperty.findByModel", query="SELECT p FROM ModelProperty p WHERE p.model = :model ")
})

@Entity
@Table(name = "els_romenext_model_property")
public class ModelProperty {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="rome_model")
	private Model model;
	
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="property_type")
	private int propertyType;
	
	@Column(name="minimum_value")
	private String minimumValue;
	
	@Column(name="maximum_value")
	private String maximumValue;
	
	@Column(name="default_value")
	private String defaultValue;

	@Basic
	@Column(name = "is_required", columnDefinition = "BIT", length = 1)
	private Boolean isRequired;

	@Basic
	@Column(name = "must_be_unique", columnDefinition = "BIT", length = 1)
	private Boolean mustBeUnique;

	@ManyToOne
	@JoinColumn(name="rome_type_property")
	private RomeTypeProperty romeTypeProperty;

	@Column(name="parent_child")
	private Integer parentChild;
	
	@Column(name="property_modifier_type")
	private Integer propertyModifierType;
	
	@Column(name="property_position_type")
	private Integer propertyPositionType;
	
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
	
	public int getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(int propertyType) {
		this.propertyType = propertyType;
	}

	public String getMinimumValue() {
		return minimumValue;
	}

	public void setMinimumValue(String minimumValue) {
		this.minimumValue = minimumValue;
	}

	public String getMaximumValue() {
		return maximumValue;
	}

	public void setMaximumValue(String maximumValue) {
		this.maximumValue = maximumValue;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public Boolean getIsRequired() {
		return isRequired;
	}

	public void setIsRequired(Boolean isRequired) {
		this.isRequired = isRequired;
	}

	public Boolean getMustBeUnique() {
		return mustBeUnique;
	}

	public void setMustBeUnique(Boolean mustBeUnique) {
		this.mustBeUnique = mustBeUnique;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

	public RomeTypeProperty getRomeTypeProperty() {
		return romeTypeProperty;
	}

	public void setRomeTypeProperty(RomeTypeProperty romeTypeProperty) {
		this.romeTypeProperty = romeTypeProperty;
	}

	public Integer getParentChild() {
		return parentChild;
	}

	public void setParentChild(Integer parentChild) {
		this.parentChild = parentChild;
	}
	
	public Integer getPropertyModifierType() {
		return propertyModifierType;
	}

	public void setPropertyModifierType(Integer propertyModifierType) {
		this.propertyModifierType = propertyModifierType;
	}
	
	public void setPropertyModifierType( ModelPropertyModifierEnum modifier ) {
		if( modifier != null ) {
			this.propertyModifierType = modifier.getInternalId();			
		} else {
			this.propertyModifierType = null;
		}
	}

	public Integer getPropertyPositionType() {
		return propertyPositionType;
	}

	public void setPropertyPositionType(Integer propertyPositionType) {
		this.propertyPositionType = propertyPositionType;
	}
	
	public void setPropertyPositionType( ModelPropertyPositionEnum position ) {
		if( position != null ) {
			this.propertyPositionType = position.getInternalId();			
		} else {
			this.propertyPositionType = null;
		}
	}

	@Override
	public String toString() {
		return "ModelProperty [id=" + id + ", name="
				+ name + ", createdDate=" + createdDate + ", modifiedDate="
				+ modifiedDate + ", propertyType=" + propertyType
				+ ", minimumValue=" + minimumValue + ", maximumValue="
				+ maximumValue + ", defaultValue=" + defaultValue
				+ ", isRequired=" + isRequired + ", mustBeUnique="
				+ mustBeUnique + ", romeTypeProperty=" + romeTypeProperty
				+ ", parentChild=" + parentChild + "]";
	}
	
}