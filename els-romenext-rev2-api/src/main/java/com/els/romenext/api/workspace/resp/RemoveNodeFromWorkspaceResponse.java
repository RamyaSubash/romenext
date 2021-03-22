package com.els.romenext.api.workspace.resp; 

import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Relationship;

public class RemoveNodeFromWorkspaceResponse {

	private Node workspace;
	private List<Node> nodes;
	private List<Relationship> edges;
	
	public List<Node> getTypes() {
		return nodes;
	}

	public List<Relationship> getConnections() {
		return edges;
	}

	
	
	public Node getWorkspace() {
		return workspace;
	}
	
	

	public void build( Node workspace, List<Node> nodes, List<Relationship> edges) {
		this.workspace = workspace;
		this.nodes = nodes;
		this.edges = edges;
	}
	
}
