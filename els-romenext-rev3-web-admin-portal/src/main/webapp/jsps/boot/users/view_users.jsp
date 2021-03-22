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

      <div class="row" style="margin-top: 50px">
      	<jsp:include page="/jsps/headers/leftNavHeader.jsp"></jsp:include>

        

          <h2 class="sub-header">Create User</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr> 
                  <th>Location</th>
                  <th>Boxname</th>
                  <th>Database Info</th>
                  <th>Account</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
              	<tr>
              		<td>${ server.ip }:${server.port }</td>
					<td>${ server.boxname }</td>
					<td>${ server.dbType } ${ server.dbVersion } <br> Uptime: ${ server.uptimeInHours }H </td>
					<td>${ server.schema } ${ server.username}</td> 
				  	<td>&nbps;</td>
              	</tr>  
              </tbody>
            </table>
            
             <table class="table table-striped">
              <thead>
                <tr> 
                  <th>User name</th>
                  <th>Group</th>
                  <th>Last Logged In</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
              		<c:forEach items="${ users }" var="user" varStatus="counter">
							<tr> 
								<td>${ user.username } </td>
								<td>${ user.groupName }</td>
								<td>unknown</td>  
								<td>
									<ul>
										<li><button type="button" class="btn btn-primary btn-sm" onclick="location.href='/admin/boot/user/edit?serverHash=${server.hash}&userHash=${user.hash }'">Edit</button></li>
										<li><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal${counter.index}">Delete</button>
										<div class="modal" id="myModal${counter.index}" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										        <h4 class="modal-title">Remove</h4>
										      </div>
										      <div class="modal-body">
										        <p>Are you sure you want to remove this user ${user.username } from the system? This is not reversible.</p>
										      </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
										        <button type="button" class="btn btn-primary" onclick="location.href='/admin/boot/user/delete?serverHash=${server.hash}&userHash=${user.hash }'">Confirm</button>
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
            <br/>

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