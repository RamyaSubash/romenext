package com.els.romenext.api.deco.service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.api.deco.req.GetByClassAndGroupRequest;
import com.els.romenext.api.deco.resp.GetByClassAndGroupResponse;
import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.enums.deco.RomeDecoratorClassification;
import com.els.romenext.core.entity.deco.TDecoProp;
import com.els.romenext.core.entity.deco.TDecorator;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.google.gson.Gson;

public class GetByClassAndGroupService {
	
	private static Logger log = Logger.getLogger(GetByClassAndGroupService.class);
	
	public Response runService( GetByClassAndGroupRequest req ) {
		
		
		ResponseBuilder responseBuilder;
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao( req.namespace );
		
		if( StringUtils.isEmpty( req.getClassification() ) || StringUtils.isEmpty( req.getGrouping() )) {
			log.error("DECORATOR_CLASS_UNKNOWN");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.MISSING_MANDATORY_DATA, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// get the classification
		RomeDecoratorClassification classify = RomeDecoratorClassification.valueOf( req.getClassification() );
		
		if( classify == null ) {
			log.error("DECORATOR_CLASS_UNKNOWN");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DECORATOR_CLASS_UNKNOWN, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		
		List<RomeDecorator> decos = rdDao.findByClassification(classify, req.getGrouping() );
		

		if( decos == null || decos.size() == 0 ) {
			// we should only get 1 deco
			log.error("NO_DECORATOR_FOUND");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_DECORATOR_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		if( decos != null && decos.size() > 1 ) {
			// we should only get 1 deco
			log.error("DECORATOR_INTERNAL_ERROR");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.DECORATOR_INTERNAL_ERROR, null).getResponseBuilder();
			return responseBuilder.build();
			
		}
		
		
		
		
		RomeDecorator rd = decos.get( 0 );
		
		TDecorator tempDeco = new TDecorator();
		tempDeco.id = rd.getId();
		tempDeco.name = rd.getName();
		tempDeco.decoProps = new ArrayList<TDecoProp>();
		
		
		
		for(RomeDecoratorProperty rdp : rd.getFields()) {
			
			TDecoProp newDecoProp = new TDecoProp();
			newDecoProp.id = rdp.getId();
			newDecoProp.name = rdp.getName();
			newDecoProp.propertyType = ValueTypeEnum.getEnum(rdp.getPropertyType()).toString();
			newDecoProp.minimumValue = rdp.getMinimumValue();
			newDecoProp.maximumValue = rdp.getMaximumValue();
			newDecoProp.defaultValue = rdp.getDefaultValue();
			newDecoProp.isRequired = rdp.getIsRequired();
			newDecoProp.mustBeUnique = rdp.getMustBeUnique();
			newDecoProp.isHidden = rdp.getIsHidden();
			newDecoProp.design = rdp.getDesign();
			newDecoProp.display = rdp.getDisplay();
			
			tempDeco.decoProps.add(newDecoProp);
				
		}
		
		GetByClassAndGroupResponse response = new GetByClassAndGroupResponse();

		response.decorator = tempDeco;
		
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(RomeGsonUtils.getDefaultGson().toJson(response)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
