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

import com.els.romenext.core.db.entity.deco.RomeDecorator;

@NamedQueries ({
	@NamedQuery(name="RomeTypeRomeDecorator.findByRomeType", query="SELECT td FROM RomeTypeRomeDecorator td WHERE td.romeType = :romeType"),
	@NamedQuery(name="RomeTypeRomeDecorator.findByRomeDecorator", query="SELECT td FROM RomeTypeRomeDecorator td WHERE td.romeDecorator = :romeDecorator"),
	@NamedQuery(name="RomeTypeRomeDecorator.findByRomeTypeAndRomeDecorator", query="SELECT td FROM RomeTypeRomeDecorator td WHERE td.romeType = :romeType AND td.romeDecorator = :romeDecorator")
})

@Entity
@Table(name = "els_romenext_types_els_romenext_decos")
public class RomeTypeRomeDecorator {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_type")
	private RomeType romeType;
	
	@ManyToOne(cascade={CascadeType.REFRESH,CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinColumn(name="rome_decorator")
	private RomeDecorator romeDecorator;

	public Long getId() {
		return id;
	}

	public RomeType getRomeType() {
		return romeType;
	}

	public void setRomeType(RomeType romeType) {
		this.romeType = romeType;
	}

	public RomeDecorator getRomeDecorator() {
		return romeDecorator;
	}

	public void setRomeDecorator(RomeDecorator romeDecorator) {
		this.romeDecorator = romeDecorator;
	}

}
