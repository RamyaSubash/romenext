package com.els.romenext.api.metadata.resp;

import java.util.List;

import com.els.romenext.core.db.entity.MetadataRepoContainer;

public class GetAllReposByMetadataResponse {
	
	private List<MetadataRepoContainer> repos;
	
	public void build(List<MetadataRepoContainer> repos) {
		this.repos = repos;
	}

}
