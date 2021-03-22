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

        

          <h2 class="sub-header">Section title</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                	<th>&nbsp;</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Database Info</th>
                  <th>Account</th>
				  <th>Schema</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
              		<c:forEach items="${sessionScope.rmn_servers }" var="server" varStatus="counter">
							<tr>
								<td>
								<button type="button" class="btn btn-primary btn-sm" onclick="location.href='/admin/boot/server/assign?serverHash=${server.value.hash}'">Enable</button>
								<td>${ server.value.boxname }</td>
								<td>${ server.value.ip }:${server.value.port }</td>
								<td>${ server.value.condensedInfo }</td> 
								<td>${ server.value.username}</td>
								<td>${ server.value.schema }</td>
								<td>
									<ul>
										<li><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal${counter.index }">Remove</button>
										<div class="modal" id="myModal${counter.index }" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										        <h4 class="modal-title">Remove</h4>
										      </div>
										      <div class="modal-body">
										        <p>Are you sure you want to remove this server from the system? This will remove it from the current session and the permanent file system. You may add it back later.</p>
										      </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
										        <button type="button" class="btn btn-primary" onclick="location.href='/admin/boot/server/remove?serverIndex=${server.value.index}'">Save changes</button>
										      </div>
										    </div><!-- /.modal-content -->
										  </div><!-- /.modal-dialog -->
										</div><!-- /.modal -->
										
										</li>
									</ul>
								</td>
							</tr>
						</c:forEach>
						 
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