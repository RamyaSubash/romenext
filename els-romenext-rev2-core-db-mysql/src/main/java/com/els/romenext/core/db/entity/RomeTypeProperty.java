package com.els.romenext.core.db.entity;

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

import com.els.romenext.core.db.enums.RomeTypePropertyEnum;

/**
 * Create table:
 * delimiter $$

CREATE TABLE `gatif_node_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `internal_table_name` varchar(255) DEFAULT NULL,
  `legacy_type_id` bigint(20) DEFAULT NULL,
  `legacyTypeKind` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$
 * @author jlee
 *
 */

@NamedQueries ({
	@NamedQuery(name="RomeTypeProperty.findByRomeType", query="SELECT p FROM RomeTypeProperty p WHERE p.romeType = :romeType"),
	@NamedQuery(name="RomeTypeProperty.findByRomeTypeAndName", query="SELECT p FROM RomeTypeProperty p WHERE p.name = :name AND p.romeType = :romeType")
})

@Entity
@Table(name = "els_romenext_type_properties")
public class RomeTypeProperty {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="rome_type")
	private RomeType romeType;
	
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="property_type")
	private int propertyType;
	
	@Column(name="property_subtype")
	private Integer subtype;
	
	@Column(name="property_typeParams") 
	private String typeParams;
	
	@Column(name="property_subtypeParams") 
	private String subtypeParams;
	
	
	
	@Column(name="minimum_value")
	private String minimumValue;
	
	@Column(name="maximum_value")
	private String maximumValue;
	
	@Column(name="default_value")
	private String defaultValue;

	@Basic
	@Column(name = "is_required", columnDefinition = "BIT", length = 1)
//	@Column(name="is_required")
	private Boolean isRequired;

	@Basic
	@Column(name = "must_be_unique", columnDefinition = "BIT", length = 1)
//	@Column(name="must_be_unique")
	private Boolean mustBeUnique;

	@Column(name="modified_version")
	private Integer modifiedVersion;
	
	@Column(name="created_version")
	private Integer createdVersion;
	
	
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
	
	public RomeTypePropertyEnum getPropertyTypeEnum() {
		return RomeTypePropertyEnum.getEnum( propertyType );
	}

	private void setPropertyType(int propertyType) {
		this.propertyType = propertyType;
	}
	
	public void setPropertyType(RomeTypePropertyEnum propertyType) {
		this.propertyType = propertyType.getLegacyId();
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

	public Integer getModifiedVersion() {
		return modifiedVersion;
	}

	public void setModifiedVersion(Integer modifiedVersion) {
		this.modifiedVersion = modifiedVersion;
	}

	public Integer getCreatedVersion() {
		return createdVersion;
	}

	public void setCreatedVersion(Integer createdVersion) {
		this.createdVersion = createdVersion;
	}
	

	public Integer getSubtype() {
		return subtype;
	}

	public void setSubtype(Integer subtype) {
		this.subtype = subtype;
	}



	public String getTypeParams() {
		return typeParams;
	}

	public void setTypeParams(String typeParams) {
		this.typeParams = typeParams;
	}

	public String getSubtypeParams() {
		return subtypeParams;
	}

	public void setSubtypeParams(String subtypeParams) {
		this.subtypeParams = subtypeParams;
	}

	@Override
	public String toString() {
		return "RomeTypeProperty [id=" + id + ", romeTypeName=" + romeType.getName() + ", name=" + name + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate + ", propertyType=" + propertyType + ", minimumValue="
				+ minimumValue + ", maximumValue=" + maximumValue + ", defaultValue=" + defaultValue + ", isRequired="
				+ isRequired + ", mustBeUnique=" + mustBeUnique + "]";
	}
}