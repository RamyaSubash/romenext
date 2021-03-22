package com.els.romenext.core.db.neo4j.entity.property;

import java.io.File;
import java.util.Date;
import java.util.Map;

import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;

public class Neo4jProperty {

	private String internalPropertyName;		// This should be JUST the internal id WITHOUT any prefix
	private String name;
	private Neo4jPropertyEnum type;
	private Neo4jPropertyTypeEnum neo4jType;
	
	private Object value;
	
	public Neo4jProperty() {
		
	}
	
	/**
	 * Note: if 
	 * type = LIST -> Value SHOULD BE a List
	 * type = MAP  -> Value SHOULD BE a Map
	 * @param internalPropertyName
	 * @param name
	 * @param type
	 * @param value
	 */
	public Neo4jProperty(String internalPropertyName, String name, Neo4jPropertyEnum type, Neo4jPropertyTypeEnum neo4jType, Object value) {
		this.internalPropertyName = internalPropertyName;
		this.name = name;
		this.type = type;
		this.value = value;
		this.neo4jType = neo4jType;
	}
	
	public Neo4jProperty(Neo4jProperty p) {
		this.internalPropertyName = p.internalPropertyName;
		this.name = p.name;
		this.type = p.type;
		this.value = p.value;
		this.neo4jType = p.neo4jType;
	}
	
	public String getInternalPropertyName() {
		return internalPropertyName;
	}
	public void setInternalPropertyName(String internalPropertyName) {
		this.internalPropertyName = internalPropertyName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Neo4jPropertyEnum getType() {
		return type;
	}
	public void setType(Neo4jPropertyEnum type) {
		this.type = type;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}

	public Neo4jPropertyTypeEnum getNeo4jType() {
		return neo4jType;
	}

	public void setNeo4jType(Neo4jPropertyTypeEnum neo4jType) {
		this.neo4jType = neo4jType;
	}

	@Override
	public String toString() {
		return "Neo4jProperty [internalPropertyName=" + internalPropertyName
				+ ", name=" + name + ", type=" + type + ", neo4jType="
				+ neo4jType + ", value=" + value + "]";
	}
	
	public Integer getIntValue() {
		
		if( this.type == Neo4jPropertyEnum.NUMERIC ) {
			if( value instanceof Integer ) {
				return (Integer) value;
			}
			
			if( value instanceof Long ) {
				Long l = (Long) value;
				
				return l.intValue();
			}
		}
		
		return null;
	}
	
	public Double getDoubleValue() {
		
		if( this.type == Neo4jPropertyEnum.DECIMAL ) {
			if( value instanceof Double ) {
				return (Double) value;
			}
			
			if( value instanceof Float ) {
				Float f = (Float) value;
				
				return f.doubleValue();
			}
		}
		
		return null;
	}
	
	public String getStringValue() {
		if( this.type == Neo4jPropertyEnum.STRING ) {
			if( value instanceof String ) {
				return (String) value;
			}
		}
		
		return null;
	}
	
	public Date getDateValue() {
		if( this.type == Neo4jPropertyEnum.DATE ) {
			if( value instanceof Date ) {
				return (Date) value;
			}
		}
		return null;
	}
	
	public Boolean getBooleanValue() {
		if( this.type == Neo4jPropertyEnum.BOOLEAN ) {
			if( value instanceof Boolean ) {
				return (Boolean) value;
			}
			if( value instanceof String ) {
				// if this is a string, try to parse it into a boolean
				Boolean b = Boolean.valueOf( (String) value );
				
				return b;
			}
		}
		return null;
	}
	
	public Map<String,Object> getMapValue() {
		if( this.type == Neo4jPropertyEnum.FILE ) {
			if( value instanceof Map ) {
				return (Map<String,Object>) value;
			}
		}
		return null;
	}
}
