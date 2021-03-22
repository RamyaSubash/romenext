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
import com.els.romenext.api.preferences.resp.GetPreferenceByTypeResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypePropertyValue;
import com.els.romenext.core.entity.flatstyle.Property;
import com.google.gson.Gson;

public class GetPreferenceValueByTypeService {
	
	private static Logger log = Logger.getLogger(GetPreferenceValueByTypeService.class);
	
	public Response runService(Long metadataId, String host, String name, String namespace, Long typeid ) {
		
		ResponseBuilder responseBuilder;
		
		MetadataContainerDao mcDao = new MetadataContainerDao( namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GroupDao gDao = new GroupDao(namespace);
		Group g = gDao.findByHostAndName(host, name);
		
		// find the type
		RomeTypeDao typeDao = new RomeTypeDao( namespace );
		RomeType romeType = typeDao.get( typeid );
		
		
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao(namespace);
		RomeGroupType groupType = rgtDao.findByGroupAndType( g,  romeType );
		
		if( groupType == null ) {
			log.error("No permission found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PERMISSION_DENIED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// grab the preference
		RomePreferenceGroupTypePropertyValueDao prefDao = new RomePreferenceGroupTypePropertyValueDao( namespace );
		
		List<RomePreferenceGroupTypePropertyValue> prefs = prefDao.findByRomeType(groupType);
		
		
		
		List<Property> result = new ArrayList<Property>();
		
		for (RomePreferenceGroupTypePropertyValue p : prefs) {
			
			Property newP = Property.build( p.getRomePreferenceGroupTypeProperty() );
			
			newP.setValue( p.getValue() );
			
			
			result.add( newP );
			
		}
		
		
		GetPreferenceByTypeResponse response = new GetPreferenceByTypeResponse();
		
		response.preferences = result;

		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
