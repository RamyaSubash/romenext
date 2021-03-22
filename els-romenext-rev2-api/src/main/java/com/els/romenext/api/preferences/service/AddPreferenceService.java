package com.els.romenext.api.preferences.service;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.preferences.req.AddPreferenceRequest;
import com.els.romenext.api.preferences.resp.AddPreferenceResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypeProperty;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.google.gson.Gson;

public class AddPreferenceService {
	
	private static Logger log = Logger.getLogger(AddPreferenceService.class);

	public Response runService( AddPreferenceRequest req, Long metadataId ) {
		
		
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
		
		// debugging
		RomeType fromSession = rtDao.getFromSession( RomeType.class , req.getTypeId() );
		
		System.out.println("From session =====================: " + fromSession );
		
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
		RomePreferenceGroupTypePropertyDao prefDao = new RomePreferenceGroupTypePropertyDao( req.namespace );  
		
		List<RomePreferenceGroupTypeProperty> props = prefDao.findByRomeType( rt );
		Map<Long, RomePreferenceGroupTypeProperty> propsMap = new HashMap<>();
		Set<String> nameCheck = new HashSet<String>();
		
		for( RomePreferenceGroupTypeProperty p : props ) {
			propsMap.put( p.getId(),  p );
			nameCheck.add( p.getName() );
		}
		
		// check to see if there is a new duplicate name
		for( Property p : req.getProperties() ) {
			if( nameCheck.contains( p.getName() )) {
				log.error("Duplicate name");
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PREFERENCE_CREATE_DUPLICATENAME, null).getResponseBuilder();
				return responseBuilder.build();
			} else {
				// if the nameCheck does not contain the name, we ADD it to the nameCheck to make sure the NEW names aren't duplicated either
				nameCheck.add( p.getName() );
			}
		}
		
		// if we get here, then all names are good
		
//		List<RomePreferenceGroupTypeProperty> inserts = new ArrayList<>();
//		
//		for( Property p : req.getProperties() ) {
//			RomePreferenceGroupTypeProperty prop = new RomePreferenceGroupTypeProperty();
//			
////			RomePreferenceGroupTypePropertyValue newProp = new RomePreferenceGroupTypePropertyValue();
//			prop.setRomePreferenceGroupTypeProperty( prop );
//			prop.setRomeGroupType( groupType );
//			prop.setValue( p.getValue().toString() );
//			
//			inserts.add( prop );
//		}
		
		

		
		List<RomePreferenceGroupTypeProperty> inserts = new ArrayList<>();
		List<RomePreferenceGroupTypeProperty> updates = new ArrayList<>();
		
		for( Property p : req.getProperties() ) {

			
			
			
			RomePreferenceGroupTypeProperty newProp = new RomePreferenceGroupTypeProperty();
			
			newProp.setCreatedDate( new Date() );
			newProp.setDefaultValue( p.getDefaultValue() );
			newProp.setDesign( true );
			newProp.setDisplay( true );
			newProp.setIsRequired( p.getIsMandatory() );
			newProp.setMaximumValue( p.getMaxValue() );
			newProp.setMinimumValue( p.getMinValue() );
			
			newProp.setModifiedDate( new Date() );
			newProp.setName( p.getName() );
			newProp.setPropertyType( ValueTypeEnum.convertToPreferencePropertyEnum( p.getPropertyTypeEnum() ) );
			newProp.setRomeType( rt );
			
			inserts.add( newProp );
			
			
		}
		
		try {
			prefDao.getTransaction().begin();
			for (RomePreferenceGroupTypeProperty p : inserts) {
				prefDao.insert( p );
			}
			prefDao.getTransaction().commit();
		} catch (Exception e) {
			log.error("Failed to insert RomeTypeProp.", e);
			prefDao.getTransaction().rollback();
			return null;
		}
		
		
		
		// grab a new list
		List<RomePreferenceGroupTypeProperty> resultPrefs = prefDao.findByRomeType( rt );
		List<Property> result = new ArrayList<Property>();
		
		for (RomePreferenceGroupTypeProperty p : resultPrefs) {
			
			Property newP = Property.build( p );
			
//			newP.setValue( p.getValue() );
			
			
			result.add( newP );
			
		}
		
		
		AddPreferenceResponse response = new AddPreferenceResponse();
		
		response.preferences = result;
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( response )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
	
//		return null;
	}
	
}
