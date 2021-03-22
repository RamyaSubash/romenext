package com.els.romenext.api.deco;

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

import com.els.romenext.api.deco.req.GetAllDecoPropertyRequest;
import com.els.romenext.api.deco.req.GetByClassAndGroupRequest;
import com.els.romenext.api.deco.service.GetAllDecoPropertyService;
import com.els.romenext.api.deco.service.GetByClassAndGroupService;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;


@Path("/deco")
public class Decorator {
	
	private static Logger log = Logger.getLogger(Decorator.class);
		
	/**
		{"decos": [
		      {
		      "id": 1,
		      "name": "TestDeco1",
		      "decoProps":       [
		                  {
		            "id": 1,
		            "name": "TestDecoProp1",
		            "propertyType": "INTEGER",
		            "minimumValue": "1000",
		            "maximumValue": "100",
		            "isRequired": true,
		            "mustBeUnique": true
		         },
		                  {
		            "id": 2,
		            "name": "TestDecoProp2",
		            "propertyType": "STRING",
		            "isRequired": true,
		            "mustBeUnique": true
		         }
		      ]
		   },
		      {
		      "id": 2,
		      "name": "TestDeco2",
		      "decoProps": [      {
		         "id": 3,
		         "name": "TestDecoProp3",
		         "propertyType": "INTEGER",
		         "isRequired": true,
		         "mustBeUnique": true
		      }]
		   }
		]}
	 * @return
	 */
//	@GET
//	@Path("/all")
//	@Produces("application/json")
//	public Response getAllDecorators() {
//		log.debug("Entered the get all for decorators");
//		GetAllDecoratorsService service = new GetAllDecoratorsService();
//		return service.runService();
//	}
	
	
//	// a physical view mockup
//	@GET
//	@Path("/physical")
//	@Produces("application/json")
//	public Response getAllShapes() {
//		log.debug("Entered getAllShapes");
//		GetAllShapesService service = new GetAllShapesService();
//		return service.runService();
//	}
	
	// a physical view mockup
	@POST
	@Path("/properties/{decoid}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getAllDecoProperties( @PathParam("decoid") String decoid,
			  								String jsonStr ) {
		log.debug("Entered all deco properties");
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonStr )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Long idNum = null;
		try {
			idNum = Long.valueOf(decoid);
		} catch (Exception e) {
			log.error("Invalid Number Format!", e);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		GetAllDecoPropertyRequest request = new GetAllDecoPropertyRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonStr);
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
		
		GetAllDecoPropertyService service = new GetAllDecoPropertyService();
		
		return service.runService(request, idNum ); 
	}
	
	@POST
	@Path("/find/byclassgroupname/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response getDecoByNameAndGrouping( String jsonStr ) {
		log.debug("Entered get deco by name/grouping");
		
		ResponseBuilder responseBuilder;
		
		if (StringUtils.isAnyEmpty( jsonStr )) {
			log.error("Path Parameter Missing!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
//		Long idNum = null;
//		try {
//			idNum = Long.valueOf(decoid);
//		} catch (Exception e) {
//			log.error("Invalid Number Format!", e);
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_JSON_FORMAT, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		GetByClassAndGroupRequest request = new GetByClassAndGroupRequest();
		
		JSONObject json = null;
		
		try {
			json = new JSONObject(jsonStr);
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
		
		GetByClassAndGroupService service = new GetByClassAndGroupService();
		
		return service.runService(request ); 
	}

}
