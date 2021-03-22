package com.els.romenext.core.util.rel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.RomeRelationshipClassEnum;
import com.els.romenext.core.util.RomeTypeLabelUtils;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.PropertyUtils;

public class RelationshipBuilder {


	private static Logger logger = Logger.getLogger( RelationshipBuilder.class );
	
	/**
	 * TO DELETE
	 * @param type
	 * @param uuid
	 * @param origin
	 * @param destination
	 * @param originUuid
	 * @param destinationUuid
	 * @param decoProperties
	 * @return
	 */
//	@Deprecated
//	public static Relationship build (String type, String uuid, String origin, String destination, String originUuid, String destinationUuid, List<Property> decoProperties) {
//
//		Relationship rel = new Relationship();
//
//
//		rel.setType(type);
//
//		List<Property> propList = new ArrayList<Property>();
//		propList.add(Property.build("uuid", null, uuid, null));
//		rel.setProperties(propList);
//
//		rel.setOrigin(origin);
//		rel.setDestination(destination);
//		rel.setOriginUuid(originUuid);
//		rel.setDestinationUuid(destinationUuid);
//
//		RelationshipPropertyUtil.setDecoratorPropertyIntoRel( rel,  decoProperties );
//
//		return rel;
//
//	}

	/**
	 * TODO: DELETE THIS AFTER
	 * 
	 * @param connectionId
	 * @param uuid
	 * @param origin
	 * @param destination
	 * @param originUuid
	 * @param destinationUuid
	 * @param decoProperties
	 * @return
	 */
	@Deprecated
	public static Relationship build (Long connectionId, String uuid, String origin, String destination, String originUuid, String destinationUuid, List<Property> decoProperties) {

		Relationship rel = new Relationship();

		rel.setConnectionId(connectionId);

		List<Property> propList = new ArrayList<Property>();
		propList.add(Property.build("uuid", null, uuid, null));
//		rel.setProperties(propList);

		rel.setOrigin(origin);
		rel.setDestination(destination);
		rel.setOriginUuid(originUuid);
		rel.setDestinationUuid(destinationUuid);

		RelationshipPropertyUtil.setDecoratorPropertyIntoRel( rel,  decoProperties );


		return rel;

	}
	
	/**
	 * if no conn is passed, we attempt to simply make an empty relationship 
	 * @param conn
	 * @param ruleProperties
	 * @return
	 */
	public static Relationship build( RomeConnection conn, List<Property> ruleProperties ) {
		
		if( conn == null ) {
			return null;
		}
		
		Relationship rel = RelationshipBuilder.build( conn );
		
		RelationshipPropertyUtil.setRulePropertyIntoRel( rel,  ruleProperties );
		
		return rel;
	}
	
	public static Relationship build( RomeConnection conn, List<Property> ruleProperties, List<Property> decoProperties, List<Property> sysProperties ) {
		
		if( conn == null ) {
			return null;
		}
		
		Relationship rel = RelationshipBuilder.build( conn );
		
		RelationshipPropertyUtil.setRulePropertyIntoRel( rel,  ruleProperties );
		RelationshipPropertyUtil.setDecoratorPropertyIntoRel( rel,  decoProperties );
		RelationshipPropertyUtil.setSystemPropertyIntoRel( rel,  sysProperties );

		return rel;
	}

	public static Relationship build(RomeConnection romeConnection) {

		if (romeConnection == null) {
			return null;
		}

		Relationship relationship = new Relationship();
		relationship.setId(romeConnection.getId().toString());
		relationship.setName(romeConnection.getName());
		relationship.setRomeClass(RomeRelationshipClassEnum.CONNECTION);
		
		
		relationship.setType(romeConnection.getRomeRule().getName());
		
		relationship.setOrigin(romeConnection.getStartRomeType().getName());
		relationship.setOriginId(romeConnection.getStartRomeType().getId());
		relationship.setDestination(romeConnection.getEndRomeType().getName());
		relationship.setDestinationId(romeConnection.getEndRomeType().getId());

		//		if (romeConnection.getRomeRule() == null || romeConnection.getRomeRule().getClassification() == null || (romeConnection.getRomeRule().getClassification() != 1 && romeConnection.getRomeRule().getClassification() != 2)) {
		//			return null;
		//		}

		relationship.setConnectionId( romeConnection.getId() );

		relationship.setRuleName(romeConnection.getRomeRule().getName());
		relationship.setRuleId( romeConnection.getRomeRule().getId() );

		if (romeConnection.getClassification() == null) {
			return null;
		}
		relationship.setClassification(RomeRuleClassificationEnum.getEnum(romeConnection.getClassification()).getClassification());

//		relationship.setMaxRel(romeConnection.getMaximum());
//		relationship.setMinRel(romeConnection.getMinimum());
		if (romeConnection.getMaximum() != null) {
			relationship.setMaxRel(romeConnection.getMaximum());
		} else {
			relationship.setMaxRel(-1);
		}
		if (romeConnection.getMinimum() != null) {
			relationship.setMinRel(romeConnection.getMinimum());
		} else {
			relationship.setMinRel(0);
		}

		return relationship;
	}

	/**
	 * I believe this should not be used anymore.
	 * 
	 * 
	 * jpl
	 * 
	 * WILL BE DELETED
	 * @param type
	 * @param properties
	 * @return
	 */
//	@Deprecated
//	public static Relationship build(String type, List<Property> properties) {
//
//		Relationship rel = new Relationship();
//
//		rel.setType(type);
//		rel.setProperties(properties);
//
//		return rel;
//
//	}

	/**
	 * NOTE: the properties here are RULE properties
	 * @param ruleId
	 * @param connectionId
	 * @param properties
	 * @return
	 */
	public static Relationship build(Long ruleId, Long connectionId, List<Property> ruleProperties) {

		Relationship rel = new Relationship();

		rel.setRuleId(ruleId);
		rel.setConnectionId(connectionId);

//		rel.setProperties( ruleProperties );
		RelationshipPropertyUtil.setRulePropertyIntoRel( rel,  ruleProperties );
		
		return rel;

	}

	// For Neo4j rel
	//	@Deprecated
	//	public static Relationship build(RomeRule romeRule, Neo4jRelationship nRel) {
	//		
	//		if (romeRule == null || nRel == null) {
	//			return null;
	//		}
	//		
	//		Relationship rel = new Relationship();
	//		
	//		if (romeRule.getClassification() == null || (romeRule.getClassification() != 1 && romeRule.getClassification() != 2)) {
	//			return null;
	//		}
	//		rel.setClassification(RomeRuleClassificationEnum.getEnum(romeRule.getClassification()).getClassification());
	//		
	//		Long internalId = nRel.getInternalId();
	//		String type = nRel.getType();
	//		
	//		if (internalId == null || type == null) {	
	//			return null;
	//		}
	//		
	//		rel.setId(internalId.toString());
	//		rel.setType(type);
	//		
	//		Neo4jNode snNode = nRel.getStartNode();
	//		Neo4jNode enNode = nRel.getEndNode();
	//		
	//		if (snNode == null || enNode == null) {
	//			return null;	
	//		}
	//	
	//		if (snNode.getProperties().get("uuid") == null || enNode.getProperties().get("uuid") == null) {
	//			return null;
	//		}
	//		
	//		if (StringUtils.isEmpty(snNode.getProperties().get("uuid").toString()) || StringUtils.isEmpty(enNode.getProperties().get("uuid").toString())) {
	//			return null;
	//		}
	//		
	//		RomeTypeDao rtDao = new RomeTypeDao();
	//		
	//		String sFullLabel = snNode.getLabels().get( 0 );
	//		String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
	//		String sLastLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
	//		String sTypeId = sLastLabel.substring(1, sLastLabel.length());
	//		RomeType sRomeType = rtDao.get(Long.parseLong(sTypeId));
	//		if (sRomeType == null ) {
	//			return null;
	//		}
	//		
	//		String eFullLabel = snNode.getLabels().get( 0 );
	//		String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
	//		String eLastLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());
	//		String eTypeId = eLastLabel.substring(1, eLastLabel.length());
	//		RomeType eRomeType = rtDao.get(Long.parseLong(eTypeId));
	//		if (eRomeType == null ) {
	//			return null;
	//		}
	//				
	////		String sFullLabel = snNode.getLabels().get( 0 );
	////		String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
	////		String sLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
	////		
	////		String eFullLabel = enNode.getLabels().get( 0 );
	////		String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
	////		String eLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());
	//			
	//		rel.setOriginId(snNode.getInternalId());
	//		rel.setDestinationId(enNode.getInternalId());
	//		rel.setOrigin(sRomeType.getName());
	//		rel.setDestination(eRomeType.getName());
	//		rel.setOriginTypeId(Long.parseLong(sTypeId));
	//		rel.setDestinationTypeId(Long.parseLong(eTypeId));
	//		rel.setOriginUuid(snNode.getProperties().get("uuid").toString());
	//		rel.setDestinationUuid(enNode.getProperties().get("uuid").toString());
	//		
	//		Map<String, Object> propsMap = nRel.getProperties();
	//		List<Property> props = new ArrayList<Property>();
	//		List<Property> decoProps = new ArrayList<Property>();
	//		
	//		if (propsMap != null) {
	//			
	//			for (String key : propsMap.keySet()) {
	//				
	//				Property property = Property.build(romeRule, key, propsMap.get(key));
	//
	//				if (property != null) {
	//					if (property.hasRomeDecoPropId()) {
	//						decoProps.add(property);
	//					} else {
	//						props.add(property);
	//					}
	//				}
	//				
	//			}
	//			
	//		}
	//	
	//		rel.setProperties(props);
	//		rel.setDecoProperties(decoProps);
	//		
	//		return rel;
	//	
	//	}

	// For Neo4j rel
	@Deprecated
	public static Relationship build( String namespace, RomeConnection romeConnection, Neo4jRelationship nRel) {

		if (romeConnection.getRomeRule() == null || nRel == null) {
			return null;
		}

		Relationship rel = new Relationship();

		if (romeConnection.getRomeRule().getClassification() == null || (romeConnection.getRomeRule().getClassification() != 1 && romeConnection.getRomeRule().getClassification() != 2)) {
			return null;
		}
		rel.setClassification(RomeRuleClassificationEnum.getEnum(romeConnection.getRomeRule().getClassification()).getClassification());

		Long internalId = nRel.getInternalId();
		String type = nRel.getType();

		if (internalId == null || type == null) {	
			return null;
		}

		rel.setId(internalId.toString());
		rel.setType(type);
		rel.setConnectionId(romeConnection.getId());

		// also add the rome rule information
		rel.setRuleId( romeConnection.getRomeRule().getId() );
		rel.setRuleName( romeConnection.getRomeRule().getName() );
		
		Neo4jNode snNode = nRel.getStartNode();
		Neo4jNode enNode = nRel.getEndNode();

		/**
		 *  We need to move the Neo4jNodes into the Relationship via Node
		 *  
		 */
		if (snNode == null || enNode == null) {
			// this shouldn't be possible here
			return null;	
		}

//		if (snNode.getProperties().get("uuid") == null || enNode.getProperties().get("uuid") == null) {
//			return null;
//		}

//		if (StringUtils.isEmpty(snNode.getProperties().get("uuid").toString()) || StringUtils.isEmpty(enNode.getProperties().get("uuid").toString())) {
//			return null;
//		}
		
		
		

		RomeTypeDao rtDao = new RomeTypeDao();

		
//		String sFullLabel = RomeTypeLabelUtils.getTrueLabel( snNode.getLabels() );
//		
//		if( sFullLabel == null ) {
//			// something bad happened? 
//			// let this fail for now
//		}
//		
////		String sFullLabel = snNode.getLabels().get( 0 );
//		String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
//		String sLastLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
//		String sTypeId = sLastLabel.substring(1, sLastLabel.length());
		
		
		String sTypeId = RomeTypeLabelUtils.getTypeId( snNode.getLabels() );
		
		if( sTypeId == null ) {
			// something bad happened? 
			// let this fail for now
			logger.error("For some reason no typeid was found from the label?");
		}
		
		RomeType sRomeType = rtDao.get(Long.parseLong(sTypeId));
		
		
		
		if (sRomeType == null ) {
			return null;
		}
		
		
//		String eFullLabel = RomeTypeLabelUtils.getTrueLabel( enNode.getLabels() );
//
////		String eFullLabel = enNode.getLabels().get( 0 );
//		String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
//		String eLastLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());
//		String eTypeId = eLastLabel.substring(1, eLastLabel.length());
		
		String eTypeId = RomeTypeLabelUtils.getTypeId( enNode.getLabels() );
		
		if( eTypeId == null ) {
			// something bad happened? 
			// let this fail for now
			logger.error("For some reason no typeid was found from the label?");
		}
		
		RomeType eRomeType = rtDao.get(Long.parseLong(eTypeId));
		if (eRomeType == null ) {
			return null;
		}
		
		Node startNode = NodeBuilder.build( namespace, sRomeType, snNode );
		Node endNode = NodeBuilder.build( namespace, eRomeType, enNode );

		// move the nodes over
		rel.setOriginNode( startNode );
		rel.setDestinationNode( endNode );
		
		// move the properties over
		RelationshipPropertyUtil.moveProperties( nRel , rel );
		
		
		
//		String eFullLabel = enNode.getLabels().get( 0 );
//		String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
//		String eLastLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());
//		String eTypeId = eLastLabel.substring(1, eLastLabel.length());
//		RomeType eRomeType = rtDao.get(Long.parseLong(eTypeId));
//		if (eRomeType == null ) {
//			return null;
//		}

		//		String sFullLabel = snNode.getLabels().get( 0 );
		//		String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
		//		String sLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
		//		
		//		String eFullLabel = enNode.getLabels().get( 0 );
		//		String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
		//		String eLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());

//		rel.setOriginId(snNode.getInternalId());
//		rel.setDestinationId(enNode.getInternalId());
		
		rel.setOrigin(startNode.getType());
		rel.setDestination(endNode.getType());
		
		rel.setOriginTypeId(startNode.getTypeId());
		rel.setDestinationTypeId(endNode.getTypeId());
		
		rel.setOriginUuid(snNode.getSystemProperties().get("uuid").toString());
		rel.setDestinationUuid(enNode.getSystemProperties().get("uuid").toString());

//		Map<String, Object> propsMap = nRel.getProperties();
//		List<Property> props = new ArrayList<Property>();
//		List<Property> decoProps = new ArrayList<Property>();

//		if (propsMap != null) {
//
//			for (String key : propsMap.keySet()) {
//
//				Property property = Property.build(romeConnection.getRomeRule(), key, propsMap.get(key));
//
//				if (property != null) {
//					if (property.hasRomeDecoPropId()) {
//						decoProps.add(property);
//					} else {
//						props.add(property);
//					}
//				}
//
//			}
//
//		}
//
//		rel.setProperties(props);
//		RelationshipPropertyUtil.setDecoratorPropertyIntoRel( rel,  decoProps );


		return rel;

	}
		
	public static Relationship build(RomeConnection romeConnection, Neo4jRelationship nRel, String rdbUsername) {

		if (romeConnection.getRomeRule() == null || nRel == null) {
			return null;
		}

		Relationship rel = new Relationship();

		if (romeConnection.getRomeRule().getClassification() == null || (romeConnection.getRomeRule().getClassification() != 1 && romeConnection.getRomeRule().getClassification() != 2)) {
			return null;
		}
		rel.setClassification(RomeRuleClassificationEnum.getEnum(romeConnection.getRomeRule().getClassification()).getClassification());

		Long internalId = nRel.getInternalId();
		String type = nRel.getType();

		if (internalId == null || type == null) {	
			return null;
		}

		rel.setId(internalId.toString());
		rel.setType(type);
		rel.setConnectionId(romeConnection.getId());

		// also add the rome rule information
		rel.setRuleId( romeConnection.getRomeRule().getId() );
		rel.setRuleName( romeConnection.getRomeRule().getName() );
		
		Neo4jNode snNode = nRel.getStartNode();
		Neo4jNode enNode = nRel.getEndNode();

		/**
		 *  We need to move the Neo4jNodes into the Relationship via Node
		 *  
		 */
		if (snNode == null || enNode == null) {
			// this shouldn't be possible here
			return null;	
		}
		
		RomeTypeDao rtDao = new RomeTypeDao(rdbUsername);
		
		String sTypeId = RomeTypeLabelUtils.getTypeId( snNode.getLabels() );
		
		if( sTypeId == null ) {
			// something bad happened? 
			// let this fail for now
			logger.error("For some reason no typeid was found from the label?");
		}
		
		RomeType sRomeType = rtDao.get(Long.parseLong(sTypeId));
		
		if (sRomeType == null ) {
			return null;
		}
		
		String eTypeId = RomeTypeLabelUtils.getTypeId( enNode.getLabels() );
		
		if( eTypeId == null ) {
			// something bad happened? 
			// let this fail for now
			logger.error("For some reason no typeid was found from the label?");
		}
		
		RomeType eRomeType = rtDao.get(Long.parseLong(eTypeId));
		if (eRomeType == null ) {
			return null;
		}
		
		Node startNode = NodeBuilder.build( sRomeType, snNode, rdbUsername );
		Node endNode = NodeBuilder.build( eRomeType, enNode, rdbUsername );

		// move the nodes over
		rel.setOriginNode( startNode );
		rel.setDestinationNode( endNode );
		
		// move the properties over
		RelationshipPropertyUtil.moveProperties( nRel , rel );
			
		rel.setOrigin(startNode.getType());
		rel.setDestination(endNode.getType());
		
		rel.setOriginTypeId(startNode.getTypeId());
		rel.setDestinationTypeId(endNode.getTypeId());
		
		rel.setOriginUuid(snNode.getSystemProperties().get("uuid").toString());
		rel.setDestinationUuid(enNode.getSystemProperties().get("uuid").toString());

		return rel;

	}

	// For Neo4j rel
	public static Relationship build_updated(RomeConnection romeConnection, Neo4jRelationship nRel) {

		if (romeConnection.getRomeRule() == null || nRel == null) {
			return null;
		}


		if (romeConnection.getRomeRule().getClassification() == null || (romeConnection.getRomeRule().getClassification() != 1 && romeConnection.getRomeRule().getClassification() != 2)) {
			return null;
		}
		
		

		
		
		Relationship rel = new Relationship();
		
		
//		Neo4jPropertyUtil.moveProperties( rel, neo4jRel );
		RelationshipPropertyUtil.moveProperties( nRel,  rel );
		
		
		
		
		rel.setClassification(RomeRuleClassificationEnum.getEnum(romeConnection.getRomeRule().getClassification()).getClassification());

		Long internalId = nRel.getInternalId();
		String type = nRel.getType();

		if (internalId == null || type == null) {	
			return null;
		}

		rel.setId(internalId.toString());
		rel.setType(type);
		
		rel.setConnectionId(romeConnection.getId());

		// convert the Neo4jNodes to Nodes
		
		Neo4jNode snNode = nRel.getStartNode();
		Neo4jNode enNode = nRel.getEndNode();





		if (snNode == null || enNode == null) {
			return null;	
		}

		if (snNode.getProperties().get("uuid") == null || enNode.getProperties().get("uuid") == null) {
			return null;
		}

		if (StringUtils.isEmpty(snNode.getProperties().get("uuid").toString()) || StringUtils.isEmpty(enNode.getProperties().get("uuid").toString())) {
			return null;
		}

		RomeTypeDao rtDao = new RomeTypeDao();

//		String sFullLabel = snNode.getLabels().get( 0 );
//		String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
//		String sLastLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
//		String sTypeId = sLastLabel.substring(1, sLastLabel.length());
		
		String sTypeId = RomeTypeLabelUtils.getTypeId( snNode.getLabels() );
		
		RomeType sRomeType = rtDao.get(Long.parseLong(sTypeId));
		if (sRomeType == null ) {
			return null;
		}

//		String eFullLabel = enNode.getLabels().get( 0 );
//		String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
//		String eLastLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());
//		String eTypeId = eLastLabel.substring(1, eLastLabel.length());
		
		String eTypeId = RomeTypeLabelUtils.getTypeId( enNode.getLabels() );
		
		RomeType eRomeType = rtDao.get(Long.parseLong(eTypeId));
		if (eRomeType == null ) {
			return null;
		}

		//			String sFullLabel = snNode.getLabels().get( 0 );
		//			String sRestLabel = sFullLabel.substring(sFullLabel.indexOf('_')+1, sFullLabel.length());
		//			String sLabel = sRestLabel.substring(sRestLabel.indexOf('_')+1, sRestLabel.length());
		//			
		//			String eFullLabel = enNode.getLabels().get( 0 );
		//			String eRestLabel = eFullLabel.substring(eFullLabel.indexOf('_')+1, eFullLabel.length());
		//			String eLabel = eRestLabel.substring(eRestLabel.indexOf('_')+1, eRestLabel.length());

		rel.setOriginId(snNode.getInternalId());
		rel.setDestinationId(enNode.getInternalId());
		rel.setOrigin(sRomeType.getName());
		rel.setDestination(eRomeType.getName());
		rel.setOriginTypeId(Long.parseLong(sTypeId));
		rel.setDestinationTypeId(Long.parseLong(eTypeId));
		rel.setOriginUuid(snNode.getProperties().get("uuid").toString());
		rel.setDestinationUuid(enNode.getProperties().get("uuid").toString());

		Map<String, Object> propsMap = nRel.getProperties();
		List<Property> props = new ArrayList<Property>();
		List<Property> decoProps = new ArrayList<Property>();

		if (propsMap != null) {

			for (String key : propsMap.keySet()) {

				Property property = Property.build(romeConnection.getRomeRule(), key, propsMap.get(key));

				if (property != null) {
					if (property.hasRomeDecoPropId()) {
						decoProps.add(property);
					} else {
						props.add(property);
					}
				}

			}

		}

		// done above now
//		rel.setProperties(props);
//		
//		RelationshipPropertyUtil.setRulePropertyIntoRel( rel,  decoProps );
//
//		RelationshipPropertyUtil.setDecoratorPropertyIntoRel( rel,  decoProps );


		return rel;

	}

	public static List<Relationship> batchBuild(List<RomeConnection> romeConnections) {

		if (romeConnections == null) {
			return null;
		}

		List<Relationship> relationships = new ArrayList<Relationship>();

		for (RomeConnection romeConnection : romeConnections) {
			Relationship relationship = RelationshipBuilder.build(romeConnection);
			relationships.add(relationship);
		}

		return relationships;

	}

	
}
