<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<html lang="en">
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
	
	<title>ROMENEXT Design</title>
	
    <!--    IMPORTED CSS  --> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
     
    <!--  IMPORTED JS  -->
<!--     <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	 --> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
<!-- 	<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script>  -->  
      
                  
    <!--   LOCAL CSS -->      
	<style type="text/css">
		<%@include file="/assets/css/BootSideMenu.css" %>
		<%@include file="/assets/css/custom-style.css" %>
		<%@include file="/assets/css/Forms.css" %>
	</style>	

        	          	
    <!-- nice scroll -->
    <script type="text/javascript">
		<%@include file="/assets/js/libs/jquery.nicescroll.js" %>
	</script>
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script> 
     
    <!--  LOCAL JS  --> 
	<script type="text/javascript">
		<%@include file="/assets/js/global-vars-admin.js" %>
		<%@include file="/assets/js/validationIP.js" %>
		<%@include file="/assets/js/ValidateForms.js" %>
		<%@include file="/assets/js/ScanningServers.js" %>
		<%@include file="/assets/js/server/AddMDServer.js" %>
		<%@include file="/assets/js/AllForms.js" %>
		<%@include file="/assets/js/server/ServerStatus.js" %>
	</script>

          
    <script>
        api_url = "${ sessionScope.api_url }";
        usr     = "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }";
               
    </script>
    <style>
    body {  counter-reset: section;}
    </style>
  
</head>
<body>
	<jsp:include page="/jsps/headers/topBar.jsp"></jsp:include>   	        
    <div id="main"> 
        <div class="row">
			     <ul class="topmenu">
	            	<li><button   class="btn btn-primary btn-xs" onclick="location.href='/admin/boot/server/add2'">Add Metadata</button></li>            	
<!-- 	           	    <li><button   class="btn btn-primary btn-xs" onclick="ScanningServers.setScanDiv();">Scan for Metadata</button></li>	 -->
	             </ul>   

        </div>
         
		<div id="Info" class="row">
		   <h3>ROMEAdmin </h3>
		   <table style="align:middle;width:auto;">
				   <tr><th>Romenext Admin:</th><td>Version:${sessionScope.manifest.version }</td><td>Build Time:${sessionScope.manifest.dateString }</td></tr>
				   <tr><th>Romenext GUI:</th><td>Version:</td><td>Build Time:</td></tr>
				   <tr><th>Romenext API:</th><td>Version:</td><td>Build Time:</td></tr>
		   </table>	  		   		  	
		</div>  
		
		<div id="parent" >
		   <div id="divMD" class="columnleft">
		       <div class="btn-group">
			        <button type="button" data-toggle="dropdown" class="btn btn-primary dropdown-toggle">Metadata <span class="caret"></span></button>
			        <ul class="dropdown-menu">
			            <li ><a href="#" onclick="ServerStatus.setSelectDiv();" >Select</a></li>
			            <li class="disabled"><a href="#" >New</a></li>
			            <li class="disabled"><a href="#" >Configure</a></li>
			            <li class="disabled" ><a href="#" >Validate</a></li>
			            <li class="disabled"><a href="#">Fix</a></li>
			            <li class="disabled"><a href="#" >Manage</a></li>
			            <li class="disabled"><a href="#">Backup</a></li>
			        </ul>
			    </div>
			    
			    <div style="display:flex;flex-direction: column;" id="colMD">
				    <% if(request.getParameter("error")== null) { %>
							<div style="color:red">${error }</div>
					  <%} %> 
				    <h3>Previous Metadata</h3>
			            <c:choose>
							<c:when test="${sessionScope.current_lastused_server != null }">
							 <div   class="device" id="lastusedid">	
						           <input type="hidden" name="lastusedserver" value="${sessionScope.current_lastused_server}" />	    
						 			<span style="color:red; font-weight:bold;">Last Used Metadata : ${ sessionScope.current_lastused_server.boxname }</span><br/>      
								    <a href="#" class="button">
								      <img src="/admin/assets/img/admin_icons/msql_icon.jpg" alt="mysql" style="width:50px; height:75px;float:left">
								    </a>  
									<div >
									    <span id="${sessionScope.current_lastused_server.index}"></span>				   
									    <p>IP: <b>${ sessionScope.current_lastused_server.ip }</b><br/>
									       Port:<b>${sessionScope.current_lastused_server.port }</b><br/> 
									    MySQL Version Info:<br/>
									    <b>${ sessionScope.current_lastused_server.dbVersion }</b></p>
<%-- 											    Account: <b>${ sessionScope.current_lastused_server.username}</b><br/>  --%>
<%-- 											    Schema: <b>${ sessionScope.current_lastused_server.schema }</b><br/>							     --%>
<%-- 												Last Used: ${sessionScope.current_lastused_server.lastUsed }</p> --%>
<%--                                         <button class='btn btn-primary btn-xs' onclick="location.href='/admin/boot/server/manage?serverIndex=${sessionScope.current_lastused_server.index}'" > Select Metadata</button>  --%>
									</div>		                                    
							 </div>					 			
							 <br/>
							</c:when>
							<c:when test="${sessionScope.current_lastused_server == null }">
							</c:when>
					    </c:choose>
			             <c:forEach items="${sessionScope.rmn_servers }" var="server" varStatus="counter">
				             <c:set var="currstatus" value="${ ! empty sessionScope.rmn_servers[ sessionScope.current_server ] }"></c:set>
				             <c:if test="${currstatus }">
						      		<c:set var="current_server" value="${sessionScope.rmn_servers[ sessionScope.current_server ] }"> </c:set>
						     </c:if>  
							<!-- Check to see if there is a last used assigned, and skip it if it is the same one!  1. Check if an lastUsed is found 2. If found, check to see if current hash is the same 3. If True, skip. 4. If false, output -->
							<c:choose>
								<c:when test="${sessionScope.current_lastused_server != null && sessionScope.current_lastused_server.hash == server.value.hash }">
								</c:when>
								<c:otherwise>	          
							       <div   class="device" id="${counter.index }">
							           <input type="hidden" name="server${counter.index }" value="${server}" />		           
					                   <span style="color:blue; font-weight:bold;">${ server.value.boxname }</span><br/>						    
									   <a href="#" onclick="ServerStatus.displayDash('${ server.value.ip }','${ server.value.username }','${ server.value.pw }','${ server.value.schema }');">
									        <img src="/admin/assets/img/admin_icons/msql_icon.jpg" alt="mysql" style="width:50px; height:75px;float:left">
									   </a>
									   <div>   
										  <span id="${server.value.index}"></span>				   
										  <p>IP:<b>${ server.value.ip }</b><br/>
										     Port : <b>${server.value.port }</b><br/> 
									         MySQL Version:
									         <b>${ server.value.innodb }</b></p> 				    
<%--                                             <button class='btn btn-primary btn-xs' onclick="location.href='/admin/boot/server/manage?serverIndex=${server.value.index}'" > Select Metadata</button>   --%>
										</div>										    
								  </div>					         
								</c:otherwise>
							</c:choose>	 	
					    </c:forEach>				
				</div>	
		   </div> 
		   <div id="divStatus" class="columnmid"  > 

		   </div>	
		   <div id="messages"  class="columnright">
		   
		   </div>	
		</div>
			
		      
	   <div  class="container row" id="scanning_servers"></div>  
	   <div  class="container" id="div_servers"></div>                    	
    </div> 
   	            
  </body>   
  
   
</html>