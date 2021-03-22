/**
 * 
 */

var global_model_fns = {};
var global_modelproperty_fns = {};
var global_shape_fns = {};

// default setting parameters
//  USED VARIABLES 
var gridSize = 800;
var line3dColor = "rgb(255, 255, 0)";
var cntr3DColor = "rgb(204, 102, 255)";
var xAxisColor  = "rgb(255, 0, 0)";
var yAxisColor  = "rgb(0, 255, 0)";
var zAxisColor  = "rgb(0, 0, 255)";
var activePlaneButtonColor = "rgb(0, 255, 0)";

//dynamic variables
var animationFrameId = null;

var container = null;
var scene = null;
var scenegrid = null;
var camera = null;
//var renderer3D = new RenderInterface( new DesignPhysicalRenderer() );
var controls = null;

var rendererX = null;
var rendererY = null;

var plane3d = [0, 0, gridSize];
var plane3DName = "xz";
var raycaster = null;
var mouse = null;                         // used for raycaster

//for moving objects
var plane = new THREE.Plane();
var offset = new THREE.Vector3();
var intersection = new THREE.Vector3();                 // needed for raycaster
//for selection indicator
var currentIntersected = undefined;                     // needed for showSelectionIndicator
var sphereInter = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));



var mouseStatus = 0; // 0 means mouse up, and 1 means mouse down
var action3D = null; // line, cntr, rect, adjust, ...

var transformControl = null;                      // used for the move option

var lines3d = null; // include all shapes (construction lines/contours/...)  and xyz axes


var new3dElement = null;            // used for shape creation
var drawingLineType = null; // 1 - xLine, 3 - yLine, 5 - zLine

var contourHolder3D= [];            // used for contour construction
var lines3DToAdjust = null;         // used for functions: Adjust and property assign




var curModel = null;                                         // holds the current Model Id
var curModels = [];                                          // holds all current Models for the selected type
var curModelShapes = [];                                     // holds the shapes for the current Model for the selected Type                              
var curModelProperties = null;                               // holds the properties for the current model
var groupShapes = [];                                        // holds list of group Shapes for the current Model 

var propertyId = null;                                      // holds Id of Property selected
var propText = false;                                       // type of property
var propNumber = false;                                     // type of property

var selectedLine = null;                                     // array of lines
var selected3DLine = null;                                   // one line
var selectedElementInters = [];                              // holds points of Intersection 
var cntrFound = [];                                          // used for Adjust function                 
var groupShapesAssociated = [];                              // used for Adjust function

var unassign = false;                                     // not yet used 

var physicalModelView = 'parent';

// the diffs that generate by moving
var xMovingDiff = 0;
var yMovingDiff = 0;
var zMovingDiff = 0;


//var cntrs3d = null;
//var tmpgrid = null;
//var cameraDefaultZoomLevel = 1;
//var gridStep = 10;
//var axesArrowHeadLength = 0.5;
//var axesArrowHeadWidth = 0.5;
//var rect3DColor =  "red";
//var xAxisVertices = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0)];
//var yAxisVertices = [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0)];
//var zAxisVertices = [new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0)];
//var horizontalAxisId = -1;
//var verticalAxisId = -2;
//var gridCameras = null;                       
//var grid = null;


//var sMoveX = null;                                       // used for Move option 
//var sMoveY = null;                                       // used for Move option

//var axesIds = [];
