//// default setting parameters
//var cameraDefaultZoomLevel = 1;
//var gridSize = 800;
//var gridStep = 10;
//var axesArrowHeadLength = 0.5;
//var axesArrowHeadWidth = 0.5;
//
//var line3dColor = "rgb(255, 255, 0)";
//var cntr3DColor = "rgb(204, 102, 255)";
//var rect3DColor =  "red";
//var xAxisColor  = "rgb(255, 0, 0)";
//var yAxisColor  = "rgb(0, 255, 0)";
//var zAxisColor  = "rgb(0, 0, 255)";
//var activePlaneButtonColor = "rgb(0, 255, 0)";
//
//var xAxisVertices = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0)];
//var yAxisVertices = [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0)];
//var zAxisVertices = [new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0)];
//var horizontalAxisId = -1;
//var verticalAxisId = -2;
//
//
//
//
//// dynamic variables
//var animationFrameId = null;
//
//var container = null;
//var scene = null;
//var scenegrid = null;
//var tmpgrid = null;
//
//var camera = null;
//var renderer3D = new RenderInterface( new ThreeRenderer() );
//var controls = null;
//
//var rendererX = null;
//var rendererY = null;
//
//
//var gridCameras = null;                          // not used 
//
//
//
//
//var grid = null;
//
//var plane3d = [0, 0, gridSize];
//var plane3DName = "xz";
//
//var raycaster = null;
//var mouse = null;
//
//var mouseStatus = 0; // 0 means mouse up, and 1 means mouse down
//var action3D = null; // line, cntr, rect, adjust, ...
//
//var transformControl = null;
//var sMoveX = null;
//var sMoveY = null;
//
//var lines3d = null; // include all construction lines and xyz axes
//var cntrs3d = null;
//var contourHolder3D= [];
//
//
//var axesIds = [];
//var new3dElement = null;
//
//
//
//var lines3DToAdjust = null;
//var drawingLineType = null; // 1 - xLine, 3 - yLine, 5 - zLine
//
//// for selection indicator
//var currentIntersected = undefined;
//var sphereInter = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));
//
//// for moving objects
//var plane = new THREE.Plane();
//var offset = new THREE.Vector3();
//var intersection = new THREE.Vector3();
//
//
//
//// for the toolbar && properties actions
//
////var prev_img='', actionImg='', prev_Id='';                                // moved back to global variable as it used all over the site
////var img_path='/webgui/assets/img/';
//
//var curModel = null;                                         // holds the current Model Id
//var curModels = []; 
//var curModelShapes = [];// holds the shapes for the current Model for the selected Type                              
//var curModelProperties = null;
//
//
//var propertyId = null;
//var propText = false;
//var propNumber = false;
//var unassign = false;
//
//var selectedLine = null;                        // array of lines
//var selected3DLine = null;                      // one line
//var selectedElementInters = [];
//
//
//var cntrFound = [];
//var groupShapes = [];
//var groupShapesAssociated = [];
//
//
//
//
//
//
//
//
//
