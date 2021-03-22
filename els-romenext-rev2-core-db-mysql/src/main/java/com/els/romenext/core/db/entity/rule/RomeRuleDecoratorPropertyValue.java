package com.els.romenext.core.db.entity.rule;

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

import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;

@NamedQueries ({
	@NamedQuery(name="RomeRuleDecoratorPropertyValue.findByRomeRule", query="SELECT v FROM RomeRuleDecoratorPropertyValue v WHERE v.romeRule = :romeRule"),
	@NamedQuery(name="RomeRuleDecoratorPropertyValue.findByRomeDecoratorProperty", query="SELECT v FROM RomeRuleDecoratorPropertyValue v WHERE v.romeDecoratorProperty = :romeDecoratorProperty"),
	@NamedQuery(name="RomeRuleDecoratorPropertyValue.findByRomeRuleAndRomeDecoratorProperty", query="SELECT v FROM RomeRuleDecoratorPropertyValue v WHERE v.romeRule = :romeRule AND v.romeDecoratorProperty = :romeDecoratorProperty")
//	@NamedQuery(name="RomeRuleDecoratorPropertyValue.findByRomeGroupTypeAndRomeDecoratorProperty", query="SELECT v FROM RomeRuleDecoratorPropertyValue v WHERE v.romeGroupType = :romeGroupType AND v.romeDecoratorProperty = :romeDecoratorProperty"),
//	@NamedQuery(name="RomeRuleDecoratorPropertyValue.findByRomeGroupType", query="SELECT v FROM RomeRuleDecoratorPropertyValue v WHERE v.romeGroupType = :romeGroupType")

})

@Entity
@Table(name = "els_romenext_rule_decorator_property_value")
public class RomeRuleDecoratorPropertyValue {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

//	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
//	@JoinColumn(name="rome_type")
//	private RomeType romeType;
	
	@ManyToOne(cascade= {CascadeType.REFRESH, CascadeType.MERGE}, fetch = FetchType.EAGER ) 
	@JoinColumn(name="rome_rule")
	private RomeRule romeRule;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_decorator_property")
	private RomeDecoratorProperty romeDecoratorProperty;
	
//	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
//	@JoinColumn(name="rome_group_type")
//	private RomeGroupType romeGroupType;
	
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


	public RomeRule getRomeRule() {
		return romeRule;
	}


	public void setRomeRule(RomeRule romeRule) {
		this.romeRule = romeRule;
	}

	
	
	
	
}
