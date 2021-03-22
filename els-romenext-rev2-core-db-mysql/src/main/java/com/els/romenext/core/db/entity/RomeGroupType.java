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

import com.els.romenext.core.db.entity.permission.Group;

@NamedQueries ({
	@NamedQuery(name="RomeGroupType.findByGroup", query="SELECT gt FROM RomeGroupType gt WHERE gt.group = :group"),
	@NamedQuery(name="RomeGroupType.findByGroupAndType", query="SELECT gt FROM RomeGroupType gt WHERE gt.group = :group AND gt.romeType = :romeType")
})

@Entity
@Table(name = "els_romenext_mysql_group_type")
public class RomeGroupType {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="mysql_group")
	private Group group;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_type")
	private RomeType romeType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public RomeType getRomeType() {
		return romeType;
	}

	public void setRomeType(RomeType romeType) {
		this.romeType = romeType;
	}

}
