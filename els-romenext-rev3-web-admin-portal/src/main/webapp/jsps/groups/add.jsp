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
				<h4>Add Group</h4>
				
				<div>
				
				
				   <h3> Create New Group</h3>
                            <form  class="form-horizontal"  action="/admin/groups/add" method="post" >        
                            	<input type="hidden" name="server" value="${server.index }"/>
						        <div class="form-group">
								      <label class="col-xs-3 control-label" for="groupname">Name </label>
								      <div class="col-xs-5">
								         <input type="text" class="form-control" id="groupname" placeholder="Enter group name"  name="add_name">
								         <span id="groupname_msg"></span>
								      </div>
								</div>
								<div class="form-group">
								      <label class="col-xs-3 control-label" for="schemaname">Schema</label>
								      <div class="col-xs-5">
								         <input type="text" class="form-control" id="schemaname" placeholder=""  name="add_schema" value="${server.schema }">
								         <span id="schemaname_msg"></span>
								      </div>
								</div>
								
								<div class="form-group">
								      <label class="col-xs-3 control-label" for="groupbase">Default Permission:</label>
								      <div class="col-xs-5">
                                         <select class="form-control" id="add_group" name="add_group">
                                         	<c:forEach items="${ basegroups }" var="group" varStatus="counter">
                                         		<option value="${group.name}">${group.name }</option> 
										 	</c:forEach>
                                         </select>
                                         <span id="groupbase_msg"></span>
                                       </div>
                                </div>  
                                <div class="form-group">
        							   <div class="col-xs-5 col-xs-offset-3">
        							   		<button id="loginAdmin" class="btn btn-primary btn-md" type="submit">Add</button> 
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
</html>
