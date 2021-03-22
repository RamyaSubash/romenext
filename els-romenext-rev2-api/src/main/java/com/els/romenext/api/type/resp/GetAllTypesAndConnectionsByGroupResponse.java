package com.els.romenext.api.type.resp;

import java.util.Collection;
import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Relationship;

public class GetAllTypesAndConnectionsByGroupResponse {

	private Collection<Node> types;
	private List<Relationship> connections;
	
	public Collection<Node> getTypes() {
		return types;
	}

	public List<Relationship> getConnections() {
		return connections;
	}

	public void build(Collection<Node> types, List<Relationship> connections) {
		this.types = types;
		this.connections = connections;
	}
	
}
