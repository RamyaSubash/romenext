package com.els.romenext.api.type.service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.AddTypeDecoRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.metadata.MetadataServices;
import com.google.gson.Gson;

public class AddTypeDecoService {
	
	private static Logger log = Logger.getLogger(AddTypeDecoService.class);
	
	public Response runService(Long typeId, AddTypeDecoRequest req, Long metaId ) {
		
		ResponseBuilder responseBuilder;
		
		CoreServices coreServices = new CoreServices( req.namespace );
		MetadataServices metadataService = new MetadataServices( req.namespace );
//		MetadataRepoContainer repo = metadataService.getMetadataRepoContainerById(repoId);
		
		MetadataContainerDao dao = new MetadataContainerDao( req.namespace );
		MetadataContainer metadataContainer = dao.get( metaId );
		
		if (metadataContainer == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATA_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		
		// first check if the type to updated exists or not
		if(!coreServices.typeNodeExistsById(RomeNodeClassEnum.TYPE, typeId, metaId )) {
			log.error("The Type to Updated Not Exist: " + typeId);
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Node type = coreServices.addDecoToType(typeId, req.getDecorators(), metadataContainer );
		
		if (type == null) {
			log.error("Failed to Add Deco to Type");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ADD_DECORATOR_TO_TYPE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(type)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
