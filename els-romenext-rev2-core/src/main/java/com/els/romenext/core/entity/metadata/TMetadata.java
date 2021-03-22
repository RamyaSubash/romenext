package com.els.romenext.core.entity.metadata;

import java.util.ArrayList;
import java.util.List;


public class TMetadata {
	public Long id;
	public String name;
	public List<TRepo> repos = new ArrayList<TRepo>();
	
	/**
	 * Little hacky but simply use the id of the metadata container as the hash code
	 */
	@Override
	public int hashCode() {
		return id.intValue();
	}
}
