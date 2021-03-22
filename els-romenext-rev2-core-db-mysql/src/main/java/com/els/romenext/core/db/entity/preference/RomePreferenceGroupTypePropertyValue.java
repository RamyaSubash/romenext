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

@NamedQueries ({
	@NamedQuery(name="RomePreferenceGroupTypePropertyValue.findByRomeGroupType", query="SELECT v FROM RomePreferenceGroupTypePropertyValue v WHERE v.romeGroupType = :romeGroupType"),
	@NamedQuery(name="RomePreferenceGroupTypePropertyValue.findByRomePreferenceProperty", query="SELECT v FROM RomePreferenceGroupTypePropertyValue v WHERE v.romePreferenceProperty = :romePreferenceProperty"),
	@NamedQuery(name="RomePreferenceGroupTypePropertyValue.findByRomeTypeAndPreferenceProperty", query="SELECT v FROM RomePreferenceGroupTypePropertyValue v WHERE v.romeGroupType = :romeGroupType AND v.romePreferenceProperty = :romePreferenceProperty"),

})

@Entity
@Table(name = "els_romenext_pref_grouptype_property_value")
public class RomePreferenceGroupTypePropertyValue {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_pref_property")
	private RomePreferenceGroupTypeProperty romePreferenceProperty;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_group_type")
	private RomeGroupType romeGroupType;
	
	@Column(name="value")
	private String value;

	public Long getId() {
		return id;
	}

	public RomePreferenceGroupTypeProperty getRomePreferenceGroupTypeProperty() {
		return romePreferenceProperty;
	}

	public void setRomePreferenceGroupTypeProperty(RomePreferenceGroupTypeProperty romePreferenceProperty) {
		this.romePreferenceProperty = romePreferenceProperty;
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
