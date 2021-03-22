package com.els.romenext.api.model.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.model.req.GetModelRequest;
import com.els.romenext.api.model.resp.GetModelResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.entity.model.RomeModel;
import com.els.romenext.core.model.ModelService;
import com.google.gson.Gson;

public class GetModelService {
	
	private static Logger log = Logger.getLogger(GetModelService.class);
	
	public Response runService(GetModelRequest req) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		ModelService service = new ModelService( req.namespace );
		
//		List<RomeModel> models = service.getAllModelsAndShapesByRepo( req.typeName, req.repoid );
		List<RomeModel> models = service.getAllModelsAndShapes( req.typeName, req.metaid );
		
		
		if (models == null) {
			models = new ArrayList<RomeModel>();
		}
		
		GetModelResponse rsp = new GetModelResponse();
		rsp.models = models;
		
		/**
		 * We currently have a problem here where Gson does not like a circular dependency between Shapes -> Models
		 * 
		 * 
		 */
		
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(rsp)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}
}
