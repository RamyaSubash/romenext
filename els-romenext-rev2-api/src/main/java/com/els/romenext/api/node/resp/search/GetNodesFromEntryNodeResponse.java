package com.els.romenext.api.node.resp.search;

import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;

public class GetNodesFromEntryNodeResponse {
	
	List<Node> nodes;
	
	public void build(List<Node> nodes) {
		this.nodes = nodes;
	}

}
