package com.els.romenext.api.node.resp;

import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Relationship;

public class GetAllNodesAndEdgesResponse {

	private List<Node> nodes;
	private List<Relationship> edges;

	public List<Node> getTypes() {
		return nodes;
	}

	public List<Relationship> getConnections() {
		return edges;
	}

	public void build(List<Node> nodes, List<Relationship> edges) {
		this.nodes = nodes;
		this.edges = edges;
	}
}
