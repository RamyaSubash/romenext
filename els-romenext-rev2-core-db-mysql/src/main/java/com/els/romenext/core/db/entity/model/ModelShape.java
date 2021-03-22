package com.els.romenext.core.db.entity.model;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries ({
	@NamedQuery(name="ModelShape.findByName", query="SELECT p FROM ModelShape p WHERE p.name = :name "),
	@NamedQuery(name="ModelShape.findMaxGroupId", query="SELECT c.group FROM ModelShape c WHERE c.model = :model and c.group is not null ORDER BY group DESC "),
	@NamedQuery(name="ModelShape.findOnlyGroupShapes", query="SELECT c FROM ModelShape c WHERE c.model = :model and c.group is not null ORDER BY group"),
	@NamedQuery(name="ModelShape.findNonGroupShapes", query="SELECT c FROM ModelShape c WHERE c.model = :model and c.group is null"),
	@NamedQuery(name="ModelShape.findOnlyGroupShapesAndId", query="SELECT c FROM ModelShape c WHERE c.model = :model and c.group is not null and c.group = :group ORDER BY group"),
	@NamedQuery(name="ModelShape.findByModel", query="SELECT c FROM ModelShape c WHERE c.model = :model ORDER BY c.group")
})

@Entity
@Table(name = "els_romenext_model_shape")
public class ModelShape {
	
	public ModelShape() {
		
	}
	
	public ModelShape( ModelShape shape ) {
		
		this.id = shape.id;
		this.model = shape.model;
		this.name = shape.name;
		this.createdDate = shape.createdDate;
		this.modifiedDate = shape.modifiedDate;
		this.propertyType = shape.propertyType;
		this.minimumValue = shape.minimumValue;
		this.maximumValue = shape.maximumValue;
		this.defaultValue = shape.defaultValue;
		this.isRequired = shape.isRequired;
		this.mustBeUnique = shape.mustBeUnique;
		this.modelProperty = shape.modelProperty;
		this.shapeParent = shape.shapeParent;
		this.offsetUnits = shape.offsetUnits;
		this.shape = shape.shape;
		this.group = shape.group;
		this.groupShape = shape.groupShape;
		this.shapeType = shape.shapeType;
		this.x1 = shape.x1;
		this.y1 = shape.y1;
		this.z1 = shape.z1;
		this.x2 = shape.x2;
		this.y2 = shape.y2;
		this.z2 = shape.z2;
		this.x3 = shape.x3;
		this.y3 = shape.y3;
		this.z3 = shape.z3;
		this.height = shape.height;
		this.depth = shape.depth;
		this.width = shape.width;
		this.lineWidth = shape.lineWidth;
		this.rgb = shape.rgb;
		this.isHidden = shape.isHidden;
		this.isConstruction = shape.isConstruction;
		this.angle = shape.angle;
		this.parentChildState = shape.parentChildState;
		this.groupShapeParentId = shape.groupShapeParentId;
		
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@ManyToOne
	@JoinColumn(name="rome_model")
	private Model model;
	
	@Column(name="name")
	private String name;
	
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="modified_date")
	private Date modifiedDate;
	
	@Column(name="property_type")
	private int propertyType;
	
	@Column(name="minimum_value")
	private String minimumValue;
	
	@Column(name="maximum_value")
	private String maximumValue;
	
	@Column(name="default_value")
	private String defaultValue;

	@Basic
	@Column(name = "is_required", columnDefinition = "BIT", length = 1)
	private Boolean isRequired;

	@Basic
	@Column(name = "must_be_unique", columnDefinition = "BIT", length = 1)
	private Boolean mustBeUnique;
	
	
	/**
	 * use case 1:
	 * user assigns a model variable to the type value
	 * @return
	 */
	
	@ManyToOne
	@JoinColumn(name="rome_model_property", foreignKey=@ForeignKey(name="els_romenext_model_shape_ibfk_3"))
	private ModelProperty modelProperty;
	
	@ManyToOne
	@JoinColumn(name="rome_shape_parent")
	private ModelShape shapeParent;
	
	@Column(name="offset_units")
	private Integer offsetUnits;
	
	@Column(name="shape")
	private Integer shape;
	
	@Column(name="shapeGroup") // group id that is unique inside a model
	private Integer group;
	
	@Column(name="group_shape")
	private Integer groupShape; // enum to define what the shape this is, ex LINE or ARC
	
	@Column(name="shape_type")
	private Integer shapeType; // enum to define what the type of the shape this is, ex X_LINE, Y_LINE, or Z_LINE
	
	@Column(name="x1")
	private Double x1;
	
	@Column(name="y1")
	private Double y1;
	
	@Column(name="z1")
	private Double z1;

	@Column(name="x2")
	private Double x2;
	
	@Column(name="y2")
	private Double y2;
	
	@Column(name="z2")
	private Double z2;
	
	@Column(name="x3")
	private Double x3;
	
	@Column(name="y3")
	private Double y3;
	
	@Column(name="z3")
	private Double z3;
	
	@Column(name="height")
	private Double height;
	
	@Column(name="depth")
	private Double depth;
	
	@Column(name="width")
	private Double width;
	
	@Column(name="line_width")
	private Double lineWidth;
	
	@Column(name="line_rgb")
	private String rgb;
	
	@Basic
	@Column(name = "isHidden", columnDefinition = "BIT", length = 1)
	private Boolean isHidden;
	
	@Basic
	@Column(name = "isConstruction", columnDefinition = "BIT", length = 1)
	private Boolean isConstruction;
	
	@Column(name="angle")
	private Double angle;
	
	@Column(name="parentChildState")
	private Integer parentChildState;
	
	@Column(name="rome_group_shape_parent")
	private Long groupShapeParentId;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	
	public int getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(int propertyType) {
		this.propertyType = propertyType;
	}

	public String getMinimumValue() {
		return minimumValue;
	}

	public void setMinimumValue(String minimumValue) {
		this.minimumValue = minimumValue;
	}

	public String getMaximumValue() {
		return maximumValue;
	}

	public void setMaximumValue(String maximumValue) {
		this.maximumValue = maximumValue;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public Boolean getIsRequired() {
		return isRequired;
	}

	public void setIsRequired(Boolean isRequired) {
		this.isRequired = isRequired;
	}

	public Boolean getMustBeUnique() {
		return mustBeUnique;
	}

	public void setMustBeUnique(Boolean mustBeUnique) {
		this.mustBeUnique = mustBeUnique;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

	public ModelProperty getModelProperty() {
		return modelProperty;
	}

	public void setModelProperty(ModelProperty modelProperty) {
		this.modelProperty = modelProperty;
	}

	public Integer getShape() {
		return shape;
	}

	public void setShape(Integer shape) {
		this.shape = shape;
	}

	public Integer getShapeType() {
		return shapeType;
	}


	public void setShapeType(Integer shapeType) {
		this.shapeType = shapeType;
	}

	public Double getX1() {
		return x1;
	}

	public void setX1(Double x1) {
		this.x1 = x1;
	}

	public Double getY1() {
		return y1;
	}

	public void setY1(Double y1) {
		this.y1 = y1;
	}

	public Double getZ1() {
		return z1;
	}

	public void setZ1(Double z1) {
		this.z1 = z1;
	}

	public Double getX2() {
		return x2;
	}

	public void setX2(Double x2) {
		this.x2 = x2;
	}

	public Double getY2() {
		return y2;
	}

	public void setY2(Double y2) {
		this.y2 = y2;
	}

	public Double getZ2() {
		return z2;
	}

	public void setZ2(Double z2) {
		this.z2 = z2;
	}

	public Double getX3() {
		return x3;
	}

	public void setX3(Double x3) {
		this.x3 = x3;
	}

	public Double getY3() {
		return y3;
	}

	public void setY3(Double y3) {
		this.y3 = y3;
	}

	public Double getZ3() {
		return z3;
	}

	public void setZ3(Double z3) {
		this.z3 = z3;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public Double getDepth() {
		return depth;
	}

	public void setDepth(Double depth) {
		this.depth = depth;
	}

	public Double getWidth() {
		return width;
	}

	public void setWidth(Double width) {
		this.width = width;
	}

	public Double getLineWidth() {
		return lineWidth;
	}

	public void setLineWidth(Double lineWidth) {
		this.lineWidth = lineWidth;
	}

	public String getRgb() {
		return rgb;
	}

	public void setRgb(String rgb) {
		this.rgb = rgb;
	}

	public Boolean getIsHidden() {
		return isHidden;
	}

	public void setIsHidden(Boolean isHidden) {
		this.isHidden = isHidden;
	}

	public ModelShape getShapeParent() {
		return shapeParent;
	}

	public void setShapeParent(ModelShape shapeParent) {
		this.shapeParent = shapeParent;
	}

	public Integer getOffsetUnits() {
		return offsetUnits;
	}

	public void setOffsetUnits(Integer offsetUnits) {
		this.offsetUnits = offsetUnits;
	}

	public Boolean getIsConstruction() {
		return isConstruction;
	}

	public void setIsConstruction(Boolean isConstruction) {
		this.isConstruction = isConstruction;
	}

	public Double getAngle() {
		return angle;
	}

	public void setAngle(Double angle) {
		this.angle = angle;
	}
	
	public Integer getParentChildState() {
		return parentChildState;
	}

	public void setParentChildState(Integer parentChildState) {
		this.parentChildState = parentChildState;
	}
	
	public Integer getGroup() {
		return group;
	}

	public void setGroup(Integer group) {
		this.group = group;
	}

	public Integer getGroupShape() {
		return groupShape;
	}

	public void setGroupShape(Integer groupShape) {
		this.groupShape = groupShape;
	}

	public Long getGroupShapeParentId() {
		return groupShapeParentId;
	}

	public void setGroupShapeParentId(Long groupShapeParentId) {
		this.groupShapeParentId = groupShapeParentId;
	}

	@Override
	public String toString() {
		return "ModelShape [id=" + id + ", model=" + model + ", name=" + name
				+ ", createdDate=" + createdDate + ", modifiedDate="
				+ modifiedDate + ", propertyType=" + propertyType
				+ ", minimumValue=" + minimumValue + ", maximumValue="
				+ maximumValue + ", defaultValue=" + defaultValue
				+ ", isRequired=" + isRequired + ", mustBeUnique="
				+ mustBeUnique + ", modelProperty=" + modelProperty
				+ ", shapeParent=" + shapeParent + ", offsetUnits="
				+ offsetUnits + ", shape=" + shape + ", group=" + group
				+ ", groupShape=" + groupShape + ", shapeType=" + shapeType + ", x1=" + x1 + ", y1=" + y1
				+ ", z1=" + z1 + ", x2=" + x2 + ", y2=" + y2 + ", z2=" + z2
				+ ", x3=" + x3 + ", y3=" + y3 + ", z3=" + z3 + ", height="
				+ height + ", depth=" + depth + ", width=" + width
				+ ", lineWidth=" + lineWidth + ", rgb=" + rgb + ", isHidden="
				+ isHidden + ", isConstruction=" + isConstruction + ", angle="
				+ angle + ", parentChildState=" + parentChildState + "]";
	}
	
}
