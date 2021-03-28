package com.els.romenext.api.node;

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

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.CreateNodeByGroupRequest;
import com.els.romenext.api.node.req.CreateNodeRequest;
import com.els.romenext.api.node.req.DeleteNodeRequest;
import com.els.romenext.api.node.req.GetAllEndNodesAndEdgesSimplifiedRequest;
import com.els.romenext.api.node.req.GetAllNodesAndEdgesByGroupRequest;
import com.els.romenext.api.node.req.GetFromTypeRequest;
import com.els.romenext.api.node.req.GetNodesAndEdgesSimplifiedRequest;
import com.els.romenext.api.node.req.UpdateNodeRequest;
import com.els.romenext.api.node.req.search.GetNodesFromEntryNodeRequest;
import com.els.romenext.api.node.service.CreateNodeByGroupService;
import com.els.romenext.api.node.service.CreateNodeService;
import com.els.romenext.api.node.service.DeleteNodeService;
import com.els.romenext.api.node.service.GetAllEndNodesAndEdgesSimplifiedService;
import com.els.romenext.api.node.service.GetAllNodesAndEdgesByGroupService;
import com.els.romenext.api.node.service.GetFromTypeService;
import com.els.romenext.api.node.service.GetNodesAndEdgesSimplifiedService;
import com.els.romenext.api.node.service.UpdateNodeService;
import com.els.romenext.api.node.service.search.GetNodesFromEntryNodeService;
import com.els.romenext.api.utils.RomeStringUtils;

@Path("/node")
public class Node {
	
	private static Logger log = Logger.getLogger(Node.class);
	
	/*
	 * create node
	 */
	@Deprecated
	@POST
	@Path("/metadata/{id}/{username}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createNode(@PathParam("id") String id, 
							   @PathParam("username") String username,
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(username, jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateNodeRequest request = new CreateNodeRequest();
		
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
		
		CreateNodeService service = new CreateNodeService();
		
		return service.runService(request, idNum, username);
		
	}
	
	@POST
	@Path("/create/metadata/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createNode(@PathParam("id") String id,  
							   String jsonString) {
		
//		System.out.println("jsonString : " + jsonString );
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateNodeByGroupRequest request = new CreateNodeByGroupRequest();
		
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
		
		CreateNodeByGroupService service = new CreateNodeByGroupService();
		
		return service.runService(request, idNum );
		
	}
	
	/*
	 * get nodes and edges under types and connections with properties
	 */
	@Deprecated
	@POST
	@Path("/edge/simplified/metadata/{id}/{username}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getNodesAndEdgesSimplified(@PathParam("id") String id, 
											   @PathParam("username") String username, 
											   String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(username, jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetNodesAndEdgesSimplifiedRequest request = new GetNodesAndEdgesSimplifiedRequest();
		
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
		
		GetNodesAndEdgesSimplifiedService service = new GetNodesAndEdgesSimplifiedService();
		
		return service.runService(request, idNum, username);
	}
	
	@POST
	@Path("/get/all/withedges/metadata/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAllWithEdges(@PathParam("id") String id,  
											   String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllNodesAndEdgesByGroupRequest request = new GetAllNodesAndEdgesByGroupRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
        String empty = request.validateRequest(json);
        System.out.println("/get/all/withedges/metadata/" + id);
        System.out.println(empty);
        

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
			System.out.println("Return the response from preprocessor");
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
		
		GetAllNodesAndEdgesByGroupService service = new GetAllNodesAndEdgesByGroupService();
		
		return service.runService(request, idNum );
	}
	
	/*
	 * get all end nodes and edges of a node with properties
	 */
	@POST
	@Path("/end/edge/all/simplified/repo/{repoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAllEndNodesAndEdgesSimplified(@PathParam("repoid") String repoId, String jsonString) {
		
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllEndNodesAndEdgesSimplifiedRequest request = new GetAllEndNodesAndEdgesSimplifiedRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.debug("Bad JSON Format ", e);
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
			log.error("Bad JSON Format" + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Response response = request.preprocessor();
		
		if (response != null) {
			return response;
		}
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf( repoId );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllEndNodesAndEdgesSimplifiedService service = new GetAllEndNodesAndEdgesSimplifiedService();
		return service.runService(request, idNum);
		
	}
	
	/**
	 * Read/Searching Methods below here
	 *
	 */
	
	/**
	 * API Call to search for nodes from a given ENTRY NODE.
	 * 
	 * Search parameters:
	 * TYPES/LABELS
	 * Properties
	 * Depth of search
	 * 
	 * @param id
	 * @param jsonString
	 * @return
	 */
	@POST
	@Path("/search/from/node/repo/{repoid}/{namespace}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getNodesFromEntryNode(@PathParam("repoid") String repoId, 
										  @PathParam("namespace") String namespace, 
										  String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(repoId, namespace, jsonString)) {
			log.error("JSON Missing!");
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
		
		GetNodesFromEntryNodeRequest request = new GetNodesFromEntryNodeRequest();
		
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
		
		GetNodesFromEntryNodeService service = new GetNodesFromEntryNodeService();
		
		return service.runService(request, idNum, namespace);
	
	}

	@PUT
	@Path("/update/metadata/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateNode(@PathParam("id") String id, String jsonString) {
	
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty(jsonString)) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		UpdateNodeRequest request = new UpdateNodeRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!", e);
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
			log.error("Bad JSON Format!", e);
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
		
		UpdateNodeService service = new UpdateNodeService();
		
		return service.runService(request, idNum);
		
	
	}
	
	
	@POST
	@Path("/get/from/type/{repoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getBasedOnType(@PathParam("repoid") String repoId, String jsonString) {
		
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetFromTypeRequest request = new GetFromTypeRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.debug("Bad JSON Format ", e);
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
			log.error("Bad JSON Format" + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Response response = request.preprocessor();
		
		if (response != null) {
			return response;
		}
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf( repoId );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetFromTypeService service = new GetFromTypeService();
		return service.runService(request, idNum);
		
	}
	
	@DELETE
	@Path("/delete/metadata/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteNode(@PathParam("id") String id, String jsonString) {
	
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty(jsonString)) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		DeleteNodeRequest request = new DeleteNodeRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!", e);
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
			log.error("Bad JSON Format!", e);
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
		
		DeleteNodeService service = new DeleteNodeService();
		
		return service.runService(request, idNum);
		
	
	}
}
