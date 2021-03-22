package com.els.romenext.api.metadata;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.metadata.service.GetAllReposByMetadataService;
import com.els.romenext.api.permission.group.service.GetGroupService;

@Path("/metadata")
public class Metadata {

	private static Logger log = Logger.getLogger(Metadata.class);

	@Deprecated
	@GET
	@Path("/all/repos/{metadataid}/{username}")
	@Produces("application/json")
	public Response getAllReposByMetadata(@PathParam("metadataid") String metadataId, 
			@PathParam("username") String username) {

		ResponseBuilder responseBuilder;

		if (StringUtils.isEmpty(username)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		GetAllReposByMetadataService service = new GetAllReposByMetadataService();
		return service.runService(idNum, username);
	}


 
//	@GET
//	@Path("/all/repos/{metadataid}")
//	@Produces("application/json")
//	public Response getAllReposByMetadata(@PathParam("metadataid") String metadataId, 
//			@PathParam("username") String username) {
//
//		ResponseBuilder responseBuilder;
//
//		if (StringUtils.isEmpty(username)) {
//			log.error("Path Parameter Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//
//		Long idNum = null;
//		try {
//			idNum = Long.valueOf(metadataId);
//		} catch (Exception e) {
//			log.error("Invalid Number Format!", e);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//
//		GetAllReposByMetadataService service = new GetAllReposByMetadataService();
//		return service.runService(idNum, username);
//	}
	
	@POST
	@Path("/all/repos/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getAllReposByMetadataRev2(  @PathParam("metadataid") String metadataId, 
			String jsonString) {
		
		ResponseBuilder responseBuilder;
	
		if (StringUtils.isAnyEmpty( jsonString )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		  
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		GroupRequest request = new GroupRequest();
		
		JSONObject json = null;	
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
        String empty = request.validateRequest(json);
		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		try {
			request.parseRequest(json);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		 
		GetAllReposByMetadataService service = new GetAllReposByMetadataService();
		return service.runService(idNum, request  ); 
	}

}
