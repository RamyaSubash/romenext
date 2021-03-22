package com.els.romenext.core.neo4j.path;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.CoreServices;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.connection.ConnectionService;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.dao.Neo4jRelationshipDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.RomeRelationshipSystemPropertyEnum;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.relationship.Neo4jRelationshipServices;
import com.els.romenext.core.rule.RuleService;
import com.els.romenext.core.util.RomeConnectionUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;
import com.els.romenext.core.util.rel.RelationshipBuilder;

/**
 * Used for any calls that should hit the neo4j eventually that is related to path node
 */

public class Neo4jPathServices {
	
	private static Logger logger = Logger.getLogger( Neo4jPathServices.class );
	
	private Neo4jNodeDao neo4jNodeDao;
	private Neo4jRelationshipDao neo4jRelationshipDao;
	private NodeCoreServices nodeServices;
	private RelationshipCoreServices relationshipCoreServices;
	private Neo4jRelationshipServices neo4jRelServices;
	
	private String namespace;

	public Neo4jPathServices( String namespace, String neo4jServerUrl, String usernamePassword) {
		
		this.namespace = namespace;
		
		this.neo4jNodeDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) );
		this.neo4jRelationshipDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword) );
		this.nodeServices = new NodeCoreServices( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword), this.namespace );
		this.relationshipCoreServices = new RelationshipCoreServices( this.namespace, new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword) );
		this.neo4jRelServices = new Neo4jRelationshipServices( this.namespace, new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword) );
	}
	
	public Neo4jPathServices( String namespace, Neo4jConnection<Neo4jNode> nodeConn, Neo4jConnection<Neo4jRelationship> relationshipConn ) {
		
		this.namespace = namespace;
		
		this.neo4jNodeDao = new Neo4jNodeDao(nodeConn);
		this.neo4jRelationshipDao = new Neo4jRelationshipDao(relationshipConn);
		this.nodeServices = new NodeCoreServices( nodeConn, this.namespace  );
		this.relationshipCoreServices = new RelationshipCoreServices( this.namespace, relationshipConn );
		this.neo4jRelServices = new Neo4jRelationshipServices( this.namespace, relationshipConn ) ;
		
	}
	
	public Neo4jNodeDao getNeo4jNodeDao() {
		return neo4jNodeDao;
	}

	public Neo4jRelationshipDao getNeo4jRelationshipDao() {
		return neo4jRelationshipDao;
	}

	public NodeCoreServices getNodeServices() {
		return nodeServices;
	}

	public RelationshipCoreServices getRelationshipCoreServices() {
		return relationshipCoreServices;
	}

	public Neo4jRelationshipServices getNeo4jRelServices() {
		return neo4jRelServices;
	}

	public Node createPathNode( Node node, MetadataRepoContainer metadataRepo ) {
		
		if (node == null) {
			logger.error("No Node Found");
			return null;	
		}
		
		if (!node.hasTypeId()) {
			logger.error("No Type Id Found");
			return null;
		}
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}
		
		if( RomeTypeClassificationEnum.PATH != RomeTypeClassificationEnum.getEnum( node.getClassification() ) ) {
			logger.error("Node was not a path!");
			return null;	
		}
				
		NodeCoreServices nserv = this.getNodeServices(); 
		
		return nserv.createNode(node, metadataRepo);
		
	}
	
	/**
	 * Returns the nodes attached
	 * @param pathNode
	 * @param nodes
	 * @param metadataRepo
	 * @return
	 */
	public Path addNodeToPathNode( Node pathNode, List<Node> nodes, MetadataRepoContainer metadataRepo ) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}
		
		if (pathNode == null) {
			logger.error("No Path Node Found");
			return null;	
		}
		
		if (!pathNode.hasUuid()) {
			logger.error("No Path Node Uuid Found");
			return null;
		}
	
		if( RomeTypeClassificationEnum.PATH != RomeTypeClassificationEnum.getEnum(pathNode.getClassification())) {
			logger.error("Path Node Is Not Path Node");
			return null;	
		}
		
		if (CollectionUtils.isEmpty(nodes)) {
			logger.error("No Node Found");
			return null;
		}
		
		for (Node n : nodes) {
			if (n == null) {
				logger.error("Invalid Node Input");
				return null;
			}
			if (!n.hasUuid()) {
				logger.error("Invalid Node Input");
				return null;
			}
			if( RomeTypeClassificationEnum.NODE != RomeTypeClassificationEnum.getEnum(n.getClassification())) {
				logger.error("Node Is Not Node");
				return null;	
			}
		}
		
		
		
		
		Path results = new Path();
		
		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 
		
		
		
		for (Node n : nodes) {
			
			// check if there exits connection between node and path node
			
			
			
			
			
			// why would you get connections between the path and the node?
			
			
			// we need to make a sanity check to ensure that you don't have a duplicate node

//			List<Relationship> connections = cserv.getConnectionsByTypeIds(pathNode.getTypeId(), n.getTypeId(), metadataRepo.getMetadata().getId());
			
			// we are looking ONLY for connection/rules that 
			List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(),  n.getTypeId(),  RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );
			
			
			if (CollectionUtils.isEmpty( conns )) {
				
				
				// if no connection exists currently, we are going to auto create a connection between the path type and node type
				
				// how do we ensure that these are going to be unique?
				
				// if there is no, create rule and connetion
				RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
				RomeType pathType = typeDao.get( pathNode.getTypeId() );
				RomeType destinationType = typeDao.get( n.getTypeId() );		
				
				RomeConnectionUtils rcUtils = new RomeConnectionUtils( this.namespace );	
				
				
				
//				String finalTokenedName = rcUtils.generateInternalPathName( "", "", pathType.getId().toString(), destinationType.getId().toString() );
				String finalTokenedName = rcUtils.generateInternalPathName( "", "", pathType.getName(), destinationType.getName() );


				// service call
				RuleService ruleService = new RuleService( this.namespace );
				
				
				
				// create a new rule that is of the type PATHTONODE
				
				int count = 0;
				String baseRuleName = "RULE";
				String finalRuleName = baseRuleName + count;
				while( ruleService.doesRuleExist( finalTokenedName + finalRuleName, metadataRepo.getMetadata() ) ) {
					finalRuleName = baseRuleName + (++count);
				};
				
				
				// create the final RULE
				RomeRule rule = ruleService.createRuleNode( finalTokenedName + finalRuleName, true, RomeRuleClassificationEnum.PARENTCHILD, metadataRepo.getMetadata(), RuleTypeEnum.PATHTONODE );
				
//				 should we be double checking the connection names?
				// creat the final CONNECTION
				RomeConnection romeConnection = cserv.createConnection( finalTokenedName + "CONN", rule, pathType.getId(), destinationType.getId(), RomeRuleClassificationEnum.PARENTCHILD, 0, -1, metadataRepo.getMetadata() );
				
				
				
				
				
				Relationship connection = RelationshipBuilder.build(romeConnection);
				Path path = rserv.createEdge(connection, pathNode, n, metadataRepo);
				
				
				results.getNodes().addAll( path.getNodes() );
				results.getRelationships().addAll( path.getRelationships() );
				
//				results.setNodes(path.getNodes());
//				results.setRelationships(path.getRelationships());
				
				
				
				
				
	
			} else {
				
				// if we found a connection
				// ensure we only have 1 connection/relationship to use
				if( conns.size() == 1 ) {
					Relationship connection = conns.get(0);
					
					
					// double check to make sure this connection does not alreayd exist
					// NOTE: This should be done better?
					
					Path doublecheck = rserv.getConnection(connection, pathNode, n, metadataRepo);
					
					if( doublecheck != null ) {
						// doubling?
					} else {
						// no path found?
						
						Path path = rserv.createEdge(connection, pathNode, n, metadataRepo);
						
						if( path == null ) {
							logger.error("Failed to create the path!");
							return null;
						}
						results.getNodes().addAll( path.getNodes() );
						results.getRelationships().addAll( path.getRelationships() );
						
					}
					
					
					
					
				}
				
				
			}
			
		}

		// TODO: Should remove all the duplicated nodes and edges
		
		return results;
		
	}
	
	public Path getNodeInPathNode( Node pathNode, MetadataRepoContainer metadataRepo ) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}
		
		if (pathNode == null) {
			logger.error("No Path Node Found");
			return null;	
		}
		
		if (!pathNode.hasUuid()) {
			logger.error("No Path Node Uuid Found");
			return null;
		}
	
		if( RomeTypeClassificationEnum.PATH != RomeTypeClassificationEnum.getEnum(pathNode.getClassification())) {
			logger.error("Path Node Is Not Path Node");
			return null;	
		}
		
		Path results = new Path();
		
		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 
		
		
		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now
		
		
		
		List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );

		
		// this is only the list of the connections that we want to look for
		Path connectionFrom = rserv.getConnectionFrom( pathNode,  metadataRepo );
		
		
		return connectionFrom;
		
//		
//		results.setRelationships( conns );
//		
//		
//		
//		
//	
//
//		// TODO: Should remove all the duplicated nodes and edges
//		
//		return results;
		
	}
	
	/**
	 * Retrieves the given toFind node in a PATH, if found.
	 * 
	 * @param pathNode
	 * @param toFind
	 * @param metadataRepo
	 * @return
	 */
	public Relationship getNodeInPathNode( Node pathNode, Node toFind, MetadataRepoContainer metadataRepo ) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}
		
		if (pathNode == null || toFind == null ) {
			logger.error("No Path Node Found");
			return null;	
		}
		
		if (!pathNode.hasUuid()) {
			logger.error("No Path Node Uuid Found");
			return null;
		}
		
	
		if( RomeTypeClassificationEnum.PATH != RomeTypeClassificationEnum.getEnum(pathNode.getClassification())) {
			logger.error("Path Node Is Not Path Node");
			return null;	
		}
		
		Path results = new Path();
		
		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 
		
		
		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now
		
		
		
//		List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );

		
		// this is only the list of the connections that we want to look for
		Path connectionFrom = rserv.getConnectionFrom( pathNode,  metadataRepo );
		
		/**
		 * TODO: This can be done much more efficiently
		 */
		for( Relationship r : connectionFrom.getRelationships() ) {
			if( r.getOriginUuid() != null && r.getOriginUuid().equalsIgnoreCase( toFind.getUuid() ) ) {
				System.out.println("Found matching node : " + r );
				return r;
			}
		}
		
		return null;
		
	}
	
	public Path findLinksBetweenPathNodes( Node pathNode, List<Node> toFind, MetadataRepoContainer metadataRepo ) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}
		
		if (pathNode == null || toFind == null ) {
			logger.error("No Path Node Found");
			return null;	
		}
		
		if( toFind.size() < 1 ) {
			logger.error("A minimum of 1 node must be entered to find a link");
			return null;
		}
		
		if (!pathNode.hasUuid()) {
			logger.error("No Path Node Uuid Found");
			return null;
		}
		
	
		if( RomeTypeClassificationEnum.PATH != RomeTypeClassificationEnum.getEnum(pathNode.getClassification())) {
			logger.error("Path Node Is Not Path Node");
			return null;	
		}
		
		Path results = new Path();
		
		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 
		
		
		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now
		
		
		
//		List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );

		
		// this is only the list of the connections that we want to look for
//		Path connectionFrom = rserv.getConnectionFrom( pathNode,  metadataRepo );
		
		Relationship r = new Relationship();
		
		// not sure if you can do this
		Property edge_classification = RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION.generateProperty( RomeRuleClassificationEnum.LINK.getInternalId() );
		List<Property> props = new ArrayList<Property>();
		
		Relationship rel = RelationshipBuilder.build( null, null, props );

		Path connection = rserv.getConnection( rel, toFind.get( 0 ), toFind.get( 1 ), metadataRepo);
		
		
		
		
		

		/**
		 * TODO: This can be done much more efficiently
		 */
//		for( Relationship r : connectionFrom.getRelationships() ) {
//			if( r.getOriginUuid() != null && r.getOriginUuid().equalsIgnoreCase( toFind.getUuid() ) ) {
//				System.out.println("Found matching node : " + r );
//				return r;
//			}
//		}
		
		return connection;
		
	}
	
	public List<Path> getAllPathFromType( RomeType pathType, MetadataRepoContainer metadataRepo ) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;			
		}
		
		if (pathType == null) {
			logger.error("No Path Node Found");
			return null;	
		}
		
//		if (!pathNode.hasUuid()) {
//			logger.error("No Path Node Uuid Found");
//			return null;
//		}
		if( !pathType.isPath() ) {
			logger.error("ROME TYPE WAS NOT A PATH TYPE");
			return null;
		} 
		
		List<Path> results = new ArrayList<Path>();
		
		CoreServices cserv = new CoreServices( this.namespace );
		
		
		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now
		
		
		
		Neo4jNodeDao nodeServices = this.getNeo4jNodeDao();
		
		String label = NodeUtils.buildNodeLabel( metadataRepo, pathType );
		
		List<String> labels = new ArrayList<String>();
		labels.add( label );
		
		List<Neo4jProperty> props = new ArrayList<Neo4jProperty>(); 
		
		// these should be ONLY unique paths instances for this type
		List<Neo4jNode> paths = nodeServices.getNodes( labels, props );
		
		NodeUtils utils = new NodeUtils( this.namespace );
		
		if( paths != null ) {
			for( Neo4jNode n : paths ) {
				Path p = new Path();
				
				List<Node> tmplist = new ArrayList<Node>();
				tmplist.add( utils.build( n ) );
				p.nodes = tmplist;
				
				results.add( p );
			}
		}
		
		
		return results;
		
		
		
	}
	
	public boolean removeNodeInPathNode( Node pathNode, Node toRemove, MetadataRepoContainer metadataRepo ) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return false;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return false;			
		}
		
		if (pathNode == null) {
			logger.error("No Path Node Found");
			return false;	
		}
		
		if (!pathNode.hasUuid()) {
			logger.error("No Path Node Uuid Found");
			return false;
		}
	
		if( RomeTypeClassificationEnum.PATH != RomeTypeClassificationEnum.getEnum(pathNode.getClassification())) {
			logger.error("Path Node Is Not Path Node");
			return false;	
		}
		
		if( toRemove == null ) {
			logger.error("Node to remove was null");
			return false;
		}
		
		Path results = new Path();
		
		CoreServices cserv = new CoreServices( this.namespace );
		RelationshipCoreServices rserv = this.getRelationshipCoreServices();
		ConnectionService connServ = new ConnectionService( this.namespace ); 
		
		
		// this is a bit brutal on the way this is beign done right now
		// just hack this in for now
		
		
		
		List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );

		
		// this is only the list of the connections that we want to look for
		Path foundPaths = rserv.getConnection(pathNode, toRemove, metadataRepo);
		
		if( foundPaths == null || foundPaths.getRelationships() == null ) {
			logger.error("Found no path to delete?");
			return false;
		}
		
		if( foundPaths.getRelationships().size() > 0 ) {
			
			List<Relationship> rels = foundPaths.getRelationships();
			
			if( rels.size() == 1 ) {
				// good?
				
				Relationship relationship = rels.get( 0 );
				
				Path connectionFrom = rserv.getConnectionFrom( pathNode,  metadataRepo );
				
				Neo4jRelationshipServices relServ = this.getNeo4jRelServices();
				
				boolean deleteRelationship = relServ.deleteRelationship( relationship, pathNode, toRemove, metadataRepo);
				
				
				return true;
			} else {
				// if there are multiple relationships, this is bad
				logger.error("Found multiple possible relationships to delete against"); 
			}
			
		}
			
			
		
		
		
//		
//		results.setRelationships( conns );
//		
//		
//		
//		
//	
//
//		// TODO: Should remove all the duplicated nodes and edges
//		
//		return results;
		
		return false;
	}
	
}
