package com.els.romenext.api.workspace.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;

public class WorkspaceTypeUtils {

	private static Logger log = Logger.getLogger( WorkspaceTypeUtils.class );
	private String namespace = null;
	
	public WorkspaceTypeUtils( String namespace ) {
		this.namespace = namespace;
	}
	
	/**
	 * Will retrieve the base workspace type. Will create one if none exists and will also check the properties.
	 * 
	 * @param md
	 * @return
	 */
	public RomeType getWorkspaceBaseType( MetadataContainer md  ) {
		
		RomeType workspace = this.addMissingWorkspaceType( md );
		
		this.addMissingProperties( workspace );
		
		return workspace;
		
	}
	
	public RomeType addMissingWorkspaceType( MetadataContainer md ) {
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		
		RomeType workspaceType = typeDao.findInternalTypeByName("_WORKSPACE");
		
		if( workspaceType == null ) {
			workspaceType = new RomeType();
			
			workspaceType.setClassification( RomeTypeClassificationEnum.WORKSPACE );
			workspaceType.setCreatedDate( new Date() );
			workspaceType.setIsInternal( true );
			workspaceType.setIsRootType( true );
			workspaceType.setMetadata( md );
			workspaceType.setModifiedDate( new Date() );
			workspaceType.setName( "_WORKSPACE" );
			workspaceType.setRestrictionStatus( TypeRestrictionStatusEnum.ROOTONLY );
			
			typeDao.getTransaction().begin();
			typeDao.insert( workspaceType );
			typeDao.getTransaction().commit();
			
			typeDao.refresh( workspaceType );
		}
		
		return workspaceType;
	}
	
	public RomeType addMissingProperties( RomeType workspaceType ) { 
		
		Set<String> expected = new HashSet<>(); 
		expected.add( "name" );
		expected.add( "usergroup" );
		expected.add( "backgroundImage" );
		
		expected.add( "width" );
		expected.add( "height" );

		
		// for the update, we do a check to see if all th eproperties are there		
		if( workspaceType.getFields() == null ) {
			workspaceType.setFields( new ArrayList<>() );;
		}
		
		for( RomeTypeProperty p : workspaceType.getFields() ) {
			
			if( expected.contains( p.getName() ) ) {
				expected.remove( p.getName() );
			}
			
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		
		List<RomeTypeProperty> toAddTypeProperty = new ArrayList<>();
		Date currentDate = new Date();

		for( String s : expected ) {
			
			if( "name".equalsIgnoreCase( s ) ) {
				RomeTypeProperty nameProp = new RomeTypeProperty();
				nameProp.setRomeType( workspaceType );
				nameProp.setName( "name" );
				nameProp.setPropertyType( RomeTypePropertyEnum.STRING );
				nameProp.setMaximumValue( null );
				nameProp.setMinimumValue( null );
				nameProp.setIsRequired( true );
				nameProp.setMustBeUnique( false );
				nameProp.setDefaultValue( null );
				nameProp.setCreatedDate(currentDate);
				nameProp.setModifiedDate(currentDate);
				
				toAddTypeProperty.add( nameProp );
			} else if( "usergroup".equalsIgnoreCase( s ) ) {
				RomeTypeProperty groupProp = new RomeTypeProperty();
				groupProp.setRomeType( workspaceType );
				groupProp.setName( "usergroup" );
				groupProp.setPropertyType( RomeTypePropertyEnum.STRING );
				groupProp.setMaximumValue( null );
				groupProp.setMinimumValue( null );
				groupProp.setIsRequired( true );
				groupProp.setMustBeUnique( false );
				groupProp.setDefaultValue( null );
				groupProp.setCreatedDate(currentDate);
				groupProp.setModifiedDate(currentDate);
				
				toAddTypeProperty.add( groupProp );

			} else if( "backgroundImage".equalsIgnoreCase( s ) ) {
				RomeTypeProperty backgroundImage = new RomeTypeProperty();
				backgroundImage.setRomeType( workspaceType );
				backgroundImage.setName( "backgroundImage" );
				backgroundImage.setPropertyType( RomeTypePropertyEnum.FILE );
				backgroundImage.setMaximumValue( null );
				backgroundImage.setMinimumValue( null );
				backgroundImage.setIsRequired( false );
				backgroundImage.setMustBeUnique( false );
				backgroundImage.setDefaultValue( null );
				backgroundImage.setCreatedDate(currentDate);
				backgroundImage.setModifiedDate(currentDate);
				
				toAddTypeProperty.add( backgroundImage );

			} else if( "width".equalsIgnoreCase( s ) ) {
				RomeTypeProperty width = new RomeTypeProperty();
				width.setRomeType( workspaceType );
				width.setName( "width" );
				width.setPropertyType( RomeTypePropertyEnum.DOUBLE );
				width.setMaximumValue( null );
				width.setMinimumValue( null );
				width.setIsRequired( false );
				width.setMustBeUnique( false );
				width.setDefaultValue( null );
				width.setCreatedDate(currentDate);
				width.setModifiedDate(currentDate);
				
				toAddTypeProperty.add( width );

			} else if( "height".equalsIgnoreCase( s ) ) {
				RomeTypeProperty height = new RomeTypeProperty();
				height.setRomeType( workspaceType );
				height.setName( "height" );
				height.setPropertyType( RomeTypePropertyEnum.DOUBLE );
				height.setMaximumValue( null );
				height.setMinimumValue( null );
				height.setIsRequired( false );
				height.setMustBeUnique( false );
				height.setDefaultValue( null );
				height.setCreatedDate(currentDate);
				height.setModifiedDate(currentDate);
				
				toAddTypeProperty.add( height );

			}
			
			if( toAddTypeProperty != null && toAddTypeProperty.size() > 0 ) {
				RomeTypePropertyDao rtpDao = new RomeTypePropertyDao( this.namespace );
				try {
					rtpDao.getTransaction().begin();
					
					for( RomeTypeProperty p : toAddTypeProperty ) {
						rtpDao.insert( p );							
					}
					rtpDao.getTransaction().commit();
				} catch (Exception e) {
					log.error("Failed to insert RomeTypeProp.", e);
					rtpDao.getTransaction().rollback();
				}
				
				typeDao.refresh( workspaceType );
			}
			
		}
		return workspaceType;
	}
}
