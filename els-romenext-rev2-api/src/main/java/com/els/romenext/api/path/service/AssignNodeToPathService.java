package com.els.romenext.api.path.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.path.req.AssignNodeToPathRequest;
import com.els.romenext.api.path.resp.AssignNodeToPathResponse;
import com.els.romenext.api.utils.EdgeUtils;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.neo4j.path.Neo4jPathServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class AssignNodeToPathService {
	
	private static Logger log = Logger.getLogger(AssignNodeToPathService.class);
	
	private Neo4jPathServices neo4jPathServices = null;
	
	public AssignNodeToPathService () {

	}
	
	public AssignNodeToPathService ( Neo4jPathServices neo4jPathServices ) {
		this.neo4jPathServices = neo4jPathServices;
	}
	
	public Response runService( AssignNodeToPathRequest req, Long metadata ) {
		
		AssignNodeToPathResponse response = new AssignNodeToPathResponse();
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			log.error("Missing Mandatory Data!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataServices metadataServices = new MetadataServices( req.namespace );
		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(metadata);
		
		if (metadataRepo == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if (req.getPathTypeId() == null || req.getPathNodeSysProperties() == null || req.getNodeTypeId() == null || req.getNodeSysProperties() == null) {
			log.error("Path And Node Data Not Complete!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PATH_INVALID_INPUTDATA, null).getResponseBuilder();
			return responseBuilder.build();
		} 
		
		// sanity check
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		RomeType pathType = typeDao.get( req.getPathTypeId() );
		
		if ( !pathType.isPath() ) {
			log.error("Path was not a path!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PATH_INVALID_INPUTDATA, null).getResponseBuilder();
			return responseBuilder.build();
		}

		CoreServices coreServices = new CoreServices( req.namespace );
		
		if( this.neo4jPathServices == null ) {
			this.neo4jPathServices = new Neo4jCoreServiceFactory().getPathCoreServices( metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		
		if (this.neo4jPathServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		Node pathNode = NodeBuilder.build(req.getPathTypeId(), null);
		for (Property property : req.getPathNodeSysProperties()) {
			pathNode.addSysProperty(property.getName(), property);
		}
		
		
		pathNode.setClassification(coreServices.getTypeById(req.getPathTypeId()).getClassification());
		Node node = NodeBuilder.build(req.getNodeTypeId(), null);
		for (Property property : req.getNodeSysProperties()) {
			node.addSysProperty(property.getName(), property);
		}
		node.setClassification(coreServices.getTypeById(req.getNodeTypeId()).getClassification());
		
		List<Node> nodes = new ArrayList<Node>();
		nodes.add(node);

		Path results = this.neo4jPathServices.addNodeToPathNode(pathNode, nodes, metadataRepo);
		
		if (results == null) {
			log.error("Failed to assign node to path");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PATH_ASSIGNNODE_FAILED, null).getResponseBuilder();
			
//			responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//			responseBuilder.entity(new Gson().toJson(response)).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
//			results = new Path();
		}
		
		results.setNodes(NodeUtils.fixNodeObjectListForJsonResponse(results.getNodes()));
		results.setRelationships(EdgeUtils.fixEdgeObjectListForJsonResponse(results.getRelationships()));
		
		response.nodes = results.getNodes();
		response.edges = results.getRelationships();
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
