package com.els.romenext.core.db.neo4j.dao.util.core;

import java.util.List;

import com.els.romenext.core.db.neo4j.entity.INeo4jParsable;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.utils.internal.property.file.ImageCacheUtils;

public class PostProcessorUtils<T extends INeo4jParsable<T>>{

	
	public void post( T o ) {
		if( o instanceof Neo4jNode ) {
			Neo4jNode node = (Neo4jNode) o;
			
			// file caching
//			ImageCacheUtils utils = new ImageCacheUtils();
//			utils.getCacheImg( node );		
			
		} else if( o instanceof Neo4jRelationship ) {
			Neo4jRelationship rel = (Neo4jRelationship) o;
			
			// file caching
//			ImageCacheUtils utils = new ImageCacheUtils();
//			utils.getCacheImg( rel );		
		} else {
			System.out.println("FAILED TO FIND AN APPROPRIATE TYPE?: " + o );
		}
		
		
	}
	
	public void post( List<T> o ) {
		
		if( o == null ) {
			return;
		}
		
		for( T t : o ) {
			this.post( t );
		}
	}
}
