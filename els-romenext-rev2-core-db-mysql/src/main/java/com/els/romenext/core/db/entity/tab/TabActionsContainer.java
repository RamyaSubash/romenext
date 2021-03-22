package com.els.romenext.core.db.entity.tab;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.els.romenext.core.db.entity.MetadataContainer;

@NamedQueries ({
	@NamedQuery(name="TabActionsContainer.findByActionLabel",   query="SELECT p FROM TabActionsContainer p WHERE p.actionLabel = :actionLabel"),
	@NamedQuery(name="TabActionsContainer.findByOnclickScript", query="SELECT p FROM TabActionsContainer p WHERE p.onclickScript = :onclickScript"),
	@NamedQuery(name="TabActionsContainer.findByMetadata", query = "SELECT t FROM TabActionsContainer t where t.metadata = :metadata"),
})

@Entity
@Table(name = "els_romenext_tabActions")
public class TabActionsContainer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="action_label")
	private String actionLabel;
	
	@Column(name="onclick_script", columnDefinition="TEXT")
	private String onclickScript;
		
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	@ManyToOne
	private MetadataContainer metadata;
	
	public MetadataContainer getMetadata() {
		return metadata;
	}

	public void setMetadata(MetadataContainer metadata) {
		this.metadata = metadata;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getActionLabel() {
		return actionLabel;
	}

	public void setActionLabel(String actionLabel) {
		this.actionLabel = actionLabel;
	}
	
	public String getOnclickScript() {
		return onclickScript;
	}

	public void setOnclickScript(String onclickScript) {
		this.onclickScript = onclickScript;
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
	
	@Override
	public String toString() {
		return "TabAction [id:" + id + ", action:" + actionLabel + ", onClickScript:"
				+ onclickScript + ", createdDate:" + createdDate + ", modifiedDate:"
				+ modifiedDate + "]";
	}
	
}