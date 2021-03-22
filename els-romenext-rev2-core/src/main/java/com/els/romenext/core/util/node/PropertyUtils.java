package com.els.romenext.core.util.node;

import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;

public class PropertyUtils {

	public String buildPropertyKey(String typePropertyId) {
		
		if (StringUtils.isBlank(typePropertyId)) {
			return null;
		}
		
		return "tp" + typePropertyId;
	
	}
	
	public static Property convert( Neo4jProperty property ) {
		
		if( property == null ) {
			return null;
		}
		
		Property p = new Property();
		
		Neo4jProperty neoProp = new Neo4jProperty();
		
		/**
		 * TODO: Do we want to change the internal id based on the given type?
		 * here?
		 */
		p.setId( property.getInternalPropertyName() );
		p.setName( property.getName() );
		Neo4jPropertyEnum type = property.getType();
		
		ValueTypeEnum convertedType = ValueTypeEnum.convert( type );
		
		if( convertedType == null ) {
			System.out.println("FAILED TO FIND THIS PROPETY TYPE : " + type );
		}
		p.setPropertyType( convertedType );
		
//		if( type == Neo4jPropertyEnum.STRING ) {
//			p.setPropertyType( ValueTypeEnum.STRING );			
//		} else if( type == Neo4jPropertyEnum.NUMERIC ) {
//			p.setPropertyType( ValueTypeEnum.INTEGER );			
//		} else if( type == Neo4jPropertyEnum.BOOLEAN ) {
//			p.setPropertyType( ValueTypeEnum.BOOLEAN  );			
//		} else if( type == Neo4jPropertyEnum.DECIMAL ) {
//			p.setPropertyType( ValueTypeEnum.DOUBLE );			
//		} else if( type == Neo4jPropertyEnum.DATE ) {
//			p.setPropertyType( ValueTypeEnum.DATE );			
//		} else {
//			// This needs to be added
//			System.out.println("FAILED TO FIND THIS PROPETY TYPE : " + type );
//		}
		p.setValue( property.getValue() );
		
		return p;

	}
	
	public static Property generateProperty( RomeNodeSystemPropertyEnum enumType, Object value ) {
		
		Property p = Property.build( enumType.getValueType() , ValueTypeEnum.convert( enumType.getNeo4jType() ).getValueType(), null, null, value, null, null, null, null);
		p.setId( enumType.getValueType() );
		
		return p;
	}
	
	
}
