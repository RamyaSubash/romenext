package com.els.romenext.core.db.entity.deco;

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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.els.romenext.core.db.enums.deco.RomeDecoratorClassification;

@NamedQueries ({
	@NamedQuery(name="RomeDecorator.findByName", query="SELECT d FROM RomeDecorator d WHERE d.name = :name"),
	@NamedQuery(name="RomeDecorator.findByClassification", query="SELECT d FROM RomeDecorator d WHERE d.classification = :classification"),
	@NamedQuery(name="RomeDecorator.findByNameAndGrouping", query="SELECT d FROM RomeDecorator d WHERE d.name = :name AND d.grouping = :grouping"),
	@NamedQuery(name="RomeDecorator.findByClassificationAndGrouping", query="SELECT d FROM RomeDecorator d WHERE d.classification = :classification AND d.grouping = :grouping"),

})

@Entity
@Table(name = "els_romenext_decos")
public class RomeDecorator {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	// original name given to register
	@Column(name="name")
	private String name;
	
	@Column(name="friendly_name")
	private String friendlyName;
	
	/**
	 * New classification for decos.
	 * TYPE, INSTANCE
	 */
	@Column(name="classification")
	private String classification;
	
	@Column(name="grouping")
	private String grouping;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	@OneToMany(cascade={CascadeType.REFRESH,CascadeType.ALL}, fetch=FetchType.LAZY, mappedBy = "romeDecorator")
	private List<RomeDecoratorProperty> fields = new ArrayList<RomeDecoratorProperty>();
	
	@Column(name="tagid")
	private String tagId;
	
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

	public List<RomeDecoratorProperty> getFields() {
		return fields;
	}

	public void setFields(List<RomeDecoratorProperty> fields) {
		this.fields = fields;
	}
	
	public void addField( RomeDecoratorProperty field ) {
		if( this.fields == null ) {
			this.fields = new ArrayList<RomeDecoratorProperty>();
		}
		this.fields.add( field );
	}

	public String getFriendlyName() {
		return friendlyName;
	}

	public void setFriendlyName(String friendlyName) {
		this.friendlyName = friendlyName;
	}

	public String getClassification() {
		return classification;
	}

	public void setClassification(String classification) {
		this.classification = classification;
	}
	
	public void setClassification(RomeDecoratorClassification classification) {
		this.classification = classification.getClassification();
	}

	public String getGrouping() {
		return grouping;
	}

	public void setGrouping(String grouping) {
		this.grouping = grouping;
	}

	public String getTagId() {
		return tagId;
	}

	public void setTagId(String tagId) {
		this.tagId = tagId;
	}
	
}