package com.els.romenext.api.node.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.GetAllNodesAndEdgesByGroupRequest;
import com.els.romenext.api.node.req.GetNodesAndEdgesSimplifiedRequest;
import com.els.romenext.api.node.resp.GetAllNodesAndEdgesResponse;
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

public class GetAllNodesAndEdgesByGroupService {
	
	private static Logger log = Logger.getLogger(GetAllNodesAndEdgesByGroupService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	 
	public GetAllNodesAndEdgesByGroupService() {
		
	}
	
	public GetAllNodesAndEdgesByGroupService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	
	public Response runService(GetAllNodesAndEdgesByGroupRequest req, Long metadata ) {
		
		ResponseBuilder responseBuilder;
		if (req == null || metadata == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// find metadata repo
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer metadataRepo = mrcDao.get(metadata);
//		MetadataServices metadataServices = new MetadataServices(); 
//		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(metadata);
		if (metadataRepo == null) {
			log.error("No Metadata Found!");
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
				
		List<Node> nodeList = new ArrayList<Node>();
		if (CollectionUtils.isNotEmpty(req.getTypeIds())) {
			for (Long tId : req.getTypeIds()) {
				String tn = coreServices.getTypeNameById(tId);
				if (StringUtils.isEmpty(tn)) {
					log.error("Type Not Found!");
					
					System.out.println("XXXXXXXXXXXXXXXXXXXXXX: " + tId + "XXXXXXXXXXXXXXXXXXXXxxxx: " + tn);
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
					return responseBuilder.build();
				}
				Node inputNode = NodeBuilder.build(tId, null);
				List<Node> nodes = nodeCoreServices.getNodes(inputNode, metadataRepo);
				if (CollectionUtils.isNotEmpty(nodes)) {
					nodeList.addAll(nodes);
				}
			}
		}
		
		List<Relationship> edgeList = new ArrayList<Relationship>();
		if (CollectionUtils.isNotEmpty(req.getConnIds())) {
			for (Long cId : req.getConnIds()) {
				Relationship connection = coreServices.getConnectionById(cId);
				Relationship rel = RelationshipBuilder.build(connection.getRuleId(), connection.getConnectionId(), null);
				Node sNode = NodeBuilder.build(connection.getOriginId(), null);
				Node eNode = NodeBuilder.build(connection.getDestinationId(), null);
				Path path = relationshipCoreServices.getConnection(rel, sNode, eNode, metadataRepo);
				
				if (path != null) {
					if (path.getNodes() != null) {
						nodeList.addAll(path.getNodes());
					}
					if (path.getRelationships() != null) {
						edgeList.addAll(path.getRelationships());
					}
				}
			}
		}
		
		// remove the duplicate nodes and edges
		List<String> ids = new ArrayList<String>();
		if (CollectionUtils.isNotEmpty(nodeList)) {
		    for (int i = 0; i < nodeList.size(); i++) {
		    	Node n = nodeList.get(i); 	    	
		    	String id = n.getId();    	
		    	if (ids.contains(id)) {
		    		nodeList.remove(i);
		    		i--;
		    	} else {
		    		ids.add(id);
		    	}
		    }
		}
		
		ids = new ArrayList<String>();
		if (CollectionUtils.isNotEmpty(edgeList)) {
		    for (int i = 0; i < edgeList.size(); i++) {
		    	Relationship r = edgeList.get(i); 	    	
		    	String id = r.getId();    	
		    	if (ids.contains(id)) {
		    		edgeList.remove(i);
		    		i--;
		    	} else {
		    		ids.add(id);
		    	}
		    }
		}
		
		nodeList = NodeUtils.fixNodeObjectListForJsonResponse(nodeList);
		edgeList = EdgeUtils.fixEdgeObjectListForJsonResponse(edgeList);
		
	    GetAllNodesAndEdgesResponse response = new GetAllNodesAndEdgesResponse();
		response.build(nodeList, edgeList);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
