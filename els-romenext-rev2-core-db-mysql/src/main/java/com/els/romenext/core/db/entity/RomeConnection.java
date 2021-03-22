package com.els.romenext.core.db.entity;

import java.util.Date;

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
import javax.persistence.Table;

import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;

@NamedQueries ({
	@NamedQuery(name="RomeConnection.findConnections", query="SELECT c FROM RomeConnection c WHERE c.status = true"),
	@NamedQuery(name="RomeConnection.findByName", query="SELECT c FROM RomeConnection c WHERE c.name = :name"),
	@NamedQuery(name="RomeConnection.findByStartRomeType", query="SELECT c FROM RomeConnection c WHERE c.startRomeType = :startRomeType AND c.status = true"),
	@NamedQuery(name="RomeConnection.findByRomeRuleAndStartRomeType", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND c.startRomeType = :startRomeType AND c.status = true"),
	@NamedQuery(name="RomeConnection.findByRomeRulePlusStartAndEndRomeType", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND c.startRomeType = :startRomeType AND c.endRomeType = :endRomeType AND c.status = true"),
	@NamedQuery(name="RomeConnection.findByRules", query="SELECT c FROM RomeConnection c WHERE c.romeRule IN (:romeRules) AND c.status = true"),
	@NamedQuery(name="RomeConnection.findByRule", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND c.status = true"),
	@NamedQuery(name="RomeConnection.findByTypes", query="SELECT c FROM RomeConnection c WHERE c.startRomeType = :startType AND c.endRomeType = :endType AND c.status = true"),
	@NamedQuery(name="RomeConnection.findByMetadata", query="SELECT c FROM RomeConnection c WHERE c.metadata = :metadata AND c.status = true"),	
	@NamedQuery(name="RomeConnection.findConnectionsMetadata", query="SELECT c FROM RomeConnection c WHERE c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByNameMetadata", query="SELECT c FROM RomeConnection c WHERE c.name = :name and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByIdMetadata", query="SELECT c FROM RomeConnection c WHERE c.id = :id and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByStartRomeTypeMetadata", query="SELECT c FROM RomeConnection c WHERE c.startRomeType = :startRomeType AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByRomeRuleAndStartRomeTypeMetadata", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND c.startRomeType = :startRomeType AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByRomeRulePlusStartAndEndRomeTypeMetadata", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND c.startRomeType = :startRomeType AND c.endRomeType = :endRomeType AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByRomeRuleWithStartOREndRomeTypeMetadata", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND ( c.startRomeType = :romeType OR c.endRomeType = :romeType ) AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByStartOREndRomeTypeMetadata", query="SELECT c FROM RomeConnection c WHERE ( c.startRomeType = :romeType OR c.endRomeType = :romeType ) AND c.romeRule.classification = :classification AND  c.status = true and c.metadata = :metadata"),

	@NamedQuery(name="RomeConnection.findByRulesMetadata", query="SELECT c FROM RomeConnection c WHERE c.romeRule IN (:romeRules) AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByRuleMetadata", query="SELECT c FROM RomeConnection c WHERE c.romeRule = :romeRule AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByTypesMetadata", query="SELECT c FROM RomeConnection c WHERE c.startRomeType = :startType AND c.endRomeType = :endType AND c.status = true and c.metadata = :metadata"),
	@NamedQuery(name="RomeConnection.findByEndTypeMetadata", query="SELECT c FROM RomeConnection c WHERE c.endRomeType = :endType AND c.status = true and c.metadata = :metadata")
})

@Entity
@Table(name = "els_romenext_connections")
public class RomeConnection {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="name")
	private String name;

	/*
	 * Defined as 
	 * 1: LINK type
	 * 2: PARENTCHILD type
	 */
	// WE WILL BE REMOVING THIS IN THE NEAR FUTURE
	@Column(name="classification")
	private Integer classification;
	
	@ManyToOne
	@JoinColumn(name="rome_rule")
	private RomeRule romeRule;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="start_rome_type")	
	private RomeType startRomeType;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="end_rome_type")
	private RomeType endRomeType;

	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;

	@Column(name="minimum")
	private Integer minimum;
	
	@Column(name="maximum")
	private Integer maximum;
	
	
	@Basic
	@Column(name = "status", columnDefinition = "BIT", length = 1)
//	@Column(name="status")
	private Boolean status;
	
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

	public void setClassification(Integer classification) {
		this.classification = classification;
	}
	
	public void setClassification( RomeRuleClassificationEnum classification ) {
		this.classification = classification.getInternalId();
	}

	public RomeRule getRomeRule() {
		return romeRule;
	}

	public void setRomeRule(RomeRule romeRule) {
		this.romeRule = romeRule;
	}

	public RomeType getStartRomeType() {
		return startRomeType;
	}

	public void setStartRomeType(RomeType startRomeType) {
		this.startRomeType = startRomeType;
	}

	public RomeType getEndRomeType() {
		return endRomeType;
	}

	public void setEndRomeType(RomeType endRomeType) {
		this.endRomeType = endRomeType;
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

	public Integer getMinimum() {
		return minimum;
	}

	public void setMinimum(Integer minimum) {
		this.minimum = minimum;
	}

	public Integer getMaximum() {
		return maximum;
	}

	public void setMaximum(Integer maximum) {
		this.maximum = maximum;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	

	public MetadataContainer getMetadata() {
		return metadata;
	}

	public void setMetadata(MetadataContainer metadata) {
		this.metadata = metadata;
	}

	@Override
	public String toString() {
		return "RomeConnection [id=" + id + ", name=" + name + ", romeRuleName=" + romeRule.getName() + ", startRomeTypeName="
				+ startRomeType.getName() + ", endRomeTypeNae=" + endRomeType.getName() + ", createdDate=" + createdDate + ", modifiedDate="
				+ modifiedDate + ", minimum=" + minimum + ", maximum=" + maximum + "]";
	}
}
