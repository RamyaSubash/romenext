package com.els.romenext.api.type.service;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.type.req.UpdateDecoPropertiesRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.type.TypeService;
import com.google.gson.Gson;

public class UpdateDecoPropertiesService {
	
	private static Logger log = Logger.getLogger(UpdateDecoPropertiesService.class);
	private String namespace;

	
	public UpdateDecoPropertiesService( String namespace ) {
		this.namespace = namespace;
	}
	
	public Response runService(UpdateDecoPropertiesRequest req, Long repoId) {
		
		TypeService tServices = new TypeService( this.namespace );
		CoreServices coreServices = new CoreServices( req.namespace );
		MetadataServices metadataServices = new MetadataServices( req.namespace );
		
		ResponseBuilder responseBuilder;
		
		if (repoId == null || req == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataRepoContainer repo = metadataServices.getMetadataRepoContainerById(repoId);
		if (repo == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// check every type existence
		List<Node> typesToUpdate = req.getNodes();
		if (CollectionUtils.isNotEmpty(typesToUpdate)) {
			for (Node t : typesToUpdate) {
				// get the id
				Long nodeId = Long.parseLong( t.getId() );
				if (!coreServices.typeNodeExistsById(RomeNodeClassEnum.TYPE, nodeId, repo.getMetadata().getId())) {
					log.error("Type Not Exists");
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
					return responseBuilder.build();
				}
			}
		}
		
		List<Node> types = tServices.updateNodesCoordinates(typesToUpdate, repo.getMetadata().getId());
		
//		GetAllTypesResponse response = new GetAllTypesResponse();
//		response.build(types);
//		
//		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//		responseBuilder.entity(new Gson().toJson(response)).type(MediaType.APPLICATION_JSON);
//		return responseBuilder.build();
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(true)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
