package com.els.romenext.core.db.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;

@NamedQueries ({
	@NamedQuery(name="RomeRule.findByName", query="SELECT r FROM RomeRule r WHERE r.name = :name"),
	@NamedQuery(name="RomeRule.findByClassification", query="SELECT r FROM RomeRule r WHERE r.classification = :classification"),
	@NamedQuery(name="RomeRule.findByNameMetadata", query="SELECT r FROM RomeRule r WHERE r.name = :name and r.metadata = :metadata"),
	@NamedQuery(name="RomeRule.findByIdMetadata", query="SELECT r FROM RomeRule r WHERE r.id = :id and r.metadata = :metadata"),	
	@NamedQuery(name="RomeRule.findByRuleTypeMetadata", query="SELECT r FROM RomeRule r WHERE r.ruleType = :ruleType and r.metadata = :metadata"),		
	@NamedQuery(name="RomeRule.findByClassificationMetadata", query="SELECT r FROM RomeRule r WHERE r.classification = :classification and r.metadata = :metadata"),
	@NamedQuery(name="RomeRule.findByMetadata", query="SELECT r FROM RomeRule r WHERE r.metadata = :metadata")
})

@Entity
@Table(name = "els_romenext_rules")
public class RomeRule {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="name")
	private String name;

	/*
	 * Added Sept 15th, 2017
	 * To add for connections between PATH -> NODE
	 * f	
	 * STANDARD/SYSTEM
	 * 
	 * NODETONODE/PATHTONODE/SYSTEMTOSYSTEM
	 */
	@Column(name="rule_type")
	private Integer ruleType = RuleTypeEnum.NODETONODE.getLegacyId();
	
	/*
	 * Defined as 
	 * 1: LINK type
	 * 2: PARENTCHILD type
	 */
	@Column(name="classification")
	private Integer classification;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="is_internal",columnDefinition = "BIT", length = 1) 
	private Boolean isInternal;

	@OneToMany(cascade={CascadeType.REFRESH, CascadeType.ALL},fetch=FetchType.LAZY, mappedBy = "romeRule")
	private List<RomeRuleProperty> fields = new ArrayList<RomeRuleProperty>();
	
	@ManyToOne
	private MetadataContainer metadata;
	
	@OneToMany(cascade={CascadeType.REFRESH, CascadeType.ALL},fetch=FetchType.LAZY, mappedBy = "romeRule")
	private List<RomeConnection> connections = new ArrayList<RomeConnection>();
	
	
	
	
	public Boolean getIsInternal() {
		return isInternal;
	}

	public void setIsInternal(Boolean isInternal) {
		this.isInternal = isInternal;
	}

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

	public void setClassification(RomeRuleClassificationEnum classificationeEnum) {
		this.classification = classificationeEnum.getInternalId();
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

	public List<RomeRuleProperty> getFields() {
		return fields;
	}

	public void setFields(List<RomeRuleProperty> fields) {
		this.fields = fields;
	}
	
	

	public MetadataContainer getMetadata() {
		return metadata;
	}

	public void setMetadata(MetadataContainer metadata) {
		this.metadata = metadata;
	}

	
	
	
	public List<RomeConnection> getConnections() {
		return connections;
	}

	public void setConnections(List<RomeConnection> connections) {
		this.connections = connections;
	}
	

	public Integer getRuleType() {
		return ruleType;
	}
	
	public RuleTypeEnum getRuleTypeEnum() {
		
		if( ruleType != null ) {
			return RuleTypeEnum.getEnum( this.ruleType );
		} 
		return null;
	}

	private void setRuleType(Integer ruleType) {
		this.ruleType = ruleType;
	}
	
	public void setRuleType( RuleTypeEnum ruleType ) {
		this.ruleType = ruleType.getLegacyId();
	}

	@Override
	public String toString() {
		return "RomeRule [id=" + id + ", name=" + name + ", classification=" + classification + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate + "]";
	}
}