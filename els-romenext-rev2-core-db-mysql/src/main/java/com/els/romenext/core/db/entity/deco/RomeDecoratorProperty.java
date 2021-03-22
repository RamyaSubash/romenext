package com.els.romenext.core.db.entity.deco;

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

@NamedQueries ({
	@NamedQuery(name="RomeDecoratorProperty.findByName", query="SELECT p FROM RomeDecoratorProperty p WHERE p.name = :name "),
	@NamedQuery(name="RomeDecoratorProperty.findByRomeDecorator", query="SELECT p FROM RomeDecoratorProperty p WHERE p.romeDecorator = :romeDecorator"),
	@NamedQuery(name="RomeDecoratorProperty.findByRomeTypeAndName", query="SELECT p FROM RomeDecoratorProperty p WHERE p.name = :name AND p.romeDecorator = :romeDecorator")
})

@Entity
@Table(name = "els_romenext_decos_properties")
public class RomeDecoratorProperty {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="rome_decorator")
	private RomeDecorator romeDecorator;
	
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="property_type")
	private int propertyType;			// this should be of a type ValueTypeEnum
	
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
	
	@Basic
	@Column(name = "is_hidden", columnDefinition = "BIT", length = 1)
	private Boolean isHidden;
	
	@Basic
	@Column(name = "design", columnDefinition = "BIT", length = 1)
	private Boolean design;
	
	@Basic
	@Column(name = "display", columnDefinition = "BIT", length = 1)
	private Boolean display;
	
	public Long getId() {
		return id;
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

	public RomeDecorator getRomeDecorator() {
		return romeDecorator;
	}

	public void setRomeDecorator(RomeDecorator romeDecorator) {
		this.romeDecorator = romeDecorator;
	}

	public Boolean getIsHidden() {
		return isHidden;
	}

	public void setIsHidden(Boolean isHidden) {
		this.isHidden = isHidden;
	}

	public Boolean getDesign() {
		return design;
	}

	public void setDesign(Boolean design) {
		this.design = design;
	}

	public Boolean getDisplay() {
		return display;
	}

	public void setDisplay(Boolean display) {
		this.display = display;
	}

}