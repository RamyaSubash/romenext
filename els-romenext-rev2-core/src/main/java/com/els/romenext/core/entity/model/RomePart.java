package com.els.romenext.core.entity.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.ModelProperty;
import com.els.romenext.core.db.entity.model.Part;

public class RomePart {

	public Long id;
	public Long modelId;
	public Long modelPropertyId;
	public String name;
	public Date createdDate;
	public Date modifiedDate;

	public String value;
	public Integer group;
	
	public RomePart() {
		
	}
	
	
	
	public RomePart(Long id, Long modelId, Long modelPropertyId, String name,
			Date createdDate, Date modifiedDate, String value, Integer group) {
		this.id = id;
		this.modelId = modelId;
		this.modelPropertyId = modelPropertyId;
		this.name = name;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.value = value;
		this.group = group;
	}



	public static RomePart convert( Part part ) {
		
		RomePart p = new RomePart();
		
		p.id = part.getId();
		p.modelId = part.getModel().getId();
		p.modelPropertyId = part.getModelProperty().getId();
		p.name = part.getName();
		p.createdDate = part.getCreatedDate();
		p.modifiedDate = part.getModifiedDate();
		p.value = part.getValue();
		
		p.group = part.getGroup();
		
		return p;
	}
	
	public static List<RomePart> convert( List<Part> parts ) {
		
		List<RomePart> cparts = new ArrayList<RomePart>();
		
		for( Part p : parts ) {
			cparts.add( RomePart.convert( p ) );
		}
		
		return cparts;
	}
	
	public static Part convert( RomePart r, Model m, ModelProperty modelProperty ) {
		Part p = new Part();
		
		p.setId( r.id );
		p.setCreatedDate( r.createdDate );
		p.setModifiedDate( r.modifiedDate );
		
		p.setGroup( r.group );
		p.setModel( m );
		p.setModelProperty(modelProperty);
		p.setName( r.name );
		p.setValue( r.value );
		
		return p;
	}
}
