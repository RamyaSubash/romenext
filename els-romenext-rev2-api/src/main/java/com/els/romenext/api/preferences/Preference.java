package com.els.romenext.api.preferences;

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

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.preferences.req.AddPreferencePropertyRequest;
import com.els.romenext.api.preferences.req.AddPreferenceRequest;
import com.els.romenext.api.preferences.req.GetPreferenceByTypeRequest;
import com.els.romenext.api.preferences.req.UpdatePreferencePropertyRequest;
import com.els.romenext.api.preferences.service.AddPreferencePropertyService;
import com.els.romenext.api.preferences.service.AddPreferenceService;
import com.els.romenext.api.preferences.service.GetPreferenceByTypeService;
import com.els.romenext.api.preferences.service.GetPreferenceValueByTypeService;
import com.els.romenext.api.preferences.service.UpdatePreferencePropertyService;
import com.els.romenext.api.utils.RomeStringUtils;

@Path("/preference")
public class Preference {
	
	private static Logger log = Logger.getLogger(Preference.class);
		
	@GET
	@Path("/type/find/typeid/{metadataid}/{groupname}/{grouphost}/{namespace}/{typeid}")
	@Produces("application/json")
	public Response getAllPreferencesAndConnectionsByGroup(@PathParam("metadataid") String id, 
									   @PathParam("grouphost") String host, 
									   @PathParam("groupname") String name,
									   @PathParam("namespace") String namespace,
									   @PathParam("typeid") String typeid ) {
		
		ResponseBuilder responseBuilder;
	
		Long idNum = null;
		Long typeId = null;
		try {
			idNum = Long.valueOf(id);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetPreferenceValueByTypeService service = new GetPreferenceValueByTypeService();
		return service.runService(idNum, host, name, namespace, typeId );
	}
	
	@POST
	@Path("/type/find/all/bytypeid/{metadataid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAllPreferencesByTypeId(@PathParam("metadataid") String metadataid,
													String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetPreferenceByTypeRequest request = new GetPreferenceByTypeRequest();
		
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
			idNum = Long.valueOf( metadataid );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetPreferenceByTypeService service = new GetPreferenceByTypeService();
		return service.runService( request, idNum );
	}
	
	
	
	@POST
	@Path("/type/add/bytypeid/{metadataid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addPreferencePropertiesViaId(@PathParam("metadataid") String metadataid,
									  String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddPreferencePropertyRequest request = new AddPreferencePropertyRequest();
		
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
			idNum = Long.valueOf( metadataid );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddPreferencePropertyService service = new AddPreferencePropertyService();
		return service.runService( request, idNum );
		
	}
	
	@POST
	@Path("/create/bytypeid/{metadataid}/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response addPreference(@PathParam("metadataid") String metadataid,
									  String jsonString ) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddPreferenceRequest request = new AddPreferenceRequest();
		
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
			idNum = Long.valueOf( metadataid );
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		AddPreferenceService service = new AddPreferenceService();
		return service.runService( request, idNum );
		
	}
	
	@PUT
	@Path("/type/update/bytypeid/{metadataid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response updatePreferenceAndProperties(@PathParam("metadataid") String metadataid,
											String jsonString) {
		
		ResponseBuilder responseBuilder;
		
		if (RomeStringUtils.isAnyEmpty( jsonString )) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		UpdatePreferencePropertyRequest request = new UpdatePreferencePropertyRequest();
		
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
			idNum = Long.valueOf(metadataid);

		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		UpdatePreferencePropertyService service = new UpdatePreferencePropertyService();
		return service.runService( request, idNum);
		
		
	}
	
}