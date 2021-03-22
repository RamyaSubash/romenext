package com.els.romenext.core.relationship;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jRelationshipDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.RelationshipUtils;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.neo4j.Neo4jRelationshipUtils;

public class RelationshipDeleteCoreService {
	
	private static Logger logger = Logger.getLogger( RelationshipDeleteCoreService.class );
	private Neo4jRelationshipDao dao;
	private RelationshipUtils relUtils = new RelationshipUtils();
	
	private String namespace;

	public RelationshipDeleteCoreService( String namespace, String neo4jServerUrl, String usernamePassword) {
		
		this.namespace = namespace;
		
		this.dao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
		this.relUtils = new RelationshipUtils(namespace);
	}
	 
	
	public RelationshipDeleteCoreService(  String namespace, Neo4jConnection<Neo4jRelationship> conn ) {
		
		this.namespace = namespace;
		
		this.dao = new Neo4jRelationshipDao( conn );
		this.relUtils = new RelationshipUtils( this.namespace );
	}
	
	public Neo4jRelationshipDao getDao() {
		return dao;
	}

	public void setDao(Neo4jRelationshipDao dao) {
		this.dao = dao;
	}
	
	/**
	 * I don't believe this works anymore with namespaces
	 * @return
	 */
	public boolean isInitialized () {
		return this.getDao() != null;
	}
	
	
	/**
	 * Will delete all the connections going from this node
	 * 
	 * This is really used for workspaces as currently only the workspace edges are all or nothing.
	 * 
	 * @param originNode
	 * @param metadataRepo
	 * @return
	 */
	public Path deleteConnectionFrom( Node originNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( originNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode = Neo4jNodeUtils.build( originNode, metadataRepo );

		
		List<Neo4jRelationship> nRels = this.getDao().deleteRelationshipFromOriginNode(neo4jNode);

		
//		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipOriginNode(neo4jNode);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	public boolean deleteEdge( Node originNode, Node destNode, Relationship edge, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return false;	
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return false;			
		}
		
		if( originNode == null || destNode == null || edge == null ) {
			logger.error("Node to remove was null");
			return false;
		} 
		
		
		Neo4jNode originNeo4jNode = Neo4jNodeUtils.build( originNode, metadataRepo );
		Neo4jNode destNeo4jNode = Neo4jNodeUtils.build( destNode, metadataRepo );

		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build(namespace, edge, metadataRepo);
		
		
		// make sure there's only 1 connection?
//		// todo: should we do this here?
		
		
		// for now just delete it
		return this.dao.deleteRelationship( neo4jRel, originNeo4jNode, destNeo4jNode );
		
		
		
//		boolean deleteRelationship = this.dao.deleteRelationship( neo4jRel, originNeo4jNode, destNeo4jNode );
//
//		
//		
//		List<Relationship> conns = connServ.getConnectionsFiltered( pathNode.getTypeId(), RuleTypeEnum.PATHTONODE, metadataRepo.getMetadata() );
//
//		
//		// this is only the list of the connections that we want to look for
//		Path foundPaths = rserv.getConnection(pathNode, toRemove, metadataRepo);
//		
//		if( foundPaths == null || foundPaths.getRelationships() == null ) {
//			logger.error("Found no path to delete?");
//			return false;
//		}
//		
//		if( foundPaths.getRelationships().size() > 0 ) {
//			
//			List<Relationship> rels = foundPaths.getRelationships();
//			
//			if( rels.size() == 1 ) {
//				// good?
//				
//				Relationship relationship = rels.get( 0 );
//				
//				Path connectionFrom = rserv.getConnectionFrom( pathNode,  metadataRepo );
//				
//				Neo4jRelationshipServices relServ = this.getNeo4jRelServices();
//				
//				boolean deleteRelationship = relServ.deleteRelationship( relationship, pathNode, toRemove, metadataRepo);
//				
//				
//				return true;
//			} else {
//				// if there are multiple relationships, this is bad
//				logger.error("Found multiple possible relationships to delete against"); 
//			}
//			
//		}
			
			
		
		
		
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
//		
//		return false;
		
	}
	
	
}
