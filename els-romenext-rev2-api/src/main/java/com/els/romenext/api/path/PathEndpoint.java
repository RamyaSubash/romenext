package com.els.romenext.api.path;

import javax.ws.rs.Consumes;
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

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.path.req.AssignNodeToPathRequest;
import com.els.romenext.api.path.req.CreatePathRequest;
import com.els.romenext.api.path.req.GetPathByTypeRequest;
import com.els.romenext.api.path.req.link.GetLinksBetweenPathNodesRequest;
import com.els.romenext.api.path.service.AssignNodeToPathService;
import com.els.romenext.api.path.service.CreatePathService;
import com.els.romenext.api.path.service.GetPathByTypeService;
import com.els.romenext.api.path.service.link.GetLinksBetweenPathNodesService;

@Path("/pathEndpoint")
public class PathEndpoint {
	
	private static Logger log = Logger.getLogger(PathEndpoint.class);

	/*
	 * create Path
	 */
	@POST
	@Path("/create/{repoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createPath(@PathParam("repoid") String repoId, 
									String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreatePathRequest request = new CreatePathRequest();
		
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
			log.error("This is missing: " + empty);
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf( repoId );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreatePathService service = new CreatePathService();
		
		return service.runService(request, idNum);
		
	}
	
	@POST
	@Path("/get/fromtype/{repoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getPathTypes(@PathParam("repoid") String repoId, 
									String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetPathByTypeRequest request = new GetPathByTypeRequest();
		
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
			log.error("This is missing: " + empty);
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf( repoId );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetPathByTypeService service = new GetPathByTypeService();
		
		return service.runService(request, idNum);
		
	}
	
	@POST
	@Path("/assign/node/{repoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addNodeToPath(@PathParam("repoid") String repoId, 
										String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AssignNodeToPathRequest request = new AssignNodeToPathRequest();
		
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
			log.error("This is missing: " + empty);
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf(repoId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AssignNodeToPathService service = new AssignNodeToPathService();
		return service.runService(request, idNum);
	}
	
	@POST
	@Path("/find/links/fromNodes/{repoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response findLinksFromPathNodes(@PathParam("repoid") String repoId, 
										String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetLinksBetweenPathNodesRequest request = new GetLinksBetweenPathNodesRequest();
		
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
			log.error("This is missing: " + empty);
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf(repoId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetLinksBetweenPathNodesService service = new GetLinksBetweenPathNodesService();
		return service.runService(request, idNum);
	}
}
