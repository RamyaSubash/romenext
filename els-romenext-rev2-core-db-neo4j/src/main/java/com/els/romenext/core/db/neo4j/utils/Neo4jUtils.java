package com.els.romenext.core.db.neo4j.utils;

import java.util.HashMap;
import java.util.Map;

import com.els.romenext.core.db.neo4j.entity.Neo4jNode;


public class Neo4jUtils {
	
	public static final Long getMetadataIdFromNodeLabel( final String fullLabel ) {
		
		if( fullLabel == null || fullLabel.indexOf('_') < 0 ) {
			return null;
		}
		String metadataId_str = fullLabel.substring(1, fullLabel.indexOf('_'));
		
		Long metadataId = Long.valueOf( metadataId_str );
		return metadataId;
	}
	
	public static final Long getRepoIdFromNodeLabel( final String fullLabel ) {
		
		if( fullLabel == null || fullLabel.indexOf('_') < 0 ) {
			return null;
		}
		
		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
		String repoId_str = restLabel.substring(1, restLabel.indexOf('_'));
		
		Long repoId = Long.valueOf( repoId_str );
		
		return repoId;
		
	}
	
	public static final Long getTypeIdFromNodeLabel( final String fullLabel ) {
		if( fullLabel == null || fullLabel.indexOf('_') < 0 ) {
			return null;
		}
		
		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
		String lastLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
		String typeId_str = lastLabel.substring(1, lastLabel.length());
		
		Long typeId = Long.valueOf( typeId_str );
		
		return typeId;
	}
	
	public static final String buildNodeLabel( final Long metadataId, final Long repoId, final Long typeId) {

		if( typeId == null ) {
			return null;
		}
		
		if (metadataId == null) {
			return null;
		}
		
		if (repoId == null) {
			return null;
		}
		
		return "m" + metadataId.toString() + "_r" + repoId.toString() + "_t" + typeId.toString();
	}
	
	public static final void addModel( Neo4jNode node, Long modelId ) {
		
		if( modelId == null ) {
			return;
		}
		
		String toAdd = ( modelId != null ? modelId.toString() : null );
		
		node.getProperties().put( "model_id",  toAdd );
	}
	
	public static final void addPart( Neo4jNode node, Integer partId ) {
		
		if( partId == null ) {
			return;
		}
		
		String toAdd = ( partId != null ? partId.toString() : null );
		
		node.getProperties().put( "group_part_id",  toAdd );
	}
	
	public static final void addDefaultDeco( Neo4jNode node, Long decoId ) {
		
		if( decoId == null ) {
			return;
		}
		
		String toAdd = ( decoId != null ? decoId.toString() : null );
		
		node.getProperties().put( "default_decorator_id",  toAdd );
	}
	
	public static final void addUUID( Neo4jNode node, String uuid ) {
		
		if( uuid == null ) {
			return;
		}
		
		String toAdd = ( uuid != null ? uuid.toString() : null );
		
		node.getProperties().put( "uuid",  toAdd );
	}
	
	
	/**
	 * Not sure how this can work yet
	 * @param node
	 * @param props
	 */
	@Deprecated
	public static final void addGenericProperties( Neo4jNode node, Map<String,Object> props ) {
		if( props == null ) {
			return;
		}
		
		Map<String, Object> properties = node.getProperties();
		
		if( properties == null ) {
			properties = new HashMap<String, Object>();
		}
		
		for( String key : props.keySet() ) {
			
		}
		
	}
	
}
