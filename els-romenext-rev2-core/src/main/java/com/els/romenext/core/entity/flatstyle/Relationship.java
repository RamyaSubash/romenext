package com.els.romenext.core.entity.flatstyle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.enums.RomeRelationshipClassEnum;
import com.els.romenext.core.util.rel.RelationshipBuilder;

public class Relationship {
	
	public String id; // Edge (Internal ID)
	public String name;

	public String type; // Edge
	public String ruleName; // Connection
	public Long ruleId;	// added this as we are switching over from name -> id's - jplee jan2017
	public Long connectionId;
	
	public RomeRelationshipClassEnum romeClass;
	
	@Deprecated
	public List<Property> properties; 
	
	@Deprecated
	public String origin; 				// Edge
	@Deprecated
	public String destination; 		// Edge
	
	@Deprecated
	public Long originId; 		// Edge
	@Deprecated
	public Long destinationId; 		// Edge
	
	public Long originTypeId; 		// Edge
	public Long destinationTypeId; // Edge
	
	@Deprecated
	public String originUuid; // Edge
	@Deprecated
	public String destinationUuid; // Edge
	
	public Node originNode; // Edge
	public Node destinationNode; // Edge
	
	public int minRel;
	public int maxRel;
	
//	public List<Property> ruleProperties;
//	public List<Property> decoProperties;
//	public List<Property> systemProperties;
	
	private Map<String,Property> ruleProperties;	// key should be the property id
	private Map<String,Property> sysProperties;		// Should be the property name (ie. uuid)
	private Map<String,Property> decoProperties;
	
	public String classification; // conn&edge (to distinguish this is a pc or link)
	
	public Relationship() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRuleName() {
		return ruleName;
	}

	public Long getRuleId() {
		return ruleId;
	}

	public void setRuleId(Long ruleId) {
		this.ruleId = ruleId;
	}
	
	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public Long getConnectionId() {
		return connectionId;
	}

	public void setConnectionId(Long connectionId) {
		this.connectionId = connectionId;
	}

	public RomeRelationshipClassEnum getRomeClass() {
		return romeClass;
	}

	public void setRomeClass(RomeRelationshipClassEnum romeClass) {
		this.romeClass = romeClass;
	}

	@Deprecated
	public List<Property> getProperties() {
		return properties;
	}

	@Deprecated
	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public Long getOriginId() {
		return originId;
	}

	public void setOriginId(Long originId) {
		this.originId = originId;
	}

	public Long getDestinationId() {
		return destinationId;
	}

	public void setDestinationId(Long destinationId) {
		this.destinationId = destinationId;
	}

	public Long getOriginTypeId() {
		return originTypeId;
	}

	public void setOriginTypeId(Long originTypeId) {
		this.originTypeId = originTypeId;
	}

	public Long getDestinationTypeId() {
		return destinationTypeId;
	}

	public void setDestinationTypeId(Long destinationTypeId) {
		this.destinationTypeId = destinationTypeId;
	}

	public Node getOriginNode() {
		return originNode;
	}

	public void setOriginNode(Node originNode) {
		this.originNode = originNode;
	}

	public Node getDestinationNode() {
		return destinationNode;
	}

	public void setDestinationNode(Node destinationNode) {
		this.destinationNode = destinationNode;
	}

	public int getMinRel() {
		return minRel;
	}

	public void setMinRel(int minRel) {
		this.minRel = minRel;
	}

	public int getMaxRel() {
		return maxRel;
	}

	public void setMaxRel(int maxRel) {
		this.maxRel = maxRel;
	}
	
	public String getOriginUuid() {
		return originUuid;
	}

	public void setOriginUuid(String originUuid) {
		this.originUuid = originUuid;
	}

	public String getDestinationUuid() {
		return destinationUuid;
	}

	public void setDestinationUuid(String destinationUuid) {
		this.destinationUuid = destinationUuid;
	}


	public String getClassification() {
		return classification;
	}

	public void setClassification(String classification) {
		this.classification = classification;
	}

	public boolean hasType () {		
		return StringUtils.isNotBlank(this.type);
	}
	
	public boolean hasProperties () {		
		return MapUtils.isNotEmpty( this.ruleProperties ) || MapUtils.isNotEmpty( this.decoProperties ) || MapUtils.isNotEmpty( this.sysProperties );		

//		return CollectionUtils.isNotEmpty(this.properties);		
	}
	
	public boolean hasOrigin () {		
		return StringUtils.isNotBlank(this.origin);		
	}
	
	public boolean hasDestination () {		
		return StringUtils.isNotEmpty(this.destination);		
	}
	
	public boolean hasOriginUuid () {		
		return StringUtils.isNotEmpty(this.originUuid);		
	}
	
	public boolean hasDestinationUuid () {		
		return StringUtils.isNotEmpty(this.destinationUuid);		
	}
	
	public boolean hasDecoProperties () {		
		return MapUtils.isNotEmpty(this.decoProperties);		
	}
	
	public boolean hasConnectionId () {		
		return this.connectionId != null;	
	}
	
	public boolean hasRuleId () {		
		return this.ruleId != null;	
	}
	
	
	
	

	

	public Map<String, Property> getRuleProperties() {
		return ruleProperties;
	}

	public void setRuleProperties(Map<String, Property> ruleProperties) {
		this.ruleProperties = ruleProperties;
	}

	public Map<String, Property> getSysProperties() {
		return sysProperties;
	}

	public void setSysProperties(Map<String, Property> sysProperties) {
		this.sysProperties = sysProperties;
	}

	public Map<String, Property> getDecoProperties() {
		return decoProperties;
	}

	public void setDecoProperties(Map<String, Property> decoProperties) {
		this.decoProperties = decoProperties;
	}
	
	public void addRuleProperty( String key, Property p ) {
		if( MapUtils.isEmpty( this.ruleProperties ) ) {
			this.ruleProperties = new HashMap<String, Property>();
		}
		
		this.ruleProperties.put( key,  p );
	}
	
	public void addSystemProperty( String key, Property p ) {
		if( MapUtils.isEmpty( this.sysProperties ) ) {
			this.sysProperties = new HashMap<String, Property>();
		}
		
		this.sysProperties.put( key,  p );
	}
	
	public void addDecoratorProperty( String key, Property p ) {
		if( MapUtils.isEmpty( this.decoProperties ) ) {
			this.decoProperties = new HashMap<String, Property>();
		}
		
		this.decoProperties.put( key,  p );
	}

	@Override
	public String toString() {
		return "Relationship [id=" + id + ", name=" + name + ", type=" + type
				+ ", ruleName=" + ruleName + ", ruleId=" + ruleId
				+ ", connectionId=" + connectionId + ", romeClass=" + romeClass
				+ ", origin=" + origin + ", destination=" + destination
				+ ", originId=" + originId + ", destinationId=" + destinationId
				+ ", originTypeId=" + originTypeId + ", destinationTypeId="
				+ destinationTypeId + ", originUuid=" + originUuid
				+ ", destinationUuid=" + destinationUuid + ", originNode="
				+ originNode + ", destinationNode=" + destinationNode
				+ ", minRel=" + minRel + ", maxRel=" + maxRel
				+ ", ruleProperties=" + ruleProperties + ", sysProperties="
				+ sysProperties + ", decoProperties=" + decoProperties
				+ ", classification=" + classification + "]";
	}


	
	
}
