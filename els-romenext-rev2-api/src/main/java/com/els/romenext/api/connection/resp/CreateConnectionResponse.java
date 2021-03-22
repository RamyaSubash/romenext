package com.els.romenext.api.connection.resp;

import java.util.List;

import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class CreateConnectionResponse {
	
	private String id;
	
	private String name;
	private String ruleName;
	private Long ruleId;
	private String origin;
	private Long originId;
	private String destination;
	private Long destinationId;
	private Integer minRel;
	private Integer maxRel;
	
	private List<Property> properties;
	
	private String classification;

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}
	
	public String getOrigin() {
		return origin;
	}

	public String getDestination() {
		return destination;
	}

	public List<Property> getProperties() {
		return properties;
	}

	public String getRuleName() {
		return ruleName;
	}

	public Long getRuleId() {
		return ruleId;
	}
	
	public Long getOriginId() {
		return originId;
	}

	public Long getDestinationId() {
		return destinationId;
	}

	public String getClassification() {
		return classification;
	}
	
	public Integer getMinRel() {
		return minRel;
	}

	public Integer getMaxRel() {
		return maxRel;
	}

//	public void build(Relationship connection) {
//		this.id = connection.getId();
//		
//		this.name = connection.getName();
//		
//		this.origin = connection.getOrigin();
//		this.originId = connection.getOriginId();
//		this.destination = connection.getDestination();
//		this.destinationId = connection.getDestinationId();
//		
//		this.ruleName = connection.getType();
//		this.properties = connection.getProperties();
//		
//		this.minRel = connection.getMinRel();
//		this.maxRel = connection.getMaxRel();
//	}
	
	public void build( RomeConnection connection ) {
		this.id = connection.getId().toString();
		
		this.name = connection.getName();
		this.ruleName = connection.getRomeRule().getName();
		this.ruleId = connection.getRomeRule().getId();
		
		this.origin = connection.getStartRomeType().getName();
		this.originId = connection.getStartRomeType().getId();
		
		this.destination = connection.getEndRomeType().getName();
		this.destinationId = connection.getEndRomeType().getId();
		
		this.properties = Property.batchBuildRuleProperties( connection.getRomeRule().getFields() );
		
		this.classification = RomeRuleClassificationEnum.getEnum(connection.getRomeRule().getClassification()).getClassification();
		
		this.minRel = connection.getMinimum();
		this.maxRel = connection.getMaximum();
	}
	
}
