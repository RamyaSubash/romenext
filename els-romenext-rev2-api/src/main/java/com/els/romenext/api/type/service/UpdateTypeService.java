package com.els.romenext.api.type.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.UpdateTypeRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDecoratorPropertyValueDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.deco.RomeDecoratorClassification;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class UpdateTypeService {
	
	private static Logger log = Logger.getLogger(UpdateTypeService.class);
	
	public Response runService( UpdateTypeRequest req,  Long typeId, Long metaid ) {
		
		ResponseBuilder responseBuilder;
		
		
		
		
		
		
		
		
		
		
//		UserLogDao dao = new UserLogDao(req.namespace );
//		dao.getEntityManagerUtil().getSession().clear();
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		MetadataServices metadataService = new MetadataServices( req.namespace );
//		MetadataRepoContainer repo = metadataService.getMetadataRepoContainerById(repoId);
		
		
	
		
		MetadataContainerDao metaDao = new MetadataContainerDao( req.namespace );
		MetadataContainer metaId = metaDao.get( metaid );
		if (metaId == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		// note for deco properties, they are limited via groups, so we need to grab the group
		// grab it here so we fail first in case the group is not found
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		
		if( g == null ) {
			log.error("The GROUP to Updated Not Exist: " + typeId);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();		
		}
		
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );

		RomeType fromSession = typeDao.getFromSession( RomeType.class, typeId );
		System.out.println( "fromSession : " + fromSession );
		RomeType find = typeDao.getEntityManagerUtil().getEntityManager().find( RomeType.class, typeId );
		System.out.println( "find : " + find );
//		RomeType find2 = typeDao.getEntityManagerUtil().getSession().find( RomeType.class, typeId );
//		System.out.println( "find2 : " + find2 );
		
		typeDao.getTransaction().begin();
//		RomeType romeType = typeDao.get( typeId );
		typeDao.getTransaction().commit();
//		System.out.println( "romeType : " + romeType );
		
		// first check if the type to updated exists or not
		if(!coreServices.typeNodeExistsById(RomeNodeClassEnum.TYPE, typeId,  metaId.getId() )) {
			log.error("The Type to Updated Not Exist: " + typeId);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		RomeType oldType = typeDao.get( typeId );
		
		if( oldType == null ) {
			log.error("The Type to Updated Not Exist: " + typeId);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// sanity check, ensure this type can be modified by this user
		RomeGroupTypeDao groupTypeDao = new RomeGroupTypeDao( req.namespace );
		RomeGroupType groupType = groupTypeDao.findByGroupAndType( g,  oldType );
		
		if( groupType == null ) {
			// this user does not have access to this type!!
			log.error("The user does not have access to this type!: " + typeId);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}

		// if we get here, 
		// 1. they have a proper group that exists
		// 2. they have a type that exists
		// 3. the type and group exist together
		


		
		
		// check if the new name occupied
		if ( req.getNode().getName() != null && !oldType.getName().equalsIgnoreCase( req.getNode().getName() )) {
			if(coreServices.checkIfNameExists( RomeNodeClassEnum.TYPE, req.getNode().getName(), metaId.getId() )) {
				log.error("The New Type Name Has Been Occupied: " + req.getNode().getName() );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE, null).getResponseBuilder();
				return responseBuilder.build();
			} else {
				// update the name
				
				oldType.setName( req.getNode().getName() );;
				
				// update just this?
				typeDao.getTransaction().begin();
				typeDao.save( oldType );
				typeDao.getTransaction().commit();
				
				typeDao.refresh( oldType );;
			}
		}
		
		// do we need to update anything else for type?
		
		
		if( req.getNode().getProperties() != null ) {
			
			for( Property p : req.getNode().getProperties() ) {
				
				if( p.getId() != null ) {
					// can only update properties with propids set
					Long id = Long.valueOf( p.getId() );
					coreServices.updateTypeProperty( id, p );
				}
				
			}
		}
		
		typeDao.refresh( oldType );
		
		// update deco properties?
		/**
		 * Deco update section.
		 * 
		 * NOTE: If a deco property is found here, it is ONLY doing a few things:
		 * 1. Updating the deco property of the type with new properties or characteristics. ie. changing X to be FLOAT from INT
		 * 2. Updating the VALUE of the given type.
		 * 
		 * In the case of #2, 
		 * Depending on what it is updating (which decorator), it needs to be stored in a specific place.
		 * 
		 * for now:
		 * TYPE -> LOGICAL DESIGN
		 * ENTERS : els_romenext_deco_properties
		 * 
		 * TYPE -> PHYSICAL
		 * ENTERS : els_romenext_deco_model
		 * 
		 * INSTANCE -> LOGICAL DESIGN
		 * ENTERS : on the actual nodes
		 * 
		 * 
		 * 
		 * 
		 */
		if( req.getNode().getDecoProperties() != null ) {
			
			// we define the RomeDeco here as the TYPE/LOGICAL deco
			RomeDecoratorDao decoDao = new RomeDecoratorDao( req.namespace );
			
			List<RomeDecorator> decos = decoDao.findByClassification( RomeDecoratorClassification.TYPE, "LOGICALGROUP" );
			RomeDecorator deco = null;
			// should only be 1
			if( decos == null ) {
				// this is an error
			} else if( decos.size() != 1 ) {
				// error
			} else {
				deco = decos.get( 0 );
			}
			
			List<RomeDecoratorProperty> fields = deco.getFields();
			Map<Long, RomeDecoratorProperty> decoPropMap = new HashMap<>();
			
			for( RomeDecoratorProperty p : fields ) {
				decoPropMap.put( p.getId(),  p );
			}
			
			
			
			// now lets look at the deco properties passed in
			List<Property> decoProperties = req.getNode().getDecoProperties();
			
			
			// get the current TYPE deco properties
			RomeTypeDecoratorPropertyValueDao typeDecoPropDao = new RomeTypeDecoratorPropertyValueDao( req.namespace );
			List<RomeTypeDecoratorPropertyValue> allGroupDecoProps = typeDecoPropDao.findBy( groupType );			
			Map<Long, RomeTypeDecoratorPropertyValue> groupDecoPropMap = new HashMap<>();
			
			// order by deco prop ids
			for( RomeTypeDecoratorPropertyValue p : allGroupDecoProps ) {
				groupDecoPropMap.put( p.getRomeDecoratorProperty().getId(), p );
			}
			
			
			List<RomeTypeDecoratorPropertyValue> toUpdate = new ArrayList<RomeTypeDecoratorPropertyValue>();
			List<RomeTypeDecoratorPropertyValue> toAdd = new ArrayList<RomeTypeDecoratorPropertyValue>();

			for( Property p : decoProperties ) {

				
				// update any changes to the actual deco property?
				// BUT: This should not be done via a type to type operation
				// this should be done via a DECORATOR API call!!!
				// So we assume that this is JUST updating the TYPE deco property here!
				
				// if there is a value, change value
				
				// match up the deco id props
				String propId = p.getId();
				if( propId == null ) {
					// nothing we can do here?
				} else {
					
					// parse this for the deco prop id
					Long tmpDecoPropId = Long.valueOf( propId );
					
					if( tmpDecoPropId == null ) {
						// nothing we can do again????
					} else {
						
						// sanity check, make sure this property even exists for the current decorator
						if( !decoPropMap.containsKey( tmpDecoPropId ) ) {
							// skip???
							log.error("WARNING: We found a deco prop id that was not found in the ORIGINAL deco property table!![" + tmpDecoPropId + "]");
							continue;
						}
						
						// try to find the old value
						RomeTypeDecoratorPropertyValue tmpDecoTypeProp = groupDecoPropMap.get( tmpDecoPropId );
						
						if( tmpDecoTypeProp  == null ) {
							/** 
							 * if this is null
							 * Since we do a sanity check before this, we know this property actually exists
							 * So 
							 * We CREATE a new entity for this!
							 */
							RomeDecoratorProperty romeDecoratorProperty = decoPropMap.get( tmpDecoPropId );
							
							tmpDecoTypeProp = new RomeTypeDecoratorPropertyValue();
							tmpDecoTypeProp.setRomeGroupType( groupType );
							tmpDecoTypeProp.setRomeType( groupType.getRomeType() );
							tmpDecoTypeProp.setValue( p.getValue().toString() );
							tmpDecoTypeProp.setRomeDecoratorProperty( romeDecoratorProperty );
							toAdd.add( tmpDecoTypeProp );
							
						} else {
							tmpDecoTypeProp.setValue( p.getValue().toString() );
							toUpdate.add( tmpDecoTypeProp );
							
						}
						
						
					}
					
				}
			}
			
			typeDecoPropDao.getTransaction().begin();
			// update all the properties that need updating
			for( RomeTypeDecoratorPropertyValue p : toUpdate ) {
				typeDecoPropDao.save( p );
			}
			// add all the new properties
			for( RomeTypeDecoratorPropertyValue p : toAdd ) {
				typeDecoPropDao.insert( p );;
			}
			typeDecoPropDao.getTransaction().commit();
			
			
			
			
		}
		
		
		
		
//		if( req.getNode().getDecoProperties() != null ) {
//			Map<String, Property> decoProperties = req.getNode().getDecoProperties();
//			
//			for( Property p : decoProperties.values() ) {
//				
//				if( p.getId() != null ) {
//					// can only update properties with propids set
//					Long id = Long.valueOf( p.getId() );
//					coreServices.updateTypeProperty( id, p );
//					coreServices
//				}
//				
//			}
//		}
//		
//		List<Pair> properties = req.getProperties();
//		Node type = null;
//		
//		if (req.getProperties() != null) {
//			
//			for (Pair property : properties) {
//		
//				// first check if the type property to updated exists or not
////				if(!coreServices.typeNodePropertyExistsById(RomeNodeClassEnum.TYPE, typeId, property.getPropertyId(), repo.getMetadata().getId())) {
////					log.error("The Type Property to Updated Not Exist: " + property.getPropertyId());
////					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_PROPERTY_FOUND, null).getResponseBuilder();
////					return responseBuilder.build();
////				}
//				
//				// check if the new name occupied
////				if (!property.getCurName().equals(property.getProperty().getName())) {
////					if(coreServices.typeNodePropertyExists(RomeNodeClassEnum.TYPE, typeName, property.getProperty().getName(), repo.getMetadata().getId())) {
////						log.error("The New Type Property's Name Has Been Occupied:" + property.getProperty().getName());
////						responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.TYPE_PROPERTY_ALREADY_EXISTS, null).getResponseBuilder();
////						return responseBuilder.build();
////					}
////				}
//				
//				// TODO: real logic needed
////				type = coreServices.updatePropertyOfTypeNode(RomeNodeClassEnum.TYPE, typeName, property.getCurName(), property.getProperty(), repo.getMetadata().getId());
//				type = coreServices.updateTypeProperty(Long.parseLong(property.getPropertyId()), property.getProperty());
//
//				if (type == null) {
//					log.error("Failed to Update Type Properties!");
//					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ADD_PROPERTY_FAILED, null).getResponseBuilder();
//					return responseBuilder.build();
//				}
//			}
//		}
//		
//		// TODO: real logic needed
//		type = coreServices.updateType(typeId, req.getName(), req.getIsRoot(), req.getDecorators());
		
//		if (oldType == null) {
//			log.error("Failed to Update Type!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.UPATE_TYPE_FAILED, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		// convert oldType to json
		NodeBuilder builder = new NodeBuilder( req.namespace );
		Node node = builder.build( oldType ); 
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( node )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}


}
