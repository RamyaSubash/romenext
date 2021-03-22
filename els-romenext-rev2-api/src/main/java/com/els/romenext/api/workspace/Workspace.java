package com.els.romenext.api.workspace;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
import com.els.romenext.api.workspace.req.AddNodeToWorkspaceRequest;
import com.els.romenext.api.workspace.req.CreateReferenceWorkspaceRequest;
import com.els.romenext.api.workspace.req.CreateWorkspaceRequest;
import com.els.romenext.api.workspace.req.DeleteWorkspaceRequest;
import com.els.romenext.api.workspace.req.GetAllWorkspaceRequest;
import com.els.romenext.api.workspace.req.GetWorkspaceFromTypeRequest;
import com.els.romenext.api.workspace.req.GetWorkspaceRequest;
import com.els.romenext.api.workspace.req.GetWorkspaceTypeRequest;
import com.els.romenext.api.workspace.req.RemoveNodeFromWorkspaceRequest;
import com.els.romenext.api.workspace.req.UpdateWorkspaceRequest;
import com.els.romenext.api.workspace.service.AddNodeToWorkspaceService;
import com.els.romenext.api.workspace.service.CreateReferenceWorkspaceService;
import com.els.romenext.api.workspace.service.CreateWorkspaceService;
import com.els.romenext.api.workspace.service.DeleteWorkspaceService;
import com.els.romenext.api.workspace.service.GetAllWorkspaceService;
import com.els.romenext.api.workspace.service.GetWorkspaceFromTypeService;
import com.els.romenext.api.workspace.service.GetWorkspaceService;
import com.els.romenext.api.workspace.service.GetWorkspaceTypeService;
import com.els.romenext.api.workspace.service.RemoveNodeFromWorkspaceService;
import com.els.romenext.api.workspace.service.UpdateWorkspaceService;

@Path("/workspace")
public class Workspace {
	
	private static Logger log = Logger.getLogger(Workspace.class);
	
	/*
	 * create node
	 */
	@POST
	@Path("/create/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateWorkspaceRequest request = new CreateWorkspaceRequest();
		
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
		
		CreateWorkspaceService service = new CreateWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/create/ref/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createWorkspaceWithReferences(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateReferenceWorkspaceRequest request = new CreateReferenceWorkspaceRequest();
		
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
		
		CreateReferenceWorkspaceService service = new CreateReferenceWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/get/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetWorkspaceRequest request = new GetWorkspaceRequest();
		
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
		
		GetWorkspaceService service = new GetWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/get/all/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAllWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllWorkspaceRequest request = new GetAllWorkspaceRequest();
		
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
		
		GetAllWorkspaceService service = new GetAllWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/get/workspacetype/{metadataid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getWorkspaceType(@PathParam("metadataid") String metadataid,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetWorkspaceTypeRequest request = new GetWorkspaceTypeRequest();
		
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
		 
		Long idNum = null;
		
		try {
			idNum = Long.valueOf( metadataid );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetWorkspaceTypeService service = new GetWorkspaceTypeService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/delete/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		DeleteWorkspaceRequest request = new DeleteWorkspaceRequest();
		
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
		
		DeleteWorkspaceService service = new DeleteWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/update/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateWorkspaceRequest request = new UpdateWorkspaceRequest();
		
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
		
		UpdateWorkspaceService service = new UpdateWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/preference/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addPreferece(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateWorkspaceRequest request = new UpdateWorkspaceRequest();
		
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
		
		UpdateWorkspaceService service = new UpdateWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	
	@POST
	@Path("/get/from/type/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getWorkspaceBasedOnType(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetWorkspaceFromTypeRequest request = new GetWorkspaceFromTypeRequest();
		
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
		
		GetWorkspaceFromTypeService service = new GetWorkspaceFromTypeService();
		
		return service.runService(request, idNum );
		
	}
	
	@POST
	@Path("/add/node/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addNodeToWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddNodeToWorkspaceRequest request = new AddNodeToWorkspaceRequest();
		
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
		
		AddNodeToWorkspaceService service = new AddNodeToWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
	
	@DELETE
	@Path("/delete/node/{repoId}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteNodeFromWorkspace(@PathParam("repoId") String repoId,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString ) ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RemoveNodeFromWorkspaceRequest request = new RemoveNodeFromWorkspaceRequest();
		
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
		
		RemoveNodeFromWorkspaceService service = new RemoveNodeFromWorkspaceService();
		
		return service.runService(request, idNum );
		
	}
}
