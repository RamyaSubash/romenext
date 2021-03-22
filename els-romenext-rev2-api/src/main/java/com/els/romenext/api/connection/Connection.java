package com.els.romenext.api.connection;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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

import com.els.romenext.api.connection.req.CreateGenericConnectionRequest;
import com.els.romenext.api.connection.req.CreateGenericConnectionRequestOLD;
import com.els.romenext.api.connection.req.DeleteConnectionRequest;
import com.els.romenext.api.connection.req.UpdateConnectionRequest;
import com.els.romenext.api.connection.req.link.AssignDirectTypeToLinkRequest;
import com.els.romenext.api.connection.req.link.AssignTypeToLinkRequest;
import com.els.romenext.api.connection.req.link.DeleteLinkRequest;
import com.els.romenext.api.connection.service.CreateConnectionService;
import com.els.romenext.api.connection.service.CreateGenericConnectionService;
import com.els.romenext.api.connection.service.DeleteConnectionService;
import com.els.romenext.api.connection.service.UpdateConnectionService;
import com.els.romenext.api.connection.service.link.AssignDirectTypeToLinkService;
import com.els.romenext.api.connection.service.link.AssignTypeToLinkService;
import com.els.romenext.api.connection.service.link.DeleteLinkService;
import com.els.romenext.api.connection.service.link.GetLinksForTypeService;
import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.RomeStringUtils;
import com.els.romenext.api.utils.login.ApiLoginUtils;

@Path("/connection")
public class Connection {

	private static Logger log = Logger.getLogger(Connection.class);

	@Deprecated
	@POST
	@Path("/generic/metadata/{metadataid}/{groupname}/{grouphost}/{username}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createGenericConnection(@PathParam("metadataid") String metadataId, 
			@PathParam("groupname") String groupName, 
			@PathParam("grouphost") String groupHost, 
			@PathParam("username") String username, 
			String jsonString) {

		ResponseBuilder responseBuilder;

		if (StringUtils.isAnyEmpty(metadataId, groupName, groupHost, username)) {
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

		CreateGenericConnectionRequestOLD request = new CreateGenericConnectionRequestOLD();

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

		CreateGenericConnectionService service = new CreateGenericConnectionService();

		return service.runService(request, idNum, groupName, groupHost, username);

	}



	@POST
	@Path("/create/metadata/{metadataid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createConnection(@PathParam("metadataid") String metadataId, 
			String jsonString) {

		ResponseBuilder responseBuilder;

		if (StringUtils.isAnyEmpty(metadataId )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}



		CreateGenericConnectionRequest request = new CreateGenericConnectionRequest();

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

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		try {
			request.parseRequest(json);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		CreateConnectionService service = new CreateConnectionService();

		return service.runService(request, idNum );

	}








	@POST
	@Path("/link/assign/metadata/{metadataid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response assignTypeToLink(@PathParam("metadataid") String metadataId, 
			String jsonString) {

		ResponseBuilder responseBuilder;

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		AssignTypeToLinkRequest request = new AssignTypeToLinkRequest();

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


		AssignTypeToLinkService service = new AssignTypeToLinkService();

		return service.runService(request, idNum );

	}

	@POST
	@Path("/link/assign/direct/metadata/{metadataid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response assignDirectTypeToLink(@PathParam("metadataid") String metadataId, 
			String jsonString) {

		ResponseBuilder responseBuilder;

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		AssignDirectTypeToLinkRequest request = new AssignDirectTypeToLinkRequest();

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


		AssignDirectTypeToLinkService service = new AssignDirectTypeToLinkService();

		return service.runService(request, idNum );

	}

	@GET
	@Path("/link/get/{metadataid}/{groupname}/{grouphost}/{namespace}/{typeid}")
	@Produces("application/json")
	public Response getLinksForType(@PathParam("metadataid") String metadataId, 
			@PathParam("groupname") String groupName, 
			@PathParam("grouphost") String groupHost, 
			@PathParam("namespace") String namespace,
			@PathParam("typeid") String typeid ) {
		ResponseBuilder responseBuilder;

		Long idNum = null;
		Long typeId = null;
		try {
			idNum = Long.valueOf(metadataId);
			typeId = Long.valueOf(typeid);

		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}



		GetLinksForTypeService service = new GetLinksForTypeService();

		return service.runService( idNum, groupName, groupHost, typeId, namespace );

	}

	//TODO: may have rule, deco and sys properties
	@PUT
	@Path("/update/metadata/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response updateConnection(@PathParam("metadataid") String metadataId,
			String jsonString) {

		ResponseBuilder responseBuilder;

		if (RomeStringUtils.isAnyEmpty(metadataId, jsonString)) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		UpdateConnectionRequest request = new UpdateConnectionRequest();

		JSONObject json = null;

		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		String empty = request.validateRequest(json);

		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		request.parseRequest(json);

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		UpdateConnectionService service = new UpdateConnectionService();

		return service.runService(request, idNum);

	}

	@POST
	@Path("/delete/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response deleteConnection(@PathParam("metadataid") String metadataId,
			String jsonString) {

		ResponseBuilder responseBuilder;

		if (RomeStringUtils.isAnyEmpty(metadataId, jsonString)) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		DeleteConnectionRequest request = new DeleteConnectionRequest();

		JSONObject json = null;

		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		String empty = request.validateRequest(json);

		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		request.parseRequest(json);

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		DeleteConnectionService service = new DeleteConnectionService();

		return service.runService(request, idNum);

	}
	
	@POST
	@Path("/delete/link/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response deleteLink(@PathParam("metadataid") String metadataId,
			String jsonString) {
		
		
//		Object check = this.postProcessing(jsonString, metadataId, new DeleteLinkRequest() );
//		
//		DeleteLinkRequest request = null;
//		if( check != null ) {
//			if( check instanceof DeleteLinkRequest ) {
//				request = (DeleteLinkRequest) check;
//			} else {
//				// must be an error
//				return (Response) check;
//			}
//		}
		

		ResponseBuilder responseBuilder;

		if (RomeStringUtils.isAnyEmpty(metadataId, jsonString)) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		DeleteLinkRequest request = new DeleteLinkRequest();

		JSONObject json = null;

		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		String empty = request.validateRequest(json);

		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		request.parseRequest(json);

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		// validate log in or not
		ApiLoginUtils utils = new ApiLoginUtils();
		
		boolean authorized = utils.isAuthorized( request.namespace );
		
		if( !authorized ) {
			log.error("Not authorized");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.LOGIN_NOT_LOGGED_IN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		DeleteLinkService service = new DeleteLinkService();

		return service.runService(request, idNum);

	}
	
	public Object postProcessing( String jsonString, String metadataId, GroupRequest request ) {
		
		ResponseBuilder responseBuilder;

		if (RomeStringUtils.isAnyEmpty(metadataId, jsonString)) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		} 
		
		JSONObject json = null;

		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		String empty = request.validateRequest(json);

		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		

		request.parseRequest(json);

		Long idNum = null;
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}

		// validate log in or not
		ApiLoginUtils utils = new ApiLoginUtils();
		
		boolean authorized = utils.isAuthorized( request.namespace );
		
		if( !authorized ) {
			log.error("Not authorized");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.LOGIN_NOT_LOGGED_IN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		return request;
	}
	

}
