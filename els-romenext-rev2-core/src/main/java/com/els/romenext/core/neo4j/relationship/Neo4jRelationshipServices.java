package com.els.romenext.core.neo4j.relationship;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.dao.Neo4jRelationshipDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.RelationshipUtils;
import com.els.romenext.core.util.RomeConnectionUtils;
import com.els.romenext.core.util.factory.INeo4jFactoryCreatable;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.neo4j.Neo4jRelationshipUtils;
import com.els.romenext.core.util.node.NodeUtils;
import com.els.romenext.core.util.node.PropertyUtils;

/**
 * Service method for all calls GOING into the repos that deal with Relationships.
 * 
 * Ie.
 * 
 * ENTRY : Should be from Relationship clases.
 * INTERNAL: Should be converting Relationship -> Neo4jRelationship and back.
 * EXIT: Should be from Relationship classes OR optionally PATH classes
 * 
 * 
 * @author jplee
 *
 */
public class Neo4jRelationshipServices {

	private static Logger logger = Logger.getLogger( Neo4jRelationshipServices.class );
	
	private Neo4jRelationshipDao dao;
	private Neo4jNodeDao nnDao;
	private NodeUtils nodeUtils = null;
	private PropertyUtils propertyUtils = new PropertyUtils();
	private RelationshipUtils relUtils = new RelationshipUtils();
	
	private String namespace;

	
	public Neo4jRelationshipServices( String namespace, String neo4jServerUrl, String usernamePassword) {
		this.dao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
		this.nnDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword));
		this.nodeUtils = new NodeUtils( namespace );
		this.relUtils = new RelationshipUtils( namespace );
		this.namespace = namespace;
	}
	
	public Neo4jRelationshipServices( String namespace, Neo4jConnection<Neo4jRelationship> conn ) {
		this.dao = new Neo4jRelationshipDao( conn );
		this.namespace = namespace;
		this.nodeUtils = new NodeUtils( namespace );
		this.relUtils = new RelationshipUtils( namespace );
	}
	
	public Neo4jRelationshipDao getDao() {
		return dao;
	}


	public Neo4jNodeDao getNnDao() {
		return nnDao;
	}


	public NodeUtils getNodeUtils() {
		return nodeUtils;
	}


	public PropertyUtils getPropertyUtils() {
		return propertyUtils;
	}


	public RelationshipUtils getRelUtils() {
		return relUtils;
	}
	
	
	public boolean deleteRelationship(Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
		
		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( namespace, rel, metadataRepo);

		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( origNode, metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( destNode, metadataRepo);
		
		
		boolean results = this.getDao().deleteRelationship(neo4jRel, origNode_neo4j, destNode_neo4j);
		
		return results;
		
	}
	
	/**
	 * Note: Origin and destination nodes MUST be assigned
	 * @param rel
	 * @param metadataRepo
	 * @return
	 */
	public boolean deleteRelationship(Relationship rel,  MetadataRepoContainer metadataRepo) {
		
		if( rel.getOriginNode() == null || rel.getDestinationNode() == null ) {
			return false;
		}
		
		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( namespace, rel, metadataRepo);

		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( rel.getOriginNode(), metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( rel.getDestinationNode(), metadataRepo);
		
		
		boolean results = this.getDao().deleteRelationship(neo4jRel, origNode_neo4j, destNode_neo4j);
		
		return results;
		
	}
	
	/**
	 * Retrieve all edges in the repo with the given Relationship.
	 * 
	 * Note: This will ignore all from/to and only focus on the Rule/Connection information.
	 * 
	 * @param rel
	 * @param repo
	 * @return
	 */
	public Path getRelationships( Relationship rel, MetadataRepoContainer repo ) {
		
		if (repo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (repo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
			
		}
		
		if( rel == null ) {
			logger.error("No relationshp found");
			return null;
		}

		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( this.namespace, rel, repo );
		
		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipConnectionOnly(neo4jRel);
		
//		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(neo4jRel, neo4jRel.getStartNode(), neo4jRel.getEndNode());
		
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


	
	
	
	
}
