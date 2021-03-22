package com.els.romenext.core.util.neo4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.RomeTypeLabelUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;

public class Neo4jNodeUtils {
	
	private static Logger logger = Logger.getLogger( Neo4jNodeUtils.class );

	public static Neo4jNode build( String namespace, RomeType type, MetadataRepoContainer metadataRepo  ) {
		if (type == null) {
			logger.error("No type Found");
			return null;
		}
		
		NodeUtils utils = new NodeUtils( namespace );
		NodeBuilder builder = new NodeBuilder( namespace );

		Node node = builder.build( type );

		return Neo4jNodeUtils.build( node, metadataRepo );
	}
	
	public static Neo4jNode build( Node node, MetadataRepoContainer metadataRepo  ) {
		if (node == null) {
			logger.error("No Node Found");
			return null;
		}
        
		if (!node.hasTypeId()) {
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
		
		
		String label = RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  node.getTypeId() );
		
		
		Map<String,Neo4jProperty> movedProps = new HashMap<String, Neo4jProperty>();
		
		if (node.hasProperties()) {
			
			for (Property id : node.getTypeProperties().values() ) {
				
				if (id != null) {
					
					Neo4jProperty convert = Neo4jPropertyUtil.convert( id, Neo4jPropertyTypeEnum.TYPE );
					movedProps.put( convert.getInternalPropertyName(),  convert  );
				}
			}
		}
		
		Map<String,Neo4jProperty> systemProps = new HashMap<String, Neo4jProperty>();

		if( node.hasSystemProperties() ) {
			for (Property id : node.getSysProperties().values() ) {
				
				if (id != null) {
					
					Neo4jProperty convert = Neo4jPropertyUtil.convert( id, Neo4jPropertyTypeEnum.SYSTEM );
					systemProps.put( convert.getInternalPropertyName(),  convert  );
				}
			}
		}
		
		Map<String,Neo4jProperty> decoProps = new HashMap<String, Neo4jProperty>();

		if( node.hasDecoProperties() ) {
			for (Property id : node.getDecoProperties().values() ) {
				
				if (id != null && id.hasRomeDecoPropId() ) {
					Neo4jProperty convert = Neo4jPropertyUtil.convert( id, Neo4jPropertyTypeEnum.DECORATOR );
					decoProps.put( convert.getInternalPropertyName(),  convert  );
				}
			}
		}
		
		Map<String,Neo4jProperty> prefProps = new HashMap<String, Neo4jProperty>();
		if( node.hasPrefProperties() ) {
			for (Property id : node.getPrefProperties().values() ) {
				
				if (id != null) {
					
					Neo4jProperty convert = Neo4jPropertyUtil.convert( id, Neo4jPropertyTypeEnum.PREFERENCE );
					movedProps.put( convert.getInternalPropertyName(),  convert  );
				}
			}


//			for (Property id : node.getPrefProperties().values() ) {
//				
//				if (id != null && id.hasRomeDecoPropId() ) {
//					Neo4jProperty convert = Neo4jPropertyUtil.convert( id, Neo4jPropertyTypeEnum.DECORATOR );
//					decoProps.put( convert.getInternalPropertyName(),  convert  );
//				}
//			}
		}
		
		
//		Map<String, Neo4jProperty> decoProps = new HashMap<String, Neo4jProperty>() ;
//
//		if (node.hasDecoProperties()) {
//			
//			for (Property prop : node.getDecoProperties()) {
//				
//				if (prop != null) {
//					
//					if (prop.hasName() && prop.hasValue() && prop.hasRomeDecoPropId()) {
//						
//						Neo4jProperty convert = Neo4jPropertyUtil.convert( prop, Neo4jPropertyTypeEnum.DECORATOR );
//						movedProps.put( convert.getInternalPropertyName(),  convert  );
//						
////						propsMap.put("d" + prop.getRomeDecoPropId() + "_" + prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
	
		// Create new neo4j node
		Neo4jNode inputNode = new Neo4jNode();
		List<String> labels = new ArrayList<String>();
		labels.add(label);
		inputNode.setLabels(labels);
		
		inputNode.setTypedProperties(movedProps);
		inputNode.setSystemProperties(systemProps);
		inputNode.setDecoProperties(decoProps);
		
		return inputNode;
	}
}
