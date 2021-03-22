package com.els.romenext.api.node.resp; 

import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;

public class GetFromTypeResponse {

	private List<Node> nodes; 

	public List<Node> getTypes() {
		return nodes;
	} 
	
	public void build(List<Node> nodes ) {
		this.nodes = nodes; 
	}
}
