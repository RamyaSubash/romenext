package com.els.romenext.api.deco.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.deco.req.GetAllDecoPropertyRequest;
import com.els.romenext.api.deco.resp.GetAllDecoPropertyResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.entity.flatstyle.Property;
import com.google.gson.Gson;

public class GetAllDecoPropertyService {
	
	private static Logger log = Logger.getLogger(GetAllDecoPropertyService.class);
	
	public Response runService( GetAllDecoPropertyRequest req, Long decoId ) {
		
		
		GetAllDecoPropertyResponse response = new GetAllDecoPropertyResponse();
		ResponseBuilder responseBuilder;
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao( req.namespace );
		RomeDecorator rd = rdDao.get(decoId);
		
		
		List<RomeDecoratorProperty> fields = rd.getFields();
		
//		GetAllDecoPropertyResponse response = new GetAllDecoPropertyResponse();
		
		List<Property> fieldResponse = new ArrayList<>();
		
		for( RomeDecoratorProperty p : fields ) {
			Property build = Property.build( p );
			if( build != null ) {
				fieldResponse.add( build );
			}
		}
		
		response.properties = fieldResponse;
		
		
		System.out.println("What is this : " + RomeGsonUtils.getDefaultGson().toJson(response) );
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
