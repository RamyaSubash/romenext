<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html lang="en">
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
	
	<title>ROMENeXt Design</title>
	
    <!--    Imported CSS  --> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!-- 	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css" /> -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!--     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"> -->
    
    <!--    CYTOSCAPE PLUG INS CSS -->
    <link rel="stylesheet" href="/webguiportal/assets/css/cytoscape-context-menus.css"  type="text/css" /> 
    <link rel="stylesheet" href="/webguiportal/assets/css/cytoscape-panzoom.css"  type="text/css" /> 
    <link rel="stylesheet" href="/webguiportal/assets/css/tippy.css"  type="text/css"   />
    
     <link rel="stylesheet" href="/webguiportal/assets/css/jquery-qtip.css"  type="text/css"   />
          
    <link rel="stylesheet" href="/webguiportal/assets/css/BootSideMenu.css">	
	<link rel="stylesheet" href="/webguiportal/assets/css/custom-style.css">	
    
    <!--  IMPORTED JS  -->
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	
    
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script> 
	 
    <!--    CYTOSCAPE  JS && PLUGINS JS -->  
    <script src="/webguiportal/assets/js/libs/cytoscape/3.2.8/cytoscape.js"></script>   
    <script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-panzoom.js"></script>
	<script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-qtip.js"></script>
	<script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-edgehandles.js"></script>
    <script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-context-menus.js"></script>  
    <script src="/webguiportal/assets/js/libs/popper.js"></script>
    <script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-popper.js"></script>  
    <script src="https://unpkg.com/tippy.js@2.0.9/dist/tippy.all.js"></script>

	      
    <!--   LOCAL JS  -->
    <script src="/webguiportal/assets/js/els/utils/cytoscape-style.js"></script>
    <script src="/webguiportal/assets/js/els/utils/BootSideMenu.js"></script>


    <!--  ELS HEADERS -->
	<jsp:include page="/jsps/header/javascriptHeaders.jsp"></jsp:include>
	
	
	<script src="/webguiportal/assets/js/els/fns/fns-show.js"></script>
	<script src="/webguiportal/assets/js/els/fns/fns-metadata.js"></script>
		
	<!--  ELS  GLOBAL UTILS -->
	<script src="/webguiportal/assets/js/els/global-var.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalConnUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalDecoUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalHTMLUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalMetadataRepoUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalRuleUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalUserGroupUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalUtils.js"></script>
    
    <script src="/webguiportal/assets/js/els/fns/utils/api/GlobalApiUtils.js"></script>
    
    <!-- ELS cyto utils and the state utils -->
    <script src="/webguiportal/assets/js/els/fns/utils/state/StateUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/cytoscape/CytoscapeCoreUtils.js"></script>
    
    
	<!--  API  -->
  	<script src="/webguiportal/assets/js/els/fns/apis/api-romenext.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/type/TypeApi.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/permission/group/GroupApi.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/deco/DecoApis.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/preference/PreferenceApis.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/shapeApis.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/dct/DCTApis.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/rule/RuleApis.js"></script>
	<script src="/webguiportal/assets/js/els/fns/apis/connection/ConnectionApis.js"></script>
	<script src="/webguiportal/assets/js/els/fns/apis/connection/LinkApis.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/type/property/TypePropertyApi.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/type/property/TypePropertyObject.js"></script>
  	
  	
    <!-- nice scroll -->
    <script src="/webguiportal/assets/js/libs/jquery.nicescroll.js" type="text/javascript"></script>
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script> 
    <!--custome script for all page-->
    <script src="/webguiportal/assets/js/libs/scripts.js"></script>
 
       
    <!--  DESIGN LOGICAL -->
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/DesignLogicalRenderer.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/DesignLogicalRendererCrud.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/DesignLogicalBarRender.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/DesignLogicalType.js"></script>   
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/ContextMenuFunctions.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/ContextMenuFunctions_old.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/CXTMenuFcts.js"></script> 
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/DesignCytoscapeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/DesignLinkFctsUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/DesignSavingFcts.js"></script>
    
     <script src="/webguiportal/assets/js/els/fns/utils/cytoscape/CytoNodeUtils.js"></script>
    
       
    
    <!--    UTILS FOR DESIGN LOGICAL  -->  
    <script src="/webguiportal/assets/js/els/fns/design/utils/conns/ConnectionPropertyUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/utils/conns/ConnectionUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/utils/type/TypePropertyUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/utils/type/TypeUtils.js"></script>    
    <script src="/webguiportal/assets/js/els/fns/design/utils/CommonFctsLogical.js"></script>   
    <script src="/webguiportal/assets/js/els/fns/design/utils/DesignInterfaceUtils.js"></script>  
    <script src="/webguiportal/assets/js/els/fns/design/utils/Error_handlingUtils.js"></script>       
     
        
     <!--    UTILITIES COMMUN TO DESIGN & DISPLAY   -->
      <script src="/webguiportal/assets/js/els/fns/utils/preferenceBar/PrefBarFunctions.js"></script>
     
          
	 <!-- Three.js -->
    <script src="/webguiportal/assets/js/libs/three/three.js"></script> 
  	<script src="/webguiportal/assets/js/libs/three/js/examples/controls/TransformControls.js"></script>
  	<script src="/webguiportal/assets/js/libs/three/js/examples/controls/OrbitControls.js"></script>
  	<script src="/webguiportal/assets/js/libs/three/js/examples/cameras/CombinedCamera.js"></script>
	 	      
	<script src="/webguiportal/assets/js/els/createTool.js"></script>
	<script src="/webguiportal/assets/js/els/fns/tools/toolmanager-romenext.js"></script> 	                  
	<!--  Embedd the physical view for now -->
	<script src='/webguiportal/assets/js/els/fns/design/physical/DesignPhysicalRenderer.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/DesignPhysicalRendererCrud.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/physical-vars.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/utils/model/ModelPropertyUtils.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/utils/model/ModelShapeUtils.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/utils/PhysicalInterfaceUtils.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/utils/RomeModelManager.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/RenderInterface.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/libs/menufunctions.js'></script>
	<script src='/webguiportal/assets/js/els/fns/design/physical/libs/menumanager.js'></script>

    
    <!--    REMOVED JS FILE  -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-type.js"></script> -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-rule.js"></script> -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-designview.js"></script> -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-connection.js"></script> -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/typegraph-view.js"></script> -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/CXTMenuFctsUtils.js"></script>  -->
<!-- <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/DesignPrefFctsUtils.js"></script> -->





	<script src="https://cdn.babylonjs.com/babylon.js"></script>
	<script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
    <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>



    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/PhysicalUtils.js"></script>



  	<!-- Dynamically added libraries -->
<!--   	<c:forEach var="v" items="${ activedecos }"> -->
<!--   		${v.romeDecorator.name} Deco -->
<!--   		${ v.allLibraries } -->
  		
<!-- 	</c:forEach> -->
  	<!-- End of dynamic add -->  	
  	<script >
    document.addEventListener("keypress", function(event) {
		if (event.keyCode === 13) {		
			// add type(node/path/system/dtc)
			if (document.getElementById("save_new_type_name")) {
				document.getElementById("save_new_type_name").click();	
			}	
			// Add property
			if (document.getElementById("save_type_prop_button")) {
				document.getElementById("save_type_prop_button").click();	
			}
			// update type property
			if (document.getElementById("update_type_prop_button")) {
				document.getElementById("update_type_prop_button").click();	
			}	
			// add property for Connection 
			if( document.getElementById("save_conn_prop_button") )  {
				document.getElementById("save_conn_prop_button").click();	
			}
			// update property for Connection 
			if( document.getElementById("update_conn_prop_button") )  {
				document.getElementById("update_conn_prop_button").click();	
			}
			
		}
    });

    </script>

  	<script>
  	
    user = "${user}";
  	userGroup = {"name":"${user.proxyUser}", "host":"${user.proxyUser_host}"};
	selectedMetaData = "${metadataSelected}";
  	loggedInUserName = "${user.username}";
	if (!selectedMetaData) {
		selectedMetaData = "1";
	}
	
	if (userGroup.host == "%") {
		userGroup.host = "all";
	}
	
	var startNodeForLinkingTypeId = "${startNodeForLinkingTypeId}";
	var startNodeForLinkingTypeName = "${startNodeForLinkingTypeName}";
	var startNodeForLinkingName = "${startNodeForLinkingName}";
	var startNodeForLinkingUuid = "${startNodeForLinkingUuid}";
	if (!(startNodeForLinkingTypeId == "" && startNodeForLinkingTypeName == "" && startNodeForLinkingName == "" && startNodeForLinkingUuid == "")) {
		startNodeForLinking = {};
		startNodeForLinking.typeId = Number(startNodeForLinkingTypeId);
		startNodeForLinking.typeName = startNodeForLinkingTypeName;
		startNodeForLinking.name = startNodeForLinkingName;
		startNodeForLinking.uuid = startNodeForLinkingUuid;
	}
	
	var endNodeForLinkingTypeId = "${endNodeForLinkingTypeId}";
	var endNodeForLinkingTypeName = "${endNodeForLinkingTypeName}";
	var endNodeForLinkingName = "${endNodeForLinkingName}";
	var endNodeForLinkingUuid = "${endNodeForLinkingUuid}";
	if (!(endNodeForLinkingTypeId == "" && endNodeForLinkingTypeName == "" && endNodeForLinkingName == "" && endNodeForLinkingUuid == "")) {
		endNodeForLinking = {};
		endNodeForLinking.typeId = Number(endNodeForLinkingTypeId);
		endNodeForLinking.typeName = endNodeForLinkingTypeName;
		endNodeForLinking.name = endNodeForLinkingName;
		endNodeForLinking.uuid = endNodeForLinkingUuid;
	}
	
	
	selectedDecoClassification = "TYPE";
	selectedDecoGrouping = "LOGICALGROUP";
	predefinedSelectedDecoPropertiesNames = ["x", "y", "z"];
	
	var designPhysicalRenderer = new DesignPhysicalRenderer(); 
	designPhysicalRenderer.initRenderer();
	
  	function populateMetaDataId( metadata ) {
  		
//   		selectedMetaData = "${metadataSelected}";
//   		// if a metadata was passed in we use that value instead
//  		if( typeof metadata !== 'undefined' ) {
//  			selectedMetaData = metadata;
//  		}
 		
 		console.log("Metadata ID: " + selectedMetaData);
  		topLevelTab = "typeDesignViewTab";
  		
//   		selecteddecorator = "${selectedDecorator}";
//   		if (!selecteddecorator) {
//   			selecteddecorator = "Logical";
//   		}
		
		var tmpLength = Number("${listTypeidsLength}");
		console.log(tmpLength);
		if (tmpLength >= 1) {
			var tmpStr = "${listTypeids}";
			var tmpList = tmpStr.split(',');
			tmpList[0] = tmpList[0].substring(1);
			tmpList[tmpList.length - 1] = tmpList[tmpList.length - 1].substring(0, tmpList[tmpList.length - 1].length - 1);
			for (var i = 0; i < tmpLength; i++) {
				listTypeIds.push(Number(tmpList[i]));
			}
		}
		
		tmpLength = Number("${listConnidsLength}");
		console.log(tmpLength);
		if (tmpLength >= 1) {
			var tmpStr = "${listConnids}";
			var tmpList = tmpStr.split(',');
			tmpList[0] = tmpList[0].substring(1); 
			tmpList[tmpList.length - 1] = tmpList[tmpList.length - 1].substring(0, tmpList[tmpList.length - 1].length - 1);
			for (var i = 0; i < tmpLength; i++) {
				listConnIds.push(Number(tmpList[i]));
			}	
		}
		

// 	    <c:forEach var="v" items="${ activedecos }">		
// 			var grouping = null;
// 			var classification = null;
// 			var name = null;			
//   			grouping = "${ v.romeDecorator.grouping }";
//   			classification = "${ v.romeDecorator.classification }";
//   			name = "${ v.romeDecorator.name }";  			
//   			if ( grouping == "LOGICALGROUP" && classification == "TYPE" && name == "Logical" ) {
//   				${ v.buttonScript }
//   			}
// 		</c:forEach>
		
		var designLogicalRenderer = new DesignLogicalRenderer(); 
		designLogicalRenderer.initRenderer();
		designLogicalRenderer.initView();
		
		
		    
		    

		    // Add and manipulate meshes in the scene
// 		    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);
		    
		    

		
		$("#main-content-physical").toggle();
		
		
		
		
		
		
		
		
  	}
  	 	
//     <c:forEach var="v" items="${ activedecos }">
// 		<!-- ${v.name} Deco libraries START -->
// 		${v.initScript}	
// 		// init the global vars
// 		activeDecos_LN[ ${v.romeDecorator.id} ] = "dynamicDec_${ v.romeDecorator.id }_LN_id";
// 		activeDecos_BODY[ ${v.romeDecorator.id} ] = "dynamicDec_${ v.romeDecorator.id }_BODY_id";
// 		activeDecos_TB[ ${v.romeDecorator.id} ] = "dynamicDec_${ v.romeDecorator.id }_TB_id";
// 		<!-- ${v.name} Deco libraries END  -->
		
// 		${v.initVersionFn }( ${ v.romeDecorator.id } );
// 	</c:forEach>


	guistate_main = "${ guistate_main }";
	guistate_sub = "${ guistate_sub }";

	
	
	
	
 	</script>
 	
 	<style>
 	#renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
        }
 	</style>
</head>
<body onload="populateMetaDataId()">  

<div class="containerDesign">
      <div id="dialog"></div>
     <nav id="myNavbar" class="navbar navbar-custom navbar-fixed-top" role="navigation">
	        <!-- Brand and toggle get grouped for better mobile display -->
	        <div class="container-fluid">
	            <div class="navbar-header">
	                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
	                    <span class="sr-only">Toggle navigation</span>
	                    <span class="icon-bar"></span>
	                    <span class="icon-bar"></span>
	                    <span class="icon-bar"></span>
	                </button>
<!-- 	                <a class="navbar-brand" href="#">ROMENeXt Design</a> -->
	                <a class="navbar-brand"><img src="/webguiportal/assets/img/logo.jpg" alt="ROME Logo"></a>
	            </div>
	            
	            <!-- Collect the nav links, forms, and other content for toggling -->
	            <jsp:include page="/jsps/header/topNavHeader.jsp"></jsp:include>
	            
	            

	        </div>
	 </nav>        
    
     <div id="main">     
        <div class="row top-bars"  style="clear:both" >
          <div class="row t1" >
	        
	        <div class="col-sm-12">
	            <div class="col-sm-4"  id="breadcrumb">
	                <ul class="list-inline">
			             <li ><span class="glyphicon glyphicon-home"></span>Home <i class='fa fa-angle-right'></i></li>
<!-- 			             <li onclick="(new DesignLogicalRenderer()).refresh();" >Logical View </li> -->
			                <li  >Logical View </li>
			                   
		             </ul>
	            </div>
	            <div class="col-sm-4"  id="error_message" ></div>
<%-- 	            <div class="col-sm-4"  id="last_action" class="pull-right"> Version ${sessionScope.manifest.version } Build ${sessionScope.manifest.dateString }</div> --%>
	            <div class="col-sm-4"  id="last_action" class="pull-right"> </div>
	        
	        </div>
         </div>
          <div class="rowbar">     
	        <table >
	           <tr  style="background-color:#eeeeec;">
	              <td  width="2%" rowspan="4" valign="top" >
	                 <div class="btn-group" class="pull-right"> 
	                  <a class="btn btn-primary btn-block dropdown-toggle" id="plus_icon"  data-toggle="dropdown" href="#"><span   class="glyphicon glyphicon-plus"></span></a> 
	                   <ul class="dropdown-menu">
	                       <li  onclick="(new DesignLogicalRenderer()).showAddType(event, 'node');">
	                            <a href="#"><img src="/webguiportal/assets/img/newdesign/Node-small.png"/>Node</a></li>
	                       <li  onclick="(new DesignLogicalRenderer()).showAddType(event, 'path');">
	                            <a href="#"><img src="/webguiportal/assets/img/newdesign/Path-small.png"/>Path</a></li>
	                       <li  onclick="(new DesignLogicalRenderer()).showAddType(event, 'system');">
	                            <a href="#"><img src="/webguiportal/assets/img/newdesign/System-small.png"/>System</a></li>
	                       <li  onclick="(new DesignLogicalRenderer()).showAddType(event, 'link');">
	                            <a href="#"><img src="/webguiportal/assets/img/newdesign/Link-small.png"/>Link</a></li>
	                       <li  onclick="(new DesignLogicalRenderer()).showAddType(event, 'dct');">DCT Node</li>
	                   </ul>
			        </div>
			       <div id="create_type"  draggable="true" style='display: none;'>  </div>
	              </td>
	              <td width="96%" id="td_typelist"><div class="pull-left clearfix"  id="typelist"></div></td>
	              <td width="2%" style="vertical-align:top" > <div   id="cnode_img">	              
	                    <a href="#" class="btn btn-primary btn-primary btn-block"  data-state="visible" id="node_img" onclick="DesignLogicalBarRender.toggleElement('node_img', 'node')" >
	                         <span class="glyphicon glyphicon-off"></span><br/> Nodes</a>
	                  </div>
	              </td>
	           </tr>
	           <tr style="background-color:#eeeeec;"  id="linktr"  >	            
	             <td  width="96%" id="td_linklist"><div class="pull-left clearfix "  id="linklist"></div></td>
	             <td width="2%" style="vertical-align:top" > <div   id="clink_img">
	             
	                <a href="#" class="btn btn-primary btn-primary btn-block"  data-state="visible" id="link_img" onclick="DesignLogicalBarRender.toggleElement('link_img', 'link')" >
	                   <span class="glyphicon glyphicon-random"></span><br/>  Links</a> 	             
	             </div></td>
	           </tr> 
	           <tr style="background-color:#eeeeec;"  id="pathtr"  >
	            
	             <td  width="96%"  id="td_pathlist"><div  class="pull-left clearfix "  id="pathlist"></div></td>
	             <td width="2%"  > <div  id="cpath_img">	             
	                    <a href="#" class="btn btn-primary btn-primary btn-block"  data-state="visible" id="path_img" onclick="DesignLogicalBarRender.toggleElement('path_img', 'path')"  >
	                         <span class="glyphicon glyphicon-unchecked"></span><br/>  Paths</a>	             	           
	             </div></td>
	           </tr>
	           <tr style="background-color:#eeeeec;"  id="systemtr"   >            
	             <td width="96%" id="td_systemlist"><div class="pull-left clearfix "  id="systemlist"></div></td>
	             <td width="2%" style="vertical-align:top"> <div   id="csystem_img">
	                    <a href="#" class="btn btn-primary btn-primary btn-block" data-state="visible" id="system_img" onclick="DesignLogicalBarRender.toggleElement('system_img', 'system')"  >
	                           <span class="glyphicon glyphicon-warning-sign"></span><br/>  Systems</a>
	             </div></td>
	           </tr>
	          
	        </table>
	      </div>   
	   </div>  <!--  End of Top Bars -->
                           
<!-- 	    <div  class="box box-left" > -->
<!-- 	        <div id="menu1" class="icon-bar-vert"> -->
<!-- 	            <button type="button" class="btn btn-primary btn-md text-center" onclick=""><i class="fa fa-home f3x" aria-hidden="true"></i><br>Logical</button> -->
<!--                 <button type="button" class="btn btn-primary btn-md text-center" onclick=""><i class="fa fa-file-text f3x" aria-hidden="true"></i><br>Form</button>    -->
<!-- 	            <button type="button" class="btn btn-primary btn-md text-center" onclick="GlobalUtils.callDesignPhysicalServlet();"><i class="fa fa-cubes f3x" aria-hidden="true"></i><br>Physical</button>   -->
<!-- 	        </div>  -->
<!-- 	    </div>  -->
	    
	    <!-- Main Cytoscape DIV -->
		<div  class="clearfix"    id="main-content-workingarea"  >  </div> 
		
		<div class="clearfix" id="main-content-physical" >  
		  

		  
			
			<canvas id="renderCanvas" touch-action="none"></canvas> 
			
				  
			
			  
		
		</div> 
		
		
		
		<div  class="box box-right" > 
		     <div id="menu2" class="icon-bar-vert">
		        <button type="button" id="save_Pos"  class="btn btn-primary text-center" onclick="DesignCytoscapeUtils.savePosition();"  ><i class="fa fa-floppy-o f3x" aria-hidden="true"></i><br>Save</button>
	            <button type="button" class="btn btn-primary text-center" onclick="DesignCytoscapeUtils.restoreLayout();"><i class="fa fa-reply" aria-hidden="true"></i><br>Restore</button>       		                    
		        <button type="button" id="create_PC" class="btn btn-primary text-center" title="Create"  onclick="ConnectionPropertyUtils.createConnection('parentchild', event);">
		                <i class="fa fa-long-arrow-right f3x" aria-hidden="true"></i><br> PC </button>      
		        <button type="button" id="assign_link"  class="btn btn-primary text-center"  onclick="DesignLinkFctsUtils.assignLinkToType(event);">
		                <span class="glyphicon glyphicon-transfer bigglyphicon" ></span><br>Link</button>  		                          
	         </div>
        </div>    
	 
     </div>  
      
     <div id="bottom_help"   style="display:none" ></div> 
      <div id="mySidebotnav" class="sidebotnav"><a href="javascript:void(0)" class="closebtn" onclick="ContextMenuFunctions.closeNav()">Close</a></div>              
     <!-- here start footer section -->
      <div id="bottom_bar"> 
           <jsp:include page="/jsps/footer/botPrefBarFooter.jsp"></jsp:include>
      </div>
</div>

<div>
	      	<form method="post" id="hidden_info" style="display: none;" action="/webguiportal/romenext/gui/split/display">
	      		<input id="transfer_meta" name="selectedMetadata" value="-1">
	      		<input id="transfer_user_group_host" name="userGroupHost" value="-1">
	      		<input id="transfer_user_group_name" name="userGroupName" value="-1">
	      		<input id="transfer_user_name" name="userName" value="-1">
	      		<input id="transfer_typelist_length" name="listTypeidsLength" value="-1">    	
	      		<input id="transfer_connlist_length" name="listConnidsLength" value="-1">
	      		<input id="start_node_for_linking_type_id" name="startNodeForLinkingTypeId" value="">;
	      		<input id="start_node_for_linking_type_name" name="startNodeForLinkingTypeName" value="">;
	      		<input id="start_node_for_linking_name" name="startNodeForLinkingName" value="">;
	      		<input id="start_node_for_linking_uuid" name="startNodeForLinkingUuid" value="">;
	      		<input id="end_node_for_linking_type_id" name="endNodeForLinkingTypeId" value="">;
	      		<input id="end_node_for_linking_type_name" name="endNodeForLinkingTypeName" value="">;
	      		<input id="end_node_for_linking_name" name="endNodeForLinkingName" value="">;
	      		<input id="end_node_for_linking_uuid" name="endNodeForLinkingUuid" value="">;      
	      	</form>
	      	<form method="post" id="hidden_info_physical" style="display: none;" action="/webguiportal/romenext/gui/split/physical">
	      		<input id="transfer_meta1" name="selectedMetadata" value="-1">
	      		<input id="transfer_user_group_host1" name="userGroupHost" value="-1">
	      		<input id="transfer_user_group_name1" name="userGroupName" value="-1">
	      		<input id="transfer_user_name1" name="userName" value="-1">
	      		<input id="transfer_user_type1" name="typeid" value="-1">
	      		
	      	</form>
</div>

<div style="z-index:100; position:fixed;" id="besideMouse"></div>
<div style="z-index:100; position:fixed;" id="besideMouseCreate"></div>
<div id="property_win"   style="display:none" ></div> 
<div id="messageBox"></div>

<script>


 
</script>
</body>
</html>