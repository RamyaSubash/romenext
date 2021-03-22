package com.els.romenext.core.neo4j.node.search;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.entity.property.search.SearchNeo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.search.SearchProperty;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.node.NodeUtils;

public class SearchNeo4jNodeServices {
	
	private static Logger logger = Logger.getLogger( SearchNeo4jNodeServices.class );

	private Neo4jNodeDao dao;
	private String namespace;
	
	public SearchNeo4jNodeServices(String neo4jServerUrl, String usernamePassword, String namespace ) {
		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) );
		this.namespace = namespace;
	}
	
	public SearchNeo4jNodeServices(  Neo4jConnection<Neo4jNode> conn, String namespace ) {
		this.dao = new Neo4jNodeDao( conn );
		this.namespace = namespace;
	}
	
	
	
	public Neo4jNodeDao getDao() {
		return dao;
	}

	public void setDao(Neo4jNodeDao dao) {
		this.dao = dao;
	}
	
	/**
	 * Will search the given Neo4j DB for specific types FROM an entry node
	 * @param entryNode
	 * @param searchingTypeIds
	 * @param metadataRepo
	 * @return
	 */
	public List<Node> searchTypeProperties( Node entryNode, List<SearchProperty> searchProperties, MetadataRepoContainer metadataRepo ) {
		
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(searchProperties)) {
			
			logger.error("No Type Ids Found");
			return null;
			
		}
		
		Long metadataId = metadataRepo.getMetadata().getId();
		Long repoId = metadataRepo.getId();
		
		
		
		// conver the propertyes to neo4j properties
//		List<Neo4jProperty> searchProps = new ArrayList<Neo4jProperty>();
//		List<SearchTypeEnum> searchTypeEnumList = new ArrayList<SearchTypeEnum>();
		
		List<SearchNeo4jProperty> searchProps = new ArrayList<SearchNeo4jProperty>();
		
		
//		List<Neo4jProperty> results = new ArrayList<Neo4jProperty>();
		
		for( SearchProperty p : searchProperties ) {
			Neo4jProperty prop = Neo4jPropertyUtil.convert(p, Neo4jPropertyTypeEnum.TYPE );
//			SearchNeo4jProperty convert = Neo4jPropertyUtil.convert(p, neo4jType);
			SearchNeo4jProperty convert = new SearchNeo4jProperty( prop, p.getSearchType() );
			
			if( convert != null ) {
				searchProps.add( convert );
			} else {
				System.out.println("FAILED TO CONVERT THIS PROPERTY TO NEO4JPROPERTY : " + p );
			}
		}
		
		
		Neo4jNodeDao dao = this.getDao();
		
		
//		String type = entryNode.getType();
//		List<String> labels = new ArrayList<String>();
//		labels.add( type );
		
//		NodeUtils utils = new NodeUtils();
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build( entryNode, metadataRepo );
		
		
		List<Neo4jNode> searchNodes = dao.searchNodes(neo4jNode_entryNode, searchProps);
		

		
		List<Node> results = new ArrayList<Node>();
		
		if( searchNodes != null ) {
			NodeUtils utils = new NodeUtils( this.namespace );

			// conver tto Nodes
			for( Neo4jNode neoNode : searchNodes ) {
				results.add( utils.build( neoNode ) );
			}
		}
		
		return results;
		
	}
	
}
