package com.els.romenext.core.entity.flatstyle;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;

/**
 * Note: This is really to represent a disconnected graph. For connected graphs, you can use this if it's not fully connected, but using a PATH for a fully connected graph is more correct.
 * 
 * @author jplee
 *
 */
public class Graph {
	
	private enum GraphClassification{
		TYPE, INSTANCE 
	}
	
	public GraphClassification graphClassification;

	public String name;							// this might be good?
	public List<Property> properties;			// Shaobo says this isn't being used

	// Nodes will only hold orphaned nodes, this should NOT include any nodes that are connected
	public List<Node> nodes = new ArrayList<Node>();
	public List<Relationship> relationships = new ArrayList<Relationship>();
	
	public GraphClassification getGraphClassification() {
		return graphClassification;
	}
	
	public void setGraphClassification(GraphClassification graphClassification) {
		this.graphClassification = graphClassification;
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
	
	
	public static Graph build( List<Relationship> rels) {
		
		Graph path = new Graph();
		
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


	public static Graph build(List<Node> startNodes, List<Node> endNodes, List<Relationship> rels) {
		
		Graph path = new Graph();
		
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
		return "Graph [pathClassification=" + graphClassification + ", name="
				+ name + ", properties=" + properties + ", nodes=" + nodes
				+ ", relationships=" + relationships + "]";
	}
	
//	public static Graph build (List<Node> nodes) {
//		Graph path = new Graph();
//		path.setNodes(nodes);
//		return path;
//	}
	
	
	
}