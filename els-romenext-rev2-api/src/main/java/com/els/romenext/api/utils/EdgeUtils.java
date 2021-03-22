package com.els.romenext.api.utils;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;

import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;

public class EdgeUtils {
	
	public static Relationship fixEdgeObjectForJsonResponse(Relationship edge) {
		
		if (edge != null) {
			
			edge.setOriginNode(NodeUtils.fixNodeObjectForJsonResponse(edge.getOriginNode()));
			edge.setDestinationNode(NodeUtils.fixNodeObjectForJsonResponse(edge.getDestinationNode()));
			
			if (MapUtils.isNotEmpty(edge.getRuleProperties())) {
				for (Property property : edge.getRuleProperties().values()) {
					property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
				}
			}
			
			if (MapUtils.isNotEmpty(edge.getSysProperties())) {
				for (Property property : edge.getSysProperties().values()) {
					property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
				}
			}
			
//			if (MapUtils.isNotEmpty(edge.getDecoProperties())) {
//				for (Property property : edge.getDecoProperties().values()) {
//					property = PropertyUtils.fixPropertyObjectForJsonResponse(property);
//				}
//			}
			
		}
		
		return edge;
	
	}
	
	public static List<Relationship> fixEdgeObjectListForJsonResponse(List<Relationship> edgeList) {
		
		if (CollectionUtils.isNotEmpty(edgeList)) {
			for (Relationship relationship : edgeList) {
				
				if (relationship != null) {
				
					relationship.setOriginNode(NodeUtils.fixNodeObjectForJsonResponse(relationship.getOriginNode()));
					relationship.setDestinationNode(NodeUtils.fixNodeObjectForJsonResponse(relationship.getDestinationNode()));
					
					if (MapUtils.isNotEmpty(relationship.getRuleProperties())) {
						for (Property property : relationship.getRuleProperties().values()) {
							property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
						}
					}
					
					if (MapUtils.isNotEmpty(relationship.getSysProperties())) {
						for (Property property : relationship.getSysProperties().values()) {
							property = PropertyJSONUtils.fixPropertyObjectForJsonResponse(property);
						}
					}
					
//					if (MapUtils.isNotEmpty(relationship.getDecoProperties())) {
//						for (Property property : relationship.getDecoProperties().values()) {
//							property = PropertyUtils.fixPropertyObjectForJsonResponse(property);
//						}
//					}
					
				}
				
			}
		}
		
		return edgeList;
		
	}
	
}
