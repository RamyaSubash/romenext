/** CORE SYSTEM VARIABLES **/

/** STATE VARIABLES **/
var topLevelTab = 'typeDesignViewTab';
var selecteddecorator = 'Logical';

/**
 * Using this for the state within each view.
 * 
 * DESIGN:
 * 
 * DISPLAY: 
 * 1. base
 * 2. workspace
 * 
 */
var guistate_main = '';	// SHOULD BE DESIGN/DISPLAY
var guistate_sub = '';	// This would be so far only BASE/WORKSPACE/etc

/** DESIGN && DISPLAY **/
var typeMap = {}; // keep the list of Types loaded
var typeMapViaId = {}; // added to keep the type map keyed via ID's instead of the names - jpl Dec2016
var ruleMap = {}; // keep the list of Rules loaded
var ruleMapViaId = {};
var connMap = {};
var connMapViaId = {};
var linkMapViaId = {};


var global_type_fns = {}; // create/read/update/delete
var global_conn_fns = {};
var global_rule_fns = {};

var global_node_fns = {};
var global_edge_fns = {};



var nodeMap = {}; // keep the list of Nodes loaded at this stage
var edgeMap = {}; // keep list of Edges loaded at this stage
var workspaceMap = {};
var workspaceInternalType = {};
var decos;
var neo4jServerMap = {}; // keep the list of neo4j instance  loaded at the start (once the user logged in) 

var listTypeIds = []; // this list is populated in the typegraph-view.js (getAllSelectedTypes), should only contain the list of id's currently selected
var listConnIds = [];
var listLinkIds = [];

var selectedRuleIds = [];
var listInstUuids = [];
var listEdgeUuids = [];

var prev_img = '',
	actionImg = '',
	prev_Id = '';
var img_path = '/webguiportal/assets/img/';

/*****************************************************************************************/
/*************************** Variables used Globally by all views ************************/
/*****************************************************************************************/
var user = null;
var userGroup = null;
var loggedInUserName = null;

var currentElement = {};
var selectedMetaData = null; // keep the value of currently selected Repo (NOT REPO ANYMORE, IS METADATA)
var selectedMetaDataRepos = {} // keep all the repos for selected metadata
var selectedMetaDataRepo = null // keep the value of currently selected Repo



var metadataMap = {}; // keep the list of metaData  loaded at the start (once the user logged in) 
var decoMap = {}; // keep the list of Decorators
var decoMapViaId = {};
var activeDecos_LN = {};
var activeDecos_BODY = {};
var activeDecos_TB = {};



//========================== VARIABLES USED FOR PROCESSES =============================
var action = null; // possible values  create_type, create_link, assign_link, create_pc, 
// delete_type, delete_rel, delete_link, view_prop_type, view_prop_conn, view_prop_link, save_pos, 
// change_color, change_size, change_textPos, change_textsize, 
// toggle_max, toogle_name, toggle_rellabel, toggle_rel, toggle_tooltip

//======================== ASSIGN LINK To TYpe ========================================
//======================== CREATE PC Connection =======================================
var selectedElement = null;
var originType = null;
var destType = null;
var destTypeName = null;
var ruleSelected = false;
var linkSelected = null;

var originType2 = null;
var destType2 = null;
var activeElement = null;

var buttonOnOff = false;
var createEdgeList = [];
var listDates = [];
var listErrorsFromRetrieval = [];
var active_deco = '';

// Variables used in Form Display === Hotel Decos  (registration -- Walkin -- )

var listAllNodes = [];
var typeListFound = [];
var typeListFoundDetails = [];
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var listTree = [];
var nodesToUpdate = [];
var divTypes = [];

// for logical display
var requiredTypeIdMap = {} // key is type id, and value is all the required type ids for the key type id
var requiredTypeIdNodeMap = {} // key is type id, and value is the created node under that type

//===========================================================================================================================================
var AdminLTEOptions = {
	//Enable sidebar expand on hover effect for sidebar mini
	//This option is forced to true if both the fixed layout and sidebar mini
	//are used together
	sidebarExpandOnHover : true,
	//BoxRefresh Plugin
	enableBoxRefresh : true,
	//Bootstrap.js tooltip
	enableBSToppltip : true
}
//    Baya added  ======


var hasMoved = false; // this is needed  for all pop-ups create windows

var typecolor;
var errorStatus = false;

// all these variables are used for CREATE   Node/Path/System/Link/DCT elements
var typelinkCreate = false;
var typelinkType = "";
var posType = null;
var posWin = null;
//=======================================================================
// needed for Design Logical    && Display bLogical

var TYPES_COLOR = [ "AliceBlue", "Aqua", "Aquamarine", "Beige", "BlanchedAlmond", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Bisque", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGrey", "DarkGreen", "DarkKhaki", "Blue", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "AntiqueWhite", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Azure", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen" ];
var colorIndex = 0; // initial value    // keep the index to the new available color to use
var Info_displayed = false;
var shiftkeySelected = false;
var userActions = {
	meta : '',
	tab : '',
	deco : '',
	view3D : '',
	prevaction : '',
	currentaction : '',
	param : ''
}; //    which tab he is (Design/Display); which deco is current(logical/physical/geo)
//    which action he is doing (view/drilldown/create/design) ; which item is selected (Type/Node);
//    if node which level it is (parent/child)

var selectedDecoClassification = null;
var selectedDecoGrouping = null;
var selectedDeco = null;
var predefinedSelectedDecoPropertiesNames = null;
var predefinedSelectedDecoPropertiesMap = null;

/*****************************************************************************************/
/*************************** Variables used for CYTOSCAPE GRAPHs ************************/
/*****************************************************************************************/
//Cytoscape variables
var tdvCy, // for typeDesignView
	irvCy, // for instRelView
	mrvCy; // for mapView  
var defaultLayout = {
	name : 'preset',
	avoidOverlap : true,
	animate : true
}


//needed in Display  Cytoscape
var dragItemPositionX = 0;
var dragItemPositionY = 0;
var message = '';
var historyNode = []; // keep list of nodes drilled down
var prevDrilldown = null;
var svgXValue = 0;
var svgYValue = 0;
var thresholdNodeCreation = 12;
var curThreshold = 0;
var elementFound = [];


//Mouse event      in Design/Display  Logical 
var doubleClickThreshold = 300;
var isSingleClick,
	pleaseWait,
	lastClick,
	lastObj;
var layoutStatus = 0;
var preTdvPos = [];
var preJson;
var prePos = {};
var defTdvPos = [];
var nodesTdvPosChanged = {};
var linksTdvPosChanged = {};

var tabObjects = [];
var tab_table = [];
var actionTable = [];

var temp_tabObjects = [];


var barStatus = {};
var designAction = {
	currAction : '',
	prevAction : ''
};

var defaultNodeColor = '#A5ABB6';
var defaultTypeSize = '30px';
var defaultTypeLabelPosition = 'top';
var defaultTypeLabelSize = '11px';

var arrayPreColor = [ '#A5ABB6', '#68BDF6', '#6DCE9E', '#FF756E', '#DE9BF9', '#FB95AF', '#FFD86E' ]
var arrayPreSize = [ '20px', '30px', '40px', '50px', '60px', '70px' ];

var currentColor = null;
var currentSize = null;
var currentLabelPosition = null;
var currentLabelSize = null;
var currentIdxColor = 0;
var currentIdxSize = 0;
var dialogOffset = {
	top : 200,
	left : 200
}
var activeType = null;

var eleIdsSelectedList = [];
var lkIdsSelectedList = [];

var style_error = [
	'background: linear-gradient(#D33106, #571402)'
	, 'border: 1px solid #3E0E02'
	, 'color: white'
	, 'display: block'
	, 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
	, 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
	, 'line-height: 30px'
	, 'text-align: center'
	, 'font-weight: bold'
].join(';');

var style_success = [
	'background: green',
	'border: 1px solid #3E0E02',
	'color: white',
	'display: block',
	'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
	'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
	'line-height: 30px',
	'text-align: center',
	'font-weight: bold'
].join(';');
var style_warning = [
	'background: #ecb65f',
	'border: 1px solid #3E0E02',
	'color: white',
	'display: block',
	'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
	'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
	'line-height: 30px',
	'text-align: center',
	'font-weight: bold'
].join(';');
var style_simple = [
	'background: white',
	'border: 1px solid #3E0E02',
	'color: blue',
	'display: block'
].join(';');

var makeTippyRel = null;
var makeTippyNode = null;



var node = [
	'content:data(name)',
	'text-valign:data(labelPosition)',
	'background-color : data(color)',
	'border-color : #AABFB8',
	'border-width : 2px',
	'width : data(size)',
	'height : data(size)',
	'font-size : data(labelSize)',
	'font-weight : bold',
	'color : #000000',
].join(';');












/**
 * EVERYTHING BELOW THIS LINE WILL GET DELETED
 */

//var paper;
//var viewBox;
//
//var canvasID = "#drawingCanvas";
//var CELL_SIZE = 10;
//var GRID_OFFSET_X = -10000,
//	GRID_OFFSET_Y = -10000,
//    floorWidth = 20000,
//    floorHeight = 20000;
//	
//
//var drawingScale = 10,
//    mouseMovementScale = 1;
//var mouseDown = false;
//var dX, dY, startX, startY;
//
//var currentVBWidth,
//    currentVBHeight;
//
//var currContours=[];


// Define how many zoom levels our slider will have and it's default
//var maxZoomLevel = 20,
//    minZoomLevel = 0,
//    currentZoomLevel = 10,
//    ORIG_ZOOM_LEVEL = currentZoomLevel;

// Original value for the view box
//var ORIG_VB_X = 0,
//    ORIG_VB_Y = 0,
//    ORIG_VB_WIDTH,
//    ORIG_VB_HEIGHT;

/*****************************************************************************************/
/*************************** GENERAL VARIABLES  ******************************************/
/*****************************************************************************************/
// URLs
// var hostname = "http://localhost/";
//var apiBaseUrl = "http://localhost/api/";
//var hostname = "http://192.168.2.151/";
// var apiBaseUrl = "http://192.168.2.68/api/";
//var HELP_MODE = false;
//


// Initial Values 


// Lists and maps
// Used for Containing Info for all Decorators and Views (Design/Display)


/** 
* These all do the same thing
*/
//// deprecated
//var curType;  				// holds the selected type being used
//
//
//
//// deprecated
//var nametype, nameconn;







/*****************************************************************************************/
/*************************** Variables used Logical Views (DES/DIS)***********************/
/*****************************************************************************************/

/***************** LOGICAL DECO *********************************************************/

//var typeSelected;      //  



// used for connection creation 
var mouseEventTime = null;

var CTRLkey = false;
// used for search 

//var bunchOfConns ={};
var createRuleClassification = null;
var createRuleClassification2 = null;
var creatingConnection = false;
var creatingConnection2 = false;
/********************  Logical Instance View *************************************/

var typeMapInst = {}; //contains only one node
var nodeMapInst = {};
var NodeInst = {};
var loadInst = false;
var loadInstNode = false;
var NodeSelected = null; // uuid of the selected node
//var nodeTypeBarTypeIds = [];
//var nodeInGraphUuids = [];
var hideNode = false;
var hidePath = false;
var hideSystem = false;
var hideLink = false;
var currentTypeIds = [];
var drillHistoryList = []; // list of node uuids
var loadedWorkspaceUuid = null;
var isWorkspaceLoaded = false; // if current graph is a workspace 
var loadedWorkspaceImageWidth = null;
var loadedWorkspaceImageHeight = null;
var workspaceSaveMenuTimer = null;
var hideWorkspaceSaveMenuTimer = null;
var isWorkspaceBackgroundImageDeleted = false;

//used for creating an edge
var originNode = null,
	destNode = null;
var connSelected = null;
var selectedRule = null;
var selectedTypeModels = null;
var selectedTypeModelGroupParts = null;
var gridOnOff = false;
var startNodeForLinking = null;
var endNodeForLinking = null;

// SVG section for physical display
var svgNB = 0;
var bmouseDragging = false;

var selectedObject = '';
var TransformRequestObj;
var TransList;
var childPartsLoaded = null;

var logicalDisplayCytoscapeDefaultZoomLevel = 1.29;
var logicalDisplayCytoscapeGraphAnimationBubblingUpTimes = 2;

var LD_FocussedNode = '';





/***************** GEO DECO *********************************************************/
//global map variables
var map;
var markers = [];
var lines = [];
var cLat;
var cLng;
var fLat;
var fLng;
var previousMovedMarkerPos = {};



var endTypeConns = [];

// Default client setup
var loadAllNode = true;
var edgeDetails = {};
var nodes;

/***************** Global Utils Variables*********************************************************/
var MIMEExtensionMap = {
	"aac" : "audio/aac",
	"abw" : "application/x-abiword",
	"arc" : "application/octet-stream",
	"avi" : "video/x-msvideo",
	"azw" : "application/vnd.amazon.ebook",
	"bin" : "application/octet-stream",
	"bz" : "application/x-bzip",
	"bz2" : "application/x-bzip2",
	"csh" : "application/x-csh",
	"css" : "text/css",
	"csv" : "text/csv",
	"doc" : "application/msword",
	"epub" : "application/epub+zip",
	"gif" : "image/gif",
	"htm" : "text/html",
	"html" : "text/html",
	"ico" : "image/x-icon",
	"ics" : "text/calendar",
	"jar" : "application/java-archive",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"js" : "application/javascript",
	"json" : "application/json",
	"mid" : "audio/midi",
	"midi" : "audio/midi",
	"mpeg" : "video/mpeg",
	"mpkg" : "application/vnd.apple.installer+xml",
	"odp" : "application/vnd.oasis.opendocument.presentation",
	"ods" : "application/vnd.oasis.opendocument.spreadsheet",
	"odt" : "application/vnd.oasis.opendocument.text",
	"oga" : "audio/ogg",
	"ogv" : "video/ogg",
	"ogx" : "application/ogg",
	"png" : "image/png",
	"pdf" : "application/pdf",
	"ppt" : "	application/vnd.ms-powerpoint",
	"rar" : "application/x-rar-compressed",
	"rtf" : "application/rtf",
	"sh" : "application/x-sh",
	"svg" : "image/svg+xml",
	"swf" : "application/x-shockwave-flash",
	"tar" : "application/x-tar",
	"tif" : "image/tiff",
	"tiff" : "image/tiff",
	"ttf" : "font/ttf",
	"txt" : "text/plain",
	"vsd" : "application/vnd.visio",
	"wav" : "audio/x-wav",
	"weba" : "audio/webm",
	"webm" : "video/webm",
	"webp" : "image/webp",
	"woff" : "font/woff",
	"woff2" : "font/woff2",
	"xhtml" : "application/xhtml+xml",
	"xls" : "application/vnd.ms-excel",
	"xml" : "application/xml",
	"xul" : "application/vnd.mozilla.xul+xml",
	"zip" : "application/zip",
	"3gp" : "video/3gpp",
	"3g2" : "video/3gpp2",
	"7z" : "application/x-7z-compressed"
}

/** PATH VIEW VARIABLES **/

var selectedPathNode = {};
var pathNodeMap = {};
var pirvCy;













/*****************************************************************************************/
/*************************** Variables used Physical Views (DES/DIS)**********************/
/*****************************************************************************************/


// global variable for drawing in physical view
//var drawingStat = 0;                      // could have  3 values   0: no action, 1: drawing   2: reserved for the move
//var startX, startY;
//var x0, y0;
//var lineNumber = 0;
//var rectNumber = 0;
//var circNumber = 0;
//var gridNumber;
//var rcflNumber = 0;
//var ccflNumber = 0;
//var circConNumber = 0;
//var textNumber = 3;
//var shape;
//var isInitPhysicalDesignView = false;
//var horizontalLines = [];
//var verticalLines = [];
//var verticalTexts = [];
//var horizontalTexts = [];
//var verticalBggds = [];
//var horizontalBggds = [];
////var circles = []; // with all info of a circle
//var texts = []; // first element is (0,0)
//var rects = [];
//var circs = [];
//var lines = []; // contours
//var circCons = []; // arcs
//var selectedElementId = null;
//
//var selectedPoint = null;
//var selectedIntersection = null;
//
//var zoomLevels = [0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 10, 20];
//var gridZoomLevels = [0.5, 0.5, 0.5, 0.5, 0.75, 1, 1.5, 2, 2, 2, 2];
//var zoomLevel = 5; // index of the zoomLevels
//var spacing = 20; // width of the background square grid


//var isPhysicalDesignViewLoaded = false;
//var elementFound = [];
//var groupShapeFound = [];
//var textFound = [];
//var oldTextFound = [];
//var rectFound = [];
//var oldRectFound = [];
//var circFound = [];
//
//var oldCntrFound = [];
//var oldCircFound = [];
//var oldElementFound = [];
//var originDisplay = [100, 650];
//
//                                        // holds the list if models for the current type
//var contourHolder = [];
//var contourAssociated = [];
//var tmpIdHolder = [];
//

//var curParts = null;
//var tmpCircCntrsForMove = [];
//var isPartView = false;
//var colorRect;
//var selecteObject =0, currentX=0, currentY=0, currentMatrix=[],svgElement;
//var partTodisplay=null;
//
//var view3D = 'xy';
//var defaultXYPlaneColor = "#00ccff";
//var defaultYZPlaneColor = "";
//var defaultXZPlaneColor = "";
//var partPos = null;
//var linesInOtherPlanes = [];
//var textsInOtherPlanes = [];
//
///********************  Pysical Display View *************************************/
//var childNodes =[];  // list of uuids of child nodes
//var isLoadingChildNodes = false;

//=================================  NOT SURE IF NEEDED ==================================
//Obsolete
//var fieldNameToUse = {
//		"COUNTRY": "NAME",
//		"PROVINCE": "PRVM",
//		"NETWORK_LOCATION": "NWLM",
//		"FLOOR": "FLON",
//		"BAY": "NEQBAYC",
//		"SHELF": "SHFM",
//		"CARD": "CDC",
//	};
//var addTypeTitle = "Add a new TYPE";
//var ruleList=[];
//var tdvBar, rdvBar;