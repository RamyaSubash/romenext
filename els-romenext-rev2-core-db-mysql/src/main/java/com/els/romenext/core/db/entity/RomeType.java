package com.els.romenext.core.db.entity;

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
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;

@NamedQueries ({
	@NamedQuery(name="RomeType.findRootTypes", query="SELECT t FROM RomeType t WHERE t.isRootType = true"),
	@NamedQuery(name="RomeType.findByName", query="SELECT t FROM RomeType t WHERE t.name = :name"),
	@NamedQuery(name="RomeType.findByNameAndClassification", query="SELECT t FROM RomeType t WHERE t.name = :name and t.classification = :classification  and t.metadata = :metadata"),

	
	@NamedQuery(name="RomeType.findTypesNotInList", query="SELECT t FROM RomeType t WHERE t NOT IN (:romeTypes)"),
	@NamedQuery(name="RomeType.findTypes", query = "SELECT t FROM RomeType t"),
	
	@NamedQuery(name="RomeType.findInternalTypeByName", query="SELECT t FROM RomeType t WHERE t.isInternal = true and  t.name = :name"),

	
	@NamedQuery(name="RomeType.findRootTypesMetadata", query="SELECT t FROM RomeType t WHERE t.isRootType = true  and t.metadata = :metadata"),
	@NamedQuery(name="RomeType.findByNameMetadata", query="SELECT t FROM RomeType t WHERE t.name = :name and t.metadata = :metadata"),
	@NamedQuery(name="RomeType.findByIdMetadata", query="SELECT t FROM RomeType t WHERE t.id = :id and t.metadata = :metadata"),
	@NamedQuery(name="RomeType.findTypesNotInListMetadata", query="SELECT t FROM RomeType t WHERE t NOT IN (:romeTypes) and t.metadata = :metadata"),
	@NamedQuery(name="RomeType.findTypesMetadata", query = "SELECT t FROM RomeType t where t.metadata = :metadata")
})

@Entity
@Table(name = "els_romenext_types")
public class RomeType {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	// original name given to register
	@Column(name="name")
	private String name;

	/*
	 * Defined as 
	 * 1: NODE type
	 * 2: PATH type
	 */
	@Column(name="classification")
	private Integer classification;
	
	@Basic
	@Column(name = "is_root_type", columnDefinition = "BIT", length = 1)
	private Boolean isRootType;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	@OneToMany(cascade={CascadeType.REFRESH,CascadeType.ALL}, fetch=FetchType.LAZY, mappedBy = "romeType")
	private List<RomeTypeProperty> fields = new ArrayList<RomeTypeProperty>();
	
	@Column(name="version")
	private Integer version;
	
	@Column(name="is_internal")
	private Boolean isInternal;
	
	/**
	 * New column for holding the restriction for creation
	 * should be expecting something like CHILD/PARENT/NULL
	 */
	@Column(name="restrictionStatus")
	private Integer restrictionStatus;

	@ManyToOne
	private MetadataContainer metadata;
	
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

	public Integer getClassification() {
		return classification;
	}
	
	public RomeTypeClassificationEnum getClassificationEnum() {
		return RomeTypeClassificationEnum.getEnum( classification );
	}

	public void setClassification(RomeTypeClassificationEnum classificationeEnum) {
		this.classification = classificationeEnum.getInternalId();
	}

	public Boolean getIsRootType() {
		return isRootType;
	}

	public void setIsRootType(Boolean isRootType) {
		this.isRootType = isRootType;
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

	public List<RomeTypeProperty> getFields() {
		return fields;
	}

	public void setFields(List<RomeTypeProperty> fields) {
		this.fields = fields;
	}
	
	public void addField( RomeTypeProperty property ) {
		if( this.getFields() == null ) {
			this.setFields( new ArrayList<RomeTypeProperty>() );
		}
		this.getFields().add( property );
	}
	
	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
	

	public Integer getRestrictionStatus() {
		return restrictionStatus;
	}

	public void setRestrictionStatus(Integer restrictionStatus) {
		this.restrictionStatus = restrictionStatus;
	}
	
	public TypeRestrictionStatusEnum getRestrictionStatusEnum() {
		
		return TypeRestrictionStatusEnum.getType( this.restrictionStatus );
	}

	public void setRestrictionStatus(TypeRestrictionStatusEnum status) {
		if( status != null ) {
			this.restrictionStatus = status.getLegacyId();			
		} else {
			this.restrictionStatus = null;
		}
	}
	
	public Boolean getIsInternal() {
		return isInternal;
	}

	public void setIsInternal(Boolean isInternal) {
		this.isInternal = isInternal;
	}
	
	public Boolean isInternal() {
		return isInternal;
	}

	public MetadataContainer getMetadata() {
		return metadata;
	}

	public void setMetadata(MetadataContainer metadata) {
		this.metadata = metadata;
	}

	public void setClassification(Integer classification) {
		this.classification = classification;
	}

	@Override
	public String toString() {
		return "RomeType [id=" + id + ", name=" + name + ", classification="
				+ classification + ", isRootType=" + isRootType
				+ ", createdDate=" + createdDate + ", modifiedDate="
				+ modifiedDate + ", fields=" + fields + "]";
	}
	
	public boolean isPath() {
		return this.classification == RomeTypeClassificationEnum.PATH.getInternalId();
	}
	
	public boolean isType() {
		return this.classification == RomeTypeClassificationEnum.NODE.getInternalId();
	}
	
}