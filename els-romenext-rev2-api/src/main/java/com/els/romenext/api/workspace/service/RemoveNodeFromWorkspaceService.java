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
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.api.workspace.req.RemoveNodeFromWorkspaceRequest;
import com.els.romenext.api.workspace.resp.RemoveNodeFromWorkspaceResponse;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Graph;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;

public class RemoveNodeFromWorkspaceService {
	
	private static Logger log = Logger.getLogger(RemoveNodeFromWorkspaceService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;
	private NodeCoreServices nodeCoreServices = null;

	public RemoveNodeFromWorkspaceService () {

	}
	
	public RemoveNodeFromWorkspaceService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices, NodeCoreServices nodeCoreServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
		this.nodeCoreServices = nodeCoreServices;
	}
	
	public Response runService( RemoveNodeFromWorkspaceRequest req, Long repoId ) {
		
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
		
		
		if (this.neo4jNodeServices == null) {
			this.neo4jNodeServices = new Neo4jNodeServices(mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		if (this.workspaceServices == null) {
			this.workspaceServices = new Neo4jCoreServiceFactory().getWorkspaceServices( mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(  mrc.getIp(), mrc.getUsername(), mrc.getPassword(), req.namespace );
		}
		
		if (neo4jNodeServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( req.namespace );

		List<Node> nodesToDelete = new ArrayList<Node>();
		
		if( req.getNodes() != null && req.getNodes().size() > 0 ) {
			// check to ensure they have a type assigned to them
			for( GuiNodeRequestPayload p : req.getNodes() ) {
				
				
				if( p.getTypes() == null || p.getTypes().size() == 0 ) {
					log.error("Missing Mandatory Data, one of the nodes does not have an assigned type");
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				List<Long> types = p.getTypes();
				
				RomeType nodeType = typeDao.findById( types.get( 0 ), mrc.getMetadata() );
				
				// what if there are multiple here? for now assume 1
				Node convert = p.convert( req.namespace, nodeType );
				
				// also ensure we can find ALL these nodes
				List<Node> node = this.neo4jNodeServices.getNode( convert, mrc );
				
				if( node == null || node.size() == 0 ) {
					log.error("Missing Mandatory Data, one of the nodes could not be found," + p );
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				// fail if we find more than 1 node to add
				if( node.size() > 1 ) {
					log.error("Found more than 1 node to add," + p );
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_DELETE_NODE_FAILED_FOUND_MULTIPLE_TO_DELETE, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				// also ensure PERMISSIONS here
				nodesToDelete.add( node.get( 0 ) );
			}
			
			
			
			
		} 
		
		
		
		WorkspaceTypeUtils utils = new WorkspaceTypeUtils( req.namespace );
//		RomeType workspaceType = utils.addMissingWorkspaceType(mrc.getMetadata());
//		workspaceType = utils.addMissingProperties(workspaceType);
		
		RomeType workspaceType = utils.getWorkspaceBaseType( mrc.getMetadata() ); 
		
		
		// attempt to retrieve the current WORKSPACE edges from metadata
		// if NONE exists, insert a new connection
		
		
		// ensure this workspace even exists!
		
		
		
		
		/**
		 * FIRST DELETE THE OLD ONE
		 */
		// build the workspace node
		NodeBuilder builder = new NodeBuilder( req.namespace );
		
		
		Node oldWorkspace = req.getWorkspaceNode().convert( req.namespace,  workspaceType );
		
		
		
		
		
		Map<String, Property> typeProperties = oldWorkspace.getTypeProperties();
		Collection<Property> nodeTypeProps = null;
		if( typeProperties != null ) {
			nodeTypeProps = typeProperties.values();
		}
		List<Node> nodes = this.neo4jNodeServices.getNodesFromTypesAndSysProperties( workspaceType, nodeTypeProps , oldWorkspace.getSysProperties().values(), mrc );
		
		// this should only be one?
		// but we'll return all of them
		
		
		
		Node finalWorkspaceNode = null;
		if( nodes == null || nodes.size() == 0 ) {
			// if no workspace was found
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
			
//			responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//			responseBuilder.entity(new Gson().toJson( resp )).type(MediaType.APPLICATION_JSON);
//			return responseBuilder.build();
		} else {
			finalWorkspaceNode = nodes.get( 0 );
		}
		
		
		/**
		 * Do we care what we pass? Or just delete any of thenodes if found?
		 */
		boolean result = this.workspaceServices.removeNodesFromWorkspaceNode(finalWorkspaceNode, nodesToDelete, mrc);
		
		if( !result ) {
			log.debug("failed to get a good state after attempting to delete a node from a workspace");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_DELETE_NODE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// try to retrieve all nodes that go from here
		Graph workspaceNodes = this.workspaceServices.getWorkspaceNodes(finalWorkspaceNode, mrc );
		
		if( workspaceNodes == null ) {
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		} 
		
		
		RemoveNodeFromWorkspaceResponse resp = new RemoveNodeFromWorkspaceResponse(); 
		resp.build( finalWorkspaceNode, workspaceNodes.getNodes(), workspaceNodes.getRelationships() );
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		
		
		return responseBuilder.build();
		
	}

}
