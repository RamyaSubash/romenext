package com.els.romenext.api.workspace.resp;

import java.util.List;

import com.els.romenext.core.entity.flatstyle.Node;

public class GetAllWorkspaceResponse {

	private List<Node> workspaces;
	

	
	public  List<Node> getWorkspaces() {
		return workspaces;
	}
	
	

	public void build( List<Node>  workspaces ) {
		this.workspaces = workspaces;
	}
}
