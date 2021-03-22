package com.els.romenext.api.path.service;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.path.req.GetPathByTypeRequest;
import com.els.romenext.api.path.resp.GetPathByTypeResponse;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.neo4j.path.Neo4jPathServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class GetPathByTypeService {

	private static Logger log = Logger.getLogger(GetPathByTypeService.class);

//	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jPathServices pathServices = null;

	public GetPathByTypeService () {

	}

	public GetPathByTypeService (  Neo4jPathServices pathService) {
//		this.neo4jNodeServices = neo4jNodeServices;
		this.pathServices = pathService;

	}

	public Response runService( GetPathByTypeRequest req, Long repoId ) {

		ResponseBuilder responseBuilder;

		if ( req == null || repoId == null ) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer mrc = mrcDao.get(repoId);	
		if (mrc == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

//		if (this.neo4jNodeServices == null) {
//			this.neo4jNodeServices = new Neo4jNodeServices(mrc.getIp(), mrc.getName(), mrc.getPassword(), req.namespace);
//		}
		
		if( this.pathServices == null ) {
			this.pathServices = new Neo4jCoreServiceFactory().getPathCoreServices( mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}

		if (pathServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();

		}


		// sanity check to ensure this is a path
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		RomeType pathCheck = typeDao.get( req.getPathTypeId() );

		if ( pathCheck == null) {
			log.error("PATH Not Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PATH_NOT_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		if( !pathCheck.isPath() ) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PATH_INVALID_INPUTDATA, null).getResponseBuilder();
			return responseBuilder.build();
		}


		NodeBuilder builder = new NodeBuilder( req.namespace );

		Node pathNode = builder.build(pathCheck);

		//		Node inputNode = NodeBuilder.build(null, req.getPathId(), null, null, null );
		//		inputNode.setClassification( type.getClassification());


		
		
		List<Path> paths = this.pathServices.getAllPathFromType( pathCheck , mrc );

//		if ( paths == null) {
//			log.error("Failed to Create a Node!");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NODE_FAILED, null).getResponseBuilder();
//			return responseBuilder.build();
//		}


		for( Path p : paths ) {
			// fix the json response
			p.nodes = NodeUtils.fixNodeObjectListForJsonResponse( p.nodes );
		}

		GetPathByTypeResponse response = new GetPathByTypeResponse();
//		response.build(result);
		response.paths = paths;

		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();

	}

}
