package com.els.romenext.api.node.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.GetAllEndNodesAndEdgesSimplifiedRequest;
import com.els.romenext.api.node.resp.GetAllNodesAndEdgesResponse;
import com.els.romenext.api.utils.EdgeUtils;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

/**
 * NOTE: I am worried that this current service method ONLY does a UUID search and NOT a label search!!!
 * 
 * TODO: See if this is being used by anyone
 * @author jlee
 *
 */
public class GetAllEndNodesAndEdgesSimplifiedService {
	
	private static Logger log = Logger.getLogger(GetAllEndNodesAndEdgesSimplifiedService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public GetAllEndNodesAndEdgesSimplifiedService () {

	}
	
	public GetAllEndNodesAndEdgesSimplifiedService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(GetAllEndNodesAndEdgesSimplifiedRequest req, Long repoId) {
		
		GetAllNodesAndEdgesResponse response = new GetAllNodesAndEdgesResponse();
		
		ResponseBuilder responseBuilder;
		
		MetadataRepoContainerDao metadataRepoContainerDao = new MetadataRepoContainerDao(req.namespace);
		MetadataRepoContainer metadataRepoContainer = metadataRepoContainerDao.get(repoId);
		if (metadataRepoContainer == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// create neo4j server instance connection
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepoContainer.getIp(), 
																					  metadataRepoContainer.getUsername(), 
																					  metadataRepoContainer.getPassword(), 
																					  req.namespace);
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(metadataRepoContainer.getIp(), 
																									  metadataRepoContainer.getUsername(), 
					                                                                                  metadataRepoContainer.getPassword(), 
					                                                                                  req.namespace);
		}
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		if (req.getTypeId() == null || StringUtils.isBlank(req.getNodeUuid())) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		Property uuidProperty = Property.buildNodeProperty("uuid", "STRING", req.getNodeUuid());
		uuidProperty.setName("uuid");
		List<Property> sysProperties = new ArrayList<Property>();
		sysProperties.add(uuidProperty);
		
		Node origNode = NodeBuilder.build(req.getTypeId(), null, sysProperties, null);
		
		Path path = relationshipCoreServices.getConnectionFrom(origNode, metadataRepoContainer);
		
		if (path == null) {
			path = new Path();
		}
		
		path.setNodes(NodeUtils.fixNodeObjectListForJsonResponse(path.getNodes()));
		path.setRelationships(EdgeUtils.fixEdgeObjectListForJsonResponse(path.getRelationships()));
		
		response.build(path.getNodes(), path.getRelationships());
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
	
	}

}
