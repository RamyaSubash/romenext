package com.els.romenext.api.dct.resp;

import java.util.Collection;
import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Relationship;

public class GetAllDCTAndConnectionsByGroupResponse {

	private Collection<Node> dcts;
	private Collection<Relationship> connections;
	


	public Collection<Node> getDcts() {
		return dcts;
	}


	public Collection<Relationship> getConnections() {
		return connections;
	}


	public void build(Collection<Node> dcts, Collection<Relationship> connections) {
		this.dcts = dcts;
		this.connections = connections;
	}
	
}
