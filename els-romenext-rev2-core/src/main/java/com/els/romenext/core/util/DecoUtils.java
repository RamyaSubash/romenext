package com.els.romenext.core.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorPropertyDao;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.ValueTypeEnum;

public class DecoUtils {
	
	private static Logger logger = Logger.getLogger(DecoUtils.class );
	
	@Deprecated
	public List<Property> completeDefaultDecoPropertyValuesForNodes (String typeName, List<Property> decoPropertyValues, MetadataContainer metadata) {
		
		if (StringUtils.isBlank(typeName) || metadata == null) {
			return null;
		}
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType romeType = rtDao.findByUniqueName(typeName, metadata);
		if (romeType == null) {
			return null;
		}
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao();
		List<RomeTypeRomeDecorator> rtrdList = rtrdDao.findByRomeType(romeType);
		if (CollectionUtils.isEmpty(rtrdList)) {
			return null;
		}
		List<Long> decoIds = new ArrayList<Long>();
		for (RomeTypeRomeDecorator rtrd : rtrdList) {
			if (rtrd != null || !decoIds.contains(rtrd.getRomeDecorator().getId())) {
				decoIds.add(rtrd.getRomeDecorator().getId());
			}
		}
		if (CollectionUtils.isEmpty(decoIds)) {
			return null;
		}
		
		List<Property> completeDecoValueList = new ArrayList<Property>();
		
		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
		if (CollectionUtils.isNotEmpty(decoPropertyValues)) {
			
			for (Property dpv : decoPropertyValues) {
				
				if (dpv != null && dpv.getRomeDecoPropId() != null) {
					RomeDecoratorProperty rdp = rdpDao.get(dpv.getRomeDecoPropId());
					if (rdp != null && rdp.getDisplay()) {
						if (dpv.getValue() == null && rdp.getDefaultValue() != null) {
							dpv.setValue(new ValueConvertor().convertStrToObj(rdp.getDefaultValue(), dpv.getPropertyType()));
						} 
						completeDecoValueList.add(dpv);
						decoIds.remove(rdp.getRomeDecorator().getId());
					}
				}
				
			}
			
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		if (CollectionUtils.isNotEmpty(decoIds)) {
			for (Long did : decoIds) {
				if (did == null) { continue; }
				List<RomeDecoratorProperty> rdpList = rdDao.get(did).getFields();
				for (RomeDecoratorProperty rdp : rdpList) {
					if (rdp == null || rdp.getDesign() == null || StringUtils.isEmpty(rdp.getName()) || StringUtils.isEmpty(rdp.getDefaultValue()) || !rdp.getDesign()) { continue; }
					Property dpv = new Property();
					dpv.setRomeDecoPropId(rdp.getId());
					dpv.setName(rdp.getName());
					dpv.setPropertyType(ValueTypeEnum.getEnum(rdp.getPropertyType()).toString());
					dpv.setValue(new ValueConvertor().convertStrToObj(rdp.getDefaultValue(), dpv.getPropertyType()));
					completeDecoValueList.add(dpv);
				}
					
			}
		}
		
		return completeDecoValueList;
		
	}
	
	public List<Property> completeDefaultDecoPropertyValuesForNodes (Long typeId, List<Property> decoPropertyValues, MetadataContainer metadata) {
		
		if (typeId == null || metadata == null) {
			return null;
		}
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType romeType = rtDao.get(typeId);
		if (romeType == null) {
			return null;
		}
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao();
		List<RomeTypeRomeDecorator> rtrdList = rtrdDao.findByRomeType(romeType);
		if (CollectionUtils.isEmpty(rtrdList)) {
			return null;
		}
		List<Long> decoIds = new ArrayList<Long>();
		for (RomeTypeRomeDecorator rtrd : rtrdList) {
			if (rtrd != null || !decoIds.contains(rtrd.getRomeDecorator().getId())) {
				decoIds.add(rtrd.getRomeDecorator().getId());
			}
		}
		if (CollectionUtils.isEmpty(decoIds)) {
			return null;
		}
		
		List<Property> completeDecoValueList = new ArrayList<Property>();
		
		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
		if (CollectionUtils.isNotEmpty(decoPropertyValues)) {
			
			for (Property dpv : decoPropertyValues) {
				
				if (dpv != null && dpv.getRomeDecoPropId() != null) {
					RomeDecoratorProperty rdp = rdpDao.get(dpv.getRomeDecoPropId());
					if (rdp != null && rdp.getDisplay()) {
						if (dpv.getValue() == null && rdp.getDefaultValue() != null) {
							dpv.setValue(new ValueConvertor().convertStrToObj(rdp.getDefaultValue(), dpv.getPropertyType()));
						} 
						completeDecoValueList.add(dpv);
						decoIds.remove(rdp.getRomeDecorator().getId());
					}
				}
				
			}
			
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		if (CollectionUtils.isNotEmpty(decoIds)) {
			for (Long did : decoIds) {
				if (did == null) { continue; }
				List<RomeDecoratorProperty> rdpList = rdDao.get(did).getFields();
				for (RomeDecoratorProperty rdp : rdpList) {
					if (rdp == null || rdp.getDesign() == null || StringUtils.isEmpty(rdp.getName()) || StringUtils.isEmpty(rdp.getDefaultValue()) || !rdp.getDesign()) { continue; }
					Property dpv = new Property();
					dpv.setRomeDecoPropId(rdp.getId());
					dpv.setName(rdp.getName());
					dpv.setPropertyType(ValueTypeEnum.getEnum(rdp.getPropertyType()).toString());
					dpv.setValue(new ValueConvertor().convertStrToObj(rdp.getDefaultValue(), dpv.getPropertyType()));
					completeDecoValueList.add(dpv);
				}
					
			}
		}
		
		return completeDecoValueList;
		
	}

}
