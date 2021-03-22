<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib uri="http://java.sun.com/jsp/jstl/functions"
prefix="fn" %>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ROMENeXt Display</title>

    <!--    Imported CSS  -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
    />
    <link
      rel="stylesheet"
      href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <!--     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"> -->

    <!--    CYTOSCAPE PLUG INS CSS -->
    <link
      rel="stylesheet"
      href="/webguiportal/assets/css/cytoscape-context-menus.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="/webguiportal/assets/css/cytoscape-panzoom.css"
      type="text/css"
    />

    <!--   ROMENEXT CUSTOM CSS -->
    <link rel="stylesheet" href="/webguiportal/assets/css/BootSideMenu.css" />
    <link rel="stylesheet" href="/webguiportal/assets/css/custom-style.css" />

    <!--  IMPORTED JS  -->
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script>

    <!--    CYTOSCAPE  JS && PLUGINS JS -->
    <script src="/webguiportal/assets/js/libs/cytoscape/3.2.8/cytoscape.js"></script>
    <script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-panzoom.js"></script>
    <script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-qtip.js"></script>
    <script src="/webguiportal/assets/js/libs/cytoscape/cytoscape-context-menus.js"></script>

    <!--   ROMENEXT JAVASCRIPT  -->
    <jsp:include page="/jsps/header/javascriptHeaders.jsp"></jsp:include>
    <script src="/webguiportal/assets/js/els/fns/utils/cytoscape/CytoNodeUtils.js"></script>

    <!-- Three.js -->
    <script src="/webguiportal/assets/js/libs/three/three.js"></script>
    <script src="/webguiportal/assets/js/libs/three/js/examples/controls/TransformControls.js"></script>
    <script src="/webguiportal/assets/js/libs/three/js/examples/controls/OrbitControls.js"></script>
    <script src="/webguiportal/assets/js/libs/three/js/examples/cameras/CombinedCamera.js"></script>

    <!-- Global Utils -->
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalUserGroupUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalMetadataRepoUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalDecoUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalHTMLUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalTypeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalRuleUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalConnUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalTypeInstanceUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalNodeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/GlobalEdgeUtils.js"></script>

    <script src="/webguiportal/assets/js/els/fns/utils/api/GlobalApiUtils.js"></script>

    <script
      type="text/javascript"
      src="/webguiportal/assets/js/els/utils/gs_sortable.js"
    ></script>

    <!-- ROMENEXT Apis -->
    <script src="/webguiportal/assets/js/els/fns/apis/api-romenext.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/type/TypeApi.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/rule/RuleApis.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/permission/group/GroupApi.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/deco/DecoApis.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/node/NodeApis.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/edge/EdgeApis.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/tabDeco/TabDecoApi.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/path/PathNodeApis.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/node/utils/NodeJsonObject.js"></script>
    <script src="/webguiportal/assets/js/els/fns/tools/toolmanager-romenext.js"></script>
    <script src="/webguiportal/assets/js/els/global-var.js"></script>

    <!-- DISPLAY  LOGICAL JAVASCRIPT Core -->
    <script src="/webguiportal/assets/js/els/fns/display/utils/DisplayInterfaceUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/decos/reservation/1/utils/ReservationNewUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/utils/NodeFctsUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/utils/node/NodeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/utils/edge/EdgeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/connection/ConnectionApis.js"></script>

    <!-- This is a hack to force version 2 and not other versions -->
    <!--  Only for Logical Version 2 (will be removed later) -->
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/DisplayLogicalRenderer.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/DisplayLogicalRendererCrud.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/DisplayLogicalRendererGraph.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/DisplayLogicalRendererBar.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/libs/DisplayCytoscapeUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/old/node.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/old/graph-view.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/old/fns-node.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/old/fns-edge.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/old/fns-displayview.js"></script>

    <!-- Added for the workspace utils -->
    <script src="/webguiportal/assets/js/els/fns/display/logical/2/workspace/DisplayWorkspaceUtils.js"></script>

    <script src="/webguiportal/assets/js/els/fns/display/utils/CommonFctsLogicalDisplay.js"></script>
    <script src="/webguiportal/assets/js/els/fns/design/utils/CommonFctsLogical.js"></script>

    <!--  Workspace Apis  -->
    <script src="/webguiportal/assets/js/els/fns/apis/node/workspace/WorkspaceApis.js"></script>
    <script src="/webguiportal/assets/js/els/fns/apis/node/workspace/WorkspaceCaller.js"></script>

    <!-- DISPLAY  DECO JAVASCRIPT Core -->
    <script src="/webguiportal/assets/js/els/fns/display/designDeco/DesignDecoRenderer.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/designDeco/libs/DesignDecoUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/designDeco/libs/CreateProcessUtils.js"></script>

    <script src="/webguiportal/assets/js/els/fns/design/utils/conns/ConnectionPropertyUtils.js"></script>

    <!-- FORM DECORATOR  JAVASCRIPT -->
    <script src="/webguiportal/assets/js/els/fns/display/formview/v2/libs/DisplayNewFormUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/display/formview/v2/libs/DisplayFormUpdateNode.js"></script>

    <!-- Path -->
    <script src="/webguiportal/assets/js/els/fns/path/logical/1/PathLogicalRenderer.js"></script>
    <script src="/webguiportal/assets/js/els/fns/path/logical/1/libs/PathCytoscapeUtils.js"></script>

    <script src="/webguiportal/assets/js/els/fns/utils/preferenceBar/PrefBarFunctions.js"></script>

    <!-- Look to see if we can delete these below -->

    <!-- nice scroll -->
    <script
      src="/webguiportal/assets/js/libs/jquery.nicescroll.js"
      type="text/javascript"
    ></script>
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
    <!--custome script for all page-->

    <!-- ELS js -->
    <script src="/webguiportal/assets/js/els/utils/cytoscape-style.js"></script>

    <!--  Both Design & Display  -->
    <script src="/webguiportal/assets/js/els/createTool.js"></script>
    <script src="/webguiportal/assets/js/els/fns/fns-show.js"></script>
    <script src="/webguiportal/assets/js/els/fns/fns-metadata.js"></script>

    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
    <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>

    <script src="/webguiportal/assets/js/els/fns/design/logical/2/libs/PhysicalUtils.js"></script>
    <script src="/webguiportal/assets/js/els/fns/utils/module/ChildUtilsModule.js"></script>

    <!-- Dynamically added libraries -->
    <!--   	<c:forEach var="v" items="${ activedecos }"> -->
    <!--   		${v.romeDecorator.name} Deco -->
    <!--   		${ v.allLibraries } -->

    <!-- 	</c:forEach> -->
    <!-- End of dynamic add -->

    <script>
      user = "${user}";
      userGroup = { name: "${user.proxyUser}", host: "${user.proxyUser_host}" };
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
      if (
        !(
          startNodeForLinkingTypeId == "" &&
          startNodeForLinkingTypeName == "" &&
          startNodeForLinkingName == "" &&
          startNodeForLinkingUuid == ""
        )
      ) {
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
      if (
        !(
          endNodeForLinkingTypeId == "" &&
          endNodeForLinkingTypeName == "" &&
          endNodeForLinkingName == "" &&
          endNodeForLinkingUuid == ""
        )
      ) {
        endNodeForLinking = {};
        endNodeForLinking.typeId = Number(endNodeForLinkingTypeId);
        endNodeForLinking.typeName = endNodeForLinkingTypeName;
        endNodeForLinking.name = endNodeForLinkingName;
        endNodeForLinking.uuid = endNodeForLinkingUuid;
      }

      selectedDecoClassification = "INSTANCE";
      selectedDecoGrouping = "LOGICALGROUP";
      predefinedSelectedDecoPropertiesNames = ["x", "y", "z"];

      document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
          // create node
          if (document.getElementById("create_instance_button_id")) {
            document.getElementById("create_instance_button_id").click();
          }

          // create edge
          if (document.getElementById("create_edge_button_id")) {
            document.getElementById("create_edge_button_id").click();
          }

          // update node
          if (document.getElementById("update_instance_button_id")) {
            document.getElementById("update_instance_button_id").click();
          }

          // update edge
          if (document.getElementById("update_edge_button_id")) {
            document.getElementById("update_edge_button_id").click();
          }

          // create link
          if (document.getElementById("create_link_button_id")) {
            document.getElementById("create_link_button_id").click();
          }
        }
      });

      function populateMetaDataId(metadata) {
        //   		selectedMetaData = "${metadataSelected}";
        //   		// if a metadata was passed in we use that value instaed
        //  		if( typeof metadata !== 'undefined' ) {
        //  			selectedMetaData = metadata;
        //  		}

        console.log("Metadataid: " + selectedMetaData);
        topLevelTab = "instRelViewTab";

        //   		selecteddecorator = "${selectedDecorator}";
        //   		if (!selecteddecorator) {
        //   			selecteddecorator = "Logical";
        //   		}

        var tmpLength = Number("${listTypeidsLength}");
        console.log(tmpLength);
        if (tmpLength >= 1) {
          var tmpStr = "${listTypeids}";
          var tmpList = tmpStr.split(",");
          tmpList[0] = tmpList[0].substring(1);
          tmpList[tmpList.length - 1] = tmpList[tmpList.length - 1].substring(
            0,
            tmpList[tmpList.length - 1].length - 1
          );
          for (var i = 0; i < tmpLength; i++) {
            listTypeIds.push(Number(tmpList[i]));
          }
        }

        tmpLength = Number("${listConnidsLength}");
        console.log(tmpLength);
        if (tmpLength >= 1) {
          var tmpStr = "${listConnids}";
          var tmpList = tmpStr.split(",");
          tmpList[0] = tmpList[0].substring(1);
          tmpList[tmpList.length - 1] = tmpList[tmpList.length - 1].substring(
            0,
            tmpList[tmpList.length - 1].length - 1
          );
          for (var i = 0; i < tmpLength; i++) {
            listConnIds.push(Number(tmpList[i]));
          }
        }

        // 	    <c:forEach var="v" items="${ activedecos }">
        // 			var grouping = null;
        // 			var classification = null;
        // 			var name = null;

        // 			grouping = "${ v.romeDecorator.grouping }";
        // 			classification = "${ v.romeDecorator.classification }";
        // 			name = "${ v.romeDecorator.name }";

        // 			if ( grouping == "LOGICALGROUP" && classification == "INSTANCE" && name == "Logical" ) {
        // 				${ v.buttonScript }
        // 			}
        // 		</c:forEach>

        var displayLogicalRenderer = new DisplayLogicalRenderer();
        displayLogicalRenderer.initRenderer();
        displayLogicalRenderer.initView();

        var c2 = document.getElementById("renderCanvas"); // Get the canvas element

        console.log("Attempting to run the test");
        RMPHYSOBJ.testing();
        RMPHYSOBJ.initEngine(c2);

        $("#main-content-physical").toggle();
      }

      //     <c:forEach var="v" items="${ activedecos }">
      // 		<!-- ${v.name} Deco libraries START -->
      // 		${v.initScript}

      // 		// init the global vars
      // 		activeDecos_LN[ ${v.romeDecorator.id} ]   = "dynamicDec_${ v.romeDecorator.id }_LN_id";
      // 		activeDecos_BODY[ ${v.romeDecorator.id} ] = "dynamicDec_${ v.romeDecorator.id }_BODY_id";
      // 		activeDecos_TB[ ${v.romeDecorator.id} ]   = "dynamicDec_${ v.romeDecorator.id }_TB_id";
      // 		<!-- ${v.name} Deco libraries END  -->

      // 		${v.initVersionFn }( ${ v.romeDecorator.id } );

      // 	</c:forEach>

      guistate_main = "${ guistate_main }";
      guistate_sub = "${ guistate_sub }";

      function testChange() {}

      function toggleView() {
        // before we toggle, re-set the format of this view
        if ($("#main-content-physical").is(":visible")) {
          // we are about to hide this
          // 			$("#main-content-physical").removeClass("span4 col-xs-8");
          $("#logical_display_view").removeClass("span4 col-xs-4");
        } else {
          // we are about to show this
          // reset logical to side, set physical to right
          // 			$("#main-content-physical").addClass("span4 col-xs-8");
          $("#logical_display_view").addClass("span4 col-xs-4");
        }

        $("#main-content-physical").toggle();
        // 		$("#logical_display_view").toggle();
      }
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

      <nav
        id="myNavbar"
        class="navbar navbar-custom navbar-fixed-top"
        role="navigation"
      >
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="container-fluid">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!-- 	                <a class="navbar-brand" href="#">ROMENeXt Display</a> -->
            <a class="navbar-brand"
              ><img src="/webguiportal/assets/img/logo.jpg" alt="ROME Logo"
            /></a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <jsp:include page="/jsps/header/topNavHeader.jsp"></jsp:include>
        </div>
      </nav>

      <div id="main container-fluid">
        <div class="row top-bars" id="top_bars" style="clear: both">
          <div class="row t1">
            <div class="col-sm-12">
              <div class="col-sm-4">
                <ul class="list-inline" id="breadcrumb">
                  <li onclick="(new DisplayLogicalRenderer()).resetView();">
                    <a href="#"
                      ><span class="glyphicon glyphicon-home"></span>Home >
                    </a>
                  </li>
                  <li onclick="(new DisplayLogicalRenderer()).resetView();">
                    <a href="#">Logical View > </a>
                  </li>
                </ul>
              </div>
              <div class="col-sm-4" id="error_message"></div>
              <div class="col-sm-4" id="last_action" class="pull-right"></div>
            </div>
          </div>

          <div class="rowbar">
            <table>
              <tr
                style="background-color: #eeeeec"
                id="whole_node_type_bar"
                style="display: none"
              >
                <td width="2%" rowspan="5" valign="top">
                  <div
                    id="create_node"
                    draggable="true"
                    style="display: none"
                  ></div>
                  <div id="cache_nodes_for_linking" draggable="true"></div>
                </td>
                <td width="96%">
                  <div class="pull-left clearfix" id="node_bar"></div>
                </td>
                <td width="2%" style="vertical-align: top">
                  <div id="cnode_img">
                    <a
                      href="#"
                      class="btn btn-primary btn-primary btn-block"
                      data-state="visible"
                      id="node_img"
                      onclick="DisplayLogicalRendererBar.showOrHideTypeLinkBar(this.id);"
                    >
                      <span class="glyphicon glyphicon-off"></span><br />
                      Nodes</a
                    >
                  </div>
                </td>
              </tr>
              <tr
                style="background-color: #eeeeec"
                id="whole_link_bar"
                style="display: none"
              >
                <td width="96%">
                  <div class="pull-left clearfix" id="link_bar"></div>
                </td>
                <td width="2%" style="vertical-align: top">
                  <div id="clink_img">
                    <a
                      href="#"
                      class="btn btn-primary btn-primary btn-block"
                      data-state="visible"
                      id="link_img"
                      onclick="DisplayLogicalRendererBar.showOrHideTypeLinkBar(this.id);"
                    >
                      <span class="glyphicon glyphicon-random"></span><br />
                      Links</a
                    >
                  </div>
                </td>
              </tr>
              <tr
                style="background-color: #eeeeec"
                id="whole_path_type_bar"
                style="display: none"
              >
                <td width="96%">
                  <div class="pull-left clearfix" id="path_bar"></div>
                </td>
                <td width="2%" style="vertical-align: top">
                  <div id="cpath_img">
                    <a
                      href="#"
                      class="btn btn-primary btn-primary btn-block"
                      data-state="visible"
                      id="path_img"
                      onclick="DisplayLogicalRendererBar.showOrHideTypeLinkBar(this.id);"
                    >
                      <span class="glyphicon glyphicon-unchecked"></span><br />
                      Paths</a
                    >
                  </div>
                </td>
              </tr>
              <tr
                style="background-color: #eeeeec"
                id="whole_system_type_bar"
                style="display: none"
              >
                <td width="96%">
                  <div class="pull-left clearfix" id="system_bar"></div>
                </td>
                <td width="2%" style="vertical-align: top">
                  <div id="csystem_img">
                    <a
                      href="#"
                      class="btn btn-primary btn-primary btn-block"
                      data-state="visible"
                      id="system_img"
                      onclick="DisplayLogicalRendererBar.showOrHideTypeLinkBar(this.id);"
                    >
                      <span class="glyphicon glyphicon-warning-sign"></span
                      ><br />
                      Systems</a
                    >
                  </div>
                </td>
              </tr>

              <tr style="background-color: #eeeeec">
                <td width="96%">
                  <div
                    class="pull-left"
                    id="edge_bar"
                    style="display: none"
                  ></div>
                </td>
                <td width="2%"></td>
              </tr>
            </table>
          </div>
        </div>

        <!--         <div  class="box box-left" id="left_bar">	         -->
        <!-- 	         <div id="menu1" class="icon-bar-vert"> -->
        <!-- 	            <button type="button" class="btn btn-primary btn-md text-center" onclick=""><i class="fa fa-home f3x" aria-hidden="true"></i><br>Logical</button> -->
        <!--                 <button type="button" class="btn btn-primary btn-md text-center" onclick=""><i class="fa fa-file-text f3x" aria-hidden="true"></i><br>Form</button>    -->
        <!-- 	            <button type="button" class="btn btn-primary btn-md text-center" onclick=""><i class="fa fa-cubes f3x" aria-hidden="true"></i><br>Physical</button>   -->
        <!-- 	        </div>      -->
        <!--         </div>  -->

        <div class="clearfix row-fluid" id="main-content-workingarea">
          <div
            class="clearfix"
            id="logical_display_view"
            style="display: none"
          ></div>

          <div class="clearfix span4 col-xs-8" id="main-content-physical">
            <canvas
              id="renderCanvas"
              touch-action="none"
              width="100%"
              height="100%"
            ></canvas>
          </div>
        </div>

        <div class="box box-right" id="right_bar">
          <div class="icon-bar-vert">
            <div
              class="dropdown"
              onmouseover="workspaceSaveMenuTimer = setTimeout(function() {document.getElementById('display_workspace_menu_2').style.display='block';}, 800); clearTimeout(hideWorkspaceSaveMenuTimer);"
              onmouseout="hideWorkspaceSaveMenuTimer = setTimeout(function() {document.getElementById('display_workspace_menu_2').style.display='none';}, 300); clearTimeout(workspaceSaveMenuTimer);"
            >
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-hover="dropdown"
                title="Save"
                onclick="saveLogicalPosition();"
              >
                <i class="fa fa-floppy-o f3x" aria-hidden="true"></i><br />Save
              </button>
              <ul
                id="display_workspace_menu_2"
                class="dropdown-menu pull-right"
                style="display: none"
              ></ul>
            </div>
            <!--               <button type="button" class="btn btn-primary text-center" title="Save" onclick="saveLogicalPosition();"  aria-pressed="false" autocomplete="off"><i class="fa fa-floppy-o f3x" aria-hidden="true"></i><br>Save</button>    -->
            <button
              type="button"
              class="btn btn-primary text-center"
              title="Reset"
            >
              <span class="glyphicon glyphicon-refresh bigglyphicon"></span>
            </button>
            <button
              type="button"
              class="btn btn-primary text-center"
              title="Restore"
            >
              <span class="glyphicon glyphicon-refresh bigglyphicon"></span>
            </button>
            <button
              type="button"
              class="btn btn-primary text-center"
              title="Center"
              onclick="DisplayCytoscapeUtils.centerGraph();"
            >
              <span class="glyphicon glyphicon-refresh bigglyphicon"></span>
            </button>
            <button
              type="button"
              class="btn btn-primary text-center"
              title="Drill Up"
              onclick="DisplayLogicalRendererGraph.drillUp();"
            >
              <span class="glyphicon glyphicon-arrow-up bigglyphicon"></span>
            </button>

            <button
              type="button"
              class="btn btn-primary text-center"
              title="Drill Down"
              onclick="DisplayLogicalRendererGraph.drillDown();"
            >
              <span class="glyphicon glyphicon-arrow-down bigglyphicon"></span>
            </button>

            <button
              type="button"
              class="btn btn-primary text-center"
              title="Physical View"
              onclick="toggleView();"
            >
              <span class="glyphicon glyphicon-eye-open bigglyphicon"></span>
            </button>

            <!--            <a href="#" class="btn btn-md" title="Full Screen" id="full_screen_toggler_element_id" onclick="GlobalHTMLUtils.toggleFullScreen(document.body);"><span class="glyphicon glyphicon-resize-full bigglyphicon"></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Save" onclick="saveLogicalPosition();"><span class="glyphicon glyphicon-floppy-save bigglyphicon" ></span></a> -->

            <!--            <a href="#" class="btn btn-md" title="Save Workspace" onclick="( new WorkspaceCaller() ).createWorkspace();"><span class="glyphicon glyphicon-floppy-save bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="GET Workspace" onclick="( new WorkspaceCaller() ).getWorkspace();"><span class="glyphicon glyphicon-floppy-save bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Reset"><span class="glyphicon glyphicon-refresh bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Restore"><span class="glyphicon glyphicon-refresh bigglyphicon" ></span></a> -->

            <!--            <a href="#" class="btn btn-md" title="Center" onclick="DisplayCytoscapeUtils.centerGraph();"><span class="glyphicon glyphicon-screenshot bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Toggle Edge Name" id="toggle_edge_element_id" name="show" onclick="toggleElementNameDisplay(this.id, this.name, 'edge');"><span class="glyphicon glyphicon-eye-open bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Filter Link" id="filter_link_edge_element_id" name="hide" onclick="DisplayCytoscapeUtils.toggleLinkEdge(this.id, this.name);"><span class="glyphicon glyphicon-transfer bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Drill Up" onclick="DisplayLogicalRendererGraph.drillUp();"><span class="glyphicon glyphicon-arrow-up bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Drill Down" onclick="DisplayLogicalRendererGraph.drillDown();"><span class="glyphicon glyphicon-arrow-down bigglyphicon" ></span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Back"><span class="glyphicon glyphicon- bigglyphicon" >Back</span></a> -->
            <!--            <a href="#" class="btn btn-md" title="Create Edge"><span class="glyphicon glyphicon-arrow-right bigglyphicon" ></span></a> -->
            <!--                             id="create_link" onclick="GlobalRuleUtils.generateLinkRuleDropList(this.id, 'Logical Display');" -->
            <!--            <a href="#" class="btn btn-md" title="Create Link"><span class="glyphicon glyphicon-resize-horizontal bigglyphicon"></span></a>                         -->
          </div>
        </div>
      </div>

      <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
      <div id="bottom_bar">
        <jsp:include page="/jsps/footer/botPrefBarFooter.jsp"></jsp:include>
        <!--         <table width="100%"> -->
        <!-- 	       <tr> -->
        <!--              <td width="20%"><div id="bottom_node_properties_list">Element Details</div></td> -->
        <!--              <td width="20%"><div id="bottom_workspace_property_list" style="display:none;"></div></td> -->
        <!--              <td width="30%" id="node_features">  -->
        <!-- 	              <div><ul class="list-inline" > -->
        <!-- 	                   <li > <b>Node Label:</b> </li> -->
        <!-- 	                   <li > -->
        <!--            			    <button type="button" class="btn btn-primary btn-xs" id="node_captions" data-state="show" onclick="CommonFctsLogicalDisplay.toggleNodeName()">ON</button> -->
        <!--            			 </li> -->
        <!-- 	                   <li id="node_label_pos" >location:  -->
        <!--            			     <select  id="label_node_positions"  onChange=""> -->
        <!--            			           <option value='top'>Above</option> -->
        <!--            			           <option value='center'>Center</option>          			       -->
        <!--            			           <option value='bottom'>Below</option> -->
        <!--            			     </select> -->
        <!--            			     <br/>location -->
        <!--            			   </li>	 -->
        <!--            			   <li id="node_label_size" >Size: -->
        <!--            			     <select  id="label_node_size"   onChange=""> -->
        <!--            			           <option value='11px'>11px</option> -->
        <!--            			           <option value='12px'>12px</option> -->
        <!--            			           <option value='14px'>14px</option> -->
        <!--            			           <option value='16px'>16px</option> -->
        <!--            			           <option value='18px'>18px</option> -->
        <!--            			     </select> -->
        <!--             			     <br/>Size -->
        <!--            			  </li> -->

        <!-- 	              </ul></div> -->
        <!-- 	          </td> -->

        <!-- 	         <td width="25%"   id="edge_features" > -->
        <!-- 		             <ul class="list-inline">	 -->
        <!-- 		             	<li > <b>Relationship</b> </li> -->
        <!-- 		             	<li > -->
        <!-- 	           			    <button type="button" class="btn btn-primary btn-sm" id="connections" data-state="show" onclick="CommonFctsLogicalDisplay.toggleConnections();">ON</button> -->
        <!-- 	           			</li> -->
        <!-- 	           			<li > -->
        <!-- 	           			    Label: -->
        <!-- 	           			    <button type="button" class="btn btn-default btn-sm active" id="edge_captions" data-state="hide" onclick="CommonFctsLogicalDisplay.toggleEdgeName();">OFF</button> -->
        <!-- 	           			</li> -->

        <!-- 	                </ul> -->
        <!-- 		      </td> -->

        <!-- 	       </tr> -->
        <!-- 	     </table> -->
      </div>
    </div>

    <div>
      <form
        method="post"
        id="hidden_info"
        style="display: none"
        action="/webguiportal/romenext/gui/split/design"
      >
        <input id="transfer_meta" name="selectedMetadata" value="1" />
        <input id="transfer_user_group_host" name="userGroupHost" value="-1" />
        <input id="transfer_user_group_name" name="userGroupName" value="-1" />
        <input id="transfer_user_name" name="userName" value="-1" />
        <input
          id="transfer_typelist_length"
          name="listTypeidsLength"
          value="9"
        />
        <input
          id="transfer_connlist_length"
          name="listConnidsLength"
          value="-2"
        />
        <input
          id="start_node_for_linking_type_id"
          name="startNodeForLinkingTypeId"
          value="105"
        />;
        <input
          id="start_node_for_linking_type_name"
          name="startNodeForLinkingTypeName"
          value="ui"
        />;
        <input
          id="start_node_for_linking_name"
          name="startNodeForLinkingName"
          value="test"
        />;
        <input
          id="start_node_for_linking_uuid"
          name="startNodeForLinkingUuid"
          value="1"
        />;
        <input
          id="end_node_for_linking_type_id"
          name="endNodeForLinkingTypeId"
          value="106"
        />;
        <input
          id="end_node_for_linking_type_name"
          name="endNodeForLinkingTypeName"
          value="ui2"
        />;
        <input
          id="end_node_for_linking_name"
          name="endNodeForLinkingName"
          value="test1"
        />;
        <input
          id="end_node_for_linking_uuid"
          name="endNodeForLinkingUuid"
          value="2"
        />;
      </form>
    </div>
  </body>
</html>
