package com.els.romenext.api.type.service; 

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.DeleteTypeRequest;
import com.els.romenext.api.type.req.UpdateTypeRequest;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDecoratorPropertyValueDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypeProperty;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypePropertyValue;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.metadata.MetadataServices;

public class DeleteTypeService {
	
	private static Logger log = Logger.getLogger(DeleteTypeService.class);
	
	public Response runService( DeleteTypeRequest req, Long metaid ) {
		
		ResponseBuilder responseBuilder;
		
		
		 
		
		
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
			log.error("The GROUP to Updated Not Exist: " + req.getTypeId() );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();		
		}
		
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		
		
		
		
		
		
		List<MetadataRepoContainer> repos = metadataService.getAllMetadataRepos();
		
		
		
		
		/**
		 * We need to check to see if any nodes were currently attached to this node
		 */
		
		
		
		
		
		
		
		// first check if the type to updated exists or not
		if(!coreServices.typeNodeExistsById(RomeNodeClassEnum.TYPE, req.getTypeId(),  metaId.getId() )) {
			log.error("The Type to Updated Not Exist: " + req.getTypeId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		RomeType toDeleteType = typeDao.get( req.getTypeId() );
		
		if( toDeleteType == null ) {
			log.error("The Type to Updated Not Exist: " + req.getTypeId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		// sanity check, ensure this type can be modified by this user
		RomeGroupTypeDao groupTypeDao = new RomeGroupTypeDao( req.namespace );
		RomeGroupType groupType = groupTypeDao.findByGroupAndType( g,  toDeleteType );
		
		if( groupType == null ) {
			// this user does not have access to this type!!
			log.error("The user does not have access to this type!: " + req.getTypeId());
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}

		/**
		 * Delete process:
		 * 
		 * 1. Delete from teh preference property table RomePreferenceGroupTypePropertyValue
		 * 2. Delete from the preference table any assigned preferences RomePreferenceGroupTypeProperty
		 * 3. RomeTypeDecoratorPropertyValue
		 * 4. RomeTypeRomeDecorator
		 * 5. RomeGroupType 
		 * 6. RomeType
		 * 
		 * 
		 * 
		 * 
		 * 
		 * 1. Delete from els_romenext_mysql_group_type table
		 * 
		 * 
		 * els_romenext_pref_grouptype_property
		 * 2. Delete decos props : els_romenext_type_decorator_property_value
		 * 3. Delete decos assigned to this type: els_romenext_types_els_romenext_decos
		 * 
		 * 
		 * Delete ALL RULE/CONNECTIONS attached to this.
		 * Delete all properties
		 * Delete all els_romenext_type_properties
		 * delete all deco properties els_romenext_type_decorator_property_value
		 * DELETE TYPE
		 */
		
		
		// for now if any rules/coonections or properties exist, just fail, only allow the base case
		RomeConnectionDao connDao = new RomeConnectionDao( req.namespace );
		List<RomeConnection> startConn = connDao.findByStartRomeType( toDeleteType, metaId );
		List<RomeConnection> endConn = connDao.findByEndType(toDeleteType, metaId);
		
		
		typeDao.getTransaction().begin();
		
		
		RomePreferenceGroupTypePropertyValueDao prefPopDao = new RomePreferenceGroupTypePropertyValueDao( req.namespace );
		List<RomePreferenceGroupTypePropertyValue> prefPropss = prefPopDao.findByRomeType( groupType );

		
//		prefPopDao.getTransaction().begin();
		for( RomePreferenceGroupTypePropertyValue p : prefPropss ) {
			// delete all prefs
			prefPopDao.delete( p );
		}
//		prefPopDao.getTransaction().commit();
		
		// need to delete the pref assigned to this type if it exsists
		RomePreferenceGroupTypePropertyDao prefDao = new RomePreferenceGroupTypePropertyDao( req.namespace );
		List<RomePreferenceGroupTypeProperty> prefs = prefDao.findByRomeType( toDeleteType );
		
//		prefDao.getTransaction().begin();
		for( RomePreferenceGroupTypeProperty p : prefs ) {
			prefDao.delete( p );
		}
//		prefDao.getTransaction().commit();
		
		
		
		// els_romenext_pref_grouptype_property_value
		RomeTypeDecoratorPropertyValueDao decoPropDao = new RomeTypeDecoratorPropertyValueDao( req.namespace );
		List<RomeTypeDecoratorPropertyValue> decoProps = decoPropDao.findBy( groupType );
		
//		decoPropDao.getTransaction().begin();
		for( RomeTypeDecoratorPropertyValue d : decoProps ) {
			decoPropDao.delete( d );			
		}
//		decoPropDao.getTransaction().commit();
		
		
		RomeTypeRomeDecoratorDao decoDao = new RomeTypeRomeDecoratorDao( req.namespace );
		List<RomeTypeRomeDecorator> decos = decoDao.findByRomeType( toDeleteType );
//		decoDao.getTransaction().begin();
		for( RomeTypeRomeDecorator d : decos ) {
			decoDao.delete( d );
		}
//		decoDao.getTransaction().commit();
		
//		groupTypeDao.getTransaction().begin();
		groupTypeDao.delete( groupType );
//		groupTypeDao.getTransaction().commit();
		
	
		
		
//		typeDao.getTransaction().begin();
		typeDao.delete( toDeleteType );
		typeDao.getTransaction().commit();
		 
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity( true ).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}


}
