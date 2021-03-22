package com.els.romenext.api.node.service.search;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.enums.EntryNodeSearchDirectionEnum;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.node.req.search.EntryNodeRequest;
import com.els.romenext.api.node.req.search.GetNodesFromEntryNodeRequest;
import com.els.romenext.api.node.resp.search.GetNodesFromEntryNodeResponse;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class GetNodesFromEntryNodeService {
	
	private static Logger log = Logger.getLogger(GetNodesFromEntryNodeService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	
	public GetNodesFromEntryNodeService () {

	}
	
	public GetNodesFromEntryNodeService (Neo4jNodeServices neo4jNodeServices) {
		this.neo4jNodeServices = neo4jNodeServices;
	}
	
	public Response runService(GetNodesFromEntryNodeRequest req, Long repoId, String namespace) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || repoId == null || namespace == null) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao(namespace);
		MetadataRepoContainer mrc = mrcDao.get(repoId);	
		if (mrc == null) {
			log.error("No Metadata Repo Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if (this.neo4jNodeServices == null) {
			this.neo4jNodeServices = new Neo4jNodeServices(mrc.getIp(), mrc.getName(), mrc.getPassword(), namespace);
		}
		if (neo4jNodeServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		EntryNodeRequest entryNode = req.getEntryNode();
		EntryNodeSearchDirectionEnum searchDirection = req.getSearchDirection();
		Node inputNode = NodeBuilder.build(req.getEntryNode().getTypes().get(0), entryNode.getProperties(), entryNode.getSystemProperties(), entryNode.getDecoProperties());
		
		List<Node> result = new ArrayList<Node>();
		
		if (searchDirection != null) {
			if (searchDirection.getSearchDirection().equals("PARENTS")) {
				result = this.neo4jNodeServices.getFromNodes(inputNode, req.getTypeIds(), mrc, req.getMin(), req.getMax() );
			} else if (searchDirection.getSearchDirection().equals("CHILDREN")) {
				result = this.neo4jNodeServices.getNodes(inputNode, req.getTypeIds(), mrc, req.getMin(), req.getMax() );
			} else if (searchDirection.getSearchDirection().equals("ALL")) {
				result = this.neo4jNodeServices.getAllNodes(inputNode, req.getTypeIds(), mrc, req.getMin(), req.getMax() );
			} else {
				log.error("Wrong Search Direction!");
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		} else {
			log.error("Wrong Search Direction!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
			return responseBuilder.build();
		}	
		
		result = NodeUtils.fixNodeObjectListForJsonResponse(result);
		
		GetNodesFromEntryNodeResponse response = new GetNodesFromEntryNodeResponse();
		response.build(result);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
