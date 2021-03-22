package com.els.romenext.core.neo4j.node;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.DatatypeConverter;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.dao.util.node.Neo4jNodeDaoUtils;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.CypherRelationshipDirectionEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.node.NodeUtils;

/**
 * Used for any calls that should hit the neo4j eventually
 * 
 * This will return a lot of them methods from NodeCoreServices.java
 * 
 * 
 * 
 * Payload example
 * 
 * {
	"typeId":1,
	"properties":[
		{
			"propertyId":1,
			"propertyName":"name",
			"value":"Moby",
			"propertyType":"STRING"
		}
	]

}

	In the end, this class should encompass ALL NODE management, where the initial entry point is a NODE and the return is a NODE.


 * @author jlee
 *
 */
public class Neo4jNodeServices {

	private static Logger logger = Logger.getLogger( Neo4jNodeServices.class );

	private Neo4jNodeDao dao;

	private String namespace;

	public Neo4jNodeServices(String neo4jServerUrl, String usernamePassword) {
		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword));
	}

	public Neo4jNodeServices(  Neo4jConnection<Neo4jNode> conn ) {
		this.dao = new Neo4jNodeDao( conn );
	}

	public Neo4jNodeServices(String neo4jServerUrl, String neo4jServerUsername, String neo4jServerPassword,  String namespace) {

		String userCredential = neo4jServerUsername + ":" + neo4jServerPassword;
		String userCredentialBase64 = DatatypeConverter.printBase64Binary(userCredential.getBytes());

		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, userCredentialBase64));
		this.namespace = namespace;

	}

	/**
	 * Will search the given Neo4j DB for specific types FROM an entry node
	 * @param entryNode
	 * @param searchingTypeIds
	 * @param metadataRepo
	 * @return
	 */
	public List<Node> getNodes( Node entryNode, List<Long> searchingTypeIds, MetadataRepoContainer metadataRepo, Integer min, Integer max ) {
		return this.getGenericNodes(entryNode, searchingTypeIds, metadataRepo, CypherRelationshipDirectionEnum.LTR, min, max );
	}

	public List<Node> getFromNodes( Node entryNode, List<Long> searchingTypeIds, MetadataRepoContainer metadataRepo, Integer min, Integer max ) {
		return this.getGenericNodes(entryNode, searchingTypeIds, metadataRepo, CypherRelationshipDirectionEnum.RTL, min, max );
	}

	public List<Node> getAllNodes( Node entryNode, List<Long> searchingTypeIds, MetadataRepoContainer metadataRepo, Integer min, Integer max ) {
		return this.getGenericNodes(entryNode, searchingTypeIds, metadataRepo, CypherRelationshipDirectionEnum.BI, min, max );
	}

	private List<Node> getGenericNodes( Node entryNode, List<Long> searchingTypeIds, MetadataRepoContainer metadataRepo, CypherRelationshipDirectionEnum dir, Integer min, Integer max ) {


		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}

		if( entryNode == null ) {
			logger.error("No entry node was found");
			return null;
		}

		if (metadataRepo.getMetadata() == null) {

			logger.error("No Metadata Found");
			return null;

		}

		if (CollectionUtils.isEmpty(searchingTypeIds)) {

			logger.error("No Type Ids Found");
			return null;

		}
		// conver the node to 

		// need to convert the Node to pieces we can call neo4j with
		// ie. convert NODE -> Neo4jNode
		// ie. convert Typeid's -> "true" type names for neo4j
		List<String> updatedSearchingTypeIds = new ArrayList<String>();
		for( Long typeId : searchingTypeIds ) {
			String updatedLabel = NodeUtils.buildNodeLabel( metadataRepo, typeId);

			if( updatedLabel != null ) {
				updatedSearchingTypeIds.add( updatedLabel );
			}
		}


		// convert Node -> Neo4jNode
		NodeUtils utils = new NodeUtils(this.namespace);
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build( entryNode, metadataRepo );

		List<Neo4jNode> nodes = dao.getNodes_neo4jProperty(neo4jNode_entryNode, updatedSearchingTypeIds, null, dir, min, max );


		List<Node> results = new ArrayList<Node>();

		if( nodes != null ) {
			// conver tto Nodes
			for( Neo4jNode neoNode : nodes ) {
				results.add( utils.build( neoNode ) );
			}
		}

		return results;

	}


	/**
	 * Search for nodes based on Type and Properties
	 * 
	 * ONLY TYPE PROPERTIES
	 * 
	 * NOTE: Are you sure you don't want to search against sysprops function below?
	 * 
	 * @param typeId
	 * @param properties
	 * @param metadataRepo
	 * @return
	 */
	public List<Node> getNodesFromTypesProperties( RomeType typeId, List<Property> properties, MetadataRepoContainer metadataRepo ) {

		return this.getNodesFromTypesAndSysProperties(typeId, properties, null, metadataRepo);
	}

	//	public List<Node> getNodesFromTypesProperties( Long typeId, List<Property> properties, MetadataRepoContainer metadataRepo ) {
	//		
	//		return this.getNodesFromTypesAndSysProperties(typeId, properties, null, metadataRepo);
	//	}


	//	public List<Node> getNodesFromTypesAndSysProperties( Long typeId, Collection<Property> properties, Collection<Property> sysProperties, MetadataRepoContainer metadataRepo ) {
	//		
	//		if (metadataRepo == null) {
	//			
	//			logger.error("No Metadata Repo Found");
	//			return null;
	//			
	//		}
	//		
	//		if (metadataRepo.getMetadata() == null) {
	//			
	//			logger.error("No Metadata Found");
	//			return null;
	//			
	//		}
	//		
	//		if( typeId == null ) {
	//			logger.error( "No typeid found");
	//			return null;
	//		}
	//		
	//		// load the type
	//		RomeTypeDao typeDao = new RomeTypeDao();
	//		RomeType romeType = typeDao.get( typeId );
	//		
	//		if( romeType == null ) {
	//			logger.error("Failed to find the type");
	//		}
	//		
	//		Long metadataId = metadataRepo.getMetadata().getId();
	//		Long repoId = metadataRepo.getId();
	//		
	//		String label = NodeUtils.buildNodeLabel( metadataRepo, typeId );
	//		
	//
	////		RomeTypePropertyDao propDao = new RomeTypePropertyDao();
	////		List<RomeTypeProperty> property = propDao.findByRomeType( romeType );
	//		
	//		NodeUtils utils = new NodeUtils( this.namespace );
	//		
	//		
	//		// We need to convert the properties to the neo4jproperty
	//		List<Neo4jProperty> neoProps = new ArrayList<Neo4jProperty>();
	//		
	//		if( properties != null ) {
	//			for( Property p : properties ) {
	//				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.TYPE );
	//				neoProps.add( convert );
	//			}
	//		}
	//		
	//		if( sysProperties != null ) {
	//			for( Property p : sysProperties ) {
	//				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.SYSTEM );
	//				neoProps.add( convert );
	//			}
	//		}
	//	
	////		Neo4jInstance neo4jInstance = metadataRepo.getNeo4jInstance();
	////		Neo4jNodeDao dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jInstance.getUrl(), neo4jInstance.getUsernamePassword() ) );
	//
	//		// etc
	//		Neo4jNodeDaoUtils daoUtils = new Neo4jNodeDaoUtils( dao );
	//
	//		List<Neo4jNode> nodes = daoUtils.getNodes( label, neoProps );
	//
	////		List<Neo4jNode> nodes = dao.getNodes(neo4jNode_entryNode, updatedSearchingTypeIds, null );
	//		
	//		List<Node> results = new ArrayList<Node>();
	//		
	//		if( nodes != null ) {
	//			// conver tto Nodes
	//			for( Neo4jNode neoNode : nodes ) {
	//				results.add( utils.build( neoNode ) );
	//			}
	//		}
	//		
	//		return results;
	//	}

	public List<Node> getNodesFromTypesAndSysProperties( RomeType type, Collection<Property> properties, Collection<Property> sysProperties, MetadataRepoContainer metadataRepo ) {

		if (metadataRepo == null) {

			logger.error("No Metadata Repo Found");
			return null;

		}

		if (metadataRepo.getMetadata() == null) {

			logger.error("No Metadata Found");
			return null;

		}

		if( type == null ) {
			logger.error( "No typeid found");
			return null;
		}

		Long metadataId = metadataRepo.getMetadata().getId();
		Long repoId = metadataRepo.getId();

		String label = NodeUtils.buildNodeLabel( metadataRepo, type );


		//		RomeTypePropertyDao propDao = new RomeTypePropertyDao();
		//		List<RomeTypeProperty> property = propDao.findByRomeType( romeType );

		NodeUtils utils = new NodeUtils( this.namespace );


		// We need to convert the properties to the neo4jproperty
		List<Neo4jProperty> neoProps = new ArrayList<Neo4jProperty>();

		if( properties != null ) {
			for( Property p : properties ) {
				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.TYPE );
				neoProps.add( convert );
			}
		}

		if( sysProperties != null ) {
			for( Property p : sysProperties ) {
				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.SYSTEM );
				neoProps.add( convert );
			}
		}

		//		Neo4jInstance neo4jInstance = metadataRepo.getNeo4jInstance();
		//		Neo4jNodeDao dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jInstance.getUrl(), neo4jInstance.getUsernamePassword() ) );

		// etc
		Neo4jNodeDaoUtils daoUtils = new Neo4jNodeDaoUtils( dao );

		List<Neo4jNode> nodes = daoUtils.getNodes( label, neoProps );

		//		List<Neo4jNode> nodes = dao.getNodes(neo4jNode_entryNode, updatedSearchingTypeIds, null );

		List<Node> results = new ArrayList<Node>();

		if( nodes != null ) {
			// conver tto Nodes
			for( Neo4jNode neoNode : nodes ) {
				results.add( utils.build( neoNode ) );
			}
		}

		return results;
	}

	//	public List<Node> getNodesFromTypesProperties( Long typeId, List<Property> properties, MetadataRepoContainer metadataRepo ) {
	//	
	//	return this.getNodesFromTypesAndSysProperties(typeId, properties, null, metadataRepo);
	//}


	public List<Node> getNode( Node toFind, MetadataRepoContainer metadataRepo ) {


		if (toFind == null) {

			logger.error("No Node Found");
			return null;

		}

		if (!toFind.hasTypeId()) {
			//System.out.println("missing typeName");
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


		Neo4jNode neo4jNode = Neo4jNodeUtils.build(toFind, metadataRepo);


		// Get neo4j node
		List<Neo4jNode> matchNode = this.dao.matchNode( neo4jNode );
		
		
		if( matchNode == null ) {
			return null;
		}
		
		List<Node> romeNodes = new ArrayList<Node>();
		NodeUtils utils = new NodeUtils( this.namespace );
		
		for (Neo4jNode nn : matchNode) {

			romeNodes.add( utils.build(nn) );

		}

		//			List<Neo4jNode> testNodes = new ArrayList<Neo4jNode>();
		//			
		//			for( Node n : romeNodes ) {
		//				testNodes.add( this.nodeUtils.buildNeo4jNode( metadataRepo, n) );
		//			}

		if (CollectionUtils.isEmpty(romeNodes)) {

			logger.error("Failed to Build Rome Node");
			return null;

		}

		return romeNodes;

	}
}
