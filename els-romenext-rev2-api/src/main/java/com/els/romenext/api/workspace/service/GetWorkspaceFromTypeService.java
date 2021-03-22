package com.els.romenext.api.workspace.service; 

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.api.workspace.req.GetWorkspaceFromTypeRequest;
import com.els.romenext.api.workspace.resp.GetWorkspaceResponse;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class GetWorkspaceFromTypeService {
	
	private static Logger log = Logger.getLogger(GetWorkspaceFromTypeService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;

	public GetWorkspaceFromTypeService () {

	}
	
	public GetWorkspaceFromTypeService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
	}
	
	public Response runService( GetWorkspaceFromTypeRequest req, Long repoId ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || repoId == null  ) {
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
		
		// retrieve the workspace TYPE that should have been created
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );
		
		
		RomeType workspaceType = typeDao.findInternalTypeByName( "_WORKSPACE" );
		
		if( workspaceType == null ) {
			// this has not been initialized yet
			// we could return an error, but since NO internal type has been created yet, NO WORKSPACE can be created so far either
			log.error("No workspace type initialized");
			log.error("No Workspace found for ! " + req.getTypeNode() );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if (this.neo4jNodeServices == null) {
			this.neo4jNodeServices = new Neo4jNodeServices(mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		if (this.workspaceServices == null) {
			this.workspaceServices = new Neo4jCoreServiceFactory().getWorkspaceServices( mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		
		if (neo4jNodeServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		
		
		// build the workspace node
		NodeBuilder builder = new NodeBuilder( req.namespace );
		
		// load the type so we can generate the node from it
		GuiNodeRequestPayload typeNode = req.getTypeNode();
		
		List<Long> typeIds = typeNode.getTypes();
		
		// should only be 1 here
		if( CollectionUtils.isEmpty( typeIds )  ) {
			// nothing we can do here, no way we can generate a proper type node
			log.error("Failed to Create a proper type node");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_GET_FAILED_INCORRECT_TYPE_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// we have at least 1, just grab the first one
		Long typeId = typeIds.get( 0 );
		
		RomeType romeType = typeDao.get( typeId );
		
		if( romeType == null ) {
			// nothing we can do here, no way we can generate a proper type node
			log.error("Failed to find the ropetype, and a proper type node");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_GET_FAILED_INCORRECT_TYPE_FORMAT, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		Node searchNode = req.getTypeNode().convert( req.namespace,  romeType );
		
		
		
		
		
//		Map<String, Property> typeProperties = workspaceNode.getTypeProperties();
//		Collection<Property> nodeTypeProps = null;
//		if( typeProperties != null ) {
//			nodeTypeProps = typeProperties.values();
//		}
		
		Long workspaceId = workspaceType.getId();
		List<Long> searchForList = new ArrayList<>();
		searchForList.add( workspaceId );
		
		/**
		 * When we search for nodes from a workspace, we do NOT want to search too far. It should really be a single hop FROM this node, otherwise you will load OTHER worspaces that are tied to other nodes attached to this
		 * node.
		 * 
		 * ie.
		 * WS1 -> Node1 <--- Node2 <- WS3 
		 *  	  ^
		 *  	  |
		 * WS2 ----
		 * 
		 * We really just want WS1 and WS2, but if the hop is not set to a max of 1, WS3 would be returned. 
		 * 
		 * 
		 */
		List<Node> nodes = this.neo4jNodeServices.getFromNodes( searchNode, searchForList, mrc, null, 1 );
		
		
		
		GetWorkspaceResponse resp = new GetWorkspaceResponse();
		
		Node finalWorkspaceNode = null;
		if( nodes == null || nodes.size() == 0 ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
		} 
		
		
		
		// try to retrieve all nodes that go from here
//		Graph workspaceNodes = this.workspaceServices.getWorkspaceNodes(finalWorkspaceNode, mrc );
//		
//		if( workspaceNodes == null ) {
//			log.debug("No workspace found");
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		// this path is not working correctly, we need to iterate over the relationships to find all the destination nodes
//		List<Node> destNodes = new ArrayList<Node>();
//		for( Relationship r : workspaceNodes.getRelationships() ) {
//			if( r.getDestinationNode() != null ) {
//				destNodes.add( r.getDestinationNode() );
//			}
//			
//			
//		}
//		
//		resp.build( finalWorkspaceNode, destNodes, null );

		
		resp.build( finalWorkspaceNode,nodes, null );

		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
