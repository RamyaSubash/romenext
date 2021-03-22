package com.els.romenext.core.entity.flatstyle;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.enums.RomeNodeClassEnum;

public class Node {

	private String id; // Node
	private String name;
	
	private String type; // Node
	private Long typeId; // Node
	/**
	 * To be honest, we might have to refactor this to take into account multiple Type's that are attached to this node.
	 * TODO: Refactor this to enable multiple types to be passed in.
	 * 
	 * ie. 
	 * private List<Long> typeIds;
	 */

	private RomeNodeClassEnum romeClass;
	private Date createdDate;
	private Date modifiedDate;
	private String version;
	private String classification;
	private Boolean isRoot;
	private List<String> rules;
	
	/**
	 * We need to stop using this, and start using the map version below
	 */
//	@Deprecated
//	private List<Property> properties; // Node
	
	/**
	 * NOTE: originally we only had a LIST of properties, but on the end user / client, we always were converting this to a map to 
	 * retrieve specific properties. 
	 * Waste of time, so we are converting this FIRST to a map. We should look at doing this for every single LIST 
	 * 
	 * BUT: I am not sure if we should do this with an ID being what we map against.
	 * 
	 * TODO: Revist this later on.
	 * jpl - Jan 2017
	 */
//	private Map<Long,Property> propertyMap;
	
	// Expecting the keys to actually be longs
	// should we make this Long?
	// CAN WE HAVE LONG HERE?
	// CAN WE HAVE A SITUATION WHERE THERE IS NO ID??????? - jplee
	private Map<String,Property> typeProperties;
	private Map<String,Property> sysProperties;
	private Map<String,Property> decoProperties;

	private Map<String,Property> prefProperties;
	
	private List<Long> decorators;
	// This is for nodes and types (deco prop values)
	
	private Long defaultDecoId;
	
	private Integer partGroup;
	private Long modelId;
	
	public Node() {
	}
	
	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public void setRomeClass(RomeNodeClassEnum romeClass) {
		this.romeClass = romeClass;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public void setClassification(String classification) {
		this.classification = classification;
	}
	
	public void setClassification( RomeTypeClassificationEnum classification ) {
		this.classification = classification.getClassification();
	}

	public void setIsRoot(Boolean isRoot) {
		this.isRoot = isRoot;
	}

//	public void setProperties(List<Property> properties) {
//		this.properties = properties;
//	}
	
	public void setRules(List<String> rules) {
		this.rules = rules;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getType() {
		return type;
	}

	public Long getTypeId() {
		return typeId;
	}
	
	public RomeNodeClassEnum getRomeClass() {
		return romeClass;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public String getVersion() {
		return version;
	}

	public String getClassification() {
		return classification;
	}

//	public List<Property> getProperties() {
//		return properties;
//	}

	public Boolean getIsRoot() {
		return isRoot;
	}

	public List<String> getRules() {
		return rules;
	}
	


	public Map<String, Property> getDecoProperties() {
		return decoProperties;
	}

	public void setDecoProperties(Map<String, Property> decoProperties) {
		this.decoProperties = decoProperties;
	}

	public Long getDefaultDecoId() {
		return defaultDecoId;
	}

	public void setDefaultDecoId(Long defaultDecoId) {
		this.defaultDecoId = defaultDecoId;
	}
			
	public Integer getPartGroup() {
		return partGroup;
	}

	public void setPartGroup(Integer partGroup) {
		this.partGroup = partGroup;
	}

	public Long getModelId() {
		return modelId;
	}

	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}

	public boolean hasType () {
		
		return StringUtils.isNotBlank(this.type);
		
	}
	
	public boolean hasTypeId () {
		
		return this.typeId != null;
		
	}
	
	public boolean hasProperties () {
		
		return this.typeProperties != null && CollectionUtils.isNotEmpty( this.typeProperties.values() );
//		return CollectionUtils.isNotEmpty(this.properties);
		
	}
	
	public boolean hasSystemProperties() {
		return this.sysProperties != null && CollectionUtils.isNotEmpty( this.sysProperties.values() );
	}
	
	/**
	 * If no property was found, should we update this?
	 * 
	 * NOTE: If no property is found, NOTHING is updated.
	 * @param value
	 * @param property
	 */
	public void updateTypeProperty( Object value, Property property ) {
		if (this.hasProperties() ) {
			
			if( this.getTypeProperties().containsKey( property.getId() ) ) {
				
				Property updateProp = this.getTypeProperties().get( property.getId() );
				
				updateProp.setValue( value );
				
				this.getTypeProperties().put( property.getId(),  updateProp );
				
			}
		} 
	}
	
	public boolean hasUuid() {
		
		if (this.hasSystemProperties()) {
			if (this.getSysProperties().containsKey(  RomeNodeSystemPropertyEnum.UUID.getValueType() )) {
				if (StringUtils.isNoneBlank(this.getSysProperties().get(  RomeNodeSystemPropertyEnum.UUID.getValueType() ).getValue().toString())) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}

	}
	
	public String getUuid() {
		
		if (this.hasSystemProperties()) {
			if (this.getSysProperties().containsKey( RomeNodeSystemPropertyEnum.UUID.getValueType() )) {
				if (StringUtils.isNoneBlank(this.getSysProperties().get( RomeNodeSystemPropertyEnum.UUID.getValueType() ).getValue().toString())) {
					return this.getSysProperties().get( RomeNodeSystemPropertyEnum.UUID.getValueType() ).getValue().toString();
				} 
			} 
		} 
		
		return null;

	}
	
	public boolean hasDecoProperties () {
		return this.decoProperties != null && CollectionUtils.isNotEmpty( this.decoProperties.values() );		
	}
	
	public boolean hasDefaultDecoId () {
		return this.defaultDecoId != null;
	}
	
	public void addProperties(List<RomeTypeProperty> romeTypeProperties) {
		if (romeTypeProperties == null) {
			return;
		}

		if( this.typeProperties == null ) {
			this.typeProperties = new HashMap<String, Property>();
		}
		
//		if (properties == null) {
//			properties = new ArrayList<Property>();
//		}

		for (RomeTypeProperty romeTypeProperty : romeTypeProperties) {
			if( this.typeProperties.containsKey( romeTypeProperty.getName() ) ) {
				Property property = Property.build(romeTypeProperty);
				this.typeProperties.put( romeTypeProperty.getName(), property );
			}
//			if (!properties.contains(romeTypeProperty)) {
//				Property property = Property.build(romeTypeProperty);
//				properties.add(property);
//			}
		}
		

		
		
	}
	
	public Map<String, Property> getSysProperties() {
		return sysProperties;
	}

	public void setSysProperties(Map<String, Property> sysProperties) {
		this.sysProperties = sysProperties;
	}
	
	public void addTypeProperty( String key, Property property ) {
		if( this.typeProperties == null ) {
			this.typeProperties = new HashMap<String, Property>();
		} 
		this.typeProperties.put( key,  property );
	}
	
	public void addSysProperty( String key, Property property ) {
		if( this.sysProperties == null ) {
			this.sysProperties = new HashMap<String, Property>();
		} 
		this.sysProperties.put( key,  property );
	}
	
	public void addDecoProperty( String key, Property property ) {
		if( this.decoProperties == null ) {
			this.decoProperties = new HashMap<String, Property>();
		} 
		this.decoProperties.put( key,  property );
	}
	
	
//	
//	public Map<String, String> getSysProperties() {
//		return sysProperties;
//	}
//
//	public void setSysProperties(Map<String, String> sysProperties) {
//		this.sysProperties = sysProperties;
//	}
	
	
	
	

//	public void setType(Object objectToCheck) {
//		if (objectToCheck instanceof RomeType) {
//			this.type = "Type";
//		} else if (objectToCheck instanceof RomeRule) {
//			this.type = "Rule";
//			// } else if (objectToCheck instanceof RomeNode) {
//			// this.type = ((RomeNode)objectToCheck).getType;
//		}
//	}
//	
	
	
	
    //---------------------------------------May Not Needed---------------------------------------//
	


	public Map<String, Property> getTypeProperties() {
		return typeProperties;
	}

	public void setTypeProperties(Map<String, Property> typeProperties) {
		this.typeProperties = typeProperties;
	}
	/**
	 * Added decorator to the Node instance, I really do not like how this is currently done.
	 * need to rethink this here.
	 * - JPL
	 */
	public List<Long> getDecorators() {
		return decorators;
	}

	public void setDecorators(List<Long> decorators) {
		this.decorators = decorators;
	}
	
	
	
	
	
	
	public Map<String, Property> getPrefProperties() {
		return prefProperties;
	}

	public void setPrefProperties(Map<String, Property> prefProperties) {
		this.prefProperties = prefProperties;
	}
	
	public boolean hasPrefProperties () {
		return this.prefProperties != null && CollectionUtils.isNotEmpty( this.prefProperties.values() );		
	}
	
	
	
	

	@Override
	public String toString() {
		return "Node [id=" + id + ", name=" + name + ", type=" + type
				+ ", typeId=" + typeId + ", romeClass=" + romeClass
				+ ", createdDate=" + createdDate + ", modifiedDate="
				+ modifiedDate + ", version=" + version + ", classification="
				+ classification + ", isRoot=" + isRoot + ", rules=" + rules
				+ ", typeProperties=" + typeProperties + ", sysProperties="
				+ sysProperties + ", decoProperties=" + decoProperties
				+ ", decorators=" + decorators + ", defaultDecoId="
				+ defaultDecoId + ", partGroup=" + partGroup + ", modelId="
				+ modelId + "]";
	}
}
