package com.els.romenext.core.db.entity.tab;

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

import com.els.romenext.core.db.entity.MetadataContainer;

@NamedQueries ({
	@NamedQuery(name="TabContainer.findByTabName", query="SELECT t FROM TabContainer t WHERE t.tabName = :tabName"),
	@NamedQuery(name="TabContainer.findByTabAction", query="SELECT p FROM TabContainer p WHERE p.tabAction = :tabAction"),
	@NamedQuery(name="TabContainer.findByMetadata", query = "SELECT t FROM TabContainer t where t.metadata = :metadata"),
	@NamedQuery(name="TabContainer.findByTabNameMetadata", query="SELECT t FROM TabContainer t WHERE t.tabName = :tabName and t.metadata = :metadata")      
})

@Entity
@Table(name = "els_romenext_tabContainers")
public class TabContainer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="tab_name")
	private String tabName;
	
	@Column(name="button_label")
	private String buttonLabel;
			
	@ManyToOne
	@JoinColumn(name="tab_action")
	private TabActionsContainer tabAction;
		
	@ManyToOne
	private MetadataContainer metadata;
	
	public MetadataContainer getMetadata() {
		return metadata;
	}

	public void setMetadata(MetadataContainer metadata) {
		this.metadata = metadata;
	}
	
	@Column(name="created_date")
	private Date createdDate;		
	
	@Column(name="modified_date")
	private Date modifiedDate;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTabName() {
		return tabName;
	}

	public void setTabName(String tabName) {
		this.tabName = tabName;
	}
	
	public String getButtonLabel() {
		return buttonLabel;
	}

	public void setButtonLabel(String buttonLabel) {
		this.buttonLabel = buttonLabel;
	}
	
	public TabActionsContainer getTabActionsContainer() {
		return tabAction;
	}

	public void setTabActionsContainer(TabActionsContainer tabAction) {
		this.tabAction = tabAction;
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
		return "Tabs [id:" + id + ", tabName:" + tabName + ", buttonLabel:"
				+ buttonLabel + ", tabAction:" + tabAction+ ", metadata:"
				+ metadata + ", createdDate:" + createdDate + ", modifiedDate:"
				+ modifiedDate + "]";
	}
	
}