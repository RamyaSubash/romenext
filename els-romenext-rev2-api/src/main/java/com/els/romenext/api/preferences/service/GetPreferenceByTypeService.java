package com.els.romenext.api.preferences.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.preferences.req.GetPreferenceByTypeRequest;
import com.els.romenext.api.preferences.resp.GetPreferenceByTypeResponse;
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
import com.google.gson.Gson;

public class GetPreferenceByTypeService {
	
	private static Logger log = Logger.getLogger(GetPreferenceByTypeService.class);
	
	public Response runService( GetPreferenceByTypeRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		
		mcDao.getTransaction().begin();
		mcDao.getTransaction().commit();
		
		MetadataContainer mc = mcDao.get(metadataId);	
		
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName(  req.grouphost, req.groupname );
		
		// find the type
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		RomeType romeType = typeDao.get( req.getTypeId() );
		
		
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao( req.namespace );
		RomeGroupType groupType = rgtDao.findByGroupAndType( g, romeType );
		
		if( groupType == null ) {
			log.error("No permission found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		RomePreferenceGroupTypePropertyDao prefDao = new RomePreferenceGroupTypePropertyDao( req.namespace );
		
		List<RomePreferenceGroupTypeProperty> foundPrefs = prefDao.findByRomeType( romeType );
		
		
		
		// grab the preference
//		RomePreferenceGroupTypePropertyValueDao prefDao = new RomePreferenceGroupTypePropertyValueDao( namespace );
		
//		List<RomePreferenceGroupTypePropertyValue> prefs = prefDao.findByRomeType(groupType);
		
		
		
		List<Property> result = new ArrayList<Property>();
		
		for (RomePreferenceGroupTypeProperty p : foundPrefs) {
			
			Property newP = Property.build( p );
//			newP.setValue( p.getValue() );
			result.add( newP );
			
		}
		
		
		GetPreferenceByTypeResponse response = new GetPreferenceByTypeResponse();
		
		response.preferences = result;

		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
