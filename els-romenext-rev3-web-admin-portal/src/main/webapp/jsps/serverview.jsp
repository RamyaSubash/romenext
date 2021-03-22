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
	
	<title>ROMENEXT Design</title>
	
    <!--    Imported CSS  --> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
     
    <style type="text/css">
		<%@include file="/assets/css/BootSideMenu.css" %>
		<%@include file="/assets/css/custom-style.css" %>
	</style>
    
    <!--  IMPORTED JS  -->
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
	<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script> 
	  
    
    
    <!--   LOCAL JS  --> 
	<script type="text/javascript">
		<%@include file="/assets/js/els/utils/BootSideMenu.js" %>
	</script>
    

     
  	
  	
    <!-- nice scroll -->
	<script type="text/javascript">
		<%@include file="/assets/js/libs/jquery.nicescroll.js" %>
	</script>
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>  
 
        
     
	 
	  
	
  	<!-- Dynamically added libraries -->
<!--   	<c:forEach var="v" items="${ activedecos }"> -->
<!--   		${v.romeDecorator.name} Deco -->
<!--   		${ v.allLibraries } -->
  		
<!-- 	</c:forEach> -->
  	<!-- End of dynamic add -->  	

  
</head>
<body>

	<jsp:include page="/jsps/headers/topBar.jsp"></jsp:include>

    <div class="container-fluid">

      <div class="row">
      	<jsp:include page="/jsps/headers/leftNavHeader.jsp"></jsp:include>

        



        
		  
          <div class="table-responsive">
            <h2 class="sub-header">Dashboard - Current Selected Server</h2>
          
          <br/>
      	  <% if(request.getParameter("error")== null) { %>
				<div style="color:red">${error }</div>
		  <%} %>
		  <br/>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Boxname</th>
                  <th>Database Information</th>
                  <th>Schema Information</th>
                  <th>Account</th>
                  <th>Server Status</th>
                  <th>Options</th>
                   <th>Options</th>
                  
                </tr>
              </thead>
              <tbody>	
              
              	<c:set var="status" value="${ ! empty sessionScope.rmn_servers[ sessionScope.current_server ] }"/>
              	
              	<c:choose>
      				<c:when test="${ ! empty sessionScope.rmn_servers[ sessionScope.current_server ] } ">
      					<c:set var="current_server" value="${sessionScope.rmn_servers[ sessionScope.current_server ] }"> </c:set>
      				</c:when>
      				<c:when test="${status }">
      					 <c:set var="current_server" value="${sessionScope.rmn_servers[ sessionScope.current_server ] }"> </c:set>
      					 
      					 <tr>
								<td>${ current_server.ip }:${current_server.port }</td>
								<td>${ current_server.boxname }</td>
								<td>${ current_server.dbType } ${ current_server.dbVersion } <br> Uptime: ${ current_server.uptimeInHours }H </td>
								<td>
									Schema: ${ current_server.schema } <span id="schema_status"></span><br>
									Version: 
									<c:if test="${ current_server.schemaObject != null  }">
										${ current_server.schemaObject.tag  }
									</c:if>
								</td>
								<td>${ current_server.username}</td>
								<td>
									<ul>
										<c:forEach var="status" items="${ current_server.status }">
											<c:choose>
												<c:when test="${status.key.order == 3 && status.value == false }">
													<li>${status.key.name } Failed! : <a href="">Initialize Admin Accounts</a></li>			
												</c:when>
												<c:when test="${status.key.order == 5 && status.value == false }">
													<li>${status.key.name } Failed! : <a href="">Initialize Group Core Accounts</a></li>			
												</c:when>
												<c:when test="${status.key.order == 4 && status.value == false }">
													<script>
														$("#schema_status").html("<span style='color:red'>(Not Reachable! <a href='/admin/boot/server/edit?server=${ current_server.index }'>UPDATE</a>)</span>");
													</script>
													<li>${status.key.name } : ${status.value }</li>	 		
												</c:when>
												<c:otherwise>
													<li>${status.key.name } : ${status.value }</li>									
												</c:otherwise>
											</c:choose>
										</c:forEach>
									</ul>
								</td>
								<td>
									<ul>
<%-- 										<li><a href="#" onclick="CheckConnectionUtils.checkConnectionUpdateValue( '${ current_server.ip }', '${ current_server.port}', 'conn_${ current_server.index }_1' )">Re-Ping</a></li> --%>
<%-- 										<li><a href="#" onclick="CheckConnectionUtils.connectViaCurrentAccount( '${current_server.index }', '${ current_server.ip }', '${ current_server.port}', 'conn_${ current_server.index }_2' )">Connect Via Account</a></li> --%>
<%-- 										<li><a href="/admin/boot/server/connect?server=${ current_server.index }">Connect</a></li> --%>
										<li><a href="/admin/boot/server/edit?server=${ current_server.index }">Edit</a></li>
<%-- 										<li><a href="/admin/boot/user/view?server=${ current_server.index }">View Users</a></li>  --%>
									</ul>
								</td>
								<td>
									<ul>
										<li>Metadata ( <a href="/admin/boot/server/metarepo/view?server=${ current_server.index }">view</a> )</li>
									</ul>
								</td>
							</tr>
      				</c:when>
      				<c:otherwise>
      					No Assigned Server
      				</c:otherwise>
      			</c:choose>
              
              
              		
              		
						 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>