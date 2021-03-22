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
var renderer3D = new DisplayPhysicalRenderInterface( new DisplayPhysicalRenderer() );
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

var transformControl = null;                      // used for the move option

var lines3d = null; // include all shapes (construction lines/contours/...)  and xyz axes
