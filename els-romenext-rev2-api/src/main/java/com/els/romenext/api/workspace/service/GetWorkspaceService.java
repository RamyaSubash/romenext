package com.els.romenext.api.workspace.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.workspace.req.GetWorkspaceRequest;
import com.els.romenext.api.workspace.resp.GetWorkspaceResponse;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Graph;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class GetWorkspaceService {
	
	private static Logger log = Logger.getLogger(GetWorkspaceService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;

	public GetWorkspaceService () {

	}
	
	public GetWorkspaceService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
	}
	
	public Response runService( GetWorkspaceRequest req, Long repoId ) {
		
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
			log.error("No Workspace found for ! " + req.getWorkspaceNode() );
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
		
		Node workspaceNode = req.getWorkspaceNode().convert( req.namespace,  workspaceType );
		
		
		
		
		
		Map<String, Property> typeProperties = workspaceNode.getTypeProperties();
		Collection<Property> nodeTypeProps = null;
		if( typeProperties != null ) {
			nodeTypeProps = typeProperties.values();
		}
		List<Node> nodes = this.neo4jNodeServices.getNodesFromTypesAndSysProperties( workspaceType, nodeTypeProps , workspaceNode.getSysProperties().values(), mrc );
		
		// this should only be one?
		// but we'll return all of them
		
		
		GetWorkspaceResponse resp = new GetWorkspaceResponse();
		
		Node finalWorkspaceNode = null;
		if( nodes == null || nodes.size() == 0 ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
			responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
			return responseBuilder.build();
		} else {
			finalWorkspaceNode = nodes.get( 0 );
		}
		
		
		
		// try to retrieve all nodes that go from here
		Graph workspaceNodes = this.workspaceServices.getWorkspaceNodes(finalWorkspaceNode, mrc );
		
		if( workspaceNodes == null ) {
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
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

		
		resp.build( finalWorkspaceNode, workspaceNodes.getNodes(), workspaceNodes.getRelationships() );

		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
