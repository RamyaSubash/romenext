package com.els.romenext.core.entity.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.els.romenext.core.db.entity.model.ModelProperty;

public class RomeModelProperty {

	public Long id;
	public Long modelId;
	public String name;
	public Date createdDate;
	public Date modifiedDate;
	public int propertyType;			// ??? What is this used for
	public String minimumValue;
	public String maximumValue;
	public String defaultValue;
	public Boolean isRequired;
	public Boolean mustBeUnique;
	public Long romeTypePropertyId;
	public Integer parentChild;
	
	public Integer propertyModifierType;
	public Integer propertyPositionType;
	
	public static RomeModelProperty convert( ModelProperty property ) {
		
		RomeModelProperty p = new RomeModelProperty();
		
		p.id = property.getId();
		p.modelId = property.getModel().getId();
		p.name = property.getName();
		p.createdDate = property.getCreatedDate();
		p.modifiedDate = property.getModifiedDate();
		p.propertyType = property.getPropertyType();
		p.minimumValue = property.getMinimumValue();
		p.maximumValue = property.getMaximumValue();
		p.defaultValue = property.getDefaultValue();
		p.isRequired = property.getIsRequired();
		p.mustBeUnique = property.getMustBeUnique();
		p.romeTypePropertyId = ( property.getRomeTypeProperty() == null ? null : property.getRomeTypeProperty().getId() );
		p.parentChild = property.getParentChild();
		
		p.propertyModifierType = property.getPropertyModifierType();
		p.propertyPositionType = property.getPropertyPositionType();
		
		return p;
	}
	
	public static List<RomeModelProperty> convert( List<ModelProperty> props ) {
		
		List<RomeModelProperty> cprops = new ArrayList<RomeModelProperty>();
		
		for( ModelProperty p : props ) {
			cprops.add( RomeModelProperty.convert( p ) );
		}
		
		return cprops;
	}
}
