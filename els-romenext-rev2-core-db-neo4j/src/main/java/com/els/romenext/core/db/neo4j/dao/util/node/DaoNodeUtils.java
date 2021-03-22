package com.els.romenext.core.db.neo4j.dao.util.node;

import java.util.List;

import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.utils.internal.property.file.ImageCacheUtils;

public class DaoNodeUtils {

	public List<Neo4jNode> create( Neo4jNodeDao dao, String cypher ) {
//
//		List<Neo4jNode> results = dao.execute( cypher );
//		
//		
//
//		
//		
//		
//		
//		
//		
//		
//		// if we are successful here
//		// we need to do POST operations for any methods created
//		// don't feel like this is the right spot for this
//		
//		// get uuid for this guy
//		// note, there should only be 1 node here?
//		
//		
//		
//		
//		if( results != null ) {
//			// insertion successful
//
//			// should we do a match against this to ensure we get the full inserted value?
//			List<Neo4jNode> uuidNode = this.matchNodeByID( results.get( 0 ) );
//			
//			
//			Neo4jNode result = uuidNode.get( 0 );
//			
//			
//			/**
//			 * NOTE: We use the ORIGINAL Neo4jNode here because it has the actual FILE DATA.
//			 * The RETURNED VALUES here do NOT contain the actual file data.
//			 * 
//			 */
//			ImageCacheUtils utils = new ImageCacheUtils();
//
////			utils.cacheImgIncrement( nNode.getCoreLabel(), uuid, propertyId, hashedFilename, data);
//			utils.cacheImg( result.getSystemProperties(), nNode );
//			
//		}
		
		return null;
		
	}
}
