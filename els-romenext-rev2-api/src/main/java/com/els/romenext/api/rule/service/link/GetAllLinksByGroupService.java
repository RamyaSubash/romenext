package com.els.romenext.api.rule.service.link;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.log4j.Logger;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.rule.req.link.GetAllLinksByGroupRequest;
import com.els.romenext.core.CoreServices;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeGroupTypeDao;
import com.els.romenext.core.db.dao.log.UserLogDao;
import com.els.romenext.core.db.dao.permission.GroupDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GetAllLinksByGroupService {
	
	private static Logger log = Logger.getLogger(GetAllLinksByGroupService.class);
	
	public Response runService( GetAllLinksByGroupRequest req, Long metadataId ) {
		
		ResponseBuilder responseBuilder;
		
		UserLogDao dao = new UserLogDao( req.namespace );
		dao.getEntityManagerUtil().getSession().clear();
		
		MetadataContainerDao mcDao = new MetadataContainerDao(  req.namespace  );
		MetadataContainer mc = mcDao.get(metadataId);	
		if (mc == null) {
			log.error("No Metadata Found!");
			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.NO_METADATAREPO_FOUND, null).getResponseBuilder();
			return responseBuilder.build();
		}
		
		// get all types based on group
		GroupDao gDao = new GroupDao( req.namespace );
		Group g = gDao.findByHostAndName(req.grouphost, req.groupname);
		RomeGroupTypeDao rgtDao = new RomeGroupTypeDao( req.namespace );
		List<RomeGroupType> rgtList = rgtDao.findByGroup(g);
		List<Long> rtIdList = new ArrayList<Long>();
		for (RomeGroupType rgt : rgtList) {
			rtIdList.add(rgt.getRomeType().getId());
		}
		
		// retrieve all rules by group
		/**
		 * WE NEED TO ADD THE GRUOP TO RULES EVENTUALLY HERE
		 */
//		RomeRuleDao rrDao = new RomeRuleDao(username);
//		List<RomeRule> rrList = rrDao.findByMetadata(mc);
//		List<Long> resultRRIdList = new ArrayList<Long>();
//		for (RomeRule rr : rrList) {
//			boolean groupHasConnection = false;
//			for (RomeConnection rc : rr.getConnections()) {
//				if (rtIdList.contains(rc.getStartRomeType().getId()) && rtIdList.contains(rc.getEndRomeType().getId())) {
//					groupHasConnection = true;
//				}
//			}
//			
//			if (groupHasConnection == true) {
//				resultRRIdList.add(rr.getId());
//			}
//		}
		
		// retrieve all rules
		CoreServices coreServices = new CoreServices( req.namespace );
//		List<Node> rules = coreServices.getRootTypeNodes(RomeNodeClassEnum.RULE, mc.getId());
		
		
		Collection<Node> rules = coreServices.getRuleByClassification(RomeRuleClassificationEnum.LINK, mc.getId() );
		
		
		// filter rules by group
//		List<Node> resultRules = new ArrayList<Node>();
//		for (Node r : rules) {
//			if (resultRRIdList.contains(Long.valueOf(r.getId()))) {
//				resultRules.add(r);
//			}
//		}
		
//		if (CollectionUtils.isEmpty(resultRules)) {
//			responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.RETRIEVE_RULE_FAILED, null).getResponseBuilder();
//			return responseBuilder.build();
//		}
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		responseBuilder = ErrorResponse.build(ApiResponseState.SUCCESS, RomeNextResponseCodeEnum.SUCCESS, null).getResponseBuilder();
		responseBuilder.entity(gson.toJson(rules)).type(MediaType.APPLICATION_JSON);
		return responseBuilder.build();
		
	}

}
