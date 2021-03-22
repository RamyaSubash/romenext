package com.els.romenext.core.db.entity.preference;

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

import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;

@NamedQueries ({
	@NamedQuery(name="RomeGroupPreferenceType.findByRomeDecoratorProperty", query="SELECT v FROM RomeGroupPreferenceType v WHERE v.romeDecoratorProperty = :romeDecoratorProperty"),
	@NamedQuery(name="RomeGroupPreferenceType.findByRomeGroupTypeAndRomeDecoratorProperty", query="SELECT v FROM RomeGroupPreferenceType v WHERE v.romeGroupType = :romeGroupType AND v.romeDecoratorProperty = :romeDecoratorProperty"),
	@NamedQuery(name="RomeGroupPreferenceType.findByRomeGroupType", query="SELECT v FROM RomeGroupPreferenceType v WHERE v.romeGroupType = :romeGroupType")

})

@Entity
@Table(name = "els_romenext_preference_grouptype_value")
public class RomeGroupPreferenceType {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

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
