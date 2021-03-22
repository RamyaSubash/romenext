package com.els.romenext.core.entity.flatstyle;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;

public class Path {
	
	private enum PathClassification{
		TYPE, INSTANCE 
	}
	
	public PathClassification pathClassification;

	public String name;							// this might be good?
	public List<Property> properties;			// Shaobo says this isn't being used

	@Deprecated
	public List<Node> nodes = new ArrayList<Node>();
	
	public List<Relationship> relationships = new ArrayList<Relationship>();
	
	public PathClassification getPathClassification() {
		return pathClassification;
	}
	
	public void setPathClassification(PathClassification pathClassification) {
		this.pathClassification = pathClassification;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public List<Property> getProperties() {
		return properties;
	}
	
	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}
	
	public List<Node> getNodes() {
		return nodes;
	}
	
	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}
	
	public List<Relationship> getRelationships() {
		return relationships;
	}
	
	public void setRelationships(List<Relationship> relationships) {
		this.relationships = relationships;
	}
	
	
	public static Path build( List<Relationship> rels) {
		
		Path path = new Path();
		
		if (  CollectionUtils.isEmpty(rels)) {
			
			return null;
			
		}
		
//		List<Node> nodes = new ArrayList<Node>();
//		nodes.addAll(startNodes);
//		nodes.addAll(endNodes);
//		List<String> ids = new ArrayList<String>();
//		
//	    for (int i = 0; i < nodes.size(); i++) {
//	    	
//	    	Node n = nodes.get(i); 	    	
//	    	String id = n.getId();
//	    		    	
//	    	if (ids.contains(id)) {
//	    		
//	    		nodes.remove(i);
//	    		i--;
//	    		
//	    	} else {
//	    		
//	    		ids.add(id);
//	    		
//	    	}
//	    	
//	    }
	    
	    
		List<Relationship> allRels = new ArrayList<Relationship>();
		allRels.addAll(rels);
		List<String> relIds = new ArrayList<String>();
		
	    for (int i = 0; i < allRels.size(); i++) {
	    	
	    	Relationship r = allRels.get(i); 	    	
	    	String id = r.getId();
	    		    	
	    	if (relIds.contains(id)) {
	    		
	    		allRels.remove(i);
	    		i--;
	    		
	    	} else {
	    		
	    		relIds.add(id);
	    		
	    	}
	    	
	    }
		
//		path.setNodes(nodes);
		path.setRelationships(allRels);
		
		return path;
		
	}


	public static Path build(List<Node> startNodes, List<Node> endNodes, List<Relationship> rels) {
		
		Path path = new Path();
		
		if (CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes) || CollectionUtils.isEmpty(rels)) {
			
			return null;
			
		}
		
		List<Node> nodes = new ArrayList<Node>();
		nodes.addAll(startNodes);
		nodes.addAll(endNodes);
		List<String> ids = new ArrayList<String>();
		
	    for (int i = 0; i < nodes.size(); i++) {
	    	
	    	Node n = nodes.get(i); 	    	
	    	String id = n.getId();
	    		    	
	    	if (ids.contains(id)) {
	    		
	    		nodes.remove(i);
	    		i--;
	    		
	    	} else {
	    		
	    		ids.add(id);
	    		
	    	}
	    	
	    }
	    
	    
		List<Relationship> allRels = new ArrayList<Relationship>();
		allRels.addAll(rels);
		List<String> relIds = new ArrayList<String>();
		
	    for (int i = 0; i < allRels.size(); i++) {
	    	
	    	Relationship r = allRels.get(i); 	    	
	    	String id = r.getId();
	    		    	
	    	if (relIds.contains(id)) {
	    		
	    		allRels.remove(i);
	    		i--;
	    		
	    	} else {
	    		
	    		relIds.add(id);
	    		
	    	}
	    	
	    }
		
		path.setNodes(nodes);
		path.setRelationships(allRels);
		
		return path;
		
	}

	@Override
	public String toString() {
		return "Path [pathClassification=" + pathClassification + ", name="
				+ name + ", properties=" + properties + ", nodes=" + nodes
				+ ", relationships=" + relationships + "]";
	}
	
//	public static Path build (List<Node> nodes) {
//		Path path = new Path();
//		path.setNodes(nodes);
//		return path;
//	}
	
	
	
}