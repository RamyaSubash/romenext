package com.els.romenext.core.db.neo4j.entity.property.search;

import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.search.SearchTypeEnum;

public class SearchNeo4jProperty extends Neo4jProperty {

	private SearchTypeEnum searchType;

	public SearchTypeEnum getSearchType() {
		return searchType;
	}

	public void setSearchType(SearchTypeEnum searchType) {
		this.searchType = searchType;
	}

	public SearchNeo4jProperty(Neo4jProperty p, SearchTypeEnum searchType) {
		super(p);
		this.searchType = searchType;
	}

	
}
