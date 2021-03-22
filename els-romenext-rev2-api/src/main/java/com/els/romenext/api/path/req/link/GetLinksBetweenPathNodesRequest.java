package com.els.romenext.api.path.req.link;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.PropertyJSONUtils;
import com.els.romenext.api.utils.payloads.GuiNodeRequestPayload;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;

public class GetLinksBetweenPathNodesRequest extends GroupRequest {

	private static Logger log = Logger.getLogger(GetLinksBetweenPathNodesRequest.class);
	
	private Long pathTypeId;
	private List<Property> pathNodeSysProperties;
	private List<GuiNodeRequestPayload> nodes;
	
	
	
	private Long nodeTypeId;
	private List<Property> nodeSysProperties;
	
	public Long getPathTypeId() {
		return pathTypeId;
	}

	public void setPathTypeId(Long pathTypeId) {
		this.pathTypeId = pathTypeId;
	}

	public List<Property> getPathNodeSysProperties() {
		return pathNodeSysProperties;
	}

	public void setPathNodeSysProperties(List<Property> pathNodeSysProperties) {
		this.pathNodeSysProperties = pathNodeSysProperties;
	}

	public Long getNodeTypeId() {
		return nodeTypeId;
	}

	public void setNodeTypeId(Long nodeTypeId) {
		this.nodeTypeId = nodeTypeId;
	}

	public List<Property> getNodeSysProperties() {
		return nodeSysProperties;
	}

	public void setNodeSysProperties(List<Property> nodeSysProperties) {
		this.nodeSysProperties = nodeSysProperties;
	}
	
	

	public List<GuiNodeRequestPayload> getNodes() {
		return nodes;
	}

	public void setNodes(List<GuiNodeRequestPayload> nodes) {
		this.nodes = nodes;
	}

	public String validateRequest(JSONObject json) {
		
		String coreRequest = super.validateRequest(json);

		if( coreRequest != null ) {
			return coreRequest;
		}
		
		String empty = null;
		
		if (!json.has("pathTypeId")) {
			return "pathTypeId";
		}
		
		if (!json.has("pathNodeSysProperties")) {
			return "pathNodeSysProperties";
		}
		
//		if (!json.has("nodeTypeId")) {
//			return "nodeTypeId";
//		}
//		
//		if (!json.has("nodeSysProperties")) {
//			return "nodeSysProperties";
//		}
		
		if( !json.has("nodes")) {
			return "nodes";
		} else {
			// we should ensure that there are 1 node at least
			JSONArray jsonArr = json.getJSONArray( "nodes" );
//			JSONObject jsonObject = json.getJSONObject( "nodes" );
			
			for( int i = 0 ; i < jsonArr.length(); i++ ) {
				JSONObject jsonObject = jsonArr.getJSONObject( i );
				empty = new GuiNodeRequestPayload().validateRequest( jsonObject );
				
				if( empty != null ) {
					return empty;
				}
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
		
		this.pathTypeId = json.getLong("pathTypeId");
		this.pathNodeSysProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("pathNodeSysProperties"), Neo4jPropertyTypeEnum.SYSTEM);
		
//		this.nodeTypeId = json.getLong("nodeTypeId");
//		this.nodeSysProperties = PropertyJSONUtils.parseProperties(json.getJSONArray("nodeSysProperties"), Neo4jPropertyTypeEnum.SYSTEM);
		
		
		if( json.has("nodes") ) {
			this.nodes = new ArrayList<GuiNodeRequestPayload>();
			
			
			JSONArray jsonArr = json.getJSONArray( "nodes" );
//			JSONObject jsonObject = json.getJSONObject( "nodes" );
			
			for( int i = 0 ; i < jsonArr.length(); i++ ) {
				JSONObject jsonObject = jsonArr.getJSONObject( i );
				
				GuiNodeRequestPayload newNode = new GuiNodeRequestPayload();
				newNode.parseRequest( jsonObject );
				
				this.nodes.add( newNode );
			}
			
		}
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate uuids
	
		ResponseBuilder responseBuilder;
		
		return null;
		
	}	

}
