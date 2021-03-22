package com.els.romenext.api.workspace.req; 

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.node.req.search.EntryNodeRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.RomeJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.api.utils.property.PropertyValidatorUtils;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.node.PropertyUtils;

/**
 * Request for the searching based on entry node
 * 
 * should be:
 * 
 * ENTRY NODE : uuid/props/labels
 * 
 * @author jlee
 *
 */
public class UpdateWorkspaceRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(UpdateWorkspaceRequest.class);
	
	private GuiNodeRequestPayload workspaceNode;

	private List<Property> updatedProperties;
//	private List<Property> newDecoProperties;
//	private List<Property> newSysProperties;
	
	private List<GuiNodeRequestPayload> nodes;
	private List<EntryNodeRequest> edges;
	
	
	private Property backgroundImage;
	
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
	
	

	public List<GuiNodeRequestPayload> getNodes() {
		return nodes;
	}

	public List<Property> getUpdatedProperties() {
		return updatedProperties;
	}

	public void setUpdatedProperties(List<Property> updatedProperties) {
		this.updatedProperties = updatedProperties;
	}

	public void setWorkspaceNode(GuiNodeRequestPayload workspaceNode) {
		this.workspaceNode = workspaceNode;
	}

	public void setNodes(List<GuiNodeRequestPayload> nodes) {
		this.nodes = nodes;
	}

	public List<EntryNodeRequest> getEdges() {
		return edges;
	}

	public void setEdges(List<EntryNodeRequest> edges) {
		this.edges = edges;
	}
	
	

	public Property getBackgroundImage() {
		return backgroundImage;
	} 

	public GuiNodeRequestPayload getWorkspaceNode() {
		return workspaceNode;
	} 

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = RomeJSONUtils.findEmptyJson(json, "workspaceNode"  );
		if (empty != null) {
			return empty;
		} 
				
		if( json.has("nodes") ) {
//			JSONObject en = json.getJSONObject( "nodes" );
//			empty = new EntryNodeRequest().validateRequest( en );
			
			JSONObject jsonObject = json.getJSONObject( "nodes" );
			
			Iterator<String> keys = jsonObject.keys();
			
			while( keys.hasNext() ) {
				String next = keys.next();
				
				// should be a json object
				
				
				JSONObject jsonObj = (JSONObject) jsonObject.get( next );
				empty = new GuiNodeRequestPayload().validateRequest( jsonObj );
				
				if( empty != null ) {
					return empty;
				}
				
			}
			
//			JSONArray en = json.getJSONArray( "nodes" );
//			for( int i = 0; i < en.length(); i++ ) {
//				JSONObject jsonObj = (JSONObject) en.get( i );
//				empty = new EntryNodeRequest().validateRequest( jsonObj );
//				
//				if( empty != null ) {
//					return empty;
//				}
//			}
		}
		
		if( json.has("edges") ) {
//			JSONObject en = json.getJSONObject( "edges" );
//			empty = new EntryNodeRequest().validateRequest( en );
		}
		
		if( json.has("workspaceNode") ) { 
			
			JSONObject jsonObject = json.getJSONObject( "workspaceNode" );
			
			empty = new GuiNodeRequestPayload().validateRequest( jsonObject );
			
			if( empty != null ) {
				return empty;
			}
			
		}
		
		if (json.has("updatedProperties")) {
			JSONArray jsonArray = json.getJSONArray("updatedProperties");
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonProperty = jsonArray.getJSONObject(i);
				empty = RomeJSONUtils.findEmptyJson(jsonProperty, "propertyId", "propertyType" );
				if (empty != null) {
					return empty;
				}
			}
		}
	
		if( json.has("backgroundImage")) {
			JSONObject jsonProperty = json.getJSONObject("backgroundImage");

			empty = PropertyValidatorUtils.validateTraditionalPrpoertyField( jsonProperty );
			if( empty != null ) {
				return null;
			}
		}
		
		return empty;
	
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		if (json == null) {
			log.error("Missing Mandatory Data!");
			return;
		}
		
		super.parseRequest(json);
		
//		this.name = json.getString("name");
		
		this.nodes = new ArrayList<>();
		

		if (json.has("nodes")) {
			JSONObject jsonObject = json.getJSONObject( "nodes" );
			
			Iterator<String> keys = jsonObject.keys();
			
			while( keys.hasNext() ) {
				String next = keys.next();
				
				// should be a json object
				
				
				JSONObject jsonObj = (JSONObject) jsonObject.get( next );
				
				GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
				newNode.parseRequest( jsonObj );
				
				this.nodes.add( newNode );
				
			}
		}
		
		if (json.has("workspaceNode")) {
			JSONObject jsonObject = json.getJSONObject( "workspaceNode" );
			
			GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
			newNode.parseRequest( jsonObject );
			
			this.workspaceNode = newNode;
			
		}

		
		if (json.has("updatedProperties")) {
			
			List<Property> propertyList = PropertyJSONUtils.parseProperties(json.getJSONArray("updatedProperties"), Neo4jPropertyTypeEnum.TYPE);
			if (propertyList != null) {
				this.updatedProperties = new ArrayList<Property>();
				this.updatedProperties.addAll(propertyList);
			};
			 
		}
		
		if( json.has("backgroundImage")) {
			Property fileProperty = new Property();
			
			// create a property for this guy
			
			this.backgroundImage = PropertyJSONUtils.parseTypePropertyJSONObject( json.getJSONObject("backgroundImage" ) );
//			fileProperty = PropertyJSONUtils.parseTypePropertyJSONObject( json.getJSONObject("backgroundImage" ) );
			
//			fileProperty.setName("backgroundImage");
//			fileProperty.setPropertyType( ValueTypeEnum.FILE );
//			fileProperty.setValue( PropertyJSONUtils.parsePropertyValue( json.getJSONObject("backgroundImage"), ValueTypeEnum.FILE ));
			
			// thats it?y
			
			
		}
		
	}
	
	public Response preprocessor() {		
		
//		ResponseBuilder responseBuilder;
//		
//		Response response = entryNode.preprocessor();
//		if (response != null) {
//			return response;
//		}
//		
//		if (CollectionUtils.isNotEmpty(this.typeIds)) {
//			if (RomeCollectionUtils.containsDuplication(this.typeIds)) {
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
//		
//		if (CollectionUtils.isNotEmpty(this.connIds)) {
//			if (RomeCollectionUtils.containsDuplication(this.connIds)) {
//				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
//				return responseBuilder.build();
//			}
//		}
		
		return null;
	
	}
	
}
