package com.els.romenext.core.db.entity;

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

import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;

@NamedQueries ({
	@NamedQuery(name="RomeTypeDecoratorPropertyValue.findByRomeType", query="SELECT v FROM RomeTypeDecoratorPropertyValue v WHERE v.romeType = :romeType"),
	@NamedQuery(name="RomeTypeDecoratorPropertyValue.findByRomeDecoratorProperty", query="SELECT v FROM RomeTypeDecoratorPropertyValue v WHERE v.romeDecoratorProperty = :romeDecoratorProperty"),
	@NamedQuery(name="RomeTypeDecoratorPropertyValue.findByRomeTypeAndRomeDecoratorProperty", query="SELECT v FROM RomeTypeDecoratorPropertyValue v WHERE v.romeType = :romeType AND v.romeDecoratorProperty = :romeDecoratorProperty"),
	@NamedQuery(name="RomeTypeDecoratorPropertyValue.findByRomeGroupTypeAndRomeDecoratorProperty", query="SELECT v FROM RomeTypeDecoratorPropertyValue v WHERE v.romeGroupType = :romeGroupType AND v.romeDecoratorProperty = :romeDecoratorProperty"),
	@NamedQuery(name="RomeTypeDecoratorPropertyValue.findByRomeGroupType", query="SELECT v FROM RomeTypeDecoratorPropertyValue v WHERE v.romeGroupType = :romeGroupType")

})

@Entity
@Table(name = "els_romenext_type_decorator_property_value")
public class RomeTypeDecoratorPropertyValue {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_type")
	private RomeType romeType;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_decorator_property")
	private RomeDecoratorProperty romeDecoratorProperty;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_group_type")
	private RomeGroupType romeGroupType;
	
	@Column(name="value")
	private String value;

	public Long getId() {
		return id;
	}
	
	public RomeType getRomeType() {
		return romeType;
	}

	public void setRomeType(RomeType romeType) {
		this.romeType = romeType;
	}

	public RomeDecoratorProperty getRomeDecoratorProperty() {
		return romeDecoratorProperty;
	}

	public void setRomeDecoratorProperty(RomeDecoratorProperty romeDecoratorProperty) {
		this.romeDecoratorProperty = romeDecoratorProperty;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public RomeGroupType getRomeGroupType() {
		return romeGroupType;
	}

	public void setRomeGroupType(RomeGroupType romeGroupType) {
		this.romeGroupType = romeGroupType;
	}
	
	
	
}
