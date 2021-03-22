package com.els.romenext.core.db.entity.preference;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.pref.RomePreferencePropertyEnum;

@NamedQueries ({
	@NamedQuery(name="RomePreferenceGroupTypeProperty.findByName", query="SELECT p FROM RomePreferenceGroupTypeProperty p WHERE p.name = :name "),
	@NamedQuery(name="RomePreferenceGroupTypeProperty.findByRomeType", query="SELECT p FROM RomePreferenceGroupTypeProperty p WHERE p.romeType = :romeType"),
	@NamedQuery(name="RomePreferenceGroupTypeProperty.findByRomeTypeAndName", query="SELECT p FROM RomePreferenceGroupTypeProperty p WHERE p.name = :name AND p.romeType = :romeType")
})

@Entity
@Table(name = "els_romenext_pref_grouptype_property")
public class RomePreferenceGroupTypeProperty {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	// FKbyh49kvhdcn82mi6pru1ifjck
	@JoinColumn(name="rome_type")
//	@JoinColumn(name="rome_type", foreignKey=@ForeignKey(name = "Fk_prefGTProp_romeType", foreignKeyDefinition="Fk_prefGTProp_romeType", value=ConstraintMode.PROVIDER_DEFAULT))
//	@JoinColumn(name="rome_type", foreignKey=@ForeignKey( foreignKeyDefinition="Fk_prefGTProp_romeType"))
//	@org.hibernate.annotations.ForeignKey(name="Fk_prefGTProp_romeType")
	private RomeType romeType;
	
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
	
	private int getPropertyType() {
		return propertyType;
	}

	private void setPropertyType(int propertyType) {
		this.propertyType = propertyType;
	}
	
	public void setPropertyType(RomePreferencePropertyEnum propertyType) {
		this.propertyType = propertyType.getLegacyId();
	}
	
	public RomePreferencePropertyEnum getPropertyTypeEnum() {
		return RomePreferencePropertyEnum.getEnum( propertyType );
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

	

	public RomeType getRomeType() {
		return romeType;
	}

	public void setRomeType(RomeType romeType) {
		this.romeType = romeType;
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