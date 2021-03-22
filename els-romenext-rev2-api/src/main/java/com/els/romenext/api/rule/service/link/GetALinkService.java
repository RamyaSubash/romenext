package com.els.romenext.api.rule.service.link;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.link.GetAlinkRequest;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GetALinkService {
	
	private static Logger log = Logger.getLogger(GetALinkService.class);
	
	public Response runService(  GetAlinkRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		// sanity check?
		RomeRuleDao ruleDao = new RomeRuleDao(  req.namespace  );
		
		RomeRule rule = ruleDao.get( req.getLinkId() );
		
		if( rule == null ) {
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.LINK_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		ruleDao.refresh( rule );
		
		NodeBuilder builder = new NodeBuilder(  req.namespace  );

		Node ruleNode = builder.build( rule );
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson( ruleNode )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
