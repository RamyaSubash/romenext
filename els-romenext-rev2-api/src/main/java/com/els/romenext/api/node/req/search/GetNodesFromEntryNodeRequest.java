package com.els.romenext.api.node.req.search;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.els.romenext.api.enums.EntryNodeSearchDirectionEnum;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.RomeCollectionUtils;

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
public class GetNodesFromEntryNodeRequest {
	
	private static Logger log = Logger.getLogger(GetNodesFromEntryNodeRequest.class);
	
	private EntryNodeRequest entryNode;
	
	private EntryNodeSearchDirectionEnum searchDirection;
	
	// the types you want to search against
	private List<Long> typeIds;
	
	// the connections you want to search against
	// currently unused
	private List<Long> connIds;
	
	private Integer min = null;
	private Integer max = null;
	
	public EntryNodeRequest getEntryNode() {
		return entryNode;
	}

	public void setEntryNode(EntryNodeRequest entryNode) {
		this.entryNode = entryNode;
	}
	
	public EntryNodeSearchDirectionEnum getSearchDirection() {
		return searchDirection;
	}

	public void setSearchDirection(EntryNodeSearchDirectionEnum searchDirection) {
		this.searchDirection = searchDirection;
	}

	public List<Long> getTypeIds() {
		return typeIds;
	}

	public void setTypeIds(List<Long> typeIds) {
		this.typeIds = typeIds;
	}

	public List<Long> getConnIds() {
		return connIds;
	}

	public void setConnIds(List<Long> connIds) {
		this.connIds = connIds;
	}
	
	public Integer getMin() {
		return min;
	}

	public void setMin(Integer min) {
		this.min = min;
	}

	public Integer getMax() {
		return max;
	}

	public void setMax(Integer max) {
		this.max = max;
	}

	public String validateRequest(JSONObject json) {
		
		String empty = null;
				
		if( json.has("entryNode") ) {
			JSONObject en = json.getJSONObject( "entryNode" );
			empty = new EntryNodeRequest().validateRequest( en );
		}
		
		return empty;
	
	}
	
	public void parseRequest(JSONObject json) throws JSONException {

		entryNode = new EntryNodeRequest();
		
		if (json.has("entryNode")) {
			JSONObject entryNodeJson = json.getJSONObject("entryNode");
			entryNode.parseRequest( entryNodeJson );
		}
		
		searchDirection = null;
		if (json.has("searchDirection")) {
			searchDirection = EntryNodeSearchDirectionEnum.getEnum(json.getString("searchDirection"));
		}
		
		typeIds = new ArrayList<Long>();
		if (json.has("typeIds")) {
			JSONArray jsonArray = json.getJSONArray("typeIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					typeIds.add(jsonArray.getLong(i));
				}
			}
		}
		
		connIds = new ArrayList<Long>();
		if (json.has("connIds")) {
			JSONArray jsonArray = json.getJSONArray("connIds");
			if (jsonArray != null && jsonArray.length() > 0) {
				for (int i = 0; i < jsonArray.length(); i++) {
					connIds.add(jsonArray.getLong(i));
				}
			}
		}
		
		if( json.has("min" ) ) {
			this.min = json.getInt( "min" );
		}
		
		if( json.has("max" ) ) {
			this.max = json.getInt( "max" );
		}
	}
	
	public Response preprocessor() {		
		
		ResponseBuilder responseBuilder;
		
		Response response = entryNode.preprocessor();
		if (response != null) {
			return response;
		}
		
		if (CollectionUtils.isNotEmpty(this.typeIds)) {
			if (RomeCollectionUtils.containsDuplication(this.typeIds)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		if (CollectionUtils.isNotEmpty(this.connIds)) {
			if (RomeCollectionUtils.containsDuplication(this.connIds)) {
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.ILLEGAL_PARAMETER, null).getResponseBuilder();
				return responseBuilder.build();
			}
		}
		
		return null;
	
	}
	
}
