package com.els.romenext.api.rule.service.link; 

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.link.UpdateLinkRequest;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.dao.rule.RomeRuleDecoratorPropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.entity.rule.RomeRuleDecoratorPropertyValue;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;

public class UpdateLinkService {
	
	private static Logger log = Logger.getLogger(UpdateLinkService.class);
	
	public Response runService( UpdateLinkRequest req , Long metaid ) {
		
		ResponseBuilder responseBuilder;
		
		
		
		
		CoreServices coreServices = new CoreServices( req.namespace );
		
		
		MetadataContainerDao metaDao = new MetadataContainerDao( req.namespace );
		MetadataContainer metaId = metaDao.get( metaid );
		if (metaId == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}

		// note for deco properties, they are limited via groups, so we need to grab the group
		// grab it here so we fail first in case the group is not found
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName( req.grouphost, req.groupname );
		
		if( g == null ) {
			log.error("The GROUP to Updated Not Exist: " );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_GROUP_FOUND, null).getResponseBuilder();
			return responseBuilder.build();		
		}
		
		// get the Link 
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );
		
		RomeRule romeRule = ruleDao.get( req.linkId );
		
		// first check if the type to updated exists or not
		if( romeRule == null ) {
			log.error("The Rule to Updated Not Exist: " + req.linkId );
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.LINK_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}

		RomeRuleDecoratorPropertyValueDao decoPropDao = new RomeRuleDecoratorPropertyValueDao( req.namespace );

		if( req.decoratorProperties != null && req.decoratorProperties.size() > 0 ) {
			// grab the current properties
			
			
			List<RomeRuleDecoratorPropertyValue> currentDecoProps = decoPropDao.findByRomeRule( romeRule );
			Map<Long,RomeRuleDecoratorPropertyValue> currentDecoProps_map = new HashMap<>();

			for( RomeRuleDecoratorPropertyValue d : currentDecoProps ) {
				currentDecoProps_map.put( d.getRomeDecoratorProperty().getId(),  d );
			}
			
			List<RomeRuleDecoratorPropertyValue> updated = new ArrayList<>();
			// just take all the values as face value for now
			for( Property p : req.decoratorProperties ) {
				
				Long id = Long.valueOf( p.getId() );
				
				if( currentDecoProps_map.containsKey( id ) ) {
					// update the value
					RomeRuleDecoratorPropertyValue v = currentDecoProps_map.get( id );
					if( p.getValue() != null ) {
						v.setValue( p.getValue().toString() );						
					} else {
						v.setValue( null );
					}
					updated.add( v );
				}
				
			}
			
			// save all the proeprties
			decoPropDao.getTransaction().begin();
			for( RomeRuleDecoratorPropertyValue toUpdate : updated ) {
				decoPropDao.save( toUpdate );
			}
			decoPropDao.getTransaction().commit();
		}
		
	
	
		NodeBuilder builder = new NodeBuilder( req.namespace );
		Node ruleNode = builder.build(  romeRule );
		
		// for sanity sake, retrieve it all again from the db
		List<RomeRuleDecoratorPropertyValue> currentDecoProps = decoPropDao.findByRomeRule( romeRule );

		for( RomeRuleDecoratorPropertyValue p : currentDecoProps ) {

			Property d = Property.build( p );
			ruleNode.addDecoProperty( d.getId(),  d );
		}
		
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson( ruleNode )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}


}
