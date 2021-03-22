package com.els.romenext.api.model.service;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.model.resp.shape.GetShapesResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.entity.model.RomeShape;
import com.els.romenext.core.model.ModelService;
import com.google.gson.Gson;

public class GetShapesService {
	
	private static Logger log = Logger.getLogger(GetShapesService.class);
	

	
	public Response runService( Long modelId, String namespace ) {
		
		ResponseBuilder responseBuilder;
		
		if ( modelId == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		ModelService service = new ModelService( namespace );
//		CoreServices coreServices = new CoreServices( namespace );
//		MetadataServices metadataServices = new MetadataServices( namespace );
		
		
		List<RomeShape> shapes = service.getShapes( modelId );
		
		
//		if ( CollectionUtils.isEmpty( shapes )) {
//			log.error("Failed to Create a Node!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NODE_FAILED, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		GetShapesResponse rsp = new GetShapesResponse();
		
		rsp.shapes = shapes;
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(rsp)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}
}
