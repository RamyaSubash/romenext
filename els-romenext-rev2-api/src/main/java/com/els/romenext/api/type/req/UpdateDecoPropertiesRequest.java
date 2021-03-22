package com.els.romenext.api.type.req;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.core.CoreRequest;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.NodeUtils;
import com.els.romenext.core.entity.flatstyle.Node;

public class UpdateDecoPropertiesRequest  extends CoreRequest {
	
	private static Logger log = Logger.getLogger(UpdateDecoPropertiesRequest.class);
	
	private List<Node> nodes;

	public List<Node> getNodes() {
		return nodes;
	}

	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}
	

	public String validateRequest(JSONObject json) {
		
		String validateRequest = super.validateRequest(json);
		
		if( validateRequest != null ) {
			return validateRequest;
		}
		
//		// TODO: permission need to be implemented
		String empty = null;
//		for (int i = 0; i < jsonArray.length(); i++) {
//			JSONObject json = jsonArray.getJSONObject(0);
//			empty = RomeJSONUtils.findEmptyJson(json, "typeId", "decoId");
//			if (empty != null) {
//				return empty;
//			}
//		}
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		
		super.parseRequest(json);

		
		nodes = new ArrayList<Node>();
		
//		for (int i = 0; i < jsonArray.length(); i++) {
//			JSONObject json = jsonArray.getJSONObject(i);
//			Node nodeToAdd = NodeUtils.parseNodeJSONObjectForDecoView(json);
//			nodes.add(nodeToAdd);
//		}
		
	}
	
	public Response preprocessor() {
		
		// TODO: more verification logic could be added into this part
		// currently, I just checked if there is any duplicate property name
		if (nodes == null) {
			return null;
		}
		
		ResponseBuilder responseBuilder;
		
		if (NodeUtils.containsDuplication(nodes)) {
			log.error("Duplicate Types");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DUPLICATE_TYPE, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		for (Node nodeToAdd : nodes) {
		
			if (nodeToAdd.getId() == null) {
				log.error("Bad Type" + nodeToAdd.getId());
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.BAD_TYPE_COORDINATES, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		return null;
		
	}

}
