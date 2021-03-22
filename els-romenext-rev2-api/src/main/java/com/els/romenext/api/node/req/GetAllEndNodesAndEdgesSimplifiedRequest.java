package com.els.romenext.api.node.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.GroupRequest;
import com.els.romenext.api.utils.RomeJSONUtils;

public class GetAllEndNodesAndEdgesSimplifiedRequest extends GroupRequest {
	
	private static Logger log = Logger.getLogger(GetAllEndNodesAndEdgesSimplifiedRequest.class);
	
	private Long typeId;
	private String nodeUuid;
	
	public Long getTypeId() {
		return typeId;
	}
	
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	
	public String getNodeUuid() {
		return nodeUuid;
	}
	
	public void setNodeUuid(String nodeUuid) {
		this.nodeUuid = nodeUuid;
	}
	
	public String validateRequest(JSONObject json) {
		
		String empty = null;
		
		empty = super.validateRequest(json);
		if( empty != null ) {
			return empty;
		}
		
		empty = RomeJSONUtils.findEmptyJson(json, "typeId", "nodeUuid" );
		
		return empty;
		
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		this.typeId = json.getLong("typeId");
		this.nodeUuid = json.getString("nodeUuid");
		
	}
	
	public Response preprocessor() {
		return null;
	}

}
