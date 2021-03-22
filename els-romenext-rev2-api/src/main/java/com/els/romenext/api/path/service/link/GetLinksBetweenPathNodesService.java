package com.els.romenext.api.path.service.link;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.path.req.link.GetLinksBetweenPathNodesRequest;
import com.els.romenext.api.path.resp.link.GetLinksBetweenPathNodesResponse;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.neo4j.path.Neo4jPathServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class GetLinksBetweenPathNodesService {
	
	private static Logger log = Logger.getLogger(GetLinksBetweenPathNodesService.class);
	
	private Neo4jPathServices neo4jPathServices = null;
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public GetLinksBetweenPathNodesService () {

	}
	
	public GetLinksBetweenPathNodesService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices, Neo4jPathServices neo4jPathServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
		this.neo4jPathServices = neo4jPathServices;
	}
	
	public Response runService( GetLinksBetweenPathNodesRequest req, Long metadata ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null || metadata == null) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// find metadata repo
		MetadataRepoContainerDao mrcDao = new MetadataRepoContainerDao( req.namespace );
		MetadataRepoContainer metadataRepo = mrcDao.get(metadata);
		
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
		if( this.neo4jPathServices == null ) {
			this.neo4jPathServices = new Neo4jCoreServiceFactory().getPathCoreServices( metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		 
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		if( req.getNodes().size() > 2 ) {
			log.error("Api call only supports 2 nodes for now");
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
		
		// build path node now
		NodeBuilder builder = new NodeBuilder( req.namespace );
		Node pathNode = builder.build( pathType );

		
		List<Node> toFindNodes = new ArrayList<>();
		
		// ensure that the nodes are actually inside the path?
		// for each node, do a check
		for( GuiNodeRequestPayload p : req.getNodes() ) {
			// convert payload to a node
			List<Long> types = p.getTypes();
			
			// we basically want to find the type 
			// look into this later
			RomeType tmp = null;
			if( types != null && types.size() == 1 ) {
				// only 1
				tmp = typeDao.get( types.get( 0 ) );
			} else {
				// find the node type
				for( Long l : types ) {
					tmp = typeDao.get( types.get( 0 ) );
					
					if( tmp.getClassificationEnum() == RomeTypeClassificationEnum.NODE ) {
						break;
					} else {
						tmp = null;
					}
				}
			}
			
			Node checkNode = null;
			if( tmp != null ) {
				checkNode = builder.build( tmp   );
			} 
			
			// add properties
			NodeBuilder.setTypePropertyIntoNode(checkNode, p.getProperties() );
			NodeBuilder.setSystemPropertyIntoNode( checkNode, p.getSystemProperties() );
			NodeBuilder.setDecoroatorPropertyIntoNode( checkNode, p.getDecoProperties() );
			
			Relationship rel = this.neo4jPathServices.getNodeInPathNode(pathNode, checkNode, metadataRepo);
			
			if( rel == null ) {
				// this node isn't in the path?
				log.error("Path does not contain this node! " + checkNode );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.PATH_INVALID_INPUTDATA, null).getResponseBuilder();
				return responseBuilder.build();
			}
			
			toFindNodes.add( checkNode );
		}

		
		
		Path links = this.neo4jPathServices.findLinksBetweenPathNodes(pathNode, toFindNodes, metadataRepo);
		
		
		GetLinksBetweenPathNodesResponse response = new GetLinksBetweenPathNodesResponse();
		
		response.paths = links;
		
		
		
		
		// from here, we know that all nodes exists inside path
		// we now search from node1 -> node2 for any links 
		
		// do we just search on all links?
		// create the nodes
		
//		Relationship rel = this.neo4jPathServices.getNodeInPathNode(pathNode, checkNode, metadataRepo);
//
//				
//		List<Node> nodeList = new ArrayList<Node>();
//		if (CollectionUtils.isNotEmpty(req.getTypeIds())) {
//			for (Long tId : req.getTypeIds()) {
//				String tn = coreServices.getTypeNameById(tId);
//				System.out.println("XXXXXXXXXXXXXXXXXXXXXX: " + tId + "XXXXXXXXXXXXXXXXXXXXxxxx: " + tn);
//				if (StringUtils.isEmpty(tn)) {
//					log.error("Type Not Found!");
//					responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_FOUND, null).getResponseBuilder();
//					return responseBuilder.build();
//				}
//				Node inputNode = NodeBuilder.build(tId, null);
//				List<Node> nodes = nodeCoreServices.getNodes(inputNode, metadataRepo);
//				if (CollectionUtils.isNotEmpty(nodes)) {
//					nodeList.addAll(nodes);
//				}
//			}
//		}
//		
//		List<Relationship> edgeList = new ArrayList<Relationship>();
//		if (CollectionUtils.isNotEmpty(req.getConnIds())) {
//			for (Long cId : req.getConnIds()) {
//				Relationship connection = coreServices.getConnectionById(cId);
//				Relationship rel = RelationshipBuilder.build(connection.getRuleId(), connection.getConnectionId(), null);
//				Node sNode = NodeBuilder.build(connection.getOriginId(), null);
//				Node eNode = NodeBuilder.build(connection.getDestinationId(), null);
//				Path path = relationshipCoreServices.getConnection(rel, sNode, eNode, metadataRepo);
//				
//				if (path != null) {
//					if (path.getNodes() != null) {
//						nodeList.addAll(path.getNodes());
//					}
//					if (path.getRelationships() != null) {
//						edgeList.addAll(path.getRelationships());
//					}
//				}
//			}
//		}
//		
//		// remove the duplicate nodes and edges
//		List<String> ids = new ArrayList<String>();
//		if (CollectionUtils.isNotEmpty(nodeList)) {
//		    for (int i = 0; i < nodeList.size(); i++) {
//		    	Node n = nodeList.get(i); 	    	
//		    	String id = n.getId();    	
//		    	if (ids.contains(id)) {
//		    		nodeList.remove(i);
//		    		i--;
//		    	} else {
//		    		ids.add(id);
//		    	}
//		    }
//		}
//		
//		ids = new ArrayList<String>();
//		if (CollectionUtils.isNotEmpty(edgeList)) {
//		    for (int i = 0; i < edgeList.size(); i++) {
//		    	Relationship r = edgeList.get(i); 	    	
//		    	String id = r.getId();    	
//		    	if (ids.contains(id)) {
//		    		edgeList.remove(i);
//		    		i--;
//		    	} else {
//		    		ids.add(id);
//		    	}
//		    }
//		}
//		
//		nodeList = NodeUtils.fixNodeObjectListForJsonResponse(nodeList);
//		edgeList = EdgeUtils.fixEdgeObjectListForJsonResponse(edgeList);
//		
//	    GetAllNodesAndEdgesResponse response = new GetAllNodesAndEdgesResponse();
//		response.build(nodeList, edgeList);
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( response )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}


