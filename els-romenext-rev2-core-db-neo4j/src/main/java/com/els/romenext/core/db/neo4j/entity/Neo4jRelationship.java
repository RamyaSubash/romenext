package com.els.romenext.core.db.neo4j.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.Result;

import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.utils.internal.InternalNeo4jRelationshipUtils;
import com.els.romenext.core.db.neo4j.utils.json.RomeNeo4jJsonUtils;

public class Neo4jRelationship implements INeo4jParsable<Neo4jRelationship> {
	
	private static Logger log = Logger.getLogger(Neo4jRelationship.class);
	
	private Long internalId;
	private String type;
	private Neo4jNode startNode;
	private Neo4jNode endNode;
	
	/**
	 * TO BE DELETED SOON
	 */
	@Deprecated
	private Map<String, Object> properties;
	
	private Map<String, Neo4jProperty> ruleProperties;		// the Key here should be the ID of the RomeTypeProperty 
	private Map<String, Neo4jProperty> systemProperties;	// note: we do NOT have any id's here, so this should be the NAME of the property
	private Map<String, Neo4jProperty> decoProperties;		
	
	public Long getInternalId() {
		return internalId;
	}

	public void setInternalId(Long internalId ) {
		this.internalId = internalId;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public Neo4jNode getStartNode() {
		return startNode;
	}

	public void setStartNode(Neo4jNode startNode) {
		this.startNode = startNode;
	}

	public Neo4jNode getEndNode() {
		return endNode;
	}

	public void setEndNode(Neo4jNode endNode) {
		this.endNode = endNode;
	}
	
	@Deprecated
	public Map<String, Object> getProperties() {
		return properties;
	}

	@Deprecated
	public void setProperties(Map<String, Object> properties) {
		this.properties = properties;
	}
	
	public boolean hasInternalId () {
		
		return this.internalId != null;
		
	}
	
	public boolean hasType () {
		
		return StringUtils.isNotEmpty(this.type);
		
	}
	
	public boolean hasProperties () {
		
//		return MapUtils.isNotEmpty(this.properties);
		return MapUtils.isNotEmpty(this.ruleProperties) || MapUtils.isNotEmpty( this.systemProperties ) || MapUtils.isNotEmpty( this.decoProperties );
		
	}
	
	public boolean hasRuleProperties() {
		return MapUtils.isNotEmpty( this.ruleProperties );
	}
	
	public boolean hasSystemProperties() {
		return MapUtils.isNotEmpty( this.systemProperties );
	}
	
	public boolean hasDecoratorProperties() {
		return MapUtils.isNotEmpty( this.decoProperties );
	}
	
	public boolean hasStartNode () {
		
		return this.startNode != null;
		
	}
	
	public boolean hasEndNode () {
		
		return this.endNode != null;
		
	}
	
	public Map<String, Neo4jProperty> getRuleProperties() {
		return ruleProperties;
	}

	public void setRuleProperties(Map<String, Neo4jProperty> ruleProperties) {
		this.ruleProperties = ruleProperties;
	}
	
	public void addRuleProperties( String key, Neo4jProperty p ) {
		if( this.ruleProperties == null ) {
			this.ruleProperties = new HashMap<String, Neo4jProperty>();
		}
		this.ruleProperties.put( key,  p );
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

	
	
	public boolean hasNull () {
		
		return this.internalId == null || type == null || startNode.hasNull() || endNode.hasNull() || properties == null;
		
	}
	
	/**
	 * We are expecting this type:
	 * 
	 * Example From Shaobo
	 * [{"data":[{"graph":{"nodes":[{"id":"3176","labels":["m1_r1_t34"],"properties":{"d2_y":-14.302674399993602,"uuid":"5ee721eb-8de6-46d9-bbb0-d3fe9b795eef","default_decorator_id":1,"tp21":"Hilton","d1_x":186.11993812864515}},{"id":"3187","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 4","d2_y":16.351767503966848,"uuid":"91cc8e7f-c5e6-4a01-9d56-e14763440407","default_decorator_id":1,"d1_x":280.76524819058017}}],"relationships":[{"id":"82","startNode":"3176","properties":{"d2_y":30.65444190396045,"edge_classification":2,"uuid":"17215936-56f4-47bd-8101-09a901d42799","d3_z":0,"d1_x":94.64531006193502},"type":"m1_r1_c29","endNode":"3187"}]},"row":[{"d2_y":30.65444190396045,"edge_classification":2,"uuid":"17215936-56f4-47bd-8101-09a901d42799","d3_z":0,"d1_x":94.64531006193502},"m1_r1_c29",82,3176,3187]},{"graph":{"nodes":[{"id":"3176","labels":["m1_r1_t34"],"properties":{"d2_y":-14.302674399993602,"uuid":"5ee721eb-8de6-46d9-bbb0-d3fe9b795eef","default_decorator_id":1,"tp21":"Hilton","d1_x":186.11993812864515}},{"id":"3186","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":84.40456682277349,"tp25":"Room 003","uuid":"6ffa15de-cc5f-4ab7-aaac-6627af2bc77f","default_decorator_id":1,"d1_x":254.18212345667143}}],"relationships":[{"id":"79","startNode":"3176","properties":{"d2_y":98.7072412227671,"edge_classification":2,"uuid":"00242ad9-5484-40b9-8040-927578026e9f","d3_z":0,"d1_x":68.06218532802629},"type":"m1_r1_c28","endNode":"3186"}]},"row":[{"d2_y":98.7072412227671,"edge_classification":2,"uuid":"00242ad9-5484-40b9-8040-927578026e9f","d3_z":0,"d1_x":68.06218532802629},"m1_r1_c28",79,3176,3186]},{"graph":{"nodes":[{"id":"3176","labels":["m1_r1_t34"],"properties":{"d2_y":-14.302674399993602,"uuid":"5ee721eb-8de6-46d9-bbb0-d3fe9b795eef","default_decorator_id":1,"tp21":"Hilton","d1_x":186.11993812864515}},{"id":"3185","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 3","d2_y":42.226008911638104,"uuid":"c725a0ea-14ea-419e-9a07-49398332559d","default_decorator_id":1,"d1_x":194.28148238959673}}],"relationships":[{"id":"78","startNode":"3176","properties":{"d2_y":56.52868331163171,"edge_classification":2,"uuid":"fec0c1e0-55d3-460e-a00f-38b656fe184b","d3_z":0,"d1_x":8.161544260951587},"type":"m1_r1_c29","endNode":"3185"}]},"row":[{"d2_y":56.52868331163171,"edge_classification":2,"uuid":"fec0c1e0-55d3-460e-a00f-38b656fe184b","d3_z":0,"d1_x":8.161544260951587},"m1_r1_c29",78,3176,3185]},{"graph":{"nodes":[{"id":"3176","labels":["m1_r1_t34"],"properties":{"d2_y":-14.302674399993602,"uuid":"5ee721eb-8de6-46d9-bbb0-d3fe9b795eef","default_decorator_id":1,"tp21":"Hilton","d1_x":186.11993812864515}},{"id":"3184","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":92.55672507450552,"tp25":"Room 002","uuid":"59bd5b49-ba6f-4819-b617-d75d102ef08c","default_decorator_id":1,"d1_x":136.86193296435354}}],"relationships":[{"id":"75","startNode":"3176","properties":{"d2_y":106.85939947449913,"edge_classification":2,"uuid":"0342746c-3a73-411c-94f8-4c0412590105","d3_z":0,"d1_x":-49.2580051642916},"type":"m1_r1_c28","endNode":"3184"}]},"row":[{"d2_y":106.85939947449913,"edge_classification":2,"uuid":"0342746c-3a73-411c-94f8-4c0412590105","d3_z":0,"d1_x":-49.2580051642916},"m1_r1_c28",75,3176,3184]},{"graph":{"nodes":[{"id":"3182","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":88.65786678019889,"tp25":"Room 001","uuid":"75794bde-4c8e-43a3-8dc9-b882121b8062","default_decorator_id":1,"d1_x":80.86015019158562}},{"id":"3176","labels":["m1_r1_t34"],"properties":{"d2_y":-14.302674399993602,"uuid":"5ee721eb-8de6-46d9-bbb0-d3fe9b795eef","default_decorator_id":1,"tp21":"Hilton","d1_x":186.11993812864515}}],"relationships":[{"id":"72","startNode":"3176","properties":{"d2_y":102.9605411801925,"edge_classification":2,"uuid":"25dfc6b6-4e48-4a5f-a3ff-a60028b57e14","d3_z":0,"d1_x":-105.25978793705953},"type":"m1_r1_c28","endNode":"3182"}]},"row":[{"d2_y":102.9605411801925,"edge_classification":2,"uuid":"25dfc6b6-4e48-4a5f-a3ff-a60028b57e14","d3_z":0,"d1_x":-105.25978793705953},"m1_r1_c28",72,3176,3182]},{"graph":{"nodes":[{"id":"3178","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 1","d2_y":16.625753834544355,"uuid":"9fdbb893-3c99-4c7b-8721-14d2e3070ee9","default_decorator_id":1,"d1_x":71.63723025684861}},{"id":"3176","labels":["m1_r1_t34"],"properties":{"d2_y":-14.302674399993602,"uuid":"5ee721eb-8de6-46d9-bbb0-d3fe9b795eef","default_decorator_id":1,"tp21":"Hilton","d1_x":186.11993812864515}}],"relationships":[{"id":"70","startNode":"3176","properties":{"d2_y":30.928428234537957,"edge_classification":2,"uuid":"e84323ff-c50d-4ac3-b2a8-ed053a101ce3","d3_z":0,"d1_x":-114.48270787179653},"type":"m1_r1_c29","endNode":"3178"}]},"row":[{"d2_y":30.928428234537957,"edge_classification":2,"uuid":"e84323ff-c50d-4ac3-b2a8-ed053a101ce3","d3_z":0,"d1_x":-114.48270787179653},"m1_r1_c29",70,3176,3178]},{"graph":{"nodes":[{"id":"3179","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 2","d2_y":172.7208699027292,"uuid":"9b4e04a1-ec97-49a6-afd1-226e9ef7e29b","default_decorator_id":1,"d1_x":411.603948915783}},{"id":"3177","labels":["m1_r1_t34"],"properties":{"d2_y":114.3467569822092,"uuid":"d383a57a-fa60-40b2-9da7-2bb7f8b056cc","default_decorator_id":1,"tp21":"Holiday","d1_x":432.8463563843463}}],"relationships":[{"id":"71","startNode":"3177","properties":{"d2_y":58.37411292051999,"edge_classification":2,"uuid":"e82ee119-621b-4a87-97a3-9e1ba5972e90","d3_z":0,"d1_x":-21.242407468563272},"type":"m1_r1_c29","endNode":"3179"}]},"row":[{"d2_y":58.37411292051999,"edge_classification":2,"uuid":"e82ee119-621b-4a87-97a3-9e1ba5972e90","d3_z":0,"d1_x":-21.242407468563272},"m1_r1_c29",71,3177,3179]},{"graph":{"nodes":[{"id":"3182","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":88.65786678019889,"tp25":"Room 001","uuid":"75794bde-4c8e-43a3-8dc9-b882121b8062","default_decorator_id":1,"d1_x":80.86015019158562}},{"id":"3178","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 1","d2_y":16.625753834544355,"uuid":"9fdbb893-3c99-4c7b-8721-14d2e3070ee9","default_decorator_id":1,"d1_x":71.63723025684861}}],"relationships":[{"id":"74","startNode":"3178","properties":{"d2_y":72.03211294565453,"edge_classification":2,"uuid":"35f36129-12a4-47eb-9538-f42cbd42b653","d3_z":0,"d1_x":9.222919934737007},"type":"m1_r1_c30","endNode":"3182"}]},"row":[{"d2_y":72.03211294565453,"edge_classification":2,"uuid":"35f36129-12a4-47eb-9538-f42cbd42b653","d3_z":0,"d1_x":9.222919934737007},"m1_r1_c30",74,3178,3182]},{"graph":{"nodes":[{"id":"3182","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":88.65786678019889,"tp25":"Room 001","uuid":"75794bde-4c8e-43a3-8dc9-b882121b8062","default_decorator_id":1,"d1_x":80.86015019158562}},{"id":"3180","labels":["m1_r1_t33"],"properties":{"d2_y":177.3250196353448,"tp23":"Wood","tp22":"King","tp24":"asd","uuid":"b43bdd5b-a2db-4214-8fbd-609c112d9b57","default_decorator_id":1,"d1_x":72.5865966996842}}],"relationships":[{"id":"73","startNode":"3182","properties":{"d2_y":88.66715285514591,"edge_classification":2,"uuid":"b5e1f79f-fbd2-4aa6-8b4a-f3b5bc22fd72","d3_z":0,"d1_x":-8.273553491901424},"type":"m1_r1_c26","endNode":"3180"}]},"row":[{"d2_y":88.66715285514591,"edge_classification":2,"uuid":"b5e1f79f-fbd2-4aa6-8b4a-f3b5bc22fd72","d3_z":0,"d1_x":-8.273553491901424},"m1_r1_c26",73,3182,3180]},{"graph":{"nodes":[{"id":"3180","labels":["m1_r1_t33"],"properties":{"d2_y":177.3250196353448,"tp23":"Wood","tp22":"King","tp24":"asd","uuid":"b43bdd5b-a2db-4214-8fbd-609c112d9b57","default_decorator_id":1,"d1_x":72.5865966996842}},{"id":"3184","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":92.55672507450552,"tp25":"Room 002","uuid":"59bd5b49-ba6f-4819-b617-d75d102ef08c","default_decorator_id":1,"d1_x":136.86193296435354}}],"relationships":[{"id":"76","startNode":"3184","properties":{"d2_y":84.76829456083928,"edge_classification":2,"uuid":"1dbc35ac-3359-48dd-bfa9-55a39031210f","d3_z":0,"d1_x":-64.27533626466935},"type":"m1_r1_c26","endNode":"3180"}]},"row":[{"d2_y":84.76829456083928,"edge_classification":2,"uuid":"1dbc35ac-3359-48dd-bfa9-55a39031210f","d3_z":0,"d1_x":-64.27533626466935},"m1_r1_c26",76,3184,3180]},{"graph":{"nodes":[{"id":"3185","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 3","d2_y":42.226008911638104,"uuid":"c725a0ea-14ea-419e-9a07-49398332559d","default_decorator_id":1,"d1_x":194.28148238959673}},{"id":"3184","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":92.55672507450552,"tp25":"Room 002","uuid":"59bd5b49-ba6f-4819-b617-d75d102ef08c","default_decorator_id":1,"d1_x":136.86193296435354}}],"relationships":[{"id":"77","startNode":"3185","properties":{"d2_y":50.33071616286742,"edge_classification":2,"uuid":"b1fd5669-fd52-4a7b-919d-d706a343fdfa","d3_z":0,"d1_x":-57.41954942524319},"type":"m1_r1_c30","endNode":"3184"}]},"row":[{"d2_y":50.33071616286742,"edge_classification":2,"uuid":"b1fd5669-fd52-4a7b-919d-d706a343fdfa","d3_z":0,"d1_x":-57.41954942524319},"m1_r1_c30",77,3185,3184]},{"graph":{"nodes":[{"id":"3180","labels":["m1_r1_t33"],"properties":{"d2_y":177.3250196353448,"tp23":"Wood","tp22":"King","tp24":"asd","uuid":"b43bdd5b-a2db-4214-8fbd-609c112d9b57","default_decorator_id":1,"d1_x":72.5865966996842}},{"id":"3186","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":84.40456682277349,"tp25":"Room 003","uuid":"6ffa15de-cc5f-4ab7-aaac-6627af2bc77f","default_decorator_id":1,"d1_x":254.18212345667143}}],"relationships":[{"id":"80","startNode":"3186","properties":{"d2_y":92.92045281257131,"edge_classification":2,"uuid":"c3118296-5e64-43c0-b83c-43fcb9e94fcb","d3_z":0,"d1_x":-181.59552675698723},"type":"m1_r1_c26","endNode":"3180"}]},"row":[{"d2_y":92.92045281257131,"edge_classification":2,"uuid":"c3118296-5e64-43c0-b83c-43fcb9e94fcb","d3_z":0,"d1_x":-181.59552675698723},"m1_r1_c26",80,3186,3180]},{"graph":{"nodes":[{"id":"3187","labels":["m1_r1_t38"],"properties":{"tp27":"Floor 4","d2_y":16.351767503966848,"uuid":"91cc8e7f-c5e6-4a01-9d56-e14763440407","default_decorator_id":1,"d1_x":280.76524819058017}},{"id":"3186","labels":["m1_r1_t36"],"properties":{"tp26":"asd","d2_y":84.40456682277349,"tp25":"Room 003","uuid":"6ffa15de-cc5f-4ab7-aaac-6627af2bc77f","default_decorator_id":1,"d1_x":254.18212345667143}}],"relationships":[{"id":"81","startNode":"3187","properties":{"d2_y":68.05279931880665,"edge_classification":2,"uuid":"e64c9f97-5a67-42a8-b775-b0a570a6a202","d3_z":0,"d1_x":-26.583124733908733},"type":"m1_r1_c30","endNode":"3186"}]},"row":[{"d2_y":68.05279931880665,"edge_classification":2,"uuid":"e64c9f97-5a67-42a8-b775-b0a570a6a202","d3_z":0,"d1_x":-26.583124733908733},"m1_r1_c30",81,3187,3186]}],"columns":["r","type(r)","id(r)","id(startNode(r))","id(endNode(r))"]}]
	 * @param jsonRow
	 */
	public void parseNeo4jAPIResults (JSONObject jsonRow) {
		
		// TODO: Parse results JSON more generic
		
		properties = new HashMap<String, Object>();
		Long sId = null;
		Long eId = null;
		
		
//		if (jsonRow.has("row")) {
//			
//			JSONArray jsonArrayRow = jsonRow.getJSONArray("row");
//			
//			if (jsonArrayRow != null) {
//				
//				
//				// do we want to change this to be just the actual names of the columsn we are expecting?
//				
//				
//				
//				// First return
//				if (!jsonArrayRow.isNull(0)) {
//					
//					JSONObject jsonObject = jsonArrayRow.getJSONObject(0);
//					
//					System.out.println("What is this json object: " + jsonObject );
//					
////					Map<String, Object> parsedProperties = RomeNeo4jJsonUtils.parseNodeProperties( jsonArrayRow.getJSONObject(0));
////					
////					Neo4jNode.parseNeo4jPropertiesIntoNode( this, parsedProperties );
//					
//					
//					properties = parseRelProperties(jsonArrayRow.getJSONObject(0));
//					
//				}
//				
//				// Second return
//				if (!jsonArrayRow.isNull(1)) {
//					
////					System.out.println(jsonArrayRow.getString(1));
//					type = jsonArrayRow.getString(1);
//					
//				}
//				
//				// Third return
//				if (!jsonArrayRow.isNull(2)) {
//					
////					System.out.println(jsonArrayRow.getLong(2));
//					internalId = jsonArrayRow.getLong(2);
//					
//				}
//				
//				// Fourth return
//				if (!jsonArrayRow.isNull(3)) {
//
//					sId = jsonArrayRow.getLong(3);
//					
//				}
//				
//				// Fifth return
//				if (!jsonArrayRow.isNull(4)) {
//
//					eId = jsonArrayRow.getLong(4);
//					
//				}
//				
//			}
//			
//		}
		
		startNode = new Neo4jNode();
		endNode = new Neo4jNode();
		
		
		
		// Parse start and end nodes
		Map<Long, Neo4jNode> foundNodes = new HashMap<>();

		if (jsonRow.has("graph")) {
			
			JSONObject jsonGraph = jsonRow.getJSONObject("graph");
			
			System.out.println("PARSING: " + jsonGraph );
			
			if (jsonGraph.has("nodes")) {

				JSONArray jsonArrayNodes = jsonGraph.getJSONArray("nodes");
//				System.out.println("Start&End node JSONArray: " + jsonArrayNodes);
			
				System.out.println("Attempting to parse this data: " + jsonArrayNodes );
				
				/**
				 * Refactored to be more flexible
				 */
				int length = jsonArrayNodes.length();
				
				
				for( int i = 0; i < length; i++ ) {
					
					JSONObject jsonObj = jsonArrayNodes.getJSONObject( i );
					
					Long foundId = Long.parseLong( jsonObj.getString( "id" ) );
					
					// parse neo4jNode
					Neo4jNode neo4jNode = Neo4jNode.parseNeo4jAPIResults_original( jsonObj );
					
					foundNodes.put( foundId,  neo4jNode );
				}
				
				
				
				
//				if (!jsonArrayNodes.isNull(0)) {
//					
//					JSONObject jsonStart = jsonArrayNodes.getJSONObject(0);
////					System.out.println("Start node JSONObject: " + jsonStart);
//					
//					if (jsonStart.has("id")) {
//						
//						Long id = Long.parseLong(jsonStart.getString("id"));
//						
//						if (id.equals(sId)) {
//							
//							startNode.setInternalId(Long.parseLong(jsonStart.getString("id")));
//							
//							if (jsonStart.has("labels")) {
//								
//								startNode.setLabels(Neo4jNode.parseNodeLabels(jsonStart.getJSONArray("labels")));
//								
//							}
//
//							if (jsonStart.has("properties")) {
//								
////								startNode.setProperties(Neo4jNode.parseNodeProperties(jsonStart.getJSONObject("properties")));
//								
//			    				Map<String, Object> parseNodeProperties = RomeNeo4jJsonUtils.parseNodeProperties( jsonStart.getJSONObject("properties") );
////			    				endNode.setProperties(Neo4jNode.parseNodeProperties(jsonEnd.getJSONObject("properties")));
//			    				startNode.setProperties( parseNodeProperties );
//							}
//							
//						} else if (id.equals(eId)) {
//						    				
//			    		    endNode.setInternalId(Long.parseLong(jsonStart.getString("id")));
//			    				
//			    			if (jsonStart.has("labels")) {
//			    				
//			    				endNode.setLabels(Neo4jNode.parseNodeLabels(jsonStart.getJSONArray("labels")));
//			    				
//			    			}
//			    			
//			    			if (jsonStart.has("properties")) {
//			    				
////			    				endNode.setProperties(Neo4jNode.parseNodeProperties(jsonStart.getJSONObject("properties")));
//			    				
//			    				Map<String, Object> parseNodeProperties = RomeNeo4jJsonUtils.parseNodeProperties( jsonStart.getJSONObject("properties") );
////			    				endNode.setProperties(Neo4jNode.parseNodeProperties(jsonEnd.getJSONObject("properties")));
//			    				endNode.setProperties( parseNodeProperties );
//			    				
//			    			}
//							
//						}
//						
//					}
//					
//				}
				
//	            if (!jsonArrayNodes.isNull(1)) {
//	            	
//	    			JSONObject jsonEnd = jsonArrayNodes.getJSONObject(1);
//	    			
//					if (jsonEnd.has("id")) {
//						
//						Long id = Long.parseLong(jsonEnd.getString("id"));
//						
//						if (id.equals(sId)) {
//							
//							startNode.setInternalId(Long.parseLong(jsonEnd.getString("id")));
//							
//							if (jsonEnd.has("labels")) {
//								
//								startNode.setLabels(Neo4jNode.parseNodeLabels(jsonEnd.getJSONArray("labels")));
//								
//							}
//
//							if (jsonEnd.has("properties")) {
//								
//			    				Map<String, Object> parseNodeProperties = RomeNeo4jJsonUtils.parseNodeProperties( jsonEnd.getJSONObject("properties") );
////			    				endNode.setProperties(Neo4jNode.parseNodeProperties(jsonEnd.getJSONObject("properties")));
//			    				startNode.setProperties( parseNodeProperties );
//			    				
////								startNode.setProperties(Neo4jNode.parseNodeProperties(jsonEnd.getJSONObject("properties")));
//								
//							}
//							
//						} else if (id.equals(eId)) {
//						    				
//			    		    endNode.setInternalId(Long.parseLong(jsonEnd.getString("id")));
//			    				
//			    			if (jsonEnd.has("labels")) {
//			    				
//			    				endNode.setLabels(Neo4jNode.parseNodeLabels(jsonEnd.getJSONArray("labels")));
//			    				
//			    			}
//			    			
//			    			if (jsonEnd.has("properties")) {
//			    				
//			    				Map<String, Object> parseNodeProperties = RomeNeo4jJsonUtils.parseNodeProperties( jsonEnd.getJSONObject("properties") );
////			    				endNode.setProperties(Neo4jNode.parseNodeProperties(jsonEnd.getJSONObject("properties")));
//			    				endNode.setProperties( parseNodeProperties );
//
//			    			}
//							
//						}
//						
//					}
//	            	
//	            }
				
			}
			
			Map<Long, Neo4jRelationship> foundRels = new HashMap<>();

			if (jsonGraph.has("relationships")) {
				JSONArray jsonArrayNodes = jsonGraph.getJSONArray("relationships");
//				System.out.println("Start&End node JSONArray: " + jsonArrayNodes);
			
				System.out.println("Attempting to parse this data: " + jsonArrayNodes );
				
				/**
				 * Refactored to be more flexible
				 */
				int length = jsonArrayNodes.length();
				
				
				for( int i = 0; i < length; i++ ) {
					
					JSONObject jsonObj = jsonArrayNodes.getJSONObject( i );
					
					Long foundId = Long.parseLong( jsonObj.getString( "id" ) );
					
					// parse neo4jNode
					Neo4jRelationship rel = Neo4jRelationship.parseNeo4jAPIResults_relationship(jsonObj);
//					Neo4jNode neo4jNode = Neo4jNode.parseNeo4jAPIResults_original( jsonObj );
					
					foundRels.put( foundId,  rel );
				}
			}
			
			
			// After we've parsed all the data, now properly rebuild the relationship
			// also, there should only be 1 relationship here
			// if there are more....?
			if( foundRels.size() > 1 ) {
				log.error("FOUND MORE THAN 1 RELATIONSHIP???");
				log.error( jsonRow );
				return;
			} else {
				for( Long id : foundRels.keySet() ) {
					Neo4jRelationship foundRel = foundRels.get( id );
					
					Neo4jNode startNode_base = foundRel.getStartNode();
					
					if( startNode_base != null ) {
						Long startNodeId = startNode_base.getInternalId();
						
						Neo4jNode realStartNode = foundNodes.get( startNodeId );
						
						this.startNode = realStartNode;
					}
					
					Neo4jNode endNode_base = foundRel.getEndNode();
					
					if( endNode_base != null ) {
						Long endNodeId = endNode_base.getInternalId();
						
						Neo4jNode realEndNode = foundNodes.get( endNodeId );
						
						this.endNode = realEndNode;
					}
					
					this.type = foundRel.getType();
					this.internalId = foundRel.getInternalId();
					this.setDecoProperties( foundRel.getDecoProperties() );
					this.setSystemProperties( foundRel.getSystemProperties() );
					this.setRuleProperties( foundRel.getRuleProperties() );
				}			
			}
			
			
			
		}
	
	}
	
	/**
	 * Expecting format:
	 * "relationships": [{
				"id": "82",
				"startNode": "3176",
				"properties": {
					"d2_y": 30.65444190396045,
					"edge_classification": 2,
					"uuid": "17215936-56f4-47bd-8101-09a901d42799",
					"d3_z": 0,
					"d1_x": 94.64531006193502
				},
				"type": "m1_r1_c29",
				"endNode": "3187"
			}]
			
			only single instance tho
	 * @param jsonNode
	 * @return
	 */
	public static Neo4jRelationship parseNeo4jAPIResults_relationship(JSONObject jsonRel ) {
		
		if( jsonRel == null ) {
			return null;
		}
		
		Neo4jRelationship rel = new Neo4jRelationship();
		
		
		String neo4jInternalId_dontuse = jsonRel.getString("id");
		JSONObject properties = jsonRel.getJSONObject( "properties" );
		String label = jsonRel.getString("type");
		String endNodeId_str = jsonRel.getString("endNode");
		String startNodeId_str = jsonRel.getString("startNode");
		
		
		Map<String, Object> parsedProperties = RomeNeo4jJsonUtils.parseNodeProperties( properties );

		// parse the prpperties into the node
		Neo4jRelationship.parseNeo4jPropertiesIntoRelationship(rel, parsedProperties);
		
		// Neo4jNode.parseNeo4jPropertiesIntoNode(node, parsedProperties);
		rel.setType( label );
		
		// unfortunatley here we don't have any information about the start or end node other than the internal ids
		Neo4jNode startNode = new Neo4jNode();
		startNode.setInternalId( Long.valueOf( startNodeId_str ) );
		
		Neo4jNode endNode = new Neo4jNode();
		endNode.setInternalId( Long.valueOf( endNodeId_str ) );
		
		rel.setStartNode( startNode );
		rel.setEndNode( endNode );
		
		rel.setInternalId( Long.valueOf( neo4jInternalId_dontuse ) );
		
		
		return rel;
	
	}
	
	public static void parseNeo4jPropertiesIntoRelationship( Neo4jRelationship rel, Map<String,Object> properties ) {
		
		
		for( String key : properties.keySet() ) {

			Object value = properties.get( key );

			Neo4jProperty neo4jProperty = RomeNeo4jJsonUtils.parseNeo4jProperty( key, value );


			if( neo4jProperty != null ) {

				if( Neo4jPropertyTypeEnum.RULE == neo4jProperty.getNeo4jType() ) {
					rel.addRuleProperties( neo4jProperty.getInternalPropertyName(), neo4jProperty );	
				} else if( Neo4jPropertyTypeEnum.SYSTEM == neo4jProperty.getNeo4jType() ) {
					rel.addSystemProperties( neo4jProperty.getInternalPropertyName(), neo4jProperty );	

				} else if( Neo4jPropertyTypeEnum.DECORATOR == neo4jProperty.getNeo4jType() ) {
					rel.addDecoProperties( neo4jProperty.getInternalPropertyName(), neo4jProperty );	

				} else {
					System.out.println("Found a non RULE or SYSTEM property : " + key );
				}
			} else {
				log.error("FAILED TO FIND AN APPROPRIATE NEO4jPROPERTY: " + key + ":" + value );
			}
		}
	}
	
	public Map<String, Object> parseRelProperties (JSONObject jsonProps) {
		
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
		
		return propMap;
		
	}

	@Override
	public List<Neo4jRelationship> parseNeo4jAPIResults(Object results) {
		if (results instanceof JSONArray) {
			return this.parseQueryResults((JSONArray)results);
		} else if (results instanceof Result) {
			return this.parseQueryResults((Result)results);
		}
		// TODO Auto-generated method stub
		return null;
	}
	
	public List<Neo4jRelationship> parseQueryResults (JSONArray results) {
		
		List<Neo4jRelationship> neo4jRels = new ArrayList<Neo4jRelationship>();
		
		if (results != null) {
			
			JSONObject jsonData = results.getJSONObject(0);
			
			if (jsonData.has("data")) {
				
				JSONArray jsonArrayData = jsonData.getJSONArray("data");
				
				if (jsonArrayData != null) {
					
					for (int i = 0; i < jsonArrayData.length(); i++) {
						
						JSONObject jsonResults = jsonArrayData.getJSONObject(i);
						
						Neo4jRelationship neo4jRel = new Neo4jRelationship();
						neo4jRel.parseNeo4jAPIResults(jsonResults);
						neo4jRels.add(neo4jRel);
						
					}
					
				}
				
			}
			
		}
		
		if (neo4jRels == null || neo4jRels.isEmpty()) {
			
			log.error("Fail to Parse Query Results OR Results are Empty");
			
			return null;
			
		} else {
			
			return neo4jRels;
			
		}
		
	}
	
	public List<Neo4jRelationship> parseQueryResults (Result results) {
		
		List<Neo4jRelationship> neo4jRels = new ArrayList<Neo4jRelationship>();
		
		if (results != null) {
			
			/**
			 * Example format return:
			 * Outputs: {"results":[{"columns":["r","type(r)","id(r)","startNode(r)","endNode(r)"],"data":[{"row":[{"name":"Rel 1","space_count":3,"test_prop":"test"},"CONTAINS",1,{"name":"Bay 1","uuid":"9fa87802-f1de-11e5-b4fb-000c293de875"},{"name":"Shelf 1","uuid":"9fa87803-f1de-11e5-b4fb-000c293de875"}],"graph":{"nodes":[{"id":"3","labels":["Bay"],"properties":{"name":"Bay 1","uuid":"9fa87802-f1de-11e5-b4fb-000c293de875"}},{"id":"4","labels":["Shelf"],"properties":{"name":"Shelf 1","uuid":"9fa87803-f1de-11e5-b4fb-000c293de875"}}],"relationships":[{"id":"1","type":"CONTAINS","startNode":"3","endNode":"4","properties":{"name":"Rel 1","space_count":3,"test_prop":"test"}}]}}]}],"errors":[]} 
			 */
			
//			System.out.println("Results : " + results );
//			System.out.println("What is this result : " + results.resultAsString() );
			
			while (results.hasNext()) {
				
				Map<String, Object> rows = results.next();
				
				Relationship r =  (Relationship) rows.get("r");
				
				Neo4jRelationship nRel = InternalNeo4jRelationshipUtils.convert( r );
				
				
				neo4jRels.add(nRel);
				
		     }
			
		}
		
		if (neo4jRels == null || neo4jRels.isEmpty()) {
			
			log.error("Fail to Parse Query Results");
			
			return null;
			
		} else {
			
			return neo4jRels;
			
		}
		
	}
	
	
	

	@Override
	public String toString() {
		return "Neo4jRelationship [internalId=" + internalId + ", type=" + type
				+ ", startNode=" + startNode + ", endNode=" + endNode
				+ ", properties=" + properties + ", ruleProperties="
				+ ruleProperties + ", systemProperties=" + systemProperties
				+ ", decoProperties=" + decoProperties + "]";
	}

}
