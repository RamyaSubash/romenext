package com.els.romenext.api.model;

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

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.model.req.GetModelRequest;
import com.els.romenext.api.model.service.GetModelService;
import com.els.romenext.api.model.service.GetShapesService;

@Path("/model")
public class ModelApi {
	
	private static Logger log = Logger.getLogger(ModelApi.class);
	
	@POST
	@Path("/model/all")
	@Produces("application/json")
	@Consumes("application/json")
	public Response getModel(String jsonString ) {
		
		ResponseBuilder responseBuilder = null;
		

		if (StringUtils.isEmpty(jsonString)) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonString);
		} catch (JSONException e) {
			log.error("Bad JSON Format!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		GetModelRequest req = new GetModelRequest();
		
		String missing = req.validateRequest( json );
		req.parseRequest( json );

		if(!StringUtils.isEmpty(missing)) {
			log.error("This is missing: " + missing);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		GetModelService serv = new GetModelService();
		
		return serv.runService( req );
		
		
	}
	
//	@POST
//	@Path("/model/{repoid}")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response getModelById( @PathParam("modelid") String repoid, String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		Long idNum = null;	
//		
//		try {
//			idNum = Long.valueOf( repoid );
//		} catch (Exception e) {
//			log.error("Invalid Number Format!", e);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		GetModelByIdRequest req = new GetModelByIdRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		GetModelByIdService serv = new GetModelByIdService();
//		
//		return serv.runService( req, idNum );
//		
//		
//	}
//	
//	
//	/**
//	 * @param id
//	 * @return
//	 */
//	@POST
//	@Path("/model/")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response addModel(  String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		AddModelRequest req = new AddModelRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		AddModelService serv = new AddModelService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/part/")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response addPart( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		AddPartRequest req = new AddPartRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		AddPartService serv = new AddPartService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/part/group")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response addPartGroup( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		AddGroupPartRequest req = new AddGroupPartRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		AddGroupPartService serv = new AddGroupPartService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/part/group/get")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response getPartGroup( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		GetGroupPartRequest req = new GetGroupPartRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		GetGroupPartService serv = new GetGroupPartService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/part/group/batch/get")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response getPartGroupBatch( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONArray json = null;
//		
//		try {
//			json = new JSONArray(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		GetPartGroupBatchRequest req = new GetPartGroupBatchRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		GetPartGroupBatchService serv = new GetPartGroupBatchService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/part/bymodel")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response getPart( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		GetPartsByModelRequest req = new GetPartsByModelRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		GetPartsByModelService serv = new GetPartsByModelService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/part/")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response updatePart( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		UpdatePartRequest req = new UpdatePartRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		UpdatePartService serv = new UpdatePartService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/part/group")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response updatePartGroup( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		UpdatePartGroupRequest req = new UpdatePartGroupRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		UpdatePartGroupService serv = new UpdatePartGroupService();
//		
//		return serv.runService( req );
//	}
//	
//	
//	/**
//	 * @param id
//	 * @return
//	 */
//	@POST
//	@Path("/shape/")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response addShape(  String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		AddShapeRequest req = new AddShapeRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		AddShapeService serv = new AddShapeService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/shape/group")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response addGroupShape(  String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		AddGroupShapeRequest req = new AddGroupShapeRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		AddGroupShapeService serv = new AddGroupShapeService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/shape/")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response updateShape( String jsonString ) {
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		UpdateShapeRequest req = new UpdateShapeRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		UpdateShapeService serv = new UpdateShapeService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/shape/property")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response updateShapeProperty( String jsonString ) {
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		UpdateShapePropertyRequest req = new UpdateShapePropertyRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		UpdateShapePropertyService serv = new UpdateShapePropertyService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/shape/group")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response updateGroupShape( String jsonString ) {
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		UpdateGroupShapeRequest req = new UpdateGroupShapeRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		UpdateGroupShapeService serv = new UpdateGroupShapeService();
//		
//		return serv.runService( req );
//	}
//	
	@GET
	@Path("/shape/{modelid}/{namespace}")
	@Produces("application/json")
	public Response getShapes(   @PathParam("modelid") String id,
								@PathParam("namespace") String namespace ) {
		
		ResponseBuilder responseBuilder = null;
		
		GetShapesService serv = new GetShapesService();
		
		Long modelId = Long.valueOf( id );
		
		if ( modelId == null ) {
			log.error("JSON Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		return serv.runService( modelId, namespace );
	}
//	
//	@POST
//	@Path("/model/property")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response addProperty(  String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		AddPropertyRequest req = new AddPropertyRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		AddPropertyService serv = new AddPropertyService();
//		
//		return serv.runService( req );
//	}
//	
//	@POST
//	@Path("/model/property/getall")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response getPropertyAll( String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		GetAllPropertyRequest req = new GetAllPropertyRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		GetAllPropertyService serv = new GetAllPropertyService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/model/property")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response updateProperty(  String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		
//		UpdatePropertyRequest req = new UpdatePropertyRequest();
//		
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		UpdatePropertyService serv = new UpdatePropertyService();
//		
//		return serv.runService( req );
//	}
//	
//	@PUT
//	@Path("/model/convert/child")
//	@Produces("application/json")
//	@Consumes("application/json")
//	public Response convertToChildEnabled(  String jsonString ) {
//		
//		ResponseBuilder responseBuilder = null;
//		
//
//		if (StringUtils.isEmpty(jsonString)) {
//			log.error("JSON Missing!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		JSONObject json = null;
//		
//		try {
//			json = new JSONObject(jsonString);
//		} catch (JSONException e) {
//			log.error("Bad JSON Format!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		
//		ConvertModelToChildEnabledRequest req = new ConvertModelToChildEnabledRequest();
//		String missing = req.validateRequest( json );
//		req.parseRequest( json );
//
//		if(!StringUtils.isEmpty(missing)) {
//			log.error("This is missing: " + missing);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
//		ConvertModelToChildEnabledService serv = new ConvertModelToChildEnabledService();
//		
//		return serv.runService( req );
//	}
}
