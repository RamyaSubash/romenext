package com.els.romenext.core.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
//import org.apache.commons.lang.BooleanUtils;
//import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.dao.model.ModelDao;
import com.els.romenext.core.db.dao.model.ModelPropertyDao;
import com.els.romenext.core.db.dao.model.ModelShapeDao;
import com.els.romenext.core.db.dao.model.PartDao;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.entity.model.ModelProperty;
import com.els.romenext.core.db.entity.model.ModelShape;
import com.els.romenext.core.db.entity.model.Part;
import com.els.romenext.core.entity.model.RomeModel;
import com.els.romenext.core.entity.model.RomeModelProperty;
import com.els.romenext.core.entity.model.RomePart;
import com.els.romenext.core.entity.model.RomeShape;

public class ModelService {
	
	private static final Logger log = Logger.getLogger( ModelService.class );
	
	private String namespace;
	
	public ModelService( String namespace ) {
		this.namespace = namespace;
	}
	
	/**
	 * 
	 * @param typeName
	 * @param metadataId
	 * @param modelName
	 * @return
	 */
	public Model createModel( String typeName, Long metadataId, String modelName ) {
		
		// find the type to create model to
		if (metadataId == null || metadataId <= 0) {
			log.error("No Metada ID Found");
			return null;
		}
		
		if (StringUtils.isBlank(typeName)) {
			log.error("No Type Name Found");
			return null;
		}
		
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			log.error("No Metadata Found");
			return null;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType romeType = rtDao.findByUniqueName(typeName, metadata);
		if (romeType == null) {
			log.error("No Rome Type Found");
			return null;
		}
		
		// we need to create a model for this type

		Model m = new Model();
		
		m.setCreatedDate( new Date() );
		m.setModifiedDate( new Date() );
		m.setRomeType( romeType );
		m.setName( modelName );
		
		
		ModelDao mdao = new ModelDao();
		
		mdao.getTransaction().begin();
		mdao.insert( m );
		mdao.getTransaction().commit();
		
		mdao.getEntityManagerUtil().getSession().refresh( m );
//		mdao.getEntityManagerUtil().closeEntityManager();
		
		
		return m;
	}
	
	public Model createModel( Long typeId, Long metadataId, String modelName ) {
		
		// find the type to create model to
		if (metadataId == null || metadataId <= 0 || typeId == null || typeId <= 0 ) {
			log.error("No Metada ID Found ");
			return null;
		}
		
		if (StringUtils.isBlank(modelName)) {
			log.error("model name is null");
			return null;
		}
		
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			log.error("No Metadata Found");
			return null;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao();
		
		RomeType romeType = rtDao.get( typeId );
		if (romeType == null) {
			log.error("No Rome Type Found");
			return null;
		}
		
		// we need to create a model for this type

		Model m = new Model();
		
		m.setCreatedDate( new Date() );
		m.setModifiedDate( new Date() );
		m.setRomeType( romeType );
		m.setName( modelName );
		
		m.setShapes( new ArrayList<ModelShape>() );
		
		ModelDao mdao = new ModelDao();
		
		mdao.getTransaction().begin();
		mdao.insert( m );
		mdao.getTransaction().commit();
		
		mdao.getEntityManagerUtil().getSession().refresh( m );
		
		
		return m;
	}
	
	public Model createModelByRepo( Long typeId, Long repoId, String modelName ) {
		
		// find the type to create model to
		if (repoId == null || repoId <= 0 || typeId == null || typeId <= 0 ) {
			log.error("No Metada ID Found ");
			return null;
		}
		
		if (StringUtils.isBlank(modelName)) {
			log.error("model name is null");
			return null;
		}
		
		MetadataRepoContainerDao repoDao = new MetadataRepoContainerDao();
		
		MetadataRepoContainer repo = repoDao.get( repoId );
		
		
		if (repo == null) {
			log.error("No Repo Found");
			return null;
		}
		
		MetadataContainer metadata = repo.getMetadata();
		
		if (metadata == null) {
			log.error("No Metadata Found");
			return null;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao();
		
		RomeType romeType = rtDao.get( typeId );
		if (romeType == null) {
			log.error("No Rome Type Found");
			return null;
		}
		
		// we need to create a model for this type

		Model m = new Model();
		
		m.setCreatedDate( new Date() );
		m.setModifiedDate( new Date() );
		m.setRomeType( romeType );
		m.setName( modelName );
		
		m.setShapes( new ArrayList<ModelShape>() );
		
		ModelDao mdao = new ModelDao();
		
		mdao.getTransaction().begin();
		mdao.insert( m );
		mdao.getTransaction().commit();
		
		mdao.getEntityManagerUtil().getSession().refresh( m );
		
		
		return m;
	}
	
	public RomeShape createShape( Long model, String shape, 
			Boolean isConstruction,
			Double height, Double depth, Double width, 
			Double x1, Double y1, Double z1,  
			Double x2, Double y2, Double z2, 
			Double x3, Double y3, Double z3, 
			Double angle,
			Long parentReference,
			Integer parentChildState,
			Integer shapeType ) {
	
		// confirm shape
		ModelShapeEnum romeShape = ModelShapeEnum.getEnum( shape );
		
		if( romeShape == null ) {
			return null;
		}
		
		// find model
		ModelDao mdao = new ModelDao();
		
		Model m = mdao.get( model );
		
		if( m == null ) {
			return null;
		}
		
		ModelShapeDao shapeDao = new ModelShapeDao();
		
		List<ModelShape> shapes = m.getShapes();
		
		ModelShape parent = null;
		// if a parent reference is passed in, we must attempt to grab it
		if( parentReference != null && parentReference > 0 ) {
			parent = shapeDao.get( parentReference );
		}
		
		
		ModelShape newShape = this.createShapeFromParams(m, romeShape, isConstruction, height, depth, width, 
				x1, y1, z1, x2, y2, z2, x3, y3, z3, angle, parent, parentChildState, null, null );
		
		if (shapeType != null) {
			newShape.setShapeType(shapeType);
		}
		
		// try this other way
//		shapeDao.getTransaction().begin();
//		shapeDao.insert( newShape );
//		shapeDao.getTransaction().commit();
//		shapeDao.getEntityManagerUtil().getSession().refresh( newShape );
		
		shapes.add( newShape );
		
		// add the new shapes
		m.setShapes( shapes );
		
		
		mdao.getTransaction().begin();
		mdao.insert( m );
		mdao.getTransaction().commit();
		
		
		mdao.getEntityManagerUtil().getSession().refresh( m );
		
		
		
		
//		mdao.getEntityManagerUtil().closeEntityManager();
		
		RomeShape convert = RomeShape.convert( newShape );
		
		return convert;
	}
	
	
	
	
	
	public List<RomeShape> createNewGroupShape( Long model, String groupShape, 
			List<RomeShape> shapes ) {
	
		// find model
		ModelDao mdao = new ModelDao();
		
		Model m = mdao.get( model );
		
		if( m == null ) {
			return null;
		}
		
		ModelShapeDao shapeDao = new ModelShapeDao();
		
		List<ModelShape> currentShapes = m.getShapes();
		
		if( currentShapes == null ) {
			currentShapes = new ArrayList<ModelShape>();
		}
		
		// grab the new max group
		Integer max = shapeDao.getMaxShapeGroup( m );
		
		if( max == null ) {
			max = 1;
		} else {
			max = max + 1;
		}
		
		ModelShapeEnum groupShapeEnum = ModelShapeEnum.valueOf( groupShape );
		
		List<ModelShape> finalList = this.createGroupShapeList(m, groupShapeEnum, max, shapes);
		
		
		// now we save the shapes!
		shapeDao.getTransaction().begin();
		for( ModelShape s : finalList ) {
			shapeDao.insert( s );
			shapeDao.getEntityManagerUtil().getSession().refresh( s );
		}
		shapeDao.getTransaction().commit();
		
		List<RomeShape> convert = RomeShape.convert( finalList );
		
		return convert;
	}
	
	public List<RomeShape> updateGroupShape( Long model, Integer groupShapeId, 
			List<RomeShape> shapes ) {
	
		// find model
		ModelDao mdao = new ModelDao();
		
		Model m = mdao.get( model );
		
		if( m == null ) {
			return null;
		}
		
		ModelShapeDao shapeDao = new ModelShapeDao();
		
		List<ModelShape> currentShapes = m.getShapes();
		
		if( currentShapes == null ) {
			currentShapes = new ArrayList<ModelShape>();
		}
		
		List<ModelShape> foundShapes = shapeDao.getOnlyGroupShapes( m, groupShapeId );
		
		if( foundShapes == null ) {
			return null;
		}
		
		
		Map<Long, ModelShape> ordered = new HashMap<Long, ModelShape>();
		
		// reorder the list 
		for( ModelShape s : foundShapes ) {
			ordered.put( s.getId(), s );
		}
		
		// check the current shapes that were added to see which ones are found
		for( RomeShape r : shapes ) {
			
			ModelShape s = ordered.get( r.id );
			
			if( s == null ) {
				log.error("Attempted to update a shape that did not exist : " + r.id );
				return null;
			}
			
			// what to update here
			
			this.updateModelShapeWithRomeShape(s, r);
			
			
		}
		
		// are the shapes updated?
		// save all shapes
		
		
		// now we save the shapes!
		shapeDao.getTransaction().begin();
		for( ModelShape s : ordered.values() ) {
			shapeDao.save( s );
		}
		shapeDao.getTransaction().commit();
		
		// not we need to refresh the data
		for( ModelShape s : ordered.values() ) {
			shapeDao.getEntityManagerUtil().getSession().refresh( s );
		}

		
		List<RomeShape> convert = RomeShape.convert( ordered.values() );
		
		return convert;
	}
	
	public RomeModelProperty createProperty( Long modelId, 
			String name, 
			Integer propertyType,
			String minimumValue, String maximumValue,
			String defaultValue, 
			Boolean isRequired, Boolean mustBeUnique,
			Long romeTypeProperty,
			Integer parentChild, List<Long> shapeIds,
			Integer propertyModifierType, Integer propertyPostionType) {
	
		// note
		// modelId, name
		if( modelId == null || StringUtils.isEmpty( name ) ) {
			return null;
		}
		
		// load the model
		
		
		// find model
		ModelDao mdao = new ModelDao();
		
		Model m = mdao.get( modelId );
		
		if( m == null ) {
			return null;
		}
		
		RomeTypeProperty romeTypeProp = null;
		if( romeTypeProperty != null ) {
			// if there is a rome type property, try to load it
			RomeTypePropertyDao pdao = new RomeTypePropertyDao();
			
			romeTypeProp = pdao.get( romeTypeProperty );
			
			if( romeTypeProp == null ) {
				log.error("Failed to load this rome type property " + romeTypeProperty );
				return null;
			}
		}
		
		
		ModelProperty property = this.createPropertyFromParams(m, name, propertyType, minimumValue, maximumValue, defaultValue, isRequired, mustBeUnique, 
				romeTypeProp, parentChild, propertyModifierType, propertyPostionType );
		
		m.addField( property );
	
		
		mdao.getTransaction().begin();
		mdao.insert( m );
		mdao.getTransaction().commit();
		
		
		mdao.getEntityManagerUtil().getSession().refresh( m );
		
		// i think we need to refresh the property
		ModelPropertyDao propertyDao = new ModelPropertyDao();
		
		propertyDao.getEntityManagerUtil().getSession().refresh( property );
		
		// if there were shapes that were passed in, we are going to update those shapes to be a part of this shape
		if( shapeIds != null ) {
			List<ModelShape> updateShapes = new ArrayList<ModelShape>();
			ModelShapeDao shapeDao = new ModelShapeDao();
			
			for( Long id : shapeIds ) {				
				ModelShape shape = shapeDao.get( id );				
				shape.setModelProperty( property );				
				updateShapes.add( shape );
			}
			
			shapeDao.getTransaction().begin();
			for( ModelShape s : updateShapes ) {
				shapeDao.save( s );
			}
			shapeDao.getTransaction().commit();
			
			
		}
		
		RomeModelProperty convert = RomeModelProperty.convert( property );
		
		return convert;
	}
	
	
	public RomeShape updateShape( Long shapeId, 
			Boolean isConstruction,
			Double height, Double depth, Double width, 
			Double x1, Double y1, Double z1,  
			Double x2, Double y2, Double z2, 
			Double x3, Double y3, Double z3, 
			Double angle ) {
	
		if( shapeId == null || shapeId <= 0 ) {
			return null;
		}
		
		ModelShapeDao shapeDao = new ModelShapeDao();
		
		ModelShape shape = shapeDao.get( shapeId );
		
		if( shape == null ) {
			return null;
		}
		
		shape = this.updateShapeFromParams(shape, isConstruction, height, depth, width, x1, y1, z1, x2, y2, z2, x3, y3, z3, angle);
		
		
		
		
		shapeDao.getTransaction().begin();
		shapeDao.save( shape );
		shapeDao.getTransaction().commit();
		
		
		shapeDao.getEntityManagerUtil().getSession().refresh( shape );
//		shapeDao.getEntityManagerUtil().closeEntityManager();
		
		RomeShape convert = RomeShape.convert( shape );
		
		return convert;
	}
	
	public RomeShape updateShapeProperty( Long shapeId, Long propertyId ) {
		if( shapeId != null && shapeId <= 0 ) {
			return null;
		}
		
		ModelShapeDao sdao = new ModelShapeDao();
		
		ModelShape shape = sdao.get( shapeId );
		
		if( shape == null ) {
			return null;
		}
		
		
		ModelProperty updatedProperty = null;
		
		if( propertyId != null && propertyId > 0 ) {
			ModelPropertyDao propertyDao = new ModelPropertyDao();

			updatedProperty = propertyDao.get( propertyId );
		}
		
		shape.setModelProperty( updatedProperty );
		
		sdao.getTransaction().begin();
		sdao.save( shape );
		sdao.getTransaction().commit();
		
		sdao.getEntityManagerUtil().getSession().refresh( shape );
		

		return RomeShape.convert( shape );
	}
	
	public RomeModelProperty updateProperty( Long propertyId, 
			String name, 
			Integer propertyType,
			String minimumValue, String maximumValue,
			String defaultValue, 
			Boolean isRequired, Boolean mustBeUnique,
			Long romeTypeProperty,
			Integer parentChild,
			Integer propertyPositionType) {
	
		// note
		// modelId, name, and parentChild MUST be set
		if( propertyId == null || StringUtils.isEmpty( name ) || parentChild == null ) {
			return null;
		}
		
		// load the model
		
		
		// find model
		ModelDao mdao = new ModelDao();
		
		// load the current property
		ModelPropertyDao propDao = new ModelPropertyDao();
		
		ModelProperty property = propDao.get( propertyId );
		
		
		RomeTypeProperty romeTypeProp = null;
		if( romeTypeProperty != null ) {
			// if there is a rome type property, try to load it
			RomeTypePropertyDao pdao = new RomeTypePropertyDao();
			
			romeTypeProp = pdao.get( romeTypeProperty );
			
			if( romeTypeProp == null ) {
				log.error("Failed to load this rome type property " + romeTypeProperty );
				return null;
			}
		}
		
		ModelProperty updatedProperty = this.updateModelPropertyWithParams(property, name, propertyType, minimumValue, maximumValue, defaultValue, isRequired, mustBeUnique, romeTypeProp, parentChild, propertyPositionType);
		
		
		propDao.getTransaction().begin();
		propDao.save( updatedProperty );
		propDao.getTransaction().commit();
		
		propDao.getEntityManagerUtil().getSession().refresh( updatedProperty );
		
		
		
		
		RomeModelProperty convert = RomeModelProperty.convert( updatedProperty );
		
		return convert;
	}
	
	public RomePart createPart( Long modelId, Long modelPropertyId, 
			String name, 
			String value ) {
	
		// note
		if( modelId == null || StringUtils.isEmpty( name ) || modelPropertyId == null || StringUtils.isEmpty( value ) ) {
			return null;
		}
		
		

		// find model
		ModelDao mdao = new ModelDao();
		
		Model model = mdao.get( modelId );
		
		if( model == null ) {
			return null;
		}
		
		// load the current property
		ModelPropertyDao propDao = new ModelPropertyDao();
		
		ModelProperty property = propDao.get( modelPropertyId );
		
		if( property == null ) {
			return null;
		}
		
		
		PartDao dao = new PartDao();
		
		Part p = new Part();
		
		p.setCreatedDate( new Date() );
		p.setModel( model );
		p.setModelProperty( property );
		p.setModifiedDate( new Date() );
		p.setName( name );
		p.setValue( value );
		
		dao.getTransaction().begin();
		dao.insert( p );
		dao.getTransaction().commit();
		
		
		dao.getEntityManagerUtil().getSession().refresh( p );
		
		return RomePart.convert( p );
	}
	
	public List<RomePart> createGroupPart( Long modelId, List<RomePart> parts ) {
	
		// note
		if( modelId == null || parts == null ) {
			return null;
		}
		
		

		// find model
		ModelDao mdao = new ModelDao();
		
		Model model = mdao.get( modelId );
		
		if( model == null ) {
			return null;
		}
		
		// generate a new group part id
		PartDao dao = new PartDao();

		// grab current highest part
		Integer max = dao.findMaxGroupId( model );

		if( max == null ) {
			max = 1;
		} else {
			max = max + 1;
		}
		
		ModelPropertyDao propDao = new ModelPropertyDao();
		List<Part> finalParts = new ArrayList<Part>();
		// create new parts
		for( RomePart p : parts ) {
			
			// load the model property
			ModelProperty property = propDao.get( p.modelPropertyId );
			
			Part convert = new Part();
			
			convert.setCreatedDate( new Date() );
			convert.setModel( model );
			convert.setModelProperty( property );
			convert.setModifiedDate( new Date() );
			convert.setName( p.name );
			convert.setValue( p.value );
			
			convert.setGroup( max );
			
			finalParts.add( convert );
		}
		
		
		
	
		
		dao.getTransaction().begin();
		for( Part p : finalParts ) {
			dao.insert( p );			
		}
		dao.getTransaction().commit();
		
		for( Part p : finalParts ) {
			dao.getEntityManagerUtil().getSession().refresh( p );			
		}
		
		// rebuild the response
		List<RomePart> toReturn = new ArrayList<RomePart>();

		for( Part p : finalParts ) {
			toReturn.add( RomePart.convert(p) );
		}
		
		return toReturn;
	}
	
	public RomePart updatePart( Long partId, String name, String value ) {
	
		// note
		if( partId == null || StringUtils.isEmpty( name ) || StringUtils.isEmpty( value ) ) {
			return null;
		}
		
		
		
		PartDao dao = new PartDao();
		
		Part part = dao.get( partId );
		
		if( part == null ) {
			return null;
		}
		
		part.setName( name );
		part.setValue( value );
		
		dao.getTransaction().begin();
		dao.save( part );
		dao.getTransaction().commit();
		
		
		dao.getEntityManagerUtil().getSession().refresh( part );
		
		return RomePart.convert( part );
	}
	
	public List<RomePart> updatePartGroup( Long modelId, Integer group, List<RomePart> parts ) {

		// note
		if( modelId == null || parts == null  ) {
			return null;
		}

		ModelDao modelDao = new ModelDao();
		
		Model model = modelDao.get( modelId );
		
		if( model == null ) {
			return null;
		}
		
		PartDao dao = new PartDao();
		ModelPropertyDao modelPropDao = new ModelPropertyDao();
		
		List<Part> currentParts = dao.findByGroupPart(model, group);
		
		// map out parts
		Map<Long,Part> ordered = new HashMap<Long, Part>();
		for( Part p : currentParts ) {
			ordered.put( p.getId(),  p );
		}
		
		// build up the parts
		List<Part> toUpdate = new ArrayList<Part>();
		List<Part> toInsert = new ArrayList<Part>();
		
		for( RomePart p : parts ) {
			if( p.id == null ) {
				// we need to load the model property for this unfortunately
				ModelProperty modelProperty = modelPropDao.get( p.modelPropertyId );
				
				if( modelProperty == null ) {
					return null;
				}
				toInsert.add( RomePart.convert( p, model, modelProperty) );
			} else if( ordered.containsKey( p.id ) ) {
				Part part = ordered.get( p.id );
				
				part.setModifiedDate( new Date() );
				part.setName( p.name );
				part.setValue( p.value );
				
				toUpdate.add( part );
			} else {
				// note, we should never get an id that is NOT NULL and we cannot find it
				return null;
			}
		}
		

		dao.getTransaction().begin();
		for( Part p : toUpdate ) {
			dao.save( p );			
		}
		for( Part p : toInsert ) {
			dao.insert( p );
		}
		dao.getTransaction().commit();
		

		List<Part> toReturn = dao.findByGroupPart(model, group);

		return RomePart.convert( toReturn );
	}
	
	public List<RomePart> getParts( Long modelId ) {
	
		// note
		if( modelId == null  ) {
			return null;
		}
		
		

		// find model
		ModelDao mdao = new ModelDao();
		
		Model model = mdao.get( modelId );
		
		if( model == null ) {
			return null;
		}
		
		
		// load parts based on the model
		PartDao dao = new PartDao();

		List<Part> parts = dao.findByModel(model);
		
		
		return RomePart.convert( parts );
	}

	public List<RomePart> getGroupPart( Long modelId, Integer group ) {
		
		// note
		if( modelId == null || group == null  ) {
			return null;
		}
		
		

		// find model
		ModelDao mdao = new ModelDao();
		
		Model model = mdao.get( modelId );
		
		if( model == null ) {
			return null;
		}
		
		
		// load parts based on the model
		PartDao dao = new PartDao();

		List<Part> parts = dao.findByGroupPart(model, group);
		
		
		return RomePart.convert( parts );
	}
	
	public List<RomeShape> convertModelToChildEnabled( Long modelId, boolean copyToOther  ) {
		// load all the shapes
		if( modelId == null ) {
			return null;
		}



		// find model
		ModelDao mdao = new ModelDao();

		Model model = mdao.get( modelId );

		if( model == null ) {
			return null;
		}
		
		// we set model to child enabled
		if( BooleanUtils.isTrue( model.getChildEnabled() ) ) {
			// if this is true, this is bad!
			return null;
		}
		
		model.setChildEnabled( true );
		
		mdao.getTransaction().begin();
		mdao.save( model );
		mdao.getTransaction().commit();
		
		
		
		ModelShapeDao shapeDao = new ModelShapeDao();
		
		List<ModelShape> shapes = shapeDao.findByModel( model );
		
		// ensure all shapes are parents
		for( ModelShape shape : shapes ) {
			shape.setParentChildState( ModelShapeRelationshipEnum.PARENT.getInteralId() );
		}
		
		
		List<ModelShape> newShapes = new ArrayList<ModelShape>();
		
		if( copyToOther ) {
			for( ModelShape shape : shapes ) {
				
				ModelShape s = new ModelShape( shape );
				// remove the id
				s.setId( null );
				s.setParentChildState( ModelShapeRelationshipEnum.CHILD.getInteralId() );
				
				newShapes.add( s );
			}
		}
		
		// now we do all the inserting
		shapeDao.getTransaction().begin();
		for( ModelShape s : shapes ) {
			shapeDao.save( s );
		}
		for( ModelShape s : newShapes ) {
			shapeDao.insert( s );
		}
		shapeDao.getTransaction().commit();
		
		List<ModelShape> allShapes = shapeDao.findByModel( model );
		
		return RomeShape.convert( allShapes );
		
	}
	
	public RomePart getPartById (Long partId) {
		PartDao pDao = new PartDao();
		Part p = pDao.get(partId);
		if (p == null) {
			return null;
		}
		return RomePart.convert(p);
	}
	
	public List<RomeShape> getShapes( Long model ) {
		
		if( model == null ) {
			return null;
		}
		
		// find model
		ModelDao mdao = new ModelDao( this.namespace );
		
		Model m = mdao.get( model );
		
		if( m == null ) {
			return null;
		}
		
//		return RomeShape.convert( m.getShapes() );
		
		ModelShapeDao sdao = new ModelShapeDao( this.namespace );
		List<ModelShape> shapes = sdao.findByModel(m);
		
		return RomeShape.convert(shapes);
		
	}
	
	public List<RomeModelProperty> getPropertyAll( Long modelId ) {
		if( modelId == null ) {
			return null;
		}
		
		
		ModelDao modelDao = new ModelDao();
		
		Model model = modelDao.get( modelId );
		
		if( model == null ) {
			return null;
		}
		
		ModelPropertyDao dao = new ModelPropertyDao();
		
		List<ModelProperty> props = dao.findByModel(model);
		
		return RomeModelProperty.convert( props );
		
	}
	
	public List<RomeModel> getAllModelsAndShapes( String typename, Long metadataId ) {
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		MetadataContainerDao metaDao = new MetadataContainerDao( this.namespace );
		
		MetadataContainer metadata = metaDao.get( metadataId );
		
		RomeType type = typeDao.findByUniqueName(typename, metadata);
		
		return this.getAllModelsAndShapes( type );
	}
	
	public List<RomeModel> getAllModelsAndShapesByRepo( String typename, Long repoId ) {
		
		
		if( StringUtils.isEmpty( typename ) || repoId == null ) {
			return null;
		}
		
		MetadataRepoContainerDao repoDao = new MetadataRepoContainerDao( this.namespace );
		
		MetadataRepoContainer repo = repoDao.get( repoId );
		
		if( repo == null ) {
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		
		RomeType type = typeDao.findByUniqueName(typename, repo.getMetadata() );
		
		return this.getAllModelsAndShapes( type );
	}
	
	public List<RomeModel> getAllModelsAndShapes( Long typeId, Long metaId ) {
		
		
		if( typeId == null || metaId == null ) {
			return null;
		}
		
		MetadataContainerDao dao = new MetadataContainerDao( this.namespace );
		
//		MetadataRepoContainerDao repoDao = new MetadataRepoContainerDao( this.namespace );
//		MetadataRepoContainer repo = repoDao.get( repoId );
		
		MetadataContainer meta = dao.get( metaId );
		
		if( meta == null ) {
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao( this.namespace );
		RomeType type = typeDao.findById(typeId, meta);
		
//		RomeType type = typeDao.findByUniqueName(typename, repo.getMetadata() );
		
		return this.getAllModelsAndShapes( type );
	}
	
	public RomeModel getModelsByIdRepo( String typename, Long modelId, Long repoId ) {
		
		
		if( StringUtils.isEmpty( typename ) || repoId == null || modelId == null ) {
			return null;
		}
		
		MetadataRepoContainerDao repoDao = new MetadataRepoContainerDao();
		
		/**
		 * We should really be verifying that this is the correct type and repoid
		 * 
		 * I don't know how it would affect our return right now with repoid
		 */
//		MetadataRepoContainer repo = repoDao.get( repoId );
//		
//		if( repo == null ) {
//			return null;
//		}
//		
//		RomeTypeDao typeDao = new RomeTypeDao();
//		
//		RomeType type = typeDao.findByUniqueName(typename, repo.getMetadata() );
//		
//		
		
		ModelDao modelDao = new ModelDao();
		
		Model model = modelDao.get( modelId );
		
		return RomeModel.convert( model );
	}
	
	public List<RomeModel> getAllModelsAndShapes( Long typeId ) {
		
		if( typeId == null ) {
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao();
		
		RomeType type = typeDao.get( typeId );
		
		return this.getAllModelsAndShapes( type );
		
	}

	public List<RomeModel> getAllModelsAndShapes( RomeType type ) {
		
		if( type == null ) {
			return null;
		}
		
		// find model
		ModelDao mdao = new ModelDao( this.namespace );
		
		List<Model> models = mdao.findByRomeType( type );
		
		if( models == null ) {
			return null;
		}
		
		return RomeModel.convert( models );
		
	}
	
	public Model getModelById(Long modelId) {
		ModelDao mDao = new ModelDao();
		return mDao.get(modelId);
	} 
		
	
	
	
	private ModelShape updateShapeFromParams( ModelShape shape,
			Boolean isConstruction,
			Double height, Double depth, Double width, 
			Double x1, Double y1, Double z1,  
			Double x2, Double y2, Double z2, 
			Double x3, Double y3, Double z3, 
			Double angle ) {
		
		shape.setHeight( height );
		shape.setDepth( depth );
		shape.setWidth( width );
		
		shape.setX1( x1 );
		shape.setY1( y1 );
		shape.setZ1( z1 );
		
		shape.setX2( x2 );
		shape.setY2( y2 );
		shape.setZ2( z2 );
		
		shape.setX3( x3 );
		shape.setY3( y3 );
		shape.setZ3( z3 );
		
		return shape;
		
	}
	
//	private ModelShape createShapeFromParams( Model model, ModelShapeEnum groupShape, 
//			List<ModelShape> shapes ) {
//		
//		// ensure all shapes are set correctly
//		
//		
//		ModelShape s = new ModelShape();
//		
//		s.setModel(model);		
//		s.setShape( shape.getInteralId() );
//		s.setHeight( height );
//		s.setDepth( depth );
//		s.setWidth( width );
//		
//		s.setIsConstruction( isConstruction );
//		
//		s.setX1( x1 );
//		s.setY1( y1 );
//		s.setZ1( z1 );
//		
//		s.setAngle(angle);
//		
//		s.setShapeParent( parent );
//		s.setParentChildState( parentChildState );
//		
//		return s;
//		
//	}
	
	private List<ModelShape> createGroupShapeList( Model model, ModelShapeEnum groupShape, Integer groupid,
			List<RomeShape> shape ) {
		
		List<ModelShape> groupShapes = new ArrayList<ModelShape>();
		
		for( RomeShape s : shape ) {
			
			ModelShapeEnum modelShape = ModelShapeEnum.getEnum( s.shape );
			
			// for s.parent, we need to find the actual parent
			ModelShapeDao shapeDao = new ModelShapeDao();
			ModelShape parent = shapeDao.get( s.parent );
			ModelShape newShape = this.createShapeFromParams( model, modelShape, s.isConstruction, s.height, s.depth, s.width, 
					s.x1, s.y1, s.z1, s.x2, s.y2, s.z2, s.x3, s.y3, s.z3, 
					s.angle, parent, s.parentChildState, groupid, groupShape );
			
			if (s.groupShapeParent != null) {
				newShape.setGroupShapeParentId(s.groupShapeParent);
			}
			
			if (s.shapeType != null) {
				newShape.setShapeType(s.shapeType);
			}
			
			groupShapes.add( newShape );
		}
		
		return groupShapes;
		
	}
	
	private ModelShape createShapeFromParams( Model model, ModelShapeEnum shape, 
			Boolean isConstruction,
			Double height, Double depth, Double width, 
			Double x1, Double y1, Double z1,  
			Double x2, Double y2, Double z2, 
			Double x3, Double y3, Double z3, 
			Double angle,
			ModelShape parent,
			Integer parentChildState, 
			Integer groupId, 
			ModelShapeEnum groupShape ) {
		
		ModelShape s = new ModelShape();
		
		s.setModel(model);	
		if( shape != null ) {
			s.setShape( shape.getInteralId() );			
		}
		s.setHeight( height );
		s.setDepth( depth );
		s.setWidth( width );
		
		s.setIsConstruction( isConstruction );
		
		s.setX1( x1 );
		s.setY1( y1 );
		s.setZ1( z1 );
		
		s.setX2( x2 );
		s.setY2( y2 );
		s.setZ2( z2 );
		
		s.setAngle(angle);
		
		s.setShapeParent( parent );
		
		// note: 
		// if parentChildState is null
		// we default it to the PARENT
		s.setParentChildState( ( parentChildState == null ? ModelShapeRelationshipEnum.PARENT.getInteralId() : parentChildState ) );
		
		s.setGroup( groupId );
		if( groupShape != null ) {
			s.setGroupShape( groupShape.getInteralId() );
		}
		
		return s;
		
	}
	
	private ModelProperty createPropertyFromParams(  Model model, String name, 
			Integer propertyType,
			String minimumValue, String maximumValue,
			String defaultValue, 
			Boolean isRequired, Boolean mustBeUnique,
			RomeTypeProperty romeTypeProperty,
			Integer parentChild,
			Integer propertyModifierType,
			Integer propertyPositionType) {
		
		ModelProperty p = new ModelProperty();
		
		p.setCreatedDate( new Date() );
		p.setModifiedDate( new Date() );
		
		p.setModel( model );
		p.setDefaultValue( defaultValue );
		p.setIsRequired( isRequired );
		p.setMustBeUnique( mustBeUnique );
		p.setName( name );
		p.setParentChild( parentChild );
		p.setRomeTypeProperty(romeTypeProperty);
		p.setPropertyType( propertyType );
		
		p.setMinimumValue( minimumValue );
		p.setMaximumValue( maximumValue );
		
		p.setPropertyModifierType( propertyModifierType );
		p.setPropertyPositionType(propertyPositionType);
		
		return p;
		
	}
	
	private ModelProperty updateModelPropertyWithParams( ModelProperty property, String name, 
			Integer propertyType,
			String minimumValue, String maximumValue,
			String defaultValue, 
			Boolean isRequired, Boolean mustBeUnique,
			RomeTypeProperty romeTypeProperty,
			Integer parentChild, 
			Integer propertyPositionType ) {
		
		property.setModifiedDate( new Date() );
		
		property.setDefaultValue( defaultValue );
		property.setIsRequired( isRequired );
		property.setMustBeUnique( mustBeUnique );
		property.setName( name );
		property.setParentChild( parentChild );
		property.setRomeTypeProperty(romeTypeProperty);
		property.setPropertyType( propertyType );
		
		property.setMinimumValue( minimumValue );
		property.setMaximumValue( maximumValue );
		
		property.setPropertyPositionType(propertyPositionType);
		
		
		return property;
		
	}
	
	private void updateModelShapeWithRomeShape( ModelShape s, RomeShape r ) {
		
		s.setAngle( r.angle );
		s.setDepth( r.depth );
		s.setHeight( r.height );
		s.setWidth( r.width );
		s.setX1( r.x1 );
		s.setY1( r.y1 );
		s.setZ1( r.z1 );
		s.setX2( r.x2 );
		s.setY2( r.y2 );
		s.setZ2( r.z2 );
		s.setX3( r.x3 );
		s.setY3( r.y3 );
		s.setZ3( r.z3 );
		
	}
	
}
