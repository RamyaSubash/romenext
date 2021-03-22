package com.els.romenext.api.node.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.CreateNodeByGroupRequest;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class CreateNodeByGroupService {
	
	private static Logger log = Logger.getLogger(CreateNodeByGroupService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public CreateNodeByGroupService () {

	}
	
	public CreateNodeByGroupService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(CreateNodeByGroupRequest req, Long metadata ) {
		
		ResponseBuilder responseBuilder;
		if (req == null || metadata == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// find metadata repo
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer metadataRepo = mrcDao.get(metadata); 
		if (metadataRepo == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		// create neo4j server instance connection
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(),  req.namespace );
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(),  req.namespace );
		}
//		NodeCoreServices nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getNeo4jInstance());
//		RelationshipCoreServices relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepo.getNeo4jInstance());
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}

		// first verify if the type exists
		Node type = coreServices.getTypeById(req.getTypeId());
		if (type == null) {
			log.error("Type Not Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// verify if the type contains the decos
		if (!req.getDecorators().contains(req.getDefaultDecoId())) {
			req.getDecorators().add(req.getDefaultDecoId());
		}
		if (!coreServices.typeHasDecosById(req.getTypeId(), req.getDecorators(), metadataRepo.getMetadata())) {
			log.error("No Type Decorator Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_DECORATOR_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// Complete deco properties (not being used)
//		List<Property> completeDecoProperties = new DecoUtils().completeDefaultDecoPropertyValuesForNodes(req.getTypeId(), req.getDecoProperties(), metadataRepo.getMetadata());

		Node inputNode = NodeBuilder.build(null, req.getTypeId(), req.getProperties(), req.getDecoProperties(), req.getDefaultDecoId());
		inputNode.setClassification(type.getClassification());
		Node node = nodeCoreServices.createNode(inputNode, metadataRepo);
		
		if (node == null) {
			log.error("Failed to Create a Node!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NODE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		List<Node> nodes = new ArrayList<Node>();
		nodes.add(node);
		nodes = NodeUtils.fixNodeObjectListForJsonResponse(nodes);
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(node)).type(MediaType.APPLICATION_JSON);
		
		return responseBuilder.build();
		
	}



}
