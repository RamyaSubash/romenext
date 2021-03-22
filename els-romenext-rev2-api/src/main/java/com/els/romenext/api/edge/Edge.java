package com.els.romenext.api.edge;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.edge.req.CreateEdgeRequest;
import com.els.romenext.api.edge.req.CreateLinkInstanceRequest;
import com.els.romenext.api.edge.req.DeleteEdgeRequest;
import com.els.romenext.api.edge.req.GetAllEdgesRequest;
import com.els.romenext.api.edge.req.UpdateEdgeInstanceRequest;
import com.els.romenext.api.edge.req.link.GetLinkRequest;
import com.els.romenext.api.edge.service.CreateEdgeService;
import com.els.romenext.api.edge.service.CreateLinkInstanceService;
import com.els.romenext.api.edge.service.DeleteEdgeService;
import com.els.romenext.api.edge.service.GetAllEdgesService;
import com.els.romenext.api.edge.service.UpdateEdgeInstanceService;
import com.els.romenext.api.edge.service.link.GetLinkService;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;

@Path("/edge")
public class Edge {
	
	private static Logger log = Logger.getLogger(Edge.class);

	/*
	 * create edge
	 * 
	 * sample of json to provide is: 
	 *           {"originTypeName":"Province",                                         //optional
	 *            "originType":"12",
	 *            "originNodeUuid":"a2c79215-d5bf-4ad8-981f-3d5afeaa5878",
	 *            "destinationTypeName":"City",                                        // optional
	 *            "destinationType":"13",
	 *            "destinationNodeUuid":"681513a7-4f49-49e9-96d9-312d714e5fb1",
	 *            "ruleName":"Provi_CityRULE0",
	 *            "edgeProperties":[]                                                  // optional
	 *            }
	 */
	@POST
	@Path("/repo/{repoid}/{username}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createEdge(@PathParam("repoid") String repoId,
							   @PathParam("username") String username,
							   String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(repoId, username, jsonString)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(repoId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateEdgeRequest request = new CreateEdgeRequest();
		
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
		
		CreateEdgeService service = new CreateEdgeService();
		
		return service.runService(request, idNum, username);
		
	}
	
	@POST
	@Path("/link/{repoid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createLink(@PathParam("repoid") String repoId,
							   String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(repoId, jsonString)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(repoId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateLinkInstanceRequest request = new CreateLinkInstanceRequest();
		
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
		
		CreateLinkInstanceService service = new CreateLinkInstanceService();
		
		return service.runService(request, idNum );
		
	}
	
	
	@PUT
	@Path("/update/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateEdge(@PathParam("id") String id, String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("Missing Mandatory Data!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateEdgeInstanceRequest request = new UpdateEdgeInstanceRequest();
		
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
			idNum = Long.valueOf(id);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateEdgeInstanceService service = new UpdateEdgeInstanceService();
		
		return service.runService(request, idNum);
		
	}
	
	@POST
	@Path("/link/getany/{repoId}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAnyLinks(@PathParam("repoId") String repoId, String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("Missing Mandatory Data!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetLinkRequest request = new GetLinkRequest();
		
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
		
		GetLinkService service = new GetLinkService();
		
		return service.runService(request, idNum);
		
	}
	
	@POST
	@Path("/get/{repoId}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAllEdges(@PathParam("repoId") String repoId, String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("Missing Mandatory Data!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllEdgesRequest request = new GetAllEdgesRequest();
		
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
		
		GetAllEdgesService service = new GetAllEdgesService();
		
		return service.runService(request, idNum);
		
	}
	
	
	@DELETE
	@Path("/delete/{repoId}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteEdge(@PathParam("repoId") String repoId, String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isEmpty(jsonString)) {
			log.error("Missing Mandatory Data!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		DeleteEdgeRequest request = new DeleteEdgeRequest();
		
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
		
		DeleteEdgeService service = new DeleteEdgeService();
		
		return service.runService(request, idNum);
		
	}
}
