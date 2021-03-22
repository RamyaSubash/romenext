package com.els.romenext.api.edge.service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.edge.req.CreateEdgeRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.EdgeUtils;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.rel.RelationshipBuilder;
import com.google.gson.Gson;

public class CreateEdgeService {
	
	private static Logger log = Logger.getLogger(CreateEdgeService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public CreateEdgeService () {

	}
	
	public CreateEdgeService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(CreateEdgeRequest req, Long repoId, String username) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || repoId == null || username == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao(username);
		MetadataRepoContainer metadataRepo = mrcDao.get(repoId);
		if (metadataRepo == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices(username);
		
		// create neo4j server instance connection
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), username);
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), username);
		}
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		// check if the connection exists
		Relationship romeConnection = coreServices.getConnectionById(req.getConnection());
		if (romeConnection == null) {
			log.error("Connection Not Exists");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CONNECTION_NOT_EXISTS, null).getResponseBuilder();
			return responseBuilder.build();
		}			
		
		Relationship inputRel = RelationshipBuilder.build(romeConnection.getRuleId(), Long.parseLong(romeConnection.getId()), req.getEdgeProperties());
		Node sNode = NodeBuilder.build(Long.parseLong(req.getOriginType()), null, req.getOriginProperties(), null);
		Node eNode = NodeBuilder.build(Long.parseLong(req.getDestinationType()), null, req.getDestinationProperties(), null);
		Path path = relationshipCoreServices.createEdge(inputRel, sNode, eNode, metadataRepo);
		
		if (path == null) {
			log.error("Create Edge Failed");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_EDGE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		path.setNodes(NodeUtils.fixNodeObjectListForJsonResponse(path.getNodes()));
		path.setRelationships(EdgeUtils.fixEdgeObjectListForJsonResponse(path.getRelationships()));
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(path.getRelationships().get(0))).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
