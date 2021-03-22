package com.els.romenext.core.entity.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.els.romenext.core.db.entity.model.ModelShape;
import com.els.romenext.core.model.ModelShapeEnum;

public class RomeShape {

	public Long id;
	public Long model;
	public String shape;
	public boolean isConstruction;
	public Double x1;
	public Double y1;
	public Double z1;
	
	public Double x2;
	public Double y2;
	public Double z2;
	
	public Double x3;
	public Double y3;
	public Double z3;
	
	public Double height;
	public Double depth;
	public Double width;
	public Double angle;
	
	public Long parent;
	public Integer parentChildState;
	
	public Integer group;
	public String groupShape;
	
	public RomeModelProperty property;
	
	public Long groupShapeParent;
	
	public Integer shapeType;
	
	
	public RomeShape() {
		
	}
	
	public RomeShape(Long id, Long model, String shape, boolean isConstruction,
			Double x1, Double y1, Double z1, Double x2, Double y2, Double z2,
			Double x3, Double y3, Double z3, Double height, Double depth,
			Double width, Double angle, Long parent, Integer parentChildState,
			Integer group, String groupShape ) {
		this.id = id;
		this.model = model;
		this.shape = shape;
		this.isConstruction = isConstruction;
		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;
		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;
		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;
		this.height = height;
		this.depth = depth;
		this.width = width;
		this.angle = angle;
		this.parent = parent;
		this.parentChildState = parentChildState;
		this.group = group;
		this.groupShape = groupShape;
	}

	
	public static List<RomeShape> convert( Collection<ModelShape> oldShapes ) {
		
		List<RomeShape> shapes = new ArrayList<RomeShape>();
		
		for( ModelShape s : oldShapes ) {
			shapes.add( RomeShape.convert( s ) );
		}
		
		return shapes;
	}
	
	public static RomeShape convert( ModelShape shape ) {
		
		RomeShape s = new RomeShape();
		
		s.id = shape.getId();
		s.angle = shape.getAngle();
		s.depth = shape.getDepth();
		s.height = shape.getHeight();
		s.width = shape.getWidth();
		s.isConstruction = ( shape.getIsConstruction() == null ? false : shape.getIsConstruction() ); 
		s.model = shape.getModel().getId();
		
		if( shape.getShape() != null ) {
			ModelShapeEnum shapeEnum = ModelShapeEnum.getEnum( shape.getShape() );
			s.shape = shapeEnum.getValueType();
		}

		
		s.x1 = shape.getX1();
		s.y1 = shape.getY1();
		s.z1 = shape.getZ1();
		
		s.x2 = shape.getX2();
		s.y2 = shape.getY2();
		s.z2 = shape.getZ2();
		
		s.x3 = shape.getX3();
		s.y3 = shape.getY3();
		s.z3 = shape.getZ3();
		
		s.parent = ( shape.getShapeParent() != null ? shape.getShapeParent().getId() : null );
		s.parentChildState = shape.getParentChildState();
		s.groupShapeParent = shape.getGroupShapeParentId();
		
		s.group = shape.getGroup();
		
		if( shape.getGroupShape() != null ) {
			ModelShapeEnum groupShapeEnum = ModelShapeEnum.getEnum( shape.getGroupShape() );
			s.groupShape = groupShapeEnum.getValueType();
		}

		if( shape.getModelProperty() != null ) {
			s.property = RomeModelProperty.convert( shape.getModelProperty() );			
		}
		
		if (shape.getShapeType() != null) {
			s.shapeType = shape.getShapeType();
		}
		
		return s;
	}

}
