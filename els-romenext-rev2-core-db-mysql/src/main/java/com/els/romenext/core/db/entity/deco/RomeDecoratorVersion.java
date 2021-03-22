package com.els.romenext.core.db.entity.deco;

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

@NamedQueries ({	
	@NamedQuery(name="RomeDecoratorVersion.findByName", query="SELECT p FROM RomeDecoratorVersion p WHERE p.name = :name "),
	@NamedQuery(name="RomeDecoratorVersion.findByRomeDecorator", query="SELECT p FROM RomeDecoratorVersion p WHERE p.romeDecorator = :romeDecorator"),
	@NamedQuery(name="RomeDecoratorVersion.findByRomeTypeAndName", query="SELECT p FROM RomeDecoratorVersion p WHERE p.name = :name AND p.romeDecorator = :romeDecorator"),
	@NamedQuery(name="RomeDecoratorVersion.findLatest", query="SELECT p FROM RomeDecoratorVersion p WHERE p.romeDecorator = :romeDecorator order by p.versionNumber desc")
})

@Entity
@Table(name = "els_romenext_decos_version")
public class RomeDecoratorVersion {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="rome_decorator")
	private RomeDecorator romeDecorator;
	
	@Column(name="name")
	private String name;
	
	@Column(name="init_version_fn")
	private String initVersionFn;
	
	@Column(name="version_number")
	private Long versionNumber;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="init_script", columnDefinition="TEXT")
	private String initScript;
	
	@Column(name="button_script", columnDefinition="TEXT")
	private String buttonScript;
	
	@Column(name="all_libraries", columnDefinition="TEXT")
	private String allLibraries;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public RomeDecorator getRomeDecorator() {
		return romeDecorator;
	}

	public void setRomeDecorator(RomeDecorator romeDecorator) {
		this.romeDecorator = romeDecorator;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getVersionNumber() {
		return versionNumber;
	}

	public void setVersionNumber(Long versionNumber) {
		this.versionNumber = versionNumber;
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

	public String getAllLibraries() {
		return allLibraries;
	}

	public void setAllLibraries(String allLibraries) {
		this.allLibraries = allLibraries;
	}

	public String getInitScript() {
		return initScript;
	}

	public void setInitScript(String initScript) {
		this.initScript = initScript;
	}

	public String getButtonScript() {
		return buttonScript;
	}

	public void setButtonScript(String buttonScript) {
		this.buttonScript = buttonScript;
	}

	public String getInitVersionFn() {
		return initVersionFn;
	}

	public void setInitVersionFn(String initVersionFn) {
		this.initVersionFn = initVersionFn;
	}
	
}