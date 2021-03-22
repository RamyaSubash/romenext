package com.els.romenext.core.util;

import java.util.List;

import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;

public class RomeUnifiedType {

	private RomeType type;
	private List<RomeConnection> childrens;
	private List<RomeConnection> parents;
	
	public RomeType getType() {
		return type;
	}
	public void setType(RomeType type) {
		this.type = type;
	}
	public List<RomeConnection> getChildrens() {
		return childrens;
	}
	public void setChildrens(List<RomeConnection> childrens) {
		this.childrens = childrens;
	}
	public List<RomeConnection> getParents() {
		return parents;
	}
	public void setParents(List<RomeConnection> parents) {
		this.parents = parents;
	}
	
	
	
}
