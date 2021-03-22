package com.els.romenext.api.type;

import java.util.List;

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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.AddTypePropertiesRequest;
import com.els.romenext.api.type.req.AddTypePropertiesRequest_OLD;
import com.els.romenext.api.type.req.CreateTypeByGroupRequest;
import com.els.romenext.api.type.req.DeleteTypeRequest;
import com.els.romenext.api.type.req.GetAllTypesAndConnectionsByGroupRequest;
import com.els.romenext.api.type.req.GetTypeByGroupRequest;
import com.els.romenext.api.type.req.UpdateTypeRequest;
import com.els.romenext.api.type.service.AddTypePropertiesService;
import com.els.romenext.api.type.service.AddTypePropertiesService_OLD;
import com.els.romenext.api.type.service.CreateTypeByGroupService;
import com.els.romenext.api.type.service.DeleteTypeService;
import com.els.romenext.api.type.service.GetAllTypesAndConnectionsByGroup;
import com.els.romenext.api.type.service.GetTypeByGroupService;
import com.els.romenext.api.type.service.UpdateTypeService;
import com.els.romenext.api.utils.RomeStringUtils;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.RomeType;

@Path("/type")
public class Type {
	
	private static Logger log = Logger.getLogger(Type.class);
		
	@GET
	@Path("/connection/all/bygroup/metadata/{metadataid}/{groupname}/{grouphost}/{username}")
	@Produces("application/json")
	@Deprecated
	public Response getAllTypesAndConnectionsByGroupOLD(@PathParam("metadataid") String id, 
									   @PathParam("grouphost") String host, 
									   @PathParam("groupname") String name,
									   @PathParam("username") String username) {
		
		ResponseBuilder responseBuilder;
	
		if (StringUtils.isAnyEmpty(id, host, name, username)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(id);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllTypesAndConnectionsByGroup service = new GetAllTypesAndConnectionsByGroup();
		return service.runService(idNum, host, name, username);
	}
	
	@POST
	@Path("/connection/all/bygroup/metadata/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getAllTypesAndConnectionsByGroup(@PathParam("metadataid") String id, 
														String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(id, jsonString)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(id);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllTypesAndConnectionsByGroupRequest request = new GetAllTypesAndConnectionsByGroupRequest();
		
		
		
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
			System.out.println(jsonString);
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		GetAllTypesAndConnectionsByGroup service = new GetAllTypesAndConnectionsByGroup();
		
		return service.runService(request, idNum );
	}
	
	@GET
	@Path("/all/bygroup/host/{host}/name/{name}/metadata/{id}/{username}/{typeid}")
	@Produces("application/json")
	@Deprecated
	public Response getTypeByGroupOLD(@PathParam("id") String id, 
									   @PathParam("host") String host, 
									   @PathParam("name") String name,
									   @PathParam("username") String username,
									   @PathParam("typeid") String typeid ) {
		
		ResponseBuilder responseBuilder;
	
		if (StringUtils.isAnyEmpty(id, host, name, username)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		Long typeId = null;
		try {
			idNum = Long.valueOf(id);
			typeId = Long.valueOf( typeid );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetTypeByGroupService service = new GetTypeByGroupService();
		return service.runService(idNum, host, name, username, typeId);
	}
	
	@POST
	@Path("/get/all/bygroup/metadata/{metadataId}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getTypeByGroup(@PathParam("metadataId") String id,
									String jsonString ) {
		
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty(id, jsonString)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(id);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetTypeByGroupRequest request = new GetTypeByGroupRequest();
		
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		GetTypeByGroupService service = new GetTypeByGroupService();
		
		return service.runService(request, idNum );
	}

	@POST
//	@Path("/bygroup/host/{host}/name/{name}/metadata/{id}/{username}")
	@Path("/create/metadata/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createTypeByGroup(@PathParam("id") String id, 
									  String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		
		if (StringUtils.isAnyEmpty(id, jsonString)) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(id);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CreateTypeByGroupRequest request = new CreateTypeByGroupRequest();
		
		
		
		
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
		
		Response reponse = request.preprocessor();
		
		if (reponse != null) {
			return reponse;
		}
		
		CreateTypeByGroupService service = new CreateTypeByGroupService();

		System.out.println("******* createTypeByGroup Request grouphost ******");
		System.out.println(request.getGrouphost());
		
		return service.runService(request, idNum );
	}
	
	@Deprecated
	@POST
	@Path("/properties/viaid/{typeid}/metadata/{id}/{username}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addTypePropertiesViaId(@PathParam("typeid") String typeId,
									  @PathParam("id") String id,
									  @PathParam("username") String username,
									  String jsonArrayStr) {
		
		// to be honest, with any get we should be doing a login check
		
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( username, jsonArrayStr )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddTypePropertiesRequest_OLD request = new AddTypePropertiesRequest_OLD();
		
		JSONArray jsonArray = null;
		
		try {
			jsonArray = new JSONArray(jsonArrayStr);
		} catch (JSONException e) {
			log.debug("Bad JSON Format ", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
        String empty = request.validateRequest(jsonArray);

		if(!StringUtils.isEmpty(empty)) {
			log.debug("This is missing: " + empty);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		try {
			request.parseRequest(jsonArray);
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
		Long typeIdNum = null;
		
		try {
			idNum = Long.valueOf(id);
			typeIdNum = Long.valueOf( typeId );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddTypePropertiesService_OLD service = new AddTypePropertiesService_OLD();
		return service.runService(typeIdNum, request, idNum, username);
		
	}
	
	@POST
	@Path("/properties/viaid/metadata/{metadataId}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addTypePropertiesViaId_proper( @PathParam("metadataId") String metadataId,
									  String jsonString ) {
		
		// to be honest, with any get we should be doing a login check
		
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddTypePropertiesRequest request = new AddTypePropertiesRequest();
		
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
		
		Long idNum = null;
		
		try {
			idNum = Long.valueOf(metadataId);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddTypePropertiesService service = new AddTypePropertiesService();
		return service.runService( request, idNum );
		
	}
	
	@PUT
	@Path("/update/withproperties/{typeid}/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateTypeAndProperties(@PathParam("typeid") String typeId,
											@PathParam("id") String id,
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty(typeId, jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		UpdateTypeRequest request = new UpdateTypeRequest();
		
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
			log.error("Bad JSON Format", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Response response = request.preprocessor();
		
		if (response != null) {
			return response;
		}
		
		Long idNum = null;
		Long typeIdNum = null;		
		try {
			idNum = Long.valueOf(id);
			typeIdNum = Long.valueOf(typeId);

		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		UpdateTypeService service = new UpdateTypeService();
		return service.runService( request, typeIdNum, idNum);
		
		
	}
	
	@PUT
	@Path("/delete/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response deleteType( @PathParam("id") String id,
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		DeleteTypeRequest request = new DeleteTypeRequest();
		
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
			log.error("Bad JSON Format", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Response response = request.preprocessor();
		
		if (response != null) {
			return response;
		}
		
		Long idNum = null; 	
		try {
			idNum = Long.valueOf(id); 

		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		DeleteTypeService service = new DeleteTypeService();
		return service.runService( request, idNum);
		
		
	}
	
}