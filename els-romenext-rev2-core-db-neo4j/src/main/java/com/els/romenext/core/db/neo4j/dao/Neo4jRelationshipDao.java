package com.els.romenext.core.db.neo4j.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.cypher.CypherCoreUtils;
import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherQueryBuilder;
import com.els.romenext.core.db.neo4j.cypher.delete.relationship.CypherRelationshipDeleteBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.relationship.CypherRelationshipReadBuilder;
import com.els.romenext.core.db.neo4j.cypher.update.relationship.CypherRelationshipUpdateBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.CypherRelationshipDirectionEnum;
import com.els.romenext.core.db.neo4j.utils.internal.property.file.ImageCacheUtils;

public class Neo4jRelationshipDao extends Neo4jGenericDao<Neo4jRelationship>{
	
	public Neo4jRelationshipDao(String neo4jServerUrl, String usernamePassword) {
		super( Neo4jRelationship.class, neo4jServerUrl, usernamePassword );
	}
	
	public Neo4jRelationshipDao( Neo4jConnection<Neo4jRelationship> conn ) {
		super( Neo4jRelationship.class, conn );
	}
	
	
	
	private static Logger log = Logger.getLogger(Neo4jRelationshipDao.class);
	
	
	// Props can be nothing
	/**
	 * Just a pass through for the Neo4jRelation/Neo4jNode/Neo4jNode function since that one makes no sense.
	 * @param nRel
	 * @return
	 */
	public List<Neo4jRelationship> createRelationship (Neo4jRelationship nRel ) {
		
		return this.createRelationship(nRel, nRel.getStartNode(), nRel.getEndNode() );

	}
	
	// Props can be nothing
	public List<Neo4jRelationship> createRelationship(Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		if (nRel == null) {
			log.error("No Neo4j Relationship Found");
			return null;
		}
		
		if (startNode == null) {
			log.error("No Start Neo4j Node Found");
			return null;
		}
		
		if (endNode == null) {
			log.error("No End Neo4j Node Found");
			return null;
		}
		
		String cypherQuery = new Neo4jCypherQueryBuilder().createRelationshipQuery(nRel, startNode, endNode);
		
//		System.out.println( "CREATE RELATIONSHIP CYPHER: " + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			
			return null;
			
		}
		
		List<Neo4jRelationship> results = this.execute( cypherQuery );
		
		this.postAction(results);

		return results;

	}
	
	/**
	 * Will create the relationship if the relationship doesn't exist. If the relationship does exist, this does not create it, just returns it.
	 * 
	 * @param nRel
	 * @param startNode
	 * @param endNode
	 * @return
	 */
	public List<Neo4jRelationship> createRelationshipIfDoesntExists(Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		if (nRel == null) {
			log.error("No Neo4j Relationship Found");
			return null;
		}
		
		if (startNode == null) {
			log.error("No Start Neo4j Node Found");
			return null;
		}
		
		if (endNode == null) {
			log.error("No End Neo4j Node Found");
			return null;
		}
		
		String cypherQuery = new CypherRelationshipUpdateBuilder().createRelationship_Merge(nRel, startNode, endNode);
		
//		System.out.println( "CREATE RELATIONSHIP CYPHER: " + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			
			return null;
			
		}
		
		List<Neo4jRelationship> results = this.execute( cypherQuery );
		
		this.postAction(results);

		return results;

	}
	
	// relIdentifier can be nothing to get all relationships under a type
	// Can be also used to get all rels under a label
	/**
	 * SHOULD ONLY BE CALLED FOR INTERNAL FUNCTIONS
	 * @param nRel
	 * @return
	 */
	public List<Neo4jRelationship> matchRelationshipById (Neo4jRelationship nRel) {
		
		if (nRel == null) {
			
			log.error("No Neo4j Relationship Found");
			
			return null;
			
		}
		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipByInternalNeo4jIDQuery( nRel.getInternalId());
//		String cypherQuery = new Neo4jCypherQueryBuilder().matchRelationshipByIdQuery(nRel);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}

//		System.out.println(cypherQuery);
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
		
	}
	
	public List<Neo4jRelationship> matchRelationshipConnectionOnly(Neo4jRelationship nRel) {
		
		if (nRel == null) {
			log.error("No Neo4j Relationship Found");
			return null;
		}
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipOnlyConnection( nRel );
//		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( nRel );
	
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}

//		System.out.println(cypherQuery);
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
		
	}
	
	// relIdentifier can be nothing to get all relationships under a type
	// Can be also used to get all rels under a label
	public List<Neo4jRelationship> matchRelationship(Neo4jRelationship nRel) {
		
		if (nRel == null) {
			log.error("No Neo4j Relationship Found");
			return null;
		}
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( nRel );
	
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}

//		System.out.println(cypherQuery);
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
		
	}
	
//	// All inputs can be nothing to get all relationships from a node or go to a node
//	public List<Neo4jRelationship> matchRelationship (String type, String startTypeName, String endTypeName, Map<String, Object> props, 
//			                                                         Map<String, Object> startIdentifiers, Map<String, Object> endIdentifiers) {
//		
//		String cypherQuery = new Neo4jCypherQueryBuilder().matchRelationshipQuery(type, props, startTypeName, startIdentifiers, endTypeName, endIdentifiers);
//		if (StringUtils.isBlank(cypherQuery)) {
//			
//			log.error("Fail to Create Query");
//			return null;
//			
//		}
//
//		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
//		
//		return Neo4jRels;
//	    
//	}
	
	// All inputs can be nothing to get all relationships from a node or go to a node
	public List<Neo4jRelationship> matchRelationship (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		if (nRel == null) {
			
			log.error("No Neo4j Relationship Found");
			
			return null;
			
		}
		
		if( startNode != null ) {
			startNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet(  startNode.getSystemProperties() )  );			
		}
		if( endNode != null ) {			
			endNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( endNode.getSystemProperties() )  );
		}
		if( nRel != null ) {
			nRel.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( nRel.getSystemProperties()  ) );			
		}

		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery(nRel, startNode, endNode);
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		
		this.postAction(Neo4jRels);
		
		return Neo4jRels;
	    
	}
	
	public List<Neo4jRelationship> matchRelationship_AnyDirection(Neo4jRelationship nRel, Neo4jNode node1, Neo4jNode node2) {
		
		if (nRel == null) {
			
			log.error("No Neo4j Relationship Found");
			
			return null;
			
		}
		
		if( node1 != null ) {
			node1.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet(  node1.getSystemProperties() )  );			
		}
		if( node2 != null ) {			
			node2.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( node2.getSystemProperties() )  );
		}
		if( nRel != null ) {
			nRel.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( nRel.getSystemProperties()  ) );			
		}

		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery(nRel, node1, node2, CypherRelationshipDirectionEnum.BI );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		
		this.postAction(Neo4jRels);
		
		return Neo4jRels;
	    
	}
	
	public List<Neo4jRelationship> matchRelationshipDestinationNode( Neo4jNode endNode) {
		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( endNode, false );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
	    
	}
	
	public List<Neo4jRelationship> matchRelationshipOriginNode( Neo4jNode originNode) {
		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( originNode, true );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
	    
	}
	
	public List<Neo4jRelationship> deleteRelationshipFromOriginNode( Neo4jNode originNode) {
		
		// delete
		Neo4jRelationship emptyRel = new Neo4jRelationship();
		String cypherQuery = new CypherRelationshipDeleteBuilder().deleteRelationshipQuery( emptyRel, originNode, null);
//		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( originNode, true );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
	    
	}
	
	public List<Neo4jRelationship> matchRelationshipOriginNode_OneDegree( Neo4jNode originNode) {
		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery_AllRelationshipsBetweenResultNodes_NoOriginNode( originNode, true );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
	    
	}
	
	/**
	 * Return all relationships between 2 nodes
	 * @param startNode
	 * @param endNode
	 * @return
	 */
	public List<Neo4jRelationship> getAllRelationship( Neo4jNode startNode, Neo4jNode endNode) {
		
		
		if( startNode != null ) {
			startNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet(  startNode.getSystemProperties() )  );			
		}
		if( endNode != null ) {			
			endNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( endNode.getSystemProperties() )  );
		}

		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( null, startNode, endNode);
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		
		this.postAction(Neo4jRels);
		
		return Neo4jRels;
	    
	}
	
	
	public List<Neo4jRelationship> getAllRelationship( Neo4jNode startNode ) {
		
		
		if( startNode != null ) {
			startNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet(  startNode.getSystemProperties() )  );			
		} 

		
		
		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( null, startNode, null );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		
		this.postAction(Neo4jRels);
		
		return Neo4jRels;
	    
	}
	
	public List<Neo4jRelationship> matchReverseRelationship (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		if (nRel == null) {
			
			log.error("No Neo4j Relationship Found");
			
			return null;
			
		}

		
		String cypherQuery = new Neo4jCypherQueryBuilder().matchReverseRelationshipQuery(nRel, startNode, endNode);
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
        //System.out.println(cypherQuery);
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		
		return Neo4jRels;
	    
	}
	
	
//	/**
//	 * Should use the Neo4jProperty version
//	 * @param nRel
//	 * @param startNode
//	 * @param endNode
//	 * @param props
//	 * @return
//	 */
//	@Deprecated
//	public List<Neo4jRelationship> updateRelationshipProperties (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode, Map<String, Object> props) {
//
//		if (nRel == null) {
//			
//			log.error("No Neo4j Relationship Found");
//			
//			return null;
//			
//		}
//		
//		if (MapUtils.isEmpty(props)) {
//		
//		log.error("No Update Properties Found");
//		
//		return null;
//		
//		}
//		
//		String cypherQuery = new Neo4jCypherQueryBuilder().updateRelationshipPropertiesQuery (nRel, startNode, endNode, props);
//		if (StringUtils.isBlank(cypherQuery)) {
//		
//		log.error("Fail to Create Query");
//		return null;
//		
//		}
//		
//		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
//		
//		this.postAction(Neo4jRels);
//
//		return Neo4jRels;
//
//    }
	

	public List<Neo4jRelationship> updateRelationshipProperties (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode, List<Neo4jProperty> updatedRelProps ) {

		if (nRel == null) {
			
			log.error("No Neo4j Relationship Found");
			
			return null;
			
		}
		
		if( CollectionUtils.isEmpty( updatedRelProps ) ) {
			return null;
		}
	
		
		
		// clean the relationships and nodes here
		if( nRel != null ) {
			nRel.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( nRel.getSystemProperties() ));
		}
		
	
		String cypherQuery = new CypherRelationshipUpdateBuilder().updateRelationshipPropertiesQuery(nRel, startNode, endNode, updatedRelProps);	
		
		System.out.println("UPDATE QUERY: " + cypherQuery );
		if (StringUtils.isBlank(cypherQuery)) {
		
		log.error("Fail to Create Query");
		return null;
		
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		// fill in file stuff if available
		
		return Neo4jRels;

    }
		
	//--------------------No Returns Create--------------------//
	
	// Props can be nothing
	// No returns
//	public List<Neo4jRelationship> createRelationshipAndEndNode (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
//		
//		if (nRel == null) {
//			
//			log.error("No Neo4j Relationship Found");
//			
//			return null;
//			
//		}
//		
//		if (startNode == null) {
//			
//			log.error("No Start Neo4j Node Found");
//			
//			return null;
//			
//		}
//		
//		if (endNode == null) {
//			
//			log.error("No End Neo4j Node Found");
//			
//			return null;
//			
//		}
//		
//		String cypherQuery = new Neo4jCypherQueryBuilder().createRelAndEndNodeQuery(nRel, startNode, endNode);
//		if (StringUtils.isBlank(cypherQuery)) {
//			
//			log.error("Fail to Create Query");
//			
//			return null;
//			
//		}
////		System.out.println(cypherQuery);
//		
//		List<Neo4jRelationship> results = this.execute( cypherQuery );
//		
//		this.postAction(results);
//
//		
//		return results;
//
//	}
	
//	// No returns
//	public void batchCreateRel (List<Neo4jRelationship> nRels) {
//		
//		// TODO: Checkout each rel inside
//		if (CollectionUtils.isEmpty(nRels)) {
//			
//			log.error("No Rels Found for Creation");
//			
//			return;
//			
//		}
//		
//		Neo4jCypherQueryBuilder ncqBuilder= new Neo4jCypherQueryBuilder();
//		
//		//final long startTime = System.currentTimeMillis();
//		List<String> cqlList = new ArrayList<String>();
//		for (Neo4jRelationship nr : nRels) {
//			
//			Neo4jNode sn = nr.getStartNode();
//			Neo4jNode en = nr.getEndNode();
//			String cql = ncqBuilder.createRelationshipWithoutReturnQuery(nr, sn, en);
//			cqlList.add(cql);
//			
//		}
//		//final long endTime = System.currentTimeMillis();
//		//System.out.println("Total query building time: " + (endTime - startTime) );
//		
//		// TODO: Checkout each query inside
//		if (CollectionUtils.isEmpty(cqlList)) {
//			
//			log.error("Fail to Create Query List");
//			
//			return;
//			
//		}
//		
//		this.executeList( cqlList );
//		
//	}
	
//	// No returns
//	public void batchCreateNodeAndRel (List<Neo4jRelationship> nRels) {
//		
//		// TODO: Checkout each rel inside
//		if (CollectionUtils.isEmpty(nRels)) {
//			
//			log.error("No Rels Found for Creation");
//			
//			return;
//			
//		}
//		
//		Neo4jCypherQueryBuilder ncqBuilder= new Neo4jCypherQueryBuilder();
//		
//		//final long startTime = System.currentTimeMillis();
//		List<String> cqlList = new ArrayList<String>();
//		for (Neo4jRelationship nr : nRels) {
//			
//			Neo4jNode sn = nr.getStartNode();
//			Neo4jNode en = nr.getEndNode();
//			String cql = ncqBuilder.createNodeAndRelationshipWithoutReturnQuery(nr, sn, en);
//			cqlList.add(cql);
//			
//		}
//		//final long endTime = System.currentTimeMillis();
//		//System.out.println("Total query building time: " + (endTime - startTime) );
//		
//		// TODO: Checkout each query inside
//		if (CollectionUtils.isEmpty(cqlList)) {
//			
//			log.error("Fail to Create Query List");
//			
//			return;
//			
//		}
//		
//		this.executeList( cqlList );
//		
//	}
	
//	// No returns
//	public void batchCreateRelAndEndNode (List<Neo4jRelationship> nRels) {
//		
//		// TODO: Checkout each rel inside
//		if (CollectionUtils.isEmpty(nRels)) {
//			
//			log.error("No Rels Found for Creation");
//			
//			return;
//			
//		}
//		
//		Neo4jCypherQueryBuilder ncqBuilder= new Neo4jCypherQueryBuilder();
//		
//		//final long startTime = System.currentTimeMillis();
//		List<String> cqlList = new ArrayList<String>();
//		for (Neo4jRelationship nr : nRels) {
//			
//			Neo4jNode sn = nr.getStartNode();
//			Neo4jNode en = nr.getEndNode();
//			String cql = ncqBuilder.createRelAndEndNodeWithoutReturnQuery(nr, sn, en);
//			cqlList.add(cql);
//			
//		}
//		//final long endTime = System.currentTimeMillis();
//		//System.out.println("Total query building time: " + (endTime - startTime) );
//		
//		// TODO: Checkout each query inside
//		if (CollectionUtils.isEmpty(cqlList)) {
//			
//			log.error("Fail to Create Query List");
//			
//			return;
//			
//		}
//		
//		this.executeList( cqlList );
//		
//	}
	
	
	public List<Neo4jRelationship> getAllRelsUnderTypes (List<String> types) {
		
		if (CollectionUtils.isEmpty(types)) {
			
			log.error("No Types Found");
			return null;
			
		}
		
		String cypherQuery = new Neo4jCypherQueryBuilder().getAllRelsUnderTypesQuery(types);
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			
			return null;
			
		}

//		System.out.println(cypherQuery);
		
		List<Neo4jRelationship> results = this.execute( cypherQuery );
		
		
		
		// NOTE: Here we need to do a reload against the FILE
		this.postAction(results);

		
		
		
		
		return results;
		
	}
	
	
	private void postAction( List<Neo4jRelationship> results ) {
		if( results != null ) {
			ImageCacheUtils utils = new ImageCacheUtils();

			for( Neo4jRelationship rel : results ) {
				utils.getCacheImg(rel);		
			}
		}
	}
	
	public boolean deleteRelationship(Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode ) {

		if (nRel == null) {
			
			log.error("No Neo4j Relationship Found");
			
			return false;
			
		}
	
		
		
		// clean the relationships and nodes here
		if( nRel != null ) {
			nRel.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( nRel.getSystemProperties() ));
		}
		
		String cypherQuery = new CypherRelationshipDeleteBuilder().deleteRelationshipQuery(nRel, startNode, endNode );	
		
		System.out.println("DELETE QUERY: " + cypherQuery );
		if (StringUtils.isBlank(cypherQuery)) {
		
		log.error("Fail to Create Query");
		return false;
		
		}
		
		List<Neo4jRelationship> Neo4jRels = this.execute( cypherQuery );
		
		this.postAction(Neo4jRels);

		// fill in file stuff if available
		
		return true;

    }
	
}
