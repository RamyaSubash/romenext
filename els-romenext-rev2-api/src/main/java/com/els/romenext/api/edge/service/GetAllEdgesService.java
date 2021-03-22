package com.els.romenext.api.edge.service; 

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.edge.req.GetAllEdgesRequest;
import com.els.romenext.api.edge.resp.link.GetAllEdgesResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.google.gson.Gson;

public class GetAllEdgesService {
	
	private static Logger log = Logger.getLogger(GetAllEdgesService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	private Neo4jNodeServices neo4jNodeServices = null;

	public GetAllEdgesService () {

	}
	
	public GetAllEdgesService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices,Neo4jNodeServices neo4jNodeServices ) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
		this.neo4jNodeServices = neo4jNodeServices;

	}
	
	public Response runService( GetAllEdgesRequest req, Long repoId ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || repoId == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer metadataRepo = mrcDao.get(repoId);
		
		if (metadataRepo == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		// create neo4j server instance connection
		if (this.neo4jNodeServices == null) {
			this.neo4jNodeServices = new Neo4jNodeServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace);
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		 
		if( req.connectionId == null ) {
			log.error("Connection ids for origin node are missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		RomeConnectionDao connDao = new RomeConnectionDao( req.namespace );
		
		RomeConnection romeConnection = connDao.get( req.connectionId );
		
		if( romeConnection == null ) {
			log.error("Rome Connection are missing");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_NOT_EXISTS, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		List<Long> connIds = new ArrayList<>();
		connIds.add( req.connectionId );
		
		
		Path path = this.relationshipCoreServices.getAllEdgesOfConnectionsSimplified(connIds, metadataRepo);
		
		if( path == null ) {
			// don't return error, just return empty 
			log.error("Path was null");
			path = new Path();
//			log.error("Getting the relationships failed");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.GET_EDGE_FAILED, null).getResponseBuilder();
//			return responseBuilder.build();
		}
		
		GetAllEdgesResponse resp = new GetAllEdgesResponse();
		
		if( CollectionUtils.isEmpty( path.getRelationships() ) ) {
			// do nothing
		} else {
			resp.relationships = path.getRelationships();
			
		}
		
		
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
