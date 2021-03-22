package com.els.romenext.api.node.service;

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
import com.els.romenext.api.node.req.UpdateNodeRequest;
import com.els.romenext.api.node.resp.UpdateNodeResponse;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.RelationshipCoreServices;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.metadata.MetadataServices;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class UpdateNodeService {
	
	private static Logger log = Logger.getLogger(UpdateNodeService.class);
	
	private NodeCoreServices nodeCoreServices = null;
	private RelationshipCoreServices relationshipCoreServices = null;
	
	public UpdateNodeService () {

	}
	
	public UpdateNodeService (NodeCoreServices nodeCoreServices, RelationshipCoreServices relationshipCoreServices) {
		this.nodeCoreServices = nodeCoreServices;
		this.relationshipCoreServices = relationshipCoreServices;
	}
	
	public Response runService(UpdateNodeRequest req, Long repoid ) {
		
		ResponseBuilder responseBuilder;
		
		if (req == null) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		MetadataServices metadataServices = new MetadataServices( req.namespace );
		MetadataRepoContainer metadataRepo = metadataServices.getMetadataRepoContainerById(repoid);
		
		if (metadataRepo == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// verify if the type contains the decos
		if (CollectionUtils.isEmpty(req.getDecorators()) && req.getDefaultDecoId() != null) {
			if (!req.getDecorators().contains(req.getDefaultDecoId())) {
				req.getDecorators().add(req.getDefaultDecoId());
			}
			if (!coreServices.typeHasDecosById(req.getTypeId(), req.getDecorators(), metadataRepo.getMetadata())) {
				log.error("No Type Decorator Found!");
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_TYPE_DECORATOR_FOUND, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		if (this.nodeCoreServices == null) {
			this.nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices(metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (this.relationshipCoreServices == null) {
			this.relationshipCoreServices = new Neo4jCoreServiceFactory().getRelationshipCoreServices(  metadataRepo.getIp(), metadataRepo.getUsername(), metadataRepo.getPassword(), req.namespace );
		}
		if (nodeCoreServices == null || relationshipCoreServices == null) {
			log.error("Failed to Create Connection to Neo4j Server Instance!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.CREATE_NEO4J_SERVER_CONNECTION_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
			
		}

		// note: if no NEW properties/sysproperties/decoproperties exist....????
		if( CollectionUtils.isEmpty( req.getNewProperties() ) && CollectionUtils.isEmpty( req.getNewDecoProperties() ) && CollectionUtils.isEmpty( req.getNewSysProperties() )) {
			log.error("Failed to update node because no node matched");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_UPDATE_FAILED_NOTHINGTOUPDATE, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		Node inputNode = NodeBuilder.build(null, req.getTypeId(), req.getProperties(), req.getDecoProperties(), req.getDefaultDecoId());
		for (Property property : req.getSysProperties()) {
			inputNode.addSysProperty(property.getName(), property);
		}
		if (req.getModelId() != null) {
			inputNode.setModelId(req.getModelId());
		}
		if (req.getPartGroup() != null) {
			inputNode.setPartGroup(req.getPartGroup().intValue());
		}
		
		// BEFORE WE UPDATE
		// Check to see if this will amtch
		List<Node> sanityCheck = nodeCoreServices.getNodes(inputNode, metadataRepo);
		
		if( sanityCheck == null || sanityCheck.size() == 0 ) {
			log.error("Failed to update node because no node matched");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NODE_UPDATE_FAILED_NOMATCH, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		
		
		
		
		/**
		 * What the flip is going on here ?????
		 * 
		 */
		List<Node> tmpUpdatedNodes = new ArrayList<Node>();
		if (CollectionUtils.isNotEmpty(req.getNewProperties())) {
			tmpUpdatedNodes = nodeCoreServices.updateNodeWithTypeProperties(inputNode, req.getNewProperties(), metadataRepo);
		}
		
		// this should only return a single node????
		
		
		List<Node> nodes = new ArrayList<Node>();
		
		// note: we only updated the type properties, if there are new deco properties, we have to update that now
		if (CollectionUtils.isNotEmpty(req.getNewDecoProperties())) {
			
			if (CollectionUtils.isNotEmpty(tmpUpdatedNodes)) {
				if (tmpUpdatedNodes.size() == 1) {
					nodes = nodeCoreServices.updateNodeWithDecos(tmpUpdatedNodes.get(0), req.getNewDecoProperties(), metadataRepo);
				}
			} else {
				// ????? what the flip is this!??!?!
				// How can you run this against the original in the case there was multiple???
				nodes = nodeCoreServices.updateNodeWithDecos(inputNode, req.getNewDecoProperties(), metadataRepo);
			}

		} else {
			nodes.addAll(tmpUpdatedNodes);
		}
		
		
		
		
		
		
//		List<Property> inputProps = new ArrayList<Property>();
//		if (CollectionUtils.isNotEmpty(req.getNewProperties())) {
//			inputProps.addAll(req.getNewProperties());
//		}
//		if (CollectionUtils.isNotEmpty(req.getNewDecoProperties())) {
//			inputProps.addAll(req.getNewDecoProperties());
//		}
//		List<Node> nodes = nodeCoreServices.updateNode(inputNode, inputProps, metadataRepo);
		
		if (CollectionUtils.isEmpty(nodes)) {
			log.error("Missing Mandatory Data");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.UPDATE_NODE_FAILED, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		/**
		 * We have updated TYPE and DECO properties, we now need to update MODEL information if we need to
		 * 
		 * NOTE: we don't need to do any model stuff right now, so skip this.
		 * 
		 * TODO: Need to revisit this when adding back the model module
		 * 
		 */
//		List<Node> updatedNodes = new ArrayList<Node>();
//		if (req.getModelId() != null) { // req.getPartGroup() != null && 
//			
//			ModelService service = new ModelService( req.namespace );
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
//			} else {
////				nodes.get(0).setModelId(model.getId());
//			}
//			
//			updatedNodes = nodeCoreServices.updateNodeWithModel(nodes.get(0), model, groupPart, metadataRepo);
//			if (CollectionUtils.isEmpty(updatedNodes)) {
//				log.error("Failed to Model to a Node!");
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.UPDATE_NODE_FAILED, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//
//		}
		
		UpdateNodeResponse response = new UpdateNodeResponse();
		
		if (CollectionUtils.isEmpty(nodes)) {
			// i swear this can never happen?
			log.error("HOW CAN WE BE EMPTY HERE?");
			response.setNode( new Node() );
						
			
		} else {
			nodes = NodeUtils.fixNodeObjectListForJsonResponse(nodes);
			
			// should only return one?
			if( nodes.size() == 1 ) {
				response.setNode( nodes.get( 0 ) ); 
			} else {
				// How can we have multiple???
				log.error("WE FOUND MULTIPLE NODES TO RETURN???");
				for( Node n : nodes ) {
					log.error( "NODE: " + n );
				}
				// just return the first one
				response.setNode( nodes.get( 0 ));
			}
		}
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( response )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
		
//		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
//		
//		Gson gson = new GsonBuilder().setDateFormat( "yyyy-MM-dd HH:mm:ss zzz" ).create();
//		
//		responseBuilder.entity( gson.toJson(response)).type(MediaType.APPLICATION_JSON);
//		return responseBuilder.build();
//		return null;
	}

}
