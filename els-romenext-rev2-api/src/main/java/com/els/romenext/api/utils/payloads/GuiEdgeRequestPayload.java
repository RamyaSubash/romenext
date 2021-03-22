package com.els.romenext.api.utils.payloads; 

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeCollectionUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.rel.RelationshipBuilder;

/**
 * For payloads coming FROM the gui to the core. 
 * 
 * Should represent the nodes that are found in the nodemap/edgemap.
 * 
 * NOTE: This should not be used for the TYPE in the design view!!!
 * 
 * @author jplee
 *
 */

/**
 * EXAMPLE: 
 * 
 * 
 * {
	"grouphost": "all",
	"groupname": "group_romenextall",
	"namespace": "user1",
	"edges": {
		"9fee1823-dae2-4cab-bfc8-bd1f9c881d4f": {
			"id": "5",
			"type": "Count_ProviRULE0",
			"ruleName": "Count_ProviRULE0",
			"ruleId": 1,
			"connectionId": 1,
			"origin": "m1_r1_t105",
			"destination": "m1_r1_t106",
			"originTypeId": 105,
			"destinationTypeId": 106,
			"originUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=54685069-3a3b-41ee-80f6-711d38b6db54]",
			"destinationUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=d1c4a20b-887e-4064-8178-69bd3783f13e]",
			"originNode": {
				"id": "0",
				"name": "Country",
				"type": "m1_r1_t105",
				"typeId": 105,
				"romeClass": "TYPE",
				"createdDate": "Mar 28, 2018 12:45:22 PM",
				"modifiedDate": "Mar 28, 2018 12:45:22 PM",
				"version": "0",
				"classification": "node",
				"isRoot": true,
				"typeProperties": {
					"6": {
						"id": "6",
						"value": "Canada1",
						"propertyType": "STRING"
					}
				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2018-03-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2018-03-29",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "54685069-3a3b-41ee-80f6-711d38b6db54",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"4": {
						"id": "4",
						"value": 527.9740732797773,
						"propertyType": "DOUBLE"
					},
					"5": {
						"id": "5",
						"value": -24.321116564967458,
						"propertyType": "DOUBLE"
					},
					"6": {
						"id": "6",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {
					"1": {
						"id": "1",
						"name": "size",
						"defaultValue": "0",
						"propertyType": "STRING"
					},
					"2": {
						"id": "2",
						"name": "color",
						"defaultValue": "0",
						"propertyType": "STRING"
					}
				},
				"decorators": [1]
			},
			"destinationNode": {
				"id": "6",
				"name": "Province",
				"type": "m1_r1_t106",
				"typeId": 106,
				"romeClass": "TYPE",
				"createdDate": "Mar 28, 2018 12:45:27 PM",
				"modifiedDate": "Mar 28, 2018 12:45:27 PM",
				"version": "0",
				"classification": "node",
				"isRoot": true,
				"typeProperties": {
					"7": {
						"id": "7",
						"value": "Alberta",
						"propertyType": "STRING"
					}
				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2018-03-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2018-03-29",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "d1c4a20b-887e-4064-8178-69bd3783f13e",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"4": {
						"id": "4",
						"value": 626.4489352125647,
						"propertyType": "DOUBLE"
					},
					"5": {
						"id": "5",
						"value": 207.86040412707695,
						"propertyType": "DOUBLE"
					},
					"6": {
						"id": "6",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {
					"3": {
						"id": "3",
						"name": "size",
						"defaultValue": "0",
						"propertyType": "STRING"
					},
					"4": {
						"id": "4",
						"name": "color",
						"defaultValue": "0",
						"propertyType": "STRING"
					}
				},
				"decorators": [1]
			},
			"minRel": 0,
			"maxRel": 0,
			"sysProperties": {
				"edge_classification": {
					"id": "edge_classification",
					"name": "edge_classification",
					"value": 2,
					"propertyType": "INTEGER"
				},
				"created_date": {
					"id": "created_date",
					"name": "created_date",
					"value": "2018-03-28",
					"propertyType": "DATE"
				},
				"modified_date": {
					"id": "modified_date",
					"name": "modified_date",
					"value": "2018-03-28",
					"propertyType": "DATE"
				},
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "9fee1823-dae2-4cab-bfc8-bd1f9c881d4f",
					"propertyType": "STRING"
				}
			},
			"decoProperties": {
				"4": {
					"id": "4",
					"value": 98.47486193278746,
					"propertyType": "DOUBLE"
				},
				"5": {
					"id": "5",
					"value": 232.18152069204442,
					"propertyType": "DOUBLE"
				},
				"6": {
					"id": "6",
					"value": 0,
					"propertyType": "DOUBLE"
				}
			},
			"classification": "parentchild",
			"name": "Count_ProviCONN",
			"cyDisplay": "",
			"uuid": "9fee1823-dae2-4cab-bfc8-bd1f9c881d4f"
		},
		
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	another request:
	{
	"connection": 1,
	"startNode": {
		"typeIds": [105],
		"sysProperties": [{
			"propertyName": "uuid",
			"propertyType": "STRING",
			"value": "9adaa8a0-b9cd-4db7-bbf8-ae89c695c518"
		}]
	},
	"endNode": {
		"typeIds": [106],
		"sysProperties": [{
			"propertyName": "uuid",
			"propertyType": "STRING",
			"value": "9ac7eb25-c819-4efb-bc2f-1cdbbfbdffc7"
		}]
	},
	"toDeleteEdge": {
		"connection": "1",
		"sysProperties": [{
			"propertyName": "uuid",
			"propertyType": "STRING",
			"value": "83934a43-65e5-4a8a-a806-39a64a82ba7f"
		}]
	}
}
}
 * @author jplee
 *
 */
public class GuiEdgeRequestPayload {

	private static Logger log = Logger.getLogger(GuiEdgeRequestPayload.class);

	private List<Long> connections;
	
	
	private RomeRuleClassificationEnum classification;
	private Long ruleId;
	
	private List<Property> properties;
	private List<Property> systemProperties;
	private List<Property> decoProperties;

	private String originalPayload;
	private JSONObject originalJson;

	
	
	private GuiNodeRequestPayload originNode;
	private GuiNodeRequestPayload destinationNode;
	

	public List<Long> getConnections() {
		return connections;
	}

	public void setConnections(List<Long> connections) {
		this.connections = connections;
	}

	public List<Property> getProperties() {
		return properties;
	}

	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}

	public List<Property> getSystemProperties() {
		return systemProperties;
	}

	public void setSystemProperties(List<Property> systemProperties) {
		this.systemProperties = systemProperties;
	}

	public List<Property> getDecoProperties() {
		return decoProperties;
	}

	public void setDecoProperties(List<Property> decoProperties) {
		this.decoProperties = decoProperties;
	}

	public String getOriginalPayload() {
		return originalPayload;
	}

	public void setOriginalPayload(String originalPayload) {
		this.originalPayload = originalPayload;
	}

	
	
	


	public RomeRuleClassificationEnum getClassification() {
		return classification;
	}

	public void setClassification(RomeRuleClassificationEnum classification) {
		this.classification = classification;
	}

	public Long getRuleId() {
		return ruleId;
	}

	public void setRuleId(Long ruleId) {
		this.ruleId = ruleId;
	}

	public GuiNodeRequestPayload getOriginNode() {
		return originNode;
	}

	public void setOriginNode(GuiNodeRequestPayload originNode) {
		this.originNode = originNode;
	}

	public GuiNodeRequestPayload getDestinationNode() {
		return destinationNode;
	}

	public void setDestinationNode(GuiNodeRequestPayload destinationNode) {
		this.destinationNode = destinationNode;
	}

	public JSONObject getOriginalJson() {
		return originalJson;
	}

	public void setOriginalJson(JSONObject originalJson) {
		this.originalJson = originalJson;
	}
	
	
	
	

	/**
	 * Edges that exist in the system MUST include:
	 * 
	 * 1. RULE id (to be honest, this is sorta optional as this can be inferred from the connection)
	 * 2. Connection Id
	 * 3. DESTINATION node	(I am not sure if this should be mandatory or not in the case they just want to pass in the edge info)
	 * 4. Origin NODE		(I am not sure if this should be mandatory or not in the case they just want to pass in the edge info)
	 * 5. 
	 * 
	 * 
	 * @param json
	 * @return
	 */
	public String validateRequest(JSONObject json) {

		String empty = null;

		
		
		// for edge
		if( !json.has("connectionId") ) {
//			"ruleName": "Count_ProviRULE0",
//			"ruleId": 1,
//			"connectionId": 1,
			
			// check to see if it has a connection
			if( !json.has( "connection" ) ) {
				
				return "connectionId";
				
			}
		}
		
//		if( !json.has("ruleId") ) {
//			return "ruleId";
//		}
		
		// We do not check this incase they just want edge information?
		// or what if we do not carea bout the corresponding dest/origin node?
		
		// in the case it has origin node, validate it
		if( json.has("originNode")) {
//			return "originNode";
			
			JSONObject nodeJson = json.getJSONObject( "originNode" );
			empty = new GuiNodeRequestPayload().validateRequest( nodeJson );
			
			if( empty != null ) {
				return empty;
			}
			
		}
		
		if( json.has("destinationNode")) { 
			JSONObject nodeJson = json.getJSONObject( "destinationNode" );
			empty = new GuiNodeRequestPayload().validateRequest( nodeJson );
			
			if( empty != null ) {
				return empty;
			}
		}
		 

		
		
		
		/**
		 * NOTE: In the GUI node payloads, they order their properties/sysprops/deco properties as a map (ie. json object) with the keys set to either uuid or ids
		 */

		if (json.has("ruleProperties")) {
			JSONObject jsonObject = json.getJSONObject( "ruleProperties" );

			String check = this.validateMapOfProperties( jsonObject, "id", "value", "propertyType" );
			if( check != null ) {
				return check;
			}

			// we need to iterate over every entry to see if they are valid
			//			Iterator<String> keys = jsonObject.keys();
			//
			//			while( keys.hasNext() ) {
			//				String key = keys.next();
			//
			//				JSONObject tocheck = jsonObject.getJSONObject( key );
			//				String check = this.validateMapOfProperties( tocheck, "id", "value", "propertyType" );
			//				if( check != null ) {
			//					return check;
			//				}
			//			}
		} else {
			// attempt to find just properties instead
			if (json.has("properties")) {
				JSONObject jsonObject = json.getJSONObject( "properties" );

				String check = this.validateMapOfProperties( jsonObject, "id", "value", "propertyType" );
				if( check != null ) {
					return check;
				}
			}
		}


		if (json.has("sysProperties")) {
			JSONObject jsonObject = json.getJSONObject( "sysProperties" );

			String check = this.validateMapOfProperties( jsonObject, "name", "value", "propertyType" );
			
			if( check != null ) {
				// TODO: This is an issue where old calls would send in "name" instead of "propertyName"
				// check to see if propertyName is there instead
				if( "name".equalsIgnoreCase( check ) ) {
					check = this.validateMapOfProperties( jsonObject,  "propertyName" );
					
					if( check != null ) {
						return check;
					}
				} else {
					return check;						
				}
				
			}


			//			
			//			// we need to iterate over every entry to see if they are valid
			//			Iterator<String> keys = jsonObject.keys();
			//			
			//			while( keys.hasNext() ) {
			//				String key = keys.next();
			//				
			//				JSONObject tocheck = jsonObject.getJSONObject( key );
			//				String check = this.validateMapOfProperties( tocheck, "name", "value", "propertyType" );
			//				if( check != null ) {
			//					return check;
			//				}
			//			}

		} else {
			// attempt to load systemProperties
			if (json.has("systemProperties")) {
				JSONObject jsonObject = json.getJSONObject( "systemProperties" );

				String check = this.validateMapOfProperties( jsonObject, "name", "value", "propertyType" );
				
				
				if( check != null ) {
					// TODO: This is an issue where old calls would send in "name" instead of "propertyName"
					// check to see if propertyName is there instead
					if( "name".equalsIgnoreCase( check ) ) {
						check = this.validateMapOfProperties( jsonObject,  "propertyName" );
						
						if( check != null ) {
							return check;
						}
					} else {
						return check;						
					}
					
				}
			}
		}

		if (json.has("decoProperties")) {
			JSONObject jsonObject = json.getJSONObject( "decoProperties" );
			
			/**
			 * UPDATE: April 3rd, 2018
			 * JPL: 
			 * For some reason this is coded differently than other fields to check to see if this is valid or not? Not sure why this is the case?
			 * I Added a special case here in case the OLD way of this is still needed.
			 */
			
			// we need to iterate over every entry to see if they are valid 

			String check = this.validateMapOfProperties( jsonObject, "id", "value", "propertyType" );
			
			
			if( check != null ) {
				// TODO: This is an issue where old calls would send in "name" instead of "propertyName"
				// check to see if propertyName is there instead
				if( "name".equalsIgnoreCase( check ) ) {
					check = this.validateMapOfProperties( jsonObject,  "propertyName" );
					
					if( check != null ) {
						return check;
					}
				} else {
					return check;						
				}
				
			}
			

//			// we need to iterate over every entry to see if they are valid
//			Iterator<String> keys = jsonObject.keys();
//
//			while( keys.hasNext() ) {
//				String key = keys.next();
//
//				JSONObject tocheck = jsonObject.getJSONObject( key );
//				String check = this.validateMapOfProperties( tocheck, "id", "value", "propertyType" );
//				if( check != null ) {
//					return check;
//				}
//			}
		}

		return empty;

	}

	private String validateMapOfProperties( JSONObject jsonMap, String...checker ) {

		Iterator<String> keys = jsonMap.keys();

		String empty = null;
		while( keys.hasNext() ) {
			String next = keys.next();

			// should be a json object
			JSONObject jsonProperty = (JSONObject) jsonMap.get( next );
			empty = RomeJSONUtils.findEmptyJson(jsonProperty,  checker );

			if( empty != null ) {
				return empty;
			}

		}
		return null;
	}

	public void parseRequest( JSONObject json ) throws JSONException { 
		
		

		this.originalPayload = json.toString();
		this.originalJson = json;
		/**
		 * NOTE: For all of these compared to the EntryNodeRequest, the GUI nodes are not JSON Arrays.
		 * Need to convert them to JSONArrays from the JSONObject they are.
		 * 
		 */
		
		Long connId = 0L;
		connections = new ArrayList<Long>();
		if (json.has("connectionId")) {
			connId = json.getLong("connectionId");
		} else {
			if( json.has("connection") ) {
				connId = json.getLong("connectionId");
			}
		}
		connections.add( connId );
		
		
		
		
		properties = new ArrayList<Property>();
		boolean propFound = false;
		if (json.has("properties")) {
			propFound = true;
			//			properties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));
			//			JSONArray jsonArray = json.getJSONArray("properties");
			//			if (jsonArray != null) {
			//				for (int i = 0; i < jsonArray.length(); i++) {
			//					JSONObject jsonObject = jsonArray.getJSONObject(i);
			//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
			//					if (property != null) {
			//						properties.add(property);
			//					}
			//				}
			//			}

			// we need to iterate over every entry to see if they are valid
			JSONObject jsonObject = json.getJSONObject("properties");
			Iterator<String> keys = jsonObject.keys();

			while( keys.hasNext() ) {
				String key = keys.next();

				JSONObject jsonProperty = jsonObject.getJSONObject( key );
				Property property = PropertyJSONUtils.parseTypePropertyJSONObject( jsonProperty );
				//							Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
				if (property != null) {
					properties.add(property);
				}
			}
		} else {
			if (json.has("typeProperties")) {
				propFound = true;
				//				properties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("properties"), Neo4jPropertyTypeEnum.TYPE));
				//				JSONArray jsonArray = json.getJSONArray("properties");
				//				if (jsonArray != null) {
				//					for (int i = 0; i < jsonArray.length(); i++) {
				//						JSONObject jsonObject = jsonArray.getJSONObject(i);
				//						Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
				//						if (property != null) {
				//							properties.add(property);
				//						}
				//					}
				//				}

				// we need to iterate over every entry to see if they are valid
				JSONObject jsonObject = json.getJSONObject("typeProperties");
				Iterator<String> keys = jsonObject.keys();

				while( keys.hasNext() ) {
					String key = keys.next();

					JSONObject jsonProperty = jsonObject.getJSONObject( key );
					Property property = PropertyJSONUtils.parseTypePropertyJSONObject( jsonProperty );
					//							Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
					if (property != null) {
						properties.add(property);
					}
				}
			}
		}




		systemProperties = new ArrayList<Property>();
		if (json.has("sysProperties")) {
			//			systemProperties.addAll(PropertyJSONUtils.parseProperties(json.getJSONArray("systemProperties"), Neo4jPropertyTypeEnum.SYSTEM));


			//			JSONArray jsonArray = json.getJSONArray("systemProperties");
			//			if (jsonArray != null) {
			//				for (int i = 0; i < jsonArray.length(); i++) {
			//					JSONObject jsonObject = jsonArray.getJSONObject(i);
			//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
			//					if (property != null) {
			//						systemProperties.add(property);
			//					}
			//				}
			//			}

			// we need to iterate over every entry to see if they are valid
			JSONObject jsonObject = json.getJSONObject("sysProperties");
			Iterator<String> keys = jsonObject.keys();

			while( keys.hasNext() ) {
				String key = keys.next();

				JSONObject jsonProperty = jsonObject.getJSONObject( key );
				Property property = PropertyJSONUtils.parseSysPropertyJSONObject( jsonProperty );
				//				Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
				if (property != null) {
					systemProperties.add(property);
				}
			}
		} else {
			if (json.has("systemProperties")) {

				// we need to iterate over every entry to see if they are valid
				JSONObject jsonObject = json.getJSONObject("systemProperties");
				Iterator<String> keys = jsonObject.keys();

				while( keys.hasNext() ) {
					String key = keys.next();

					JSONObject jsonProperty = jsonObject.getJSONObject( key );
					Property property = PropertyJSONUtils.parseSysPropertyJSONObject( jsonProperty );
					//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
					if (property != null) {
						systemProperties.add(property);
					}
				}
			}
		}

		decoProperties = new ArrayList<Property>();
		if (json.has("decoProperties")) {		

			JSONObject jsonDecoPropertyObject = json.getJSONObject( "decoProperties" );

			JSONArray tmpArray = new JSONArray();

			Set<String> keys = jsonDecoPropertyObject.keySet();
			for( String key : keys ) {
				JSONObject o = (JSONObject) jsonDecoPropertyObject.get( key );

				tmpArray.put( o );
			}


			decoProperties.addAll(PropertyJSONUtils.parseProperties( tmpArray, Neo4jPropertyTypeEnum.DECORATOR));
			//			JSONArray jsonArray = json.getJSONArray("decoProperties");
			//			if (jsonArray != null) {
			//				for (int i = 0; i < jsonArray.length(); i++) {
			//					JSONObject jsonObject = jsonArray.getJSONObject(i);
			//					Property property = PropertyUtils.parseNodeJSONObject(jsonObject);
			//					if (property != null) {
			//						decoProperties.add(property);
			//					}
			//				}
			//			}
		} 

		
		
		
		if( json.has("originNode")) { 
			JSONObject nodeJson = json.getJSONObject( "originNode" );
			GuiNodeRequestPayload originNode = new GuiNodeRequestPayload();
			originNode.parseRequest( nodeJson );
			
			this.originNode = originNode; 
			
		}
		
		if( json.has("destinationNode")) { 
			JSONObject nodeJson = json.getJSONObject( "destinationNode" );
			GuiNodeRequestPayload destNode = new GuiNodeRequestPayload();
			destNode.parseRequest( nodeJson );
			
			this.destinationNode = destNode; 
		}
		 

	}

	public Response preprocessor() {		

		ResponseBuilder responseBuilder;
 
 

		if (CollectionUtils.isNotEmpty(this.connections)) {
			if (RomeCollectionUtils.containsDuplication(this.connections)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}

		return null;

	}

	public Relationship convert( String namespace, RomeConnection conn ) {

		
		return RelationshipBuilder.build( conn, this.getProperties(), this.getDecoProperties(), this.getSystemProperties() );
//		return NodeBuilder.build( namespace, convertType, this.getProperties(), this.getDecoProperties(), this.getSystemProperties() );
	}

}
