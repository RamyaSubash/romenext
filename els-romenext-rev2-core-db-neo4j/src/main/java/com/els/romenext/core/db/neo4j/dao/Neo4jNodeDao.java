package com.els.romenext.core.db.neo4j.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.cypher.CypherCoreUtils;
import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherQueryBuilder;
import com.els.romenext.core.db.neo4j.cypher.delete.node.CypherNodeDeleteBuilder;
import com.els.romenext.core.db.neo4j.cypher.delete.relationship.CypherRelationshipDeleteBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.CypherReadExpressionBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.node.CypherNodeQueryBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.node.CypherSearchNodeBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.entity.property.search.SearchNeo4jProperty;
import com.els.romenext.core.db.neo4j.enums.CypherRelationshipDirectionEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.property.file.ImageCacheMapKeyEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.search.SearchTypeEnum;
import com.els.romenext.core.db.neo4j.utils.internal.property.file.ImageCacheUtils;

public class Neo4jNodeDao extends Neo4jGenericDao<Neo4jNode> {

	public Neo4jNodeDao(String neo4jServerUrl, String usernamePassword) {
		super( Neo4jNode.class, neo4jServerUrl, usernamePassword );
	}

	public Neo4jNodeDao( Neo4jConnection<Neo4jNode> conn ) {
		super( Neo4jNode.class, conn );
	}

	private static Logger log = Logger.getLogger(Neo4jNodeDao.class);


	public void deleteAll() {
		String deleteQuery = "MATCH n OPTIONAL MATCH (n)-[r1]-() DELETE n,r1";
		
		this.execute( deleteQuery );
	}
	
	// Props can be nothing
	public List<Neo4jNode> createNode(Neo4jNode nNode) {


		if (nNode == null) {

			log.error("No Neo4j Node Found");

			return null;

		}

		
		// do any pre-cypher calls here for create
//		List<Neo4jProperty> systemPropertyList = CypherCoreUtils.manageSystemProperties(nNode);
		nNode.setSystemProperties( CypherCoreUtils.manageSystemProperties(nNode)  );
//		sysquery += this.buildPropertiesExpression_neo4jProperty( systemPropertyList );
		
		
		String cypherQuery = new Neo4jCypherQueryBuilder().createNodeQuery(nNode);
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		System.out.println( "CREATING THIS NODE in Neo4jNodeDao: " + cypherQuery);
		
		
		

		List<Neo4jNode> results = this.execute( cypherQuery );



		






		// if we are successful here
		// we need to do POST operations for any methods created
		// don't feel like this is the right spot for this

		// get uuid for this guy
		// note, there should only be 1 node here?




		if( results != null ) {
			// insertion successful

			// should we do a match against this to ensure we get the full inserted value?
			//			List<Neo4jNode> uuidNode = this.matchNodeByID( results.get( 0 ) );
			List<Neo4jNode> uuidNode = this._matchNodeByID(  results.get( 0 ), false );

			Neo4jNode result = uuidNode.get( 0 );


			/**
			 * NOTE: We use the ORIGINAL Neo4jNode here because it has the actual FILE DATA.
			 * The RETURNED VALUES here do NOT contain the actual file data.
			 * 
			 */
			ImageCacheUtils utils = new ImageCacheUtils();

			//			utils.cacheImgIncrement( nNode.getCoreLabel(), uuid, propertyId, hashedFilename, data);
			utils.cacheImg( result.getSystemProperties(), nNode );

		} else {
			System.out.println("The results were null and such the image was not cached");
		}

		return results;

	}






	public List<Neo4jNode> updateNodeProperties_neo4jProp (Neo4jNode nNode, List<Neo4jProperty> props) {

		// convert props list to a map
		Map<String,Neo4jProperty> converted = new HashMap<>();

		for( Neo4jProperty p : props ) {
			converted.put( p.getInternalPropertyName(),  p );
		}

		return this.updateNodeProperties_neo4jProp(nNode, converted );

	}

	
	public List<Neo4jNode> updateNodeProperties_neo4jProp (Neo4jNode nNode, Map<String, Neo4jProperty> props) {


		if (nNode == null) {

			log.error("No Neo4j Node Found");

			return null;

		}
		
		
		// if this has a file property, we need to see if we have to update this file 
		// just check to see if the props have a file 
		
		
		
		
		
		
//		nNode.setSystemProperties( CypherCoreUtils.manageSystemProperties(nNode)  );
		Map<String, Neo4jProperty> updateProps = CypherCoreUtils.manageUpdateProperties(props);

		
		String cypherQuery = new Neo4jCypherQueryBuilder().updateNodePropertiesQuery_neo4jPropertyVersion(nNode, updateProps);
		
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		System.out.println( "UPDATE CALL : " + cypherQuery);

		List<Neo4jNode> results = this.execute( cypherQuery );
		
		
		
		
		
//		// When updating a node, we need to check to see if the file needs to be updated
		if( results != null ) {
			// insertion successful

			boolean fileFound = false;
			
			// check to see if there was a file
			for( Neo4jProperty p : props.values() ) {
				if( p.getType() == Neo4jPropertyEnum.FILE  ) {
					fileFound = true;
					break;
				}
			}
			
			ImageCacheUtils utils = new ImageCacheUtils();

			
			if( fileFound == true ) {
				
				
				// should we do a match against this to ensure we get the full inserted value?
				//			List<Neo4jNode> uuidNode = this.matchNodeByID( results.get( 0 ) );
				List<Neo4jNode> uuidNode = this._matchNodeByID(  results.get( 0 ), false );

				Neo4jNode result = uuidNode.get( 0 );


				result.getTypedProperties();
				
				/**
				 * NOTE: We use the ORIGINAL Neo4jNode here because it has the actual FILE DATA.
				 * The RETURNED VALUES here do NOT contain the actual file data.
				 * 
				 */
				// find the old 
				
				
				for( Neo4jProperty p : props.values() ) {
					if( p.getType() == Neo4jPropertyEnum.FILE  ) {
						
						try {
							Map<String,Object> map = (Map<String,Object>) p.getValue();

							String filename = (String) map.get( ImageCacheMapKeyEnum.FILENAME.getValueType());
							byte[] file = (byte[]) map.get( ImageCacheMapKeyEnum.FILE.getValueType() );
							
							// if we found a file, we force update this regardless
							//			utils.cacheImgIncrement( nNode.getCoreLabel(), uuid, propertyId, hashedFilename, data);
							utils.cacheImgIncrement( result, p.getInternalPropertyName(), filename, file);
							
//							utils.cacheImg( result.getSystemProperties(), nNode );
							
							
							// after caching, we need to insert the data into the current return node
							
							
							
						} catch( Exception e ) {
							// failed to probably retrieve the map
							System.out.println( e );
							e.printStackTrace();
						}
						
						
						
						
					}
				} 
				
				
				utils.getCacheImg( result );
				
				
				List<Neo4jNode> newResult = new ArrayList<>();
				
				newResult.add( result );
				
				return newResult;
			
			} else {
				// if no file was updated, we still need to handle the case where there is a FILE in the current types
				
				Neo4jNode result = results.get( 0 );
				
				utils.getCacheImg( result );
				
				List<Neo4jNode> newResult = new ArrayList<>();
				
				newResult.add( result );
				
				return newResult;
			}
			
		

		}
		
		
		
		

		return results;

	}

	public void setUniqueConstraintOnNode (String label, String propKey) {

		if (StringUtils.isBlank(label)) {

			log.error("No Label Found");

			return;

		}

		if (StringUtils.isBlank(propKey)) {

			log.error("No Property Key Found");

			return;

		}

		String cypherQuery = new Neo4jCypherQueryBuilder().setUniqueConstraintOnNodeQuery(label, propKey);
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return;

		}

		//		System.out.println(cypherQuery);

		this.execute( cypherQuery );

	}

	//-------------------Get All-------------------// 

	@Deprecated
	public List<Neo4jNode> getAll() {

		String cypherQuery = ( new CypherReadExpressionBuilder() ).getNodesWithProperties( null ); 
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		//System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute( cypherQuery );

		this.postAction( results );


		return results;
	}

	@Deprecated
	public List<Neo4jNode> getAllNodesStandaloneUnderLabel (String label) {

		String cypherQuery = new Neo4jCypherQueryBuilder().getAllNodesStandaloneUnderLabelQuery(label);
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		//System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute( cypherQuery );

		this.postAction( results );


		return results;

	}


	/**
	 * to be deleted
	 * @param labels
	 * @param types
	 * @return
	 */
	@Deprecated
	public List<Neo4jNode> getAllSingleNodesUnderLabelsAndTypes (List<String> labels, List<String> types) {

		if (CollectionUtils.isEmpty(labels)) {

			log.error("No Labels Found");
			return null;

		}

		String cypherQuery = new Neo4jCypherQueryBuilder().getAllSingleNodesUnderLabelsAndTypesQuery(labels, types);
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		//		System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute( cypherQuery );

		this.postAction( results );


		return results;

	}

	



	@Deprecated
	// This will remove a property from a node
	public boolean removeNodesProperties(String label, String uuid, String propKey) {

		if (StringUtils.isBlank(label)) {
			log.error("No Label Found");
			return false;
		}

		if (StringUtils.isBlank(uuid)) {
			log.error("No UUID Found");
			return false;
		}

		if (StringUtils.isBlank(propKey)) {
			log.error("No Property Key Found");
			return false;
		}

		//		System.out.println(label);
		//		System.out.println(uuid);
		//		System.out.println(propKey);

		// MATCH (n:" + label + "{uuid:\"" + uuid + "\"}) REMOVE n." + propKey + " RETURN n, labels(n), id(n)
		String cypherQuery = "MATCH (n:" + label + ") WHERE n.uuid = '" + uuid + "' REMOVE n." + propKey + " RETURN n, labels(n), id(n)";
		if (StringUtils.isBlank(cypherQuery)) {
			log.error("Fail to Create Query");
			return false;
		}
		//		System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute(cypherQuery);
		if (CollectionUtils.isEmpty(results)) {
			return false;
		}

		return true;
	}







	
	
	
	

	/**
	 * Core methods
	 */

	// find nodes with these properties
	public List<Neo4jNode> getNodes( List<String> labels, List<Neo4jProperty> props) {

		if( CollectionUtils.isEmpty( labels ) ) {
			return null;
		}

		CypherReadExpressionBuilder builder = new CypherReadExpressionBuilder();


		String cypherQuery = builder.getNodesWithProperties(labels, props);
		if (StringUtils.isBlank(cypherQuery)) {
			log.error("Fail to Create Query");
			return null;

		}

		List<Neo4jNode> results = this.execute(cypherQuery);

		this.postAction( results );


		return results;

	}



	// find nodes with these properties
	public List<Neo4jNode> searchNodes( Neo4jNode entryNode, List<SearchNeo4jProperty> props ) {

		if( entryNode == null ) {
			return null;
		}

		//		if( CollectionUtils.isEmpty( labels ) ) {
		//			return null;
		//		}

		CypherReadExpressionBuilder builder = new CypherReadExpressionBuilder();

		CypherSearchNodeBuilder searchBuilder = new CypherSearchNodeBuilder();

		String cypherQuery = searchBuilder.searchNodes(entryNode, props);
		//		String cypherQuery = builder.getNodesWithProperties(labels, props);

		//		String cypherQuery = new CypherReadExpressionBuilder().getTypesFromNode(entryNode, toSearchLabel, propKeys );


		//		String cypherQuery = new Neo4jCypherQueryBuilder().getNodesStandaloneUnderLabelHavePropsQuery(label, propKeys);
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");
			return null;

		}
		//		System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute(cypherQuery);

		this.postAction(results);


		return results;
	}

	public List<Neo4jNode> getNodes_neo4jProperty( Neo4jNode entryNode, List<String> toSearchLabel, List<Neo4jProperty> propKeys) {

		if( entryNode == null ) {
			return null;
		}


		if ( toSearchLabel == null || toSearchLabel.size() <= 0 ) {

			log.error("No Label Found");
			return null;

		}

		//		if (CollectionUtils.isEmpty(propKeys)) {
		//			
		//			log.error("No Property Keys Found");
		//			return null;
		//			
		//		}


		// clean the system properties
		entryNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( entryNode.getSystemProperties() )  );

		
		
		String cypherQuery = new CypherReadExpressionBuilder().getTypesFromNode(entryNode, toSearchLabel, propKeys );


		//		String cypherQuery = new Neo4jCypherQueryBuilder().getNodesStandaloneUnderLabelHavePropsQuery(label, propKeys);
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");
			return null;

		}
		//		System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute(cypherQuery);

		this.postAction(results);


		return results;

	}

	public List<Neo4jNode> getNodes_neo4jProperty( Neo4jNode entryNode, List<String> toSearchLabel, List<Neo4jProperty> propKeys, CypherRelationshipDirectionEnum dir, Integer min, Integer max ) {

		if( entryNode == null ) {
			return null;
		}

		if ( toSearchLabel == null || toSearchLabel.size() <= 0 ) {
			log.error("No Label Found");
			return null;
		}

		// clean the system properties
		entryNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet( entryNode.getSystemProperties() )  );


		String cypherQuery = new CypherReadExpressionBuilder().getGenericRelationshipNode(entryNode, toSearchLabel, propKeys, dir, min, max );


		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");
			return null;

		}

		List<Neo4jNode> results = this.execute(cypherQuery);

		this.postAction(results);


		return results;

	}

	/**
	 * This will match a given node BUT WITHOUT SYSTEM PROPERTIES (CREATEDATE/MODIFIEDDATE)
	 * 
	 * NOTE: This will still us the uuid if found
	 * @param nNode
	 * @return
	 */
	// label and nodeIdentifiers can be nothing
	public List<Neo4jNode> matchNode(Neo4jNode nNode) {



		if (nNode == null) {

			log.error("No Neo4j Node Found");

			return null;

		}

		
		nNode.setSystemProperties( CypherCoreUtils.cleanSystemPropertiesForGet(nNode.getSystemProperties())  );

//		cleanSystemPropertiesForGet
		
		CypherNodeQueryBuilder cypherNodeBuilder = new CypherNodeQueryBuilder();
		String cypherQuery = cypherNodeBuilder.matchNodeQuery(nNode);

		//			String cypherQuery = new Neo4jCypherQueryBuilder().matchNodeQuery(nNode);

		System.out.println("Matching query: " + cypherQuery );
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		//			System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute( cypherQuery );

		this.postAction(results);


		return results;

	}
	
	/**
	 * This might be a garbage method. Maybe the same as the above get by id
	 * @param nNode
	 * @return
	 */
	// label and nodeIdentifiers can be nothing
	@Deprecated
	public List<Neo4jNode> matchNodeWithSystempProperties(Neo4jNode nNode) {



		if (nNode == null) {

			log.error("No Neo4j Node Found");

			return null;

		}

		
		
		CypherNodeQueryBuilder cypherNodeBuilder = new CypherNodeQueryBuilder();
		String cypherQuery = cypherNodeBuilder.matchNodeQuery(nNode);

		//			String cypherQuery = new Neo4jCypherQueryBuilder().matchNodeQuery(nNode);

		System.out.println("Matching query: " + cypherQuery );
		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}

		//			System.out.println(cypherQuery);

		List<Neo4jNode> results = this.execute( cypherQuery );

		this.postAction(results);


		return results;

	}

	
	public List<Neo4jNode> matchNodeByID (Neo4jNode nNode) {

		if (nNode == null) {

			log.error("No Neo4j Node Found");

			return null;

		}

		String cypherQuery = new Neo4jCypherQueryBuilder().matchNodeByIdQuery(nNode);
		System.out.println("MATCHING QUERY: " + cypherQuery);



		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}


		List<Neo4jNode> results = this.execute( cypherQuery );

		this.postAction(results);

		return results;

	}
	
	
	public List<Neo4jNode> deleteNode( Neo4jNode originNode) {
		
		// delete 
		String cypherQuery = new CypherNodeDeleteBuilder().deleteNodeQuery( originNode );
		
//		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( originNode, true );
		System.out.println("----- MATCHING QUERY:" + cypherQuery);
		
		if (StringUtils.isBlank(cypherQuery)) {
			
			log.error("Fail to Create Query");
			return null;
			
		}
		
		List<Neo4jNode> Neo4jNodes = this.execute( cypherQuery );
		
		this.postAction(Neo4jNodes);

		
		return Neo4jNodes;
	    
	}
	
//	public List<Neo4jNode> deleteNodeAndWorkspaceRelationships( Neo4jNode originNode, Neo4jNode workspaceNode ) {
//		
//		// delete 
//		String cypherQuery = new CypherNodeDeleteBuilder().deleteNodeQuery( originNode );
//		
////		String cypherQuery = new CypherRelationshipReadBuilder().matchRelationshipQuery( originNode, true );
//		System.out.println("----- DELETE RELNODE QUERY:" + cypherQuery);
//		
//		if (StringUtils.isBlank(cypherQuery)) {
//			
//			log.error("Fail to Create Query");
//			return null;
//			
//		}
//		
//		List<Neo4jNode> Neo4jNodes = this.execute( cypherQuery );
//		
//		this.postAction(Neo4jNodes);
//
//		
//		return Neo4jNodes;
//	    
//	}
	

	/**
	 * Private methods
	 */
	
	
	private List<Neo4jNode> _matchNodeByID(Neo4jNode nNode, boolean doPost ) {

		if (nNode == null) {

			log.error("No Neo4j Node Found");

			return null;

		}

		String cypherQuery = new Neo4jCypherQueryBuilder().matchNodeByIdQuery(nNode);
		System.out.println("MATCHING QUERY: " + cypherQuery);



		if (StringUtils.isBlank(cypherQuery)) {

			log.error("Fail to Create Query");

			return null;

		}


		List<Neo4jNode> results = this.execute( cypherQuery );

		if( doPost ) {
			if( results != null ) {
				ImageCacheUtils utils = new ImageCacheUtils();

				for( Neo4jNode node : results ) {
					utils.getCacheImg(node);		
				}
			}
		}


		return results;

	}
	
	



	private void postAction( List<Neo4jNode> results ) {
		if( results != null ) {
			ImageCacheUtils utils = new ImageCacheUtils();

			for( Neo4jNode node : results ) {
				utils.getCacheImg(node);		
			}
		}
	}

}
