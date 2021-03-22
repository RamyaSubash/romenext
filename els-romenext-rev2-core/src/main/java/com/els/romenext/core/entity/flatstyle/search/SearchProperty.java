package com.els.romenext.core.entity.flatstyle.search;

import com.els.romenext.core.db.neo4j.enums.search.SearchTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class SearchProperty extends Property {

	private SearchTypeEnum searchType;

	public SearchProperty(Property p, SearchTypeEnum searchType) {
		super(p);
		this.searchType = searchType;
	}

	public SearchTypeEnum getSearchType() {
		return searchType;
	}

	public void setSearchType(SearchTypeEnum searchType) {
		this.searchType = searchType;
	}
	
	
}
