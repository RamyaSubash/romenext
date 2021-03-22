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
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.node.NodeBuilder;

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
	"nodes": {
		"06bed2a7-c397-45f6-9157-ef087dcbe841": {
			"id": "10",
			"name": "test122",
			"type": "test122",
			"typeId": 3,
			"romeClass": "TYPE",
			"createdDate": "Nov 23, 2017 11:53:08 AM",
			"modifiedDate": "Nov 23, 2017 11:53:08 AM",
			"version": "0",
			"classification": "node",
			"isRoot": false,
			"typeProperties": {
				"1": {
					"id": "1",
					"value": "test22",
					"propertyType": "STRING"
				}
			},
			"sysProperties": {
				"created_date": {
					"id": "created_date",
					"name": "created_date",
					"value": "2017-11-28",
					"propertyType": "DATE"
				},
				"modified_date": {
					"id": "modified_date",
					"name": "modified_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "06bed2a7-c397-45f6-9157-ef087dcbe841",
					"propertyType": "STRING"
				}
			},
			"decoProperties": {
				"1": {
					"id": "1",
					"value": 847.4999999999999,
					"propertyType": "DOUBLE"
				},
				"2": {
					"id": "2",
					"value": 50,
					"propertyType": "DOUBLE"
				},
				"3": {
					"id": "3",
					"value": 0,
					"propertyType": "DOUBLE"
				},
				"13": {
					"id": "13",
					"value": -94.59294988036712,
					"propertyType": "DOUBLE"
				},
				"14": {
					"id": "14",
					"value": -101.24341655793882,
					"propertyType": "DOUBLE"
				},
				"15": {
					"id": "15",
					"value": 0,
					"propertyType": "DOUBLE"
				}
			},
			"prefProperties": {
				"6": {
					"id": "6",
					"name": "size",
					"propertyType": "STRING"
				},
				"7": {
					"id": "7",
					"name": "color",
					"propertyType": "STRING"
				}
			},
			"decorators": [5,
			9],
			"cyDisplay": "(test122)",
			"color": "#FF756E",
			"size": "70px"
		},
		"64ab7074-a70a-4f7a-b283-9aba8997e0f5": {
			"id": "33",
			"name": "TestingNode3",
			"type": "TestingNode3",
			"typeId": 5,
			"romeClass": "TYPE",
			"createdDate": "Nov 28, 2017 12:22:06 PM",
			"modifiedDate": "Nov 28, 2017 12:22:06 PM",
			"version": "0",
			"classification": "node",
			"isRoot": false,
			"typeProperties": {

			},
			"sysProperties": {
				"created_date": {
					"id": "created_date",
					"name": "created_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"modified_date": {
					"id": "modified_date",
					"name": "modified_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "64ab7074-a70a-4f7a-b283-9aba8997e0f5",
					"propertyType": "STRING"
				}
			},
			"decoProperties": {
				"13": {
					"id": "13",
					"value": 47.344162848546404,
					"propertyType": "DOUBLE"
				},
				"14": {
					"id": "14",
					"value": -44.36653969142535,
					"propertyType": "DOUBLE"
				},
				"15": {
					"id": "15",
					"value": 0,
					"propertyType": "DOUBLE"
				}
			},
			"prefProperties": {

			},
			"decorators": [5],
			"cyDisplay": null,
			"color": "#d3d7cf",
			"size": "40px"
		}
	},
	"edges": {
		"9f6ceb7a-8bf4-435c-bbfb-8e3b7d645483": {
			"id": "24",
			"type": "Testi_test1RULE0",
			"ruleName": "Testi_test1RULE0",
			"ruleId": 6,
			"connectionId": 18,
			"origin": "m1_r1_t5",
			"destination": "m1_r1_t3",
			"originTypeId": 5,
			"destinationTypeId": 3,
			"originUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=64ab7074-a70a-4f7a-b283-9aba8997e0f5]",
			"destinationUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=06bed2a7-c397-45f6-9157-ef087dcbe841]",
			"originNode": {
				"id": "33",
				"name": "TestingNode3",
				"type": "m1_r1_t5",
				"typeId": 5,
				"romeClass": "TYPE",
				"createdDate": "Nov 28, 2017 12:22:06 PM",
				"modifiedDate": "Nov 28, 2017 12:22:06 PM",
				"version": "0",
				"classification": "node",
				"isRoot": false,
				"typeProperties": {

				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "64ab7074-a70a-4f7a-b283-9aba8997e0f5",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"13": {
						"id": "13",
						"value": 47.344162848546404,
						"propertyType": "DOUBLE"
					},
					"14": {
						"id": "14",
						"value": -44.36653969142535,
						"propertyType": "DOUBLE"
					},
					"15": {
						"id": "15",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {

				},
				"decorators": [5]
			},
			"destinationNode": {
				"id": "10",
				"name": "test122",
				"type": "m1_r1_t3",
				"typeId": 3,
				"romeClass": "TYPE",
				"createdDate": "Nov 23, 2017 11:53:08 AM",
				"modifiedDate": "Nov 23, 2017 11:53:08 AM",
				"version": "0",
				"classification": "node",
				"isRoot": false,
				"typeProperties": {
					"1": {
						"id": "1",
						"value": "test22",
						"propertyType": "STRING"
					}
				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2017-11-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "06bed2a7-c397-45f6-9157-ef087dcbe841",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"1": {
						"id": "1",
						"value": 847.4999999999999,
						"propertyType": "DOUBLE"
					},
					"2": {
						"id": "2",
						"value": 50,
						"propertyType": "DOUBLE"
					},
					"3": {
						"id": "3",
						"value": 0,
						"propertyType": "DOUBLE"
					},
					"13": {
						"id": "13",
						"value": -94.59294988036712,
						"propertyType": "DOUBLE"
					},
					"14": {
						"id": "14",
						"value": -101.24341655793882,
						"propertyType": "DOUBLE"
					},
					"15": {
						"id": "15",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {
					"6": {
						"id": "6",
						"name": "size",
						"propertyType": "STRING"
					},
					"7": {
						"id": "7",
						"name": "color",
						"propertyType": "STRING"
					}
				},
				"decorators": [5,
				9]
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
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"modified_date": {
					"id": "modified_date",
					"name": "modified_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "9f6ceb7a-8bf4-435c-bbfb-8e3b7d645483",
					"propertyType": "STRING"
				}
			},
			"classification": "parentchild",
			"cyDisplay": ""
		},
		"58000d8c-808c-4067-9695-13d213af07c6": {
			"id": "25",
			"type": "link1",
			"ruleName": "link1",
			"ruleId": 1,
			"connectionId": 7,
			"origin": "m1_r1_t3",
			"destination": "m1_r1_t5",
			"originTypeId": 3,
			"destinationTypeId": 5,
			"originUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=06bed2a7-c397-45f6-9157-ef087dcbe841]",
			"destinationUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=64ab7074-a70a-4f7a-b283-9aba8997e0f5]",
			"originNode": {
				"id": "10",
				"name": "test122",
				"type": "m1_r1_t3",
				"typeId": 3,
				"romeClass": "TYPE",
				"createdDate": "Nov 23, 2017 11:53:08 AM",
				"modifiedDate": "Nov 23, 2017 11:53:08 AM",
				"version": "0",
				"classification": "node",
				"isRoot": false,
				"typeProperties": {
					"1": {
						"id": "1",
						"value": "test22",
						"propertyType": "STRING"
					}
				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2017-11-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "06bed2a7-c397-45f6-9157-ef087dcbe841",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"1": {
						"id": "1",
						"value": 847.4999999999999,
						"propertyType": "DOUBLE"
					},
					"2": {
						"id": "2",
						"value": 50,
						"propertyType": "DOUBLE"
					},
					"3": {
						"id": "3",
						"value": 0,
						"propertyType": "DOUBLE"
					},
					"13": {
						"id": "13",
						"value": -94.59294988036712,
						"propertyType": "DOUBLE"
					},
					"14": {
						"id": "14",
						"value": -101.24341655793882,
						"propertyType": "DOUBLE"
					},
					"15": {
						"id": "15",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {
					"6": {
						"id": "6",
						"name": "size",
						"propertyType": "STRING"
					},
					"7": {
						"id": "7",
						"name": "color",
						"propertyType": "STRING"
					}
				},
				"decorators": [5,
				9]
			},
			"destinationNode": {
				"id": "33",
				"name": "TestingNode3",
				"type": "m1_r1_t5",
				"typeId": 5,
				"romeClass": "TYPE",
				"createdDate": "Nov 28, 2017 12:22:06 PM",
				"modifiedDate": "Nov 28, 2017 12:22:06 PM",
				"version": "0",
				"classification": "node",
				"isRoot": false,
				"typeProperties": {

				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "64ab7074-a70a-4f7a-b283-9aba8997e0f5",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"13": {
						"id": "13",
						"value": 47.344162848546404,
						"propertyType": "DOUBLE"
					},
					"14": {
						"id": "14",
						"value": -44.36653969142535,
						"propertyType": "DOUBLE"
					},
					"15": {
						"id": "15",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {

				},
				"decorators": [5]
			},
			"minRel": 0,
			"maxRel": 0,
			"sysProperties": {
				"edge_classification": {
					"id": "edge_classification",
					"name": "edge_classification",
					"value": 1,
					"propertyType": "INTEGER"
				},
				"created_date": {
					"id": "created_date",
					"name": "created_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"modified_date": {
					"id": "modified_date",
					"name": "modified_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "58000d8c-808c-4067-9695-13d213af07c6",
					"propertyType": "STRING"
				}
			},
			"classification": "link",
			"cyDisplay": ""
		},
		"20effb22-77d7-4d52-9a84-6a2a581a3ccb": {
			"id": "26",
			"type": "test1_TestiRULE1",
			"ruleName": "test1_TestiRULE1",
			"ruleId": 7,
			"connectionId": 19,
			"origin": "m1_r1_t3",
			"destination": "m1_r1_t5",
			"originTypeId": 3,
			"destinationTypeId": 5,
			"originUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=06bed2a7-c397-45f6-9157-ef087dcbe841]",
			"destinationUuid": "Neo4jProperty [internalPropertyName=uuid, name=uuid, type=STRING, neo4jType=SYSTEM, value=64ab7074-a70a-4f7a-b283-9aba8997e0f5]",
			"originNode": {
				"id": "10",
				"name": "test122",
				"type": "m1_r1_t3",
				"typeId": 3,
				"romeClass": "TYPE",
				"createdDate": "Nov 23, 2017 11:53:08 AM",
				"modifiedDate": "Nov 23, 2017 11:53:08 AM",
				"version": "0",
				"classification": "node",
				"isRoot": false,
				"typeProperties": {
					"1": {
						"id": "1",
						"value": "test22",
						"propertyType": "STRING"
					}
				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2017-11-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "06bed2a7-c397-45f6-9157-ef087dcbe841",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"1": {
						"id": "1",
						"value": 847.4999999999999,
						"propertyType": "DOUBLE"
					},
					"2": {
						"id": "2",
						"value": 50,
						"propertyType": "DOUBLE"
					},
					"3": {
						"id": "3",
						"value": 0,
						"propertyType": "DOUBLE"
					},
					"13": {
						"id": "13",
						"value": -94.59294988036712,
						"propertyType": "DOUBLE"
					},
					"14": {
						"id": "14",
						"value": -101.24341655793882,
						"propertyType": "DOUBLE"
					},
					"15": {
						"id": "15",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {
					"6": {
						"id": "6",
						"name": "size",
						"propertyType": "STRING"
					},
					"7": {
						"id": "7",
						"name": "color",
						"propertyType": "STRING"
					}
				},
				"decorators": [5,
				9]
			},
			"destinationNode": {
				"id": "33",
				"name": "TestingNode3",
				"type": "m1_r1_t5",
				"typeId": 5,
				"romeClass": "TYPE",
				"createdDate": "Nov 28, 2017 12:22:06 PM",
				"modifiedDate": "Nov 28, 2017 12:22:06 PM",
				"version": "0",
				"classification": "node",
				"isRoot": false,
				"typeProperties": {

				},
				"sysProperties": {
					"created_date": {
						"id": "created_date",
						"name": "created_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"modified_date": {
						"id": "modified_date",
						"name": "modified_date",
						"value": "2017-12-28",
						"propertyType": "DATE"
					},
					"uuid": {
						"id": "uuid",
						"name": "uuid",
						"value": "64ab7074-a70a-4f7a-b283-9aba8997e0f5",
						"propertyType": "STRING"
					}
				},
				"decoProperties": {
					"13": {
						"id": "13",
						"value": 47.344162848546404,
						"propertyType": "DOUBLE"
					},
					"14": {
						"id": "14",
						"value": -44.36653969142535,
						"propertyType": "DOUBLE"
					},
					"15": {
						"id": "15",
						"value": 0,
						"propertyType": "DOUBLE"
					}
				},
				"prefProperties": {

				},
				"decorators": [5]
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
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"modified_date": {
					"id": "modified_date",
					"name": "modified_date",
					"value": "2017-12-28",
					"propertyType": "DATE"
				},
				"uuid": {
					"id": "uuid",
					"name": "uuid",
					"value": "20effb22-77d7-4d52-9a84-6a2a581a3ccb",
					"propertyType": "STRING"
				}
			},
			"classification": "parentchild",
			"cyDisplay": ""
		}
	}
}
 * @author jplee
 *
 */
public class GuiNodeRequestPayload {

	private static Logger log = Logger.getLogger(GuiNodeRequestPayload.class);

	private List<Long> types;
	private List<Long> connections;
	private List<Property> properties;
	private List<Property> systemProperties;
	private List<Property> decoProperties;

	private String originalPayload;
	private JSONObject originalJson;


	public List<Long> getTypes() {
		return types;
	}

	public void setTypes(List<Long> types) {
		this.types = types;
	}

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



	public JSONObject getOriginalJson() {
		return originalJson;
	}

	public void setOriginalJson(JSONObject originalJson) {
		this.originalJson = originalJson;
	}

	public String validateRequest(JSONObject json) {

		String empty = null;

		if (!json.has("typeIds")) {

			// on the front end, usually there is only ONE typeid
			if( !json.has("typeId") ) {
				return "typeIds or typeId";				
			}

		}

		/**
		 * NOTE: In the GUI node payloads, they order their properties/sysprops/deco properties as a map (ie. json object) with the keys set to either uuid or ids
		 */

		if (json.has("typeProperties")) {
			JSONObject jsonObject = json.getJSONObject( "typeProperties" );

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

			//			String check = this.validateMapOfProperties( jsonObject, "id", "value", "propertyType" );
			//			if( check != null ) {
			//				return check;
			//			}

			
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
			
			
			// OLD VERSION BELOW 
			
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

	/**
	 * This is only good if the jsonMap is a MAP
	 * @param jsonMap
	 * @param checker
	 * @return
	 */
	protected String validateMapOfProperties( JSONObject jsonMap, String...checker ) {

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
	
	/**
	 * This is only good if the json is a LIST of MAPS!
	 * 
	 * ie. [ { "test1":"test2"}, {"test3":"test4"}]
	 * 
	 * vs 
	 * 
	 * {
	 * 	"test1":{ "test2","test3"},
	 * 	"test4":{ "test5","test6"}
	 * }
	 * 
	 * @param jsonMap
	 * @param checker
	 * @return
	 */
	public String validateListOfProperties( JSONArray jsonList, String...checker ) {

		if( jsonList == null ) {
			return "Base";
		}
		
		
		// iterate over list and load each one as an object, instead of a map
		for( int i = 0; i < jsonList.length(); i++ ) {
			
			JSONObject json = jsonList.getJSONObject( i );
			
			String empty = RomeJSONUtils.findEmptyJson(json,  checker );

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

		types = new ArrayList<Long>();
		if (json.has("typeIds")) {
			JSONArray jsonArray = json.getJSONArray("typeIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					types.add(jsonArray.getLong(i));
				}
			}
		} else {
			// must be typeId
			long typeId = json.getLong("typeId");

			types.add( typeId );
		}

		connections = new ArrayList<Long>();
		if (json.has("connIds")) {
			JSONArray jsonArray = json.getJSONArray("connIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					connections.add(jsonArray.getLong(i));
				}
			}
		}

	}

	public Response preprocessor() {		

		ResponseBuilder responseBuilder;

		if (this.types.size() < 1) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		if (CollectionUtils.isNotEmpty(this.types)) {
			if (RomeCollectionUtils.containsDuplication(this.types)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}

		if (CollectionUtils.isNotEmpty(this.connections)) {
			if (RomeCollectionUtils.containsDuplication(this.connections)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}

		return null;

	}

	public Node convert( String namespace, RomeType convertType ) {

		return NodeBuilder.build( namespace, convertType, this.getProperties(), this.getDecoProperties(), this.getSystemProperties() );
	}

}
