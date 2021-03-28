package com.els.romenext.core.db.neo4j.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Result;

import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.utils.internal.InternalNeo4jNodeUtils;
import com.els.romenext.core.db.neo4j.utils.json.RomeNeo4jJsonUtils;

public class Neo4jNode implements INeo4jParsable<Neo4jNode> {
	
	private static Logger log = Logger.getLogger(Neo4jNode.class);
	
	/**
	 * TODO: While this does make it uniform with the neo4j data,
	 * we might want to create variables that hold the repo/metadata or create functions that will do it for us.
	 * 
	 */
	
	private Long internalId;
	private String coreLabel;
	private List<String> labels;
	
	/**
	 * EVENTUALLY THIS SHOULD BE DELETED
	 * 
	 * DO NOT USE THIS
	 */
	@Deprecated
	private Map<String, Object> properties;
	
	/**
	 * Note: we don't want to use the above anymore, we want to use the typedProperties
	 * JPL
	 */
	private Map<String, Neo4jProperty> typedProperties;		// the Key here should be the ID of the RomeTypeProperty 
	private Map<String, Neo4jProperty> systemProperties;	// note: we do NOT have any id's here, so this should be the NAME of the property
	private Map<String, Neo4jProperty> decoProperties;		// 

	public Long getInternalId() {
		return internalId;
	}

	public void setInternalId(Long internalId ) {
		this.internalId = internalId;
	}
	
	public List<String> getLabels() {
		return labels;
	}

	public void setLabels(List<String> labels) {
		this.labels = labels;
	}
	
	public Map<String, Object> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, Object> properties) {
		this.properties = properties;
	}
	
	public boolean hasInternalId () {
		
		return this.internalId != null;
		
	}
	
	public boolean hasLabels () {
		
		return CollectionUtils.isNotEmpty(this.labels);
		
	}
	
	public boolean hasProperties () {
		
		return MapUtils.isNotEmpty( this.typedProperties ) || MapUtils.isNotEmpty( this.systemProperties ) || MapUtils.isNotEmpty( this.decoProperties );
//		return MapUtils.isNotEmpty(this.properties) || MapUtils.isNotEmpty( this.typedProperties );
		
	}
	
	
	public boolean hasTypeProperties() {
		return MapUtils.isNotEmpty( this.typedProperties );
	}
	
	public boolean hasSystemProperties() {
		return MapUtils.isNotEmpty( this.systemProperties );
	}
	
	public boolean hasDecoratorProperties() {
		return MapUtils.isNotEmpty( this.decoProperties );
	}
	
	
	public boolean hasNull () {
		
		return this.internalId == null || labels == null || properties == null;
		
	}
	
	
	
	public Map<String, Neo4jProperty> getTypedProperties() {
		return typedProperties;
	}

	public void setTypedProperties(Map<String, Neo4jProperty> typedProperties) {
		this.typedProperties = typedProperties;
	}
	
	
	public void addTypeProperties( String key, Neo4jProperty p ) {
//		if( this.typedProperties == null ) {
//			this.typedProperties = new HashMap<String, Neo4jProperty>();
//		}
//		this.typedProperties.put( key,  p );
		this.addTypeProperties(p);
	}
	
	public void addTypeProperties( Neo4jProperty p ) {
		if( this.typedProperties == null ) {
			this.typedProperties = new HashMap<String, Neo4jProperty>();
		}
		this.typedProperties.put( p.getInternalPropertyName(),  p );
	}
	

	public Map<String, Neo4jProperty> getSystemProperties() {
		return systemProperties;
	}

	public void setSystemProperties(Map<String, Neo4jProperty> systemProperties) {
		this.systemProperties = systemProperties;
	}
	
	
	public void addSystemProperties( String key, Neo4jProperty p ) {
		if( this.systemProperties == null ) {
			this.systemProperties = new HashMap<String, Neo4jProperty>();
		}
		this.systemProperties.put( key,  p );
	}
	

	public Map<String, Neo4jProperty> getDecoProperties() {
		return decoProperties;
	}

	public void setDecoProperties(Map<String, Neo4jProperty> decoProperties) {
		this.decoProperties = decoProperties;
	}
	
	public void addDecoProperties( String key, Neo4jProperty p ) {
		if( this.decoProperties == null ) {
			this.decoProperties = new HashMap<String, Neo4jProperty>();
		}
		this.decoProperties.put( key,  p );
	}
	
	

	public String getCoreLabel() {
		return coreLabel;
	}

	public void setCoreLabel(String coreLabel) {
		this.coreLabel = coreLabel;
	}

	@Override
	public String toString() {
		
		String str = "";
		
		String idStr = "Internal ID: ";		
		if (this.hasInternalId()) {
			
			idStr = idStr + this.getInternalId();
			
		}
		
		String lStr = "Labels: ";
		if (this.hasLabels()) {
			
			for (String l : this.labels) {
				
				lStr = lStr + l + "; ";
				
			}
			
		}
		
		String pStr = "Properties: ";
		if( this.hasTypeProperties() ) {
			for( String key : this.typedProperties.keySet() ) {
				pStr = pStr + key + ":" +  this.typedProperties.get(key) + "; ";
			}
		}
//		if (this.hasProperties()) {
//			
//			for( String key : this.typedProperties.keySet() ) {
//				pStr = pStr + key + ":" +  this.typedProperties.get(key) + "; ";
//			}
//			
//		}
		
		str = str + idStr + "\n" + lStr + "\n" + pStr;
		
		return str;
		
	}
	
	@Override
	public List<Neo4jNode> parseNeo4jAPIResults(Object results) {
		
		if( results instanceof JSONArray) {
			return this.parseQueryResults( (JSONArray) results );
		} else if( results instanceof Result ) {
			return this.parseQueryResults( (Result) results );

		}
		// TODO Auto-generated method stub
		return null;
	}
	
	
	
	public List<Neo4jNode> parseQueryResults (Result results) {
		
		List<Neo4jNode> neo4jNodes = new ArrayList<Neo4jNode>();
		
		if (results != null) {
			
			/**
			 * Example format return:
			 * Outputs: {"results":[{"columns":["n","labels(n)","id(n)"],"data":[{"row":[{"y":10010,"x":1,"unit":"m"},["Bay"],106]}]}],"errors":[]}
			 */
			
//			System.out.println("Results : " + results );
//			System.out.println("What is this result : " + results.resultAsString() );
			
			while (results.hasNext()) {
				
				Map<String, Object> rows = results.next();
				
				Node n = (Node) rows.get("n");
				
				
				Neo4jNode nNode = InternalNeo4jNodeUtils.convert( n );
				
				
				neo4jNodes.add(nNode);
				
		     }
		
		}
		
		if (neo4jNodes == null || neo4jNodes.isEmpty()) {
			
			log.error("Fail to Parse Query Results");
			
			return null;
			
		} else {
			
			return neo4jNodes;
			
		}
		
	}
	
	/**
	 * Convinence method to add all the properties found from the result set from neo4j
	 * @param node
	 * @param properties
	 */
	public static void parseNeo4jPropertiesIntoNode( Neo4jNode node, Map<String,Object> properties ) {
		
		
		for( String key : properties.keySet() ) {

			Object value = properties.get( key );

			Neo4jProperty neo4jProperty = RomeNeo4jJsonUtils.parseNeo4jProperty( key, value );


			if( neo4jProperty != null ) {

				if( Neo4jPropertyTypeEnum.TYPE == neo4jProperty.getNeo4jType() ) {
					
					node.addTypeProperties( neo4jProperty.getInternalPropertyName(), neo4jProperty );	
					
					
					
				} else if( Neo4jPropertyTypeEnum.SYSTEM == neo4jProperty.getNeo4jType() ) {
					node.addSystemProperties( neo4jProperty.getInternalPropertyName(), neo4jProperty );	

				} else if( Neo4jPropertyTypeEnum.DECORATOR == neo4jProperty.getNeo4jType() ) {
					node.addDecoProperties( neo4jProperty.getInternalPropertyName(), neo4jProperty );	

				} else {
					System.out.println("Found a non TYPE or SYSTEM property : " + key );
				}
			} else {
				log.error("FAILED TO FIND AN APPROPRIATE NEO4jPROPERTY: " + key + ":" + value );
			}
			
//
//			
//			
//			Neo4jPropertyEnum foundProperty = Neo4jPropertyEnum.inferType( value );
//			
//			this.parseNeo4jProperty( key , value );
//			
//			if( Neo4jPropertyTypeEnum.TYPE.isOf( key ) ) {
//				
//				String assumedId = StringUtils.removeStart( key,  Neo4jPropertyTypeEnum.TYPE.getName() );
//				Neo4jProperty p = new Neo4jProperty(assumedId, null, foundProperty, Neo4jPropertyTypeEnum.TYPE, value);
//				
//				nNode.addTypeProperties( assumedId, p );
//				
//			} else if( key.startsWith( Neo4jPropertyTypeEnum.SYSTEM.getName() ) ) {
//				
//				String assumedId = StringUtils.removeStart( key,  Neo4jPropertyTypeEnum.SYSTEM.getName() );
//				Neo4jProperty p = new Neo4jProperty(assumedId, null, foundProperty, Neo4jPropertyTypeEnum.SYSTEM, value);
//				
//				nNode.addSystemProperties( assumedId, p);
//			} else if( key.startsWith( Neo4jPropertyTypeEnum.DECORATOR.getName() ) ) {
//				
//				String assumedId = StringUtils.removeStart( key,  Neo4jPropertyTypeEnum.DECORATOR.getName() );
//				Neo4jProperty p = new Neo4jProperty(assumedId, null, foundProperty, Neo4jPropertyTypeEnum.DECORATOR, value);
//				
//				nNode.addDecoProperties( assumedId, p );
//			} else {
//				System.out.println("Found a non TYPE or SYSTEM property : " + key );
//			}
		}
	}
	

	
	
	public void parseNeo4jAPIResults (JSONObject jsonRow) {
		
		// TODO: Parse results JSON more generic
		
		this.typedProperties = new HashMap<>();
//		properties = new HashMap<String, Object>();
		
		if (jsonRow.has("row")) {
			
			JSONArray jsonArrayRow = jsonRow.getJSONArray("row");
			
			if (jsonArrayRow != null) {
				
				// First return
				if (!jsonArrayRow.isNull(0)) {
					
					
					JSONObject jsonObject = jsonArrayRow.getJSONObject(0);
					
//					System.out.println("What is this json object: " + jsonObject );
					
					Map<String, Object> parsedProperties = RomeNeo4jJsonUtils.parseNodeProperties( jsonArrayRow.getJSONObject(0));
					
					Neo4jNode.parseNeo4jPropertiesIntoNode( this, parsedProperties );
					
//					properties = parseNodeProperties(jsonArrayRow.getJSONObject(0));
					
				}
				
				// Second return
				if (!jsonArrayRow.isNull(1)) {
					
					System.out.println("2nd element: " + jsonArrayRow.getJSONArray(1) );
//					System.out.println(jsonArrayRow.getJSONArray(1));
					labels = parseNodeLabels(jsonArrayRow.getJSONArray(1));
					
				}
				
				// Third return
				if (!jsonArrayRow.isNull(2)) {
					
//					System.out.println(jsonArrayRow.getLong(2));
					internalId = jsonArrayRow.getLong(2);
					
				}
				
//				// Fourth return (UUID)
//				if (!apiRow.isNull(3)) {
//					
//					System.out.println(apiRow.getString(3));
//					log.debug(apiRow.getString(3));
//					properties.put("uuid", apiRow.getString(3));
//					
//				}
				
			}
			
		}
	
	}
	
	/**
	 * Will parse the jsonObject of a neo4jNode
	 * ie. 
	 * 
	 * format:
	 * {
				"id": "3176",
				"labels": ["m1_r1_t34"],
				"properties": {
					"d1": 186.11993812864515,
					"d2": -14.302674399993602,
					"sys_default_decorator_id": 1,
					"sys_uuid": "5ee721eb-8de6-46d9-bbb0-d3fe9b795eef",
					"tp21": "Hilton"
				}
			}
	 * @param jsonRow
	 * @return
	 */
	public static Neo4jNode parseNeo4jAPIResults_original(JSONObject jsonNode) {
		
		if( jsonNode == null ) {
			return null;
		}
		
		Neo4jNode node = new Neo4jNode();
		
		
		String neo4jInternalId_dontuse = jsonNode.getString("id");
		JSONObject properties = jsonNode.getJSONObject( "properties" );
		JSONArray labels = jsonNode.getJSONArray( "labels" );
		
		Map<String, Object> parsedProperties = RomeNeo4jJsonUtils.parseNodeProperties( properties );

		// parse the prpperties into the node
		Neo4jNode.parseNeo4jPropertiesIntoNode(node, parsedProperties);
		
		// parse labels
		List<String> parseNodeLabels = Neo4jNode.parseNodeLabels( labels );
		
		node.setLabels( parseNodeLabels );
		node.setInternalId( Long.valueOf( neo4jInternalId_dontuse ).longValue() );
		
		return node;
	
	}
	
	
	public static List<String> parseNodeLabels (JSONArray jsonLabels) {
		
		if (jsonLabels == null) {
			
			return null;
			
		}
		
	    List<String> labelList = new ArrayList<String>();
		
		for (int i = 0; i < jsonLabels.length(); i++) {
			
			String label = (String) jsonLabels.get(i);
			
			if ((!StringUtils.isBlank(label)) && (!label.equals("super"))) {

				labelList.add((String) jsonLabels.get(i));
				
			}
			
		}
		
		return labelList;
		
	}
	
	public static void parseNodeProperties_updatedWithTypeSystemDeco( Neo4jNode node, JSONObject jsonProps) {
		
		if (jsonProps == null) {
			return;
		}

		Map<String, Object> propMap = new HashMap<String, Object>();
		
		for (String key : jsonProps.keySet()) {
			
			Object prop = jsonProps.get(key);
			
//			System.out.println(key+":" + jsonProps.get(key));
			
			if (prop != null) {
				
				propMap.put(key, jsonProps.get(key));
				
			}
			
		}
		
		node.parseNeo4jPropertiesIntoNode(node, propMap);
	}
	
//	/**
//	 * There is nothing wrong with this method, but it should ONLY be used to read the json and put it into a property map
//	 * @see parseNodeProperties_type
//	 * @param jsonProps
//	 * @return
//	 */
//	public static Map<String, Object> parseNodeProperties(JSONObject jsonProps) {
//		
//		if (jsonProps == null) {
//			
//			return null;
//			
//		}
//
//		Map<String, Object> propMap = new HashMap<String, Object>();
//		
//		for (String key : jsonProps.keySet()) {
//			
//			Object prop = jsonProps.get(key);
//			
//			if (prop != null) {
//				
//				propMap.put(key, jsonProps.get(key));
//				
//			}
//			
//		}
//		
//		return propMap;
//		
//	}
	
	
	/**
	 * HEREEEE
	 * @param jsonProps
	 * @return
	 */
	public static Map<String, Neo4jProperty> parseNodeProperties_type(JSONObject jsonProps) {
		
		if (jsonProps == null) {
			
			return null;
			
		}

		Map<String, Object> propMap = new HashMap<String, Object>();
		
		for (String key : jsonProps.keySet()) {
			
			
			Object prop = jsonProps.get(key);
			
//			System.out.println(key+":" + jsonProps.get(key));
			
			if (prop != null) {
				
				propMap.put(key, jsonProps.get(key));
				
			}
			
		}
		
//		return propMap;
		
		return null;
		
	}
	
	
//	public static List<Neo4jNode> convertResults (JSONObject jsonRow) {
//		
//		Neo4jNode n = new Neo4jNode();
//		
//		Map<String, Object> properties = new HashMap<String, Object>();
//		List<String> labels = new ArrayList<String>();
//		Long internalId = null;
//		
//		if (jsonRow.has("row")) {
//			
//			JSONArray apiRow = jsonRow.getJSONArray("row");
//			
//			if (apiRow != null) {
//				
//				// First return
//				if (!apiRow.isNull(0)) {
//					
//					properties = parseNodeProperties(apiRow.getJSONObject(0));
//					
//				}
//				
//				// Second return
//				if (!apiRow.isNull(1)) {
//					
//					System.out.println(apiRow.getJSONArray(1));
//					log.debug(apiRow.getJSONArray(1));
//					labels = parseNodeLabels(apiRow.getJSONArray(1));
//					
//				}
//				
//				// Third return
//				if (!apiRow.isNull(2)) {
//					
//					System.out.println(apiRow.getLong(2));
//					log.debug(apiRow.getLong(2));
//					internalId = apiRow.getLong(2);
//					
//				}
//				
//			}
//			
//		}
//		
//		n.setProperties( properties );
//		n.setLabel( labels );
//		n.setInternalId( internalId );
//		
//		return n;
//	
//	}

	
	public List<Neo4jNode> parseQueryResults (JSONArray results) {
		
		List<Neo4jNode> neo4jNodes = new ArrayList<Neo4jNode>();
		
		if (results != null) {
			
			JSONObject jsonData = results.getJSONObject(0);
			
			if (jsonData.has("data")) {
				
				Object test = jsonData.get( "data" );
				
				JSONArray jsonArrayData = jsonData.getJSONArray("data");
				
				if (jsonArrayData != null) {
					
					for (int i = 0; i < jsonArrayData.length(); i++) {
						
						JSONObject jsonRow = jsonArrayData.getJSONObject(i);
						
						Neo4jNode neo4jNode = new Neo4jNode();
						neo4jNode.parseNeo4jAPIResults(jsonRow);
						neo4jNodes.add(neo4jNode);
						
					}
					
				}
				
			}
			
		}
		
		if (neo4jNodes == null || neo4jNodes.isEmpty()) {
			
			log.error("Fail to Parse Query Results OR Results are Empty");
			
			return null;
			
		} else {
			
			return neo4jNodes;
			
		}
		
	}
}
