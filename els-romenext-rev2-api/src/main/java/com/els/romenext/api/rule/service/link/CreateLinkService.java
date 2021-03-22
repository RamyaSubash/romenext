package com.els.romenext.api.rule.service.link;

import java.util.Date;
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
import com.els.romenext.api.rule.req.link.CreateLinkRequest;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.rule.RomeRuleDecoratorPropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.rule.RomeRuleDecoratorPropertyValue;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.util.node.NodeBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class CreateLinkService {

	private static Logger log = Logger.getLogger(CreateLinkService.class);

	public Response runService( CreateLinkRequest req, Long metadataId ) {

		ResponseBuilder responseBuilder;

		UserLogDao dao = new UserLogDao(req.namespace);
		dao.getEntityManagerUtil().getSession().clear();


		MetadataContainerDao mcDao = new MetadataContainerDao( req.namespace );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}


		// sanity check?
		RomeRuleDao ruleDao = new RomeRuleDao( req.namespace );

		RomeRule rule = new RomeRule();


		rule.setClassification( RomeRuleClassificationEnum.LINK );
		rule.setCreatedDate( new Date() );
		rule.setModifiedDate( new Date() );
		rule.setName( req.name );
		rule.setMetadata( mc );

		ruleDao.getTransaction().begin();
		ruleDao.insert( rule );
		ruleDao.getTransaction().commit();


		ruleDao.refresh( rule );

		// add the properties



		// if we have deco properties, grab the current deco properties for this given rule

		// add decorator Property values
		RomeDecoratorDao decoDao = new RomeDecoratorDao( req.namespace );

		// find the deco properties for the given decorator
		List<RomeDecorator> decoList = decoDao.findByNameAndGrouping("Logical", "LOGICALGROUP");

		// ONLY FOR LINKS, create default deco properties for this rule
		// only should be 1 decorator
		
		Map<String,Property> returnDecoProperties = new HashMap<>();
		if( decoList != null && decoList.size() > 0 ) {

			RomeDecorator romeDecorator = decoList.get( 0 );

			Map<Long, RomeRuleDecoratorPropertyValue> decoMap = new HashMap<>();
			// create a map
			for( RomeDecoratorProperty p : romeDecorator.getFields() ) {
				
				RomeRuleDecoratorPropertyValue ruleDecoProp = new RomeRuleDecoratorPropertyValue();

				ruleDecoProp.setRomeDecoratorProperty( p );
				ruleDecoProp.setValue( p.getDefaultValue() );
				ruleDecoProp.setRomeRule( rule );

				decoMap.put( p.getId(),  ruleDecoProp );
			}

			// check the current deco that were passed in for values
			if( req.decoratorProperties != null && req.decoratorProperties.size() > 0 ) {
				for( Property p : req.decoratorProperties ) {
					Long id = Long.valueOf( p.getId() );
					
					if( decoMap.containsKey( id ) ) {
						// update value
						decoMap.get( id ).setValue( p.getValue().toString() );
					}
				}
			}


			// insert values
			RomeRuleDecoratorPropertyValueDao ruleDecoPropDao = new RomeRuleDecoratorPropertyValueDao( req.namespace );

			try {
				ruleDecoPropDao.getTransaction().begin();
				for (RomeRuleDecoratorPropertyValue d : decoMap.values() ) {
					ruleDecoPropDao.insert( d );
				}
				ruleDecoPropDao.getTransaction().commit();

			} catch (Exception e) {
				log.error("Failed to save RomeDecoratorsToRomeType.", e );
				ruleDecoPropDao.getTransaction().rollback();
				return null;
			}
			

			for (RomeRuleDecoratorPropertyValue d : decoMap.values() ) {
				Property newProp = Property.build( d  );
				
				returnDecoProperties.put( newProp.getId(),  newProp );

			}
			
			
			
		}


		NodeBuilder builder = new NodeBuilder( req.namespace );

		Node ruleNode = builder.build( rule );

		// assign the deco properties
		ruleNode.setDecoProperties( returnDecoProperties );
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson( ruleNode )).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();

	}

}
