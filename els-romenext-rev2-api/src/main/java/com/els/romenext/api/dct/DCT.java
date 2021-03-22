package com.els.romenext.api.dct;

import javax.ws.rs.Consumes;
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

import com.els.romenext.api.dct.req.CreateDCTByGroupRequest;
import com.els.romenext.api.dct.req.GetAllDCTAndConnectionsByGroupRequest;
import com.els.romenext.api.dct.req.GetAllDCTByGroupRequest;
import com.els.romenext.api.dct.req.UpdateDCTRequest;
import com.els.romenext.api.dct.service.CreateDCTByGroupService;
import com.els.romenext.api.dct.service.GetAllDCTAndConnectionsByGroupService;
import com.els.romenext.api.dct.service.GetAllDCTByGroupService;
import com.els.romenext.api.dct.service.UpdateDCTService;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.CreateTypeByGroupRequest;
import com.els.romenext.api.type.req.UpdateTypeRequest;
import com.els.romenext.api.type.service.CreateTypeByGroupService;
import com.els.romenext.api.type.service.UpdateTypeService;
import com.els.romenext.api.utils.RomeStringUtils;

@Path("/dct")
public class DCT {
	
	private static Logger log = Logger.getLogger(DCT.class);
		
	
	@POST
	@Path("/create/metadata/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response createDCTByGroup(@PathParam("id") String id, 
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
		
		CreateDCTByGroupRequest request = new CreateDCTByGroupRequest();
		
		
		
		
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
		
		CreateDCTByGroupService service = new CreateDCTByGroupService();
		
		return service.runService(request, idNum );
	}
	
	
	@POST
	@Path("/get/all/bygroup/metadata/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getAllDCTsByGroup(@PathParam("metadataid") String id, 
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
		
		GetAllDCTByGroupRequest request = new GetAllDCTByGroupRequest();
		
		
		
		
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
		
		GetAllDCTByGroupService service = new GetAllDCTByGroupService();
		
		return service.runService(request, idNum );
	}
	
	@POST
	@Path("/get/all/andconnections/bygroup/metadata/{metadataid}")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getAllDCTsAndConnectionsByGroup(@PathParam("metadataid") String id, 
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
		
		GetAllDCTAndConnectionsByGroupRequest request = new GetAllDCTAndConnectionsByGroupRequest();
		
		
		
		
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
		
		GetAllDCTAndConnectionsByGroupService service = new GetAllDCTAndConnectionsByGroupService();
		
		return service.runService(request, idNum );
	}
	
	@PUT
	@Path("/update/withproperties/metadata/{metadataId}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updateDCTAndProperties( @PathParam("metadataId") String metadataId,
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		UpdateDCTRequest request = new UpdateDCTRequest();
		
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
			idNum = Long.valueOf(metadataId);

		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		UpdateDCTService service = new UpdateDCTService();
		return service.runService( request,  idNum);
		
		
	}
	
}