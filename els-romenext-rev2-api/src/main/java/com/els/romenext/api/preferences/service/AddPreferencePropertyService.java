package com.els.romenext.api.preferences.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.preferences.req.AddPreferencePropertyRequest;
import com.els.romenext.api.preferences.resp.AddPreferencePropertyResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypeProperty;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypePropertyValue;
import com.els.romenext.core.entity.flatstyle.Property;
import com.google.gson.Gson;


public class AddPreferencePropertyService {
	
	private static Logger log = Logger.getLogger(AddPreferencePropertyService.class);

	public Response runService( AddPreferencePropertyRequest req, Long metadataId ) {
		
		
		ResponseBuilder responseBuilder;
		
		if (metadataId == null || req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);		
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RomeTypeDao rtDao = new RomeTypeDao( req.namespace );
		
		
		RomeType rt = rtDao.get(req.getTypeId() );
		
		// check if the type exist
		if (rt == null) {
			log.error("Type Not Exists");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao(req.namespace );
		RomeGroupType groupType = rgtDao.findByGroupAndType( g,  rt );
		
		if( groupType == null ) {
			log.error("No permission found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// validate the properties?
		// 1. check to make sure the property being added isn't already added
		RomePreferenceGroupTypePropertyValueDao prefPropDao = new RomePreferenceGroupTypePropertyValueDao( req.namespace );
		RomePreferenceGroupTypePropertyDao prefDao = new RomePreferenceGroupTypePropertyDao( req.namespace );  
		
		List<RomePreferenceGroupTypeProperty> props = prefDao.findByRomeType( rt );
		Map<Long, RomePreferenceGroupTypeProperty> propsMap = new HashMap<>();
		
		for( RomePreferenceGroupTypeProperty p : props ) {
			propsMap.put( p.getId(),  p );
		}
		
		
		
		List<RomePreferenceGroupTypePropertyValue> prefValList = prefPropDao.findByRomeType( groupType );
		Map<Long, RomePreferenceGroupTypePropertyValue> prefValMap = new HashMap<>();
		
		// generate a map to make sure you are not doing multiple entries
		for( RomePreferenceGroupTypePropertyValue p : prefValList ) {
			// there better be no duplicates!!
			prefValMap.put( p.getRomePreferenceGroupTypeProperty().getId(),  p );
		}
		
		List<RomePreferenceGroupTypePropertyValue> inserts = new ArrayList<>();
		List<RomePreferenceGroupTypePropertyValue> updates = new ArrayList<>();
		
		for( Property p : req.getProperties() ) {
			
			// find the property that we need to connect this with
			String idString = p.getId();
			
			if( StringUtils.isEmpty( idString ) ) {
				// error?
				log.error("Found a preference property with no id set " + p );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PREFERENCE_NO_ID, null).getResponseBuilder();
				return responseBuilder.build();
			}
			
			Long propId = null;
			try {
				propId = Long.valueOf( idString );
			} catch(NumberFormatException nex ) {
				log.error("Found a preference property with id that could not be set to long " + p );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PREFERENCE_NO_ID, null).getResponseBuilder();
				return responseBuilder.build();
			}
			
			
			// if the property user is trying to add is ALREADY set, stop
			if( prefValMap.containsKey( propId ) ) {
				log.error("This property has already been set! " + p );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PREFERENCE_ALREADY_ADDED, null).getResponseBuilder();
				return responseBuilder.build();
			}
			
			if( !propsMap.containsKey( propId ) ) {
				// could not find this property??
				log.error("Found a preference property with id was unknown " + p );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PREFERENCE_UNKNOWN, null).getResponseBuilder();
				return responseBuilder.build();
			} 
			
			
			
			RomePreferenceGroupTypeProperty prop = propsMap.get( propId );
			
			RomePreferenceGroupTypePropertyValue newProp = new RomePreferenceGroupTypePropertyValue();
			newProp.setRomePreferenceGroupTypeProperty( prop );
			newProp.setRomeGroupType( groupType );
			newProp.setValue( p.getValue().toString() );
			inserts.add( newProp );
			
			
		}
		
		try {
			prefPropDao.getTransaction().begin();
			for (RomePreferenceGroupTypePropertyValue p : inserts) {
				prefPropDao.insert( p );
			}
			prefPropDao.getTransaction().commit();
		} catch (Exception e) {
			log.error("Failed to insert RomeTypeProp.", e);
			prefPropDao.getTransaction().rollback();
			return null;
		}
		
		
		
		// grab a new list
		List<RomePreferenceGroupTypePropertyValue> resultPrefs = prefPropDao.findByRomeType(groupType);
		List<Property> result = new ArrayList<Property>();
		
		for (RomePreferenceGroupTypePropertyValue p : resultPrefs) {
			
			Property newP = Property.build( p.getRomePreferenceGroupTypeProperty() );
			
			newP.setValue( p.getValue() );
			
			
			result.add( newP );
			
		}
		
		
		AddPreferencePropertyResponse response = new AddPreferencePropertyResponse();
		
		response.preferences = result;
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( response )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}
	
}
