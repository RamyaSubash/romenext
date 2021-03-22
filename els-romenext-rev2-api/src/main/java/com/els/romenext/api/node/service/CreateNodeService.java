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
import com.els.romenext.api.node.req.CreateNodeRequest;
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

public class CreateNodeService {
	
	private static Logger log = Logger.getLogger(CreateNodeService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public CreateNodeService () {

	}
	
	public CreateNodeService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(CreateNodeRequest req, Long metadata, String username) {
		
		ResponseBuilder responseBuilder;
		if (req == null || metadata == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// find metadata repo
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao(username);
		MetadataRepoContainer metadataRepo = mrcDao.get(metadata);
//		MetadataServices metadataServices = new MetadataServices(); 
//		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(metadata);
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
		
//		List<Node> updatedNodes = new ArrayList<Node>();
//		if (req.getModelId() != null) { // req.getPartGroup() != null && 
//			ModelService service = new ModelService();
//			Model model = service.getModelById(req.getModelId());
//			if (model == null) {
//				log.error("No Rome Model Found!");
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MODEL_NOT_FOUND, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//			List<RomePart> groupPart = new ArrayList<RomePart>();
//			if (req.getPartGroup() != null) {
//				groupPart = service.getGroupPart(req.getModelId(), req.getPartGroup().intValue());
//				if (CollectionUtils.isEmpty(groupPart)) {
//					log.error("No Rome Part Found!");
//					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PART_NOT_FOUND, null).getResponseBuilder();
//					return responseBuilder.build();
//				}
////				boolean partRelCreated = relationshipCoreServices.createPartRel(new Relationship(), groupPart, nodes.get(0), metadataRepo);
////				if (!partRelCreated) {
////					log.error("Failed to Associate Part Node to a Node!");
////					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ASSOCIATE_PART_NODE_FAILED, null).getResponseBuilder();
////					return responseBuilder.build();
////				}
//
////				nodes.get(0).setModelId(groupPart.get(0).modelId);
////				nodes.get(0).setPartGroup(groupPart.get(0).group);
//			} else {
////				nodes.get(0).setModelId(model.getId());
//			}
//			
//			updatedNodes = nodeCoreServices.updateNodeWithModel(node, model, groupPart, metadataRepo);
//			if (CollectionUtils.isEmpty(updatedNodes)) {
//				log.error("Failed to Model to a Node!");
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.UPDATE_NODE_FAILED, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//
//		}
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		List<Node> nodes = new ArrayList<Node>();
		nodes.add(node);
		nodes = NodeUtils.fixNodeObjectListForJsonResponse(nodes);
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(node)).type(MediaType.APPLICATION_JSON);
//		if (CollectionUtils.isEmpty(updatedNodes)) {
//			List<Node> nodes = new ArrayList<Node>();
//			nodes.add(node);
//			nodes = NodeUtils.fixNodeObjectListForJsonResponse(nodes);
//			responseBuilder.entity(new Gson().toJson(node)).type(MediaType.APPLICATION_JSON);
//		} else {
//			updatedNodes = NodeUtils.fixNodeObjectListForJsonResponse(updatedNodes);
//			responseBuilder.entity(new Gson().toJson(updatedNodes.get(0))).type(MediaType.APPLICATION_JSON);
//		}
//		responseBuilder.entity(new Gson().toJson(updatedNodes.get(0))).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}



}
