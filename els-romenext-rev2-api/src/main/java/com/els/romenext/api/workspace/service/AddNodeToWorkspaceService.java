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
import com.els.romenext.api.workspace.req.AddNodeToWorkspaceRequest;
import com.els.romenext.api.workspace.req.UpdateWorkspaceRequest;
import com.els.romenext.api.workspace.resp.AddNodeToWorkspaceResponse;
import com.els.romenext.api.workspace.resp.GetWorkspaceResponse;
import com.els.romenext.api.workspace.util.WorkspaceTypeUtils;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.entity.flatstyle.Graph;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.neo4j.node.Neo4jNodeServices;
import com.els.romenext.core.neo4j.workspace.Neo4jWorkspaceServices;
import com.els.romenext.core.util.node.NodeBuilder;

public class AddNodeToWorkspaceService {
	
	private static Logger log = Logger.getLogger(AddNodeToWorkspaceService.class);
	
	private Neo4jNodeServices neo4jNodeServices = null;
	private Neo4jWorkspaceServices workspaceServices = null;
	private NodeCoreServices nodeCoreServices = null;

	public AddNodeToWorkspaceService () {

	}
	
	public AddNodeToWorkspaceService (Neo4jNodeServices neo4jNodeServices, Neo4jWorkspaceServices workspaceServices, NodeCoreServices nodeCoreServices ) {
		this.neo4jNodeServices = neo4jNodeServices;
		this.workspaceServices = workspaceServices;
		this.nodeCoreServices = nodeCoreServices;
	}
	
	public Response runService( AddNodeToWorkspaceRequest req, Long repoId ) {
		
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

		
		List<Node> toAddNodes = new ArrayList<>();
		
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
					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_ADD_NODE_FAILED_FOUND_MULTIPLE_TO_ADD, null).getResponseBuilder();
					return responseBuilder.build();
				}
				
				// also ensure PERMISSIONS here
				// TODO: Check permissions
				
				toAddNodes.add( node.get( 0 ) );
			}
			
			
			
			
		} 
		
		WorkspaceTypeUtils utils = new WorkspaceTypeUtils( req.namespace );
		RomeType workspaceType = utils.addMissingWorkspaceType(mrc.getMetadata());
		workspaceType = utils.addMissingProperties(workspaceType);
		
		 
		
		
		// attempt to retrieve the current WORKSPACE edges from metadata
		// if NONE exists, insert a new connection 
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
		 * Just try to use the add if not exists
		 */
		Path check = this.workspaceServices.addNodesToWorkspaceNode(finalWorkspaceNode, toAddNodes, mrc);
		
		
		if( check == null ) {
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_ADD_NODE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		/**
		 * We originally got the nodes here, but now we search and delete all links 
		 */
		
		
		
		
		
		// try to retrieve all nodes that go from here
		Graph workspaceNodes = this.workspaceServices.getWorkspaceNodes(finalWorkspaceNode, mrc );
		
		if( workspaceNodes == null ) {
			log.debug("No workspace found");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		
		
		
		
		
//		/**
//		 * Delete all the current edges from this node
//		 */
//		this.workspaceServices.deleteWorkspaceNodeLinks(finalWorkspaceNode, mrc);
//		
//		
//		
//		// update any changes for the workspace like the name etc
////		this.neo4j updateNodeWithTypeProperties
//		
//		// note we are going to add the background image here if they pass it to us
//		List<Property> toUpdateProperties = new ArrayList<>();
//		if( req.getBackgroundImage() != null ) {
//			toUpdateProperties = req.getUpdatedProperties();
//			toUpdateProperties.add( req.getBackgroundImage() );
//		} else {
//			toUpdateProperties = req.getUpdatedProperties();
//		}
//		
//		this.nodeCoreServices.updateNodeWithTypeProperties(finalWorkspaceNode, req.getUpdatedProperties(), mrc );
//		
//		
//		// UPDATED: We update here now for the file property!
//		
//		
//		
//		// link new nodes
//		
//		
//		
//		/**
//		 * With WORKSPACES, we need to create:
//		 * 
//		 * MYSQL: RomeType of WORKSPACE
//		 * NEO4J: Create the instance of this workspace with this name, create edges for all NODES that are in side this WORKSPACE
//		 */
//		 
////		Node workspaceNode = builder.build(workspaceType);
////		
////		// grab the name property
////		List<RomeTypeProperty> fields = workspaceType.getFields();
////		Property nameProperty = null;
////		for( RomeTypeProperty p : fields ) {
////			if( p.getName().equalsIgnoreCase("name") ) {
////				nameProperty = Property.build( p );
////				break;
////			}
////		}
////		
////		if( nameProperty == null ) {
////			// This should never happen
////			log.error("Failed to Find a name proprty for workspaces??");
////			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_UNKNOWN, null).getResponseBuilder();
////			return responseBuilder.build();
////		}
////		
////		// assign the name
////		workspaceNode.updateTypeProperty( req.getName(), nameProperty );
////		
////		Node createdWorkspaceNode = this.workspaceServices.createWorkspaceNode(workspaceNode, mrc);
////		
////		if ( createdWorkspaceNode == null) {
////			log.error("Failed to Create a Workspace!!");
////			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.WORKSPACE_CREATION_FAILURE, null).getResponseBuilder();
////			return responseBuilder.build();
////		}
//		
//		
//		// if nodes were sent, we connect all those nodes to the given workspace
//		if( req.getNodes() != null && req.getNodes().size() > 0 ) {
//			
//			List<Node> toAddNodes = new ArrayList<>();
//			for( GuiNodeRequestPayload toAdd : req.getNodes() ) {
//				// find the node type
//				List<Long> types = toAdd.getTypes();
//				
//				RomeType nodeType = typeDao.findById( types.get( 0 ), mrc.getMetadata() );
//				
//				// what if there are multiple here? for now assume 1
//				Node convert = toAdd.convert( req.namespace, nodeType );
//				
//				toAddNodes.add( convert );
//			}
//			
//			
//			this.workspaceServices.addNodesToWorkspaceNode(finalWorkspaceNode, toAddNodes, mrc);
//			
//		}
		
		
		
		
		AddNodeToWorkspaceResponse resp = new AddNodeToWorkspaceResponse();

//		CreateWorkspaceResponse resp = new CreateWorkspaceResponse();
		
		resp.build( finalWorkspaceNode, workspaceNodes.getNodes(), workspaceNodes.getRelationships() );
		
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( resp )).type(MediaType.APPLICATION_JSON);
		
		
		return responseBuilder.build();
		
	}

}
