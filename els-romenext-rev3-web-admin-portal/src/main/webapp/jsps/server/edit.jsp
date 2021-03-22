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
<title>Admin Portal Template</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script type="text/javascript">
	<%@include file="/assets/js/CheckConnectionUtils.js" %>
</script>

<style type="text/css">
	<%@include file="/assets/css/custom-style.css" %>
</style>
<!-- Add icon library -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<%--  <jsp:include page="/jsps/header/javascriptHeaders.jsp"></jsp:include> --%>
    
</head>
<body>

   <div class="container">
        <div class="row">
            <div class="col-xs-10">
                    <span style="font-size:12px;">Romenext - Admin Portal</span>               
            </div>
            <div class="col-xs-2">
                    <p>Version: 0.7<span style="font-size:10px;" id="time"> </span> </p>
            </div>
        </div>
   
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
                <a class="navbar-brand" href="#">ROMENeXt Administration</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="navbarCollapse">
                        
                <div class="nav navbar-nav navbar-right">
                   
                        <div class="btn-group vertical-align: middle " >
                            <button type="button" class="btn btn-default btn-md text-center" title="Settings" ><span class="glyphicon glyphicon-cog"></span><br>Setting</button>
                            <button type="button" class="btn btn-default btn-md text-center" title="Help" ><span class="glyphicon glyphicon-question-sign"></span><br>Help</button>
                            <button type="button" class="btn btn-default btn-md text-center" title="Sign-Out"><a href="/adminportal/jsps/login.jsp" class="btn btn-default btn-flat">Signout</a></button>
                        </div>
                  
                    <button type="button" class="btn btn-default btn-lg text-center" title="Username" ><span class="glyphicon glyphicon-user"></span>${sessionScope.user.loggedInUser }</button>
                </div>
            </div>
        </div>
    </nav>        
    
        <!--      Here start the bars used for the design part -->
            <div class="row">
                <ul class="breadcrumb">
                    <li><a href="#"><span class="glyphicon glyphicon-home"></span>Home</a></li> 
                    <li><a href="#"><span class="glyphicon"></span>Configuration</a></li>       
                </ul>
            
            </div>
    </div>
    <section>        
        <!--    Here start the main window work area -  divived into three left bar  main  right bar -->
        <div class="row" id="main-content">
            <div class="col-sm-3" id="Left-bar">
               
            </div> 
            <div class="col-sm-8" id="main-content-workingarea"> 
				<h4>Edit Server</h4>
				
				<div>
				
				
				
				 <form class="login-form" action="/admin/server/edit" method="post">        
				    <input type="hidden" name="edit_id" value="${ id }">
				 
			        <div class="login-wrap">  
			           
			           <% if(request.getParameter("error")== null){ %>
			              <div style="color:red">${error }</div>
			           <%} %>
			           
			              <div class="input-group">
			                <span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i> Box Name </span>
			                <input type="text" class="form-control" placeholder="" name="edit_boxname" value="${editserver.boxname }">		                

			            </div> 
			            <div class="input-group">
							<span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i>IP</span>
			                <input type="text" class="form-control" placeholder="" name="edit_ip" value="${editserver.ip }">
			                <span class="input-group-addon"><i class="icon_key_alt"></i>Port</span>
			                <input type="text" class="form-control" placeholder="3306" name="edit_port" value="${editserver.port }">
			            </div>
			            
			            
			               <div class="input-group">
							<span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i>Schema</span>
			                <input type="text" class="form-control" placeholder="" name="edit_schema" value="${editserver.schema }"> 
			            </div>
			             <div class="input-group">
							<span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i>Account Username</span>
			                <input type="text" class="form-control" placeholder="" name="edit_username" value="${editserver.username }">
 							<span class="input-group-addon"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
                			<input type="password" class="form-control" placeholder="Password" name="edit_password" value="">
			            </div>
						
			             <div  style="text-align:center">
			            <button id="loginAdmin" class="btn btn-primary btn-md" type="submit">Save</button>
			            <button id="cancel" class="btn btn-primary btn-md" type="submit" name="cancel">Cancel</button>
			<!--             <button id="signupAdmin" class="btn btn-primary btn-md" type="submit">Signup</button> -->
			            </div>
			        </div>
			      </form>
				
				
				
				
				
				
			  
			  
				
			</div>   
		
        </div>
       
    </section>
     <div class="row">
        <div class="col-sm-3" id="Left-bar">
               
            </div> 
        <div class="col-sm-8">
            <footer>
                <p>&copy;ELS  Copyright 2017 </p>
            </footer>
        </div>
        <div class="col-sm-1" id="right-bar">
        </div>
     </div>
    </div>
  </body>
  <script>
        var today = new Date();
        document.getElementById('time').innerHTML=today.toDateString();
    </script>
    <script>
    	CheckConnectionUtils.checkConnectionUpdateValue( '${ sessionScope.user.ip }', '${ sessionScope.user.port}', 'conn_1' );
    	CheckConnectionUtils.connectViaCurrentAccount( '${ sessionScope.user.ip }', '${ sessionScope.user.port}', 'conn_2' );
    </script>
</html>
