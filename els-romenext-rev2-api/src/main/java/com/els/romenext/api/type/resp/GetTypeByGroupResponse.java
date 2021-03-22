package com.els.romenext.api.type.resp;

import com.els.romenext.core.entity.flatstyle.Node;

public class GetTypeByGroupResponse {

	private Node type;
	
	public void build( Node  type) {
		this.type = type;
	}
	
}
