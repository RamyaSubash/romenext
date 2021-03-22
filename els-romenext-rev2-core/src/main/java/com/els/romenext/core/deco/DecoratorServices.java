package com.els.romenext.core.deco;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorPropertyDao;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.entity.deco.TDecoProp;
import com.els.romenext.core.entity.deco.TDecorator;
import com.els.romenext.core.enums.ValueTypeEnum;

public class DecoratorServices {
	
	private String namespace;
	private static Logger log = Logger.getLogger(DecoratorServices.class);
	
	public DecoratorServices( String namespace ) {
		this.namespace = namespace;
	}
	
	public List<TDecorator> getAllDecos() {
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao( this.namespace );
		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao( this.namespace );
		
		List<RomeDecorator> romeDecos = rdDao.getAll();
		
		if (CollectionUtils.isEmpty(romeDecos)) {
			
			Date date = new Date();
			
			RomeDecorator logical = new RomeDecorator();
			logical.setCreatedDate(date);
			logical.setModifiedDate(date);
			logical.setName("Logical");
			RomeDecorator physical = new RomeDecorator();
			physical.setCreatedDate(date);
			physical.setModifiedDate(date);
			physical.setName("Physical");
			RomeDecorator textual = new RomeDecorator();
			textual.setCreatedDate(date);
			textual.setModifiedDate(date);
			textual.setName("Textual");
			RomeDecorator geo = new RomeDecorator();
			geo.setCreatedDate(date);
			geo.setModifiedDate(date);
			geo.setName("Geo");
		
			try {
				rdDao.getTransaction().begin();
				rdDao.insert(logical);
				rdDao.insert(physical);
				rdDao.insert(textual);
				rdDao.insert(geo);
				rdDao.getTransaction().commit();
			} catch (Exception e) {
				log.error("Failed to Insert RomeDecorator.", e);
				rdDao.getTransaction().rollback();
				return null;
			}
			
			RomeDecorator newLogical = rdDao.findByName("Logical").get(0);
			RomeDecorator newTextual = rdDao.findByName("Textual").get(0);
			RomeDecorator newGeo = rdDao.findByName("Geo").get(0);
			
			RomeDecoratorProperty x = new RomeDecoratorProperty();
			x.setCreatedDate(date);
			x.setModifiedDate(date);
			x.setIsHidden(false);
			x.setIsRequired(true);
			x.setMustBeUnique(false);
			x.setDesign(true);
			x.setDisplay(true);
			x.setDefaultValue("0.0");
			x.setPropertyType(7);
			x.setName("x");
			x.setRomeDecorator(newLogical);
			RomeDecoratorProperty y = new RomeDecoratorProperty();
			y.setCreatedDate(date);
			y.setModifiedDate(date);
			y.setIsHidden(false);
			y.setIsRequired(true);
			y.setMustBeUnique(false);
			y.setDesign(true);
			y.setDisplay(true);
			y.setDefaultValue("0.0");
			y.setPropertyType(7);
			y.setName("y");
			y.setRomeDecorator(newLogical);
			RomeDecoratorProperty z = new RomeDecoratorProperty();
			z.setCreatedDate(date);
			z.setModifiedDate(date);
			z.setIsHidden(false);
			z.setIsRequired(true);
			z.setMustBeUnique(false);
			z.setDesign(true);
			z.setDisplay(true);
			z.setDefaultValue("0.0");
			z.setPropertyType(7);
			z.setName("z");
			z.setRomeDecorator(newLogical);
			
			RomeDecoratorProperty longitude = new RomeDecoratorProperty();
			longitude.setCreatedDate(date);
			longitude.setModifiedDate(date);
			longitude.setIsHidden(false);
			longitude.setIsRequired(true);
			longitude.setMustBeUnique(false);
			longitude.setDesign(false);
			longitude.setDisplay(true);
			longitude.setDefaultValue("0.0");
			longitude.setPropertyType(7);
			longitude.setName("longitude");
			longitude.setRomeDecorator(newGeo);
			RomeDecoratorProperty latitude = new RomeDecoratorProperty();
			latitude.setCreatedDate(date);
			latitude.setModifiedDate(date);
			latitude.setIsHidden(false);
			latitude.setIsRequired(true);
			latitude.setMustBeUnique(false);
			latitude.setDesign(false);
			latitude.setDisplay(true);
			latitude.setDefaultValue("0.0");
			latitude.setPropertyType(7);
			latitude.setName("latitude");
			latitude.setRomeDecorator(newGeo);
			
			RomeDecoratorProperty textualProp = new RomeDecoratorProperty();
			textualProp.setCreatedDate(date);
			textualProp.setModifiedDate(date);
			textualProp.setIsHidden(true);
			textualProp.setIsRequired(true);
			textualProp.setMustBeUnique(false);
			textualProp.setDesign(true);
			textualProp.setDisplay(false);
			textualProp.setDefaultValue("sth");
			textualProp.setPropertyType(13);
			textualProp.setName("textualProp");
			textualProp.setRomeDecorator(newTextual);
			
			try {
				rdpDao.getTransaction().begin();
				rdpDao.insert(x);
				rdpDao.insert(y);
				rdpDao.insert(z);
				rdpDao.insert(longitude);
				rdpDao.insert(latitude);
				rdpDao.insert(textualProp);
				rdpDao.getTransaction().commit();
			} catch (Exception e) {
				log.error("Failed to Insert RomeDecoratorProperty.", e);
				rdpDao.getTransaction().rollback();
				return null;
			}
			
		}
		
		romeDecos = rdDao.getAll();
		
		List<RomeDecoratorProperty> romeDecoProps = rdpDao.getAll();		
		
		Map<Long, TDecorator> map = new HashMap<Long, TDecorator>();
		
		for(RomeDecorator rd : romeDecos) {
			
			TDecorator tempDeco = new TDecorator();
			tempDeco.id = rd.getId();
			tempDeco.name = rd.getName();
			tempDeco.decoProps = new ArrayList<TDecoProp>();
			
			map.put(tempDeco.id,  tempDeco);
			
		}
		
		for(RomeDecoratorProperty rdp : romeDecoProps) {
			
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
			
			TDecorator deco = map.get(rdp.getRomeDecorator().getId());
			deco.decoProps.add(newDecoProp);
			map.put(rdp.getRomeDecorator().getId(), deco);
				
		}
		
//		rdDao.getEntityManagerUtil().closeEntityManager();
//		rdpDao.getEntityManagerUtil().closeEntityManager();
		
		return new ArrayList<TDecorator>(map.values());
	
	}
	
	public RomeDecorator getDecoById (Long decoId) {
		
		if (decoId == null) {
			return null;
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao( this.namespace );
		RomeDecorator rd = rdDao.get(decoId);
		
//		rdDao.getEntityManagerUtil().closeEntityManager();
		
		return rd;
		
	}

}
