<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="collapse navbar-collapse" id="navbarCollapse">
	<div class="nav navbar-nav navbar-right">

		<c:if test="${ sessionScope.guistate_main == 'DISPLAY' }">
			<div id="session_based_connecting_nodes_small_div_id" class="btn-group vertical-align: middle">
				<button id="session_based_connecting_nodes_small_element_start_id" type="button" class="btn btn-default btn-md text-center"></button>
				<button id="session_based_connecting_nodes_small_element_connect_id" type="button" class="btn btn-default btn-md text-center" onclick="(new DisplayLogicalRenderer()).generateNodesForLinkingCacheForm();" disabled>
					<span class="glyphicon glyphicon-resize-horizontal"></span><br>
				</button>
				<button id="session_based_connecting_nodes_small_element_end_id" type="button" class="btn btn-default btn-md text-center"></button>
			</div>
		</c:if>




		<div class="btn-group vertical-align: middle ">
			<button type="button" class="btn btn-primary btn-md text-center disabled"> <i class="fa fa-reply" aria-hidden="true"></i><br>Undo </button>
			<button type="button" class="btn btn-primary btn-md text-center disabled"> <i class="fa fa-share" aria-hidden="true"></i><br>Redo </button>

			<!-- How to show the DESIGN button -->
			<c:choose>
				<c:when test="${ sessionScope.guistate_main == 'DESIGN' }">
					<div class="btn-group">
						
						<button type="button" class="btn btn-raised btn-primary btn-md text-center dropdown-toggle" id="design" data-toggle="dropdown"> <span class="glyphicon glyphicon-th-large"></span><br>Design </button>
						<div class="dropdown-menu">
							<button type="button" class="btn btn-primary text-center" style="width: 100%"> <i class="fa fa-home f3x" aria-hidden="true"></i>Logical View </button>
							<button type="button" class="btn btn-primary text-center disabled" style="width: 100%"> <i class="fa fa-file-text f3x" aria-hidden="true"></i>Form View </button>
							<button type="button" class="btn btn-primary text-center disabled" style="width: 100%"> <i class="fa fa-cubes f3x" aria-hidden="true"></i>Physical </button>
						</div>
					</div>
				</c:when>
				
				
				<c:when test="${ sessionScope.guistate_main == 'DISPLAY' }">
					<button type="button" class="btn btn-primary btn-md text-center"  id="design" onclick="GlobalUtils.callDesignDisplayServlet();"><span class="glyphicon glyphicon-th-large"></span><br>Design  </button>
				</c:when>
				<c:otherwise>
					<button type="button" class="btn btn-primary btn-md text-center"  id="design" onclick="GlobalUtils.callDesignDisplayServlet();"><span class="glyphicon glyphicon-th-large"></span><br>Design  </button>
				</c:otherwise>

			</c:choose>

			<!--  How to show the DISPLAY button -->
			<c:choose>
				<c:when test="${ sessionScope.guistate_main == 'DESIGN' }">
					<button type="button" class="btn btn-primary btn-md text-center" onclick="GlobalUtils.callDesignDisplayServlet();"> <span class="glyphicon glyphicon-eye-open"></span><br>Display</button>
				</c:when>
				<c:when test="${ sessionScope.guistate_main == 'DISPLAY' }">
					<div class="btn-group">
						<button type="button" class="btn btn-raised btn-primary btn-md text-center dropdown-toggle" id="display" data-toggle="dropdown"> <span class="glyphicon glyphicon-eye-open"></span><br>Display </button>
						<div id="display_workspace_menu" class="dropdown-menu"></div>
					</div>
				</c:when>
				<c:otherwise>
					<button type="button" class="btn btn-primary btn-md text-center" onclick="GlobalUtils.callDesignDisplayServlet();"><span class="glyphicon glyphicon-eye-open"></span><br>Display</button>
				</c:otherwise>

			</c:choose>

			<button type="button" class="btn btn-primary btn-md text-center disabled"><i class="fa fa-cog" aria-hidden="true"></i><br>Setting</button>
			
			<div class="btn-group">
				<button type="button" class="btn btn-primary btn-md text-center dropdown-toggle" data-toggle="dropdown"><i class="fa fa-question-circle" aria-hidden="true"></i><br>Help</button>
				<div class="dropdown-menu">
					<ul>
						<li>Version ${sessionScope.manifest.version }</li>
			            <li role="separator" class="divider"></li>
			            <li>Build Time ${sessionScope.manifest.dateString } </li>
					</ul>
				</div>
			
			</div>
		</div>

		<div class="btn-group">
			<a class="btn btn-primary" href="#"> <img src="/webguiportal/assets/img/user.jpg" class="img-circle" alt="User Image">${user.username}</a> <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"> <span class="fa fa-caret-down" title="Toggle dropdown menu"></span> </a>
			<ul class="dropdown-menu">
				<li><i class="fa fa-trash-o fa-fw"></i> Profile</li>
				<li><a href="/webguiportal/jsps/login.jsp"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
			</ul>
		</div>
		<button type="button" class="btn btn-primary btn-md text-center disabled" id="full_screen_toggler_element_id" onclick="GlobalHTMLUtils.toggleFullScreen(document.body);"> <span class="glyphicon glyphicon-resize-full bigglyphicon"></span> </button>
	</div>
</div>