<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html lang="en">
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>ROMENEXT Design</title>
	
	<!--    Imported CSS  -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.css" />
	<!-- Add icon library -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	
	<script src="/webguiportal/assets/js/els/utils/cytoscape-qtip.js"></script>
    <script src="/webguiportal/assets/js/els/utils/cytoscape-context-menus.js"></script>
	
	<!--  IMPORTED JAVASCRIPT  -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	

	<link rel="stylesheet" href="/webguiportal/assets/css/custom-style.css">
	


	<jsp:include page="/jsps/header/javascriptHeaders.jsp"></jsp:include>
	
		    <!-- Three.js -->
    <script src="/webguiportal/assets/js/libs/three/three.js"></script> 
  	<script src="/webguiportal/assets/js/libs/three/js/examples/controls/TransformControls.js"></script>
  	<script src="/webguiportal/assets/js/libs/three/js/examples/controls/OrbitControls.js"></script>
  	<script src="/webguiportal/assets/js/libs/three/js/examples/cameras/CombinedCamera.js"></script>
  	
  	

	<!--  ELS  -->
	<script src="/webguiportal/assets/js/els/global-var.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalHTMLUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalUserGroupUtils.js"></script>
	<script src="/webguiportal/assets/js/els/fns/utils/GlobalMetadataRepoUtils.js"></script>
	  	<script src="/webguiportal/assets/js/els/fns/utils/GlobalTypeInstanceUtils.js"></script>
	  	<script src="/webguiportal/assets/js/els/fns/utils/GlobalTypeUtils.js"></script>
	
	<script src="/webguiportal/assets/js/els/fns/fns-show.js"></script>
	<script src="/webguiportal/assets/js/els/fns/fns-metadata.js"></script>
	<script src="/webguiportal/assets/js/els/createTool.js"></script>
	<script src="/webguiportal/assets/js/els/fns/tools/toolmanager-romenext.js"></script>
   	<script src="/webguiportal/assets/js/els/fns/design/physical/RenderInterface.js"></script>

	<!--  API  -->
  	<script src="/webguiportal/assets/js/els/fns/apis/api-romenext.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/type/TypeApi.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/permission/group/GroupApi.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/shapeApis.js"></script>
  	
  	  	<script src="/webguiportal/assets/js/els/fns/apis/node/NodeApis.js"></script>
  	
  	
  	<!-- CORE -->
   	<script src="/webguiportal/assets/js/els/fns/design/utils/DesignInterfaceUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/utils/type/TypeUtils.js"></script>    
  	<script src="/webguiportal/assets/js/els/fns/design/utils/conns/ConnectionUtils.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/design/utils/type/TypePropertyUtils.js"></script>
  	<script src="/webguiportal/assets/js/els/fns/apis/type/property/TypePropertyApi.js"></script>
	<script src="/webguiportal/assets/js/els/fns/apis/type/property/TypePropertyObject.js"></script>
	
	<!-- Connection/RULE APIS -->
	<script src="/webguiportal/assets/js/els/fns/apis/rule/RuleApis.js"></script>
	<script src="/webguiportal/assets/js/els/fns/apis/connection/ConnectionApis.js"></script>
	<script src="/webguiportal/assets/js/els/fns/design/utils/conns/ConnectionPropertyUtils.js"></script>

    <!-- External js -->
	<script>window.cytoscape || document.write('<script src="/webguiportal/assets/js/libs/jquery/2.2.2/jquery.js">\x3C/script>')</script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script>window.cytoscape || document.write('<script src="/webguiportal/assets/js/libs/jquery-ui/1.11.4/jquery-ui.js">\x3C/script>')</script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.js"></script>
	<script>window.cytoscape || document.write('<script src="/webguiportal/assets/js/libs/cytoscape/2.6.6/cytoscape.js">\x3C/script>')</script>
	
	<script src="/webguiportal/assets/js/els/utils/cytoscape-qtip.js"></script>
    <script src="/webguiportal/assets/js/els/utils/cytoscape-context-menus.js"></script>
    
    <!-- nice scroll -->
    <script src="/webguiportal/assets/js/libs/jquery.nicescroll.js" type="text/javascript"></script>
    
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script> 
    
    <!--custome script for all page-->
    <script src="/webguiportal/assets/js/libs/scripts.js"></script>

    <!--  ALL Pages -->
    <script src="/webguiportal/assets/rome3/app.min.js"></script>
    <script src="/webguiportal/assets/rome3/jquery.slimscroll.js"></script> 
    <script src="/webguiportal/assets/js/els/utils/helper.js"></script>
    <script src="/webguiportal/assets/js/els/utils/cytoscape-style.js"></script>
    
    <!--  Only for Logical Version 2 (will be removed later) -->
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/DesignLogicalRenderer.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/DesignLogicalRendererCrud.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/DesignCytoscapeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-connection.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-designview.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-rule.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/fns-type.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/logical/2/old/typegraph-view.js"></script>


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
	

  	
  	

  	<!-- Dynamically added libraries -->
<!--   	<c:forEach var="v" items="${ activedecos }"> -->
<!--   		${v.romeDecorator.name} Deco -->
<!--   		${ v.allLibraries } -->
  		
<!-- 	</c:forEach> -->
  	<!-- End of dynamic add -->  	

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
	
	

	
  	function populateMetaDataId( metadata ) {
  		
		
		
		
		
		
// 		var designLogicalRenderer = new DesignLogicalRenderer(); 
// 		designLogicalRenderer.initRenderer();
// 		designLogicalRenderer.initView();

  		// load the type id
//   		GlobalTypeInstanceUtils.getAllInstances( ${typeid} );
  		GlobalTypeUtils.loadType( ${typeid} );

  		var designPhysicalRenderer = new DesignPhysicalRenderer(); 
  		designPhysicalRenderer.initRenderer();
  		designPhysicalRenderer.initView();
  		( new DesignPhysicalRenderer() ).internal_loadModelShapes()

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

 	</script>
</head>
<body onload="populateMetaDataId()">
    
	<div class="wrapper">
	   	<nav id="myNavbar" class="navbar navbar-custom " role="navigation">
	        <!-- Brand and toggle get grouped for better mobile display -->
	        <div class="container">
	            <div class="navbar-header">
	                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
	                    <span class="sr-only">Toggle navigation</span>
	                    <span class="icon-bar"></span>
	                    <span class="icon-bar"></span>
	                    <span class="icon-bar"></span>
	                </button>
	                <a class="navbar-brand" href="#">Romenext Design</a>
	            </div>
	            <!-- Collect the nav links, forms, and other content for toggling -->
	            <div class="collapse navbar-collapse" id="navbarCollapse">
	                        
	                <div class="nav navbar-nav navbar-right">
	                   
	                        <div class="btn-group vertical-align: middle " >
	                            <button type="button" class="btn btn-default btn-md text-center" title="Undo"><i class="fa fa-undo" aria-hidden="true"></i><br>Undo</button>
	                            <button type="button" class="btn btn-default btn-md text-center " title="Redo"><span class="glyphicon glyphicon-share-alt"></span><br>Redo</button>
	                            <button type="button" class="btn btn-default btn-md text-center" title="Design"><span class="glyphicon glyphicon-th-large"></span><br>Design</button>

	                            <button type="button" class="btn btn-default btn-md text-center" title="Display" onclick="GlobalUtils.callDesignDisplayServlet();"><span class="glyphicon glyphicon-eye-open"></span><br>Display</button> 

	                            <button type="button" class="btn btn-default btn-md text-center" title="Settings" ><span class="glyphicon glyphicon-cog"></span><br>Setting</button>
	                            <button type="button" class="btn btn-default btn-md text-center" title="Help" ><span class="glyphicon glyphicon-question-sign"></span><br>Help</button>
	                        </div>
	                        <div class="btn-group">
							  <a class="btn btn-primary" href="#"><i class="fa fa-user fa-fw"></i> ${user.username}</a>
							  <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
							    <span class="fa fa-caret-down" title="Toggle dropdown menu"></span>
							  </a>
							  <ul class="dropdown-menu">
	<!-- 						    <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Settings</a></li> -->
							    <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Profile</a></li>
							    <li class="divider"></li>
							    <li><a href="/webguiportal/jsps/login.jsp"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
							  </ul>
							</div>
	<!--                     <button type="button" class="btn btn-default btn-lg text-center" title="Username" ><span class="glyphicon glyphicon-user"></span>Username</button> -->
	                </div>
	            </div>
	        </div>
	    </nav>        
	 
	        <!--      Here start the bars used for the design part -->
	     <div id="error_message"></div>
	     <div class="row">
	         <ul class="breadcrumb" id="breadcrumb">
	             <li><a href="#"><span class="glyphicon glyphicon-home"></span>Home</a></li>
	             <li><a href="#">Logical View</a></li>
	             <li>Nodes</li>  
	             <li id="meta" ></li>        
	         </ul>
	     </div>
	     <div class="container">
	     <div class="row breadcrumb" id="Node_type_bar">
	         <div class="col-sm-2 ">
	             <div class="btn-group"> 
	                  <a class="btn btn-primary dropdown-toggle" id="plus_icon"  data-toggle="dropdown" href="#"><span   class="glyphicon glyphicon-plus"></span></a> 
	                   <ul class="dropdown-menu">
<!-- 	                      <ul class='list-inline'> -->
                      
	                       <li  onclick="(new DesignLogicalRenderer()).showAddType();">
	                            <a href="#">Node</a></li>
	                       <li ><a href="#">Path</a></li>
	                       <li ><a href="#">System</a></li>
	                       <li ><a href="#">Link</a></li> 
	                       <li ><a href="#">DTC Objects</a></li>
<!-- 	                      </ul> -->
	                   </ul>
	                  
	             </div>
	         </div>
	         <div class="col-sm-9" id="typelist">  List of Types  </div>
	         <div class="col-sm-1"> </div>
	          <div id="create_type"  draggable="true" >  </div>
	     </div>
	     
	     <div class="row" id="path_type_bar"    style="display:none;">Path List  </div>
	     <div class="row" id="system_type_bar"  style="display:none;">System List </div>
	     </div>
	</div>

<section> 
  <!--    Here start the main window work area -  divided into three left bar  main  right bar -->
    <div class="row" id="main-content">
    
	    <div class="col-sm-1" id="Left-bar">
	        <div class="icon-bar-vert pull-right">
	                <a href="#"><i class="fa fa-home bigfa"></i><br>Logical</a>
	                <a href="#"><i class="fa fa-file-text bigfa "></i><br>Form</a>
	                <a href="#" onclick="designPhysicalRenderer.initView();"><i class="fa fa-cubes bigfa"></i><br>Physical</a>
	        </div>
	    </div> 
	   
	    <div class="col-sm-10" id="main-content-workingarea">
			<div id="physical_design_view_id" style="display:none;">
				<div id="pv3d" style="display:none;">
				</div>
			</div>
			
	    </div>  
	     
	     <div class="col-sm-1" id="right-bar">
	             <div class="icon-bar-vert">
	                     <a href="#" class="btn btn-md" title="Save"><span class="glyphicon glyphicon-floppy-save bigglyphicon" ></span></a>
	                     <a href="#" class="btn btn-md" title="Reset"><span class="glyphicon glyphicon-refresh bigglyphicon" ></span></a>
	                     <a href="#" class="btn btn-md" title="Center"><span class="glyphicon glyphicon-screenshot bigglyphicon" ></span></a>
	                     <a href="#" class="btn btn-md" title="Back"><span class="glyphicon glyphicon- bigglyphicon" >Back</span></a>
	                     <a href="#" class="btn btn-md" title="Create Edge" onclick="ConnectionPropertyUtils.createConnection('parentchild');"><span class="glyphicon glyphicon-arrow-right bigglyphicon"></span></a>
	                     <a href="#" class="btn btn-md" title="Create Link"><span class="glyphicon glyphicon-resize-horizontal bigglyphicon" ></span></a>                        
	             </div>

        </div>
     </div>    
      <div>
      	<form method="post" id="hidden_info" style="display: none;" action="/webguiportal/romenext/gui/split/display">
      		<input id="transfer_meta" name="selectedMetadata" value="-1">
      		<input id="transfer_user_group_host" name="userGroupHost" value="-1">
      		<input id="transfer_user_group_name" name="userGroupName" value="-1">
      		<input id="transfer_user_name" name="userName" value="-1">
      	</form>
      </div>

 </section>
     <!-- here start footer section -->
     <hr/>
     <div class="container">

	     <div class="row breadcrumb ">
	        <div class="col-sm-12">
	                <div class="col-sm-1" id="active_type"></div>
	                <div class="col-sm-3" id="color_selection">Color: </div>
	                <div class="col-sm-3" id="size_selection">Size:   </div>
	                <div class="col-sm-4" id="caption_options">Caption: </div>
	                <div class="col-sm-1" id="activate_captions"> </div>
	        </div>
	    </div>
	    <div class="row">
	        <div class="col-sm-12">
	            <footer>
	                <p>&copy;ELS  Copyright 2017 </p>
	            </footer>
	        </div>
	     </div>
	 </div>


</body>
</html>