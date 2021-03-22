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
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<!-- Custom styles -->
<style type="text/css">
     <%@include file="/assets/css/custom-style.css" %>
</style>
<script type="text/javascript">
	<%@include file="/assets/js/CheckConnectionUtils.js" %>
</script>


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
                            <button type="button" class="btn btn-default btn-md text-center" title="Bootstrap" ><a href="/admin/boot/dashboard"><span class="glyphicon glyphicon-cog"></span><br>Bootstrap Link</a></button>
                            
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
                    <li><a href="/admin/boot/dashboard"><span class="glyphicon glyphicon-home"></span>Home</a></li> 
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
				<h4> Welcome ${sessionScope.user.loggedInUser }  to the Setting Admin user  </h4>
				<h4> Version ${sessionScope.manifest.version }  on ${sessionScope.manifest.dateString } </h4>
				
				<div>
				Metadata Information
				
				<input type="button" onclick="CheckConnectionUtils.checkConnectionUpdateValue( '${ sessionScope.user.ip }', '${ sessionScope.user.port}', 'conn_1' )">Click me</input>
				 <c:choose>
				  <c:when test="${ sessionScope.user.ip != null && fn:length( sessionScope.user.ip ) > 0  }">
					  <table border=1>
						<tr>
							<th>Location</th><th>Box Name</th><th>Database Type</th><th>Version</th><th>Schema</th><th>Account</th><th>Status </th><th>Status Options</th><th>Connectable Options</th><th>Repository</th>
						</tr> 
						<c:forEach items="${sessionScope.rmn_servers }" var="server" varStatus="counter">
							<tr>
								<td>${ server.value.ip }:${server.value.port }</td><td>${ server.value.boxname }</td><td>MYSQL</td><td>5.5</td><td>${ server.value.schema }</td><td>${ server.value.username}</td>
																																<td>
																																	<table style="width:100%;padding:15px">
																																		<tr><td style="white-space: nowrap">1. Ping</td><td id="conn_${ server.key }_1"></td></tr>
																																		<tr><td style="white-space: nowrap">2. Valid Account</td><td id="conn_${ server.key }_2"></td></tr>
																																		<tr><td style="white-space: nowrap">3. Metadata Connected</td><td id="conn_${ server.key }_3"></td></tr>
																																		<tr><td style="white-space: nowrap">4. Metadata Validated</td><td id="conn_${ server.key }_4"></td></tr>
																																	</table>
																																</td>
																																<td><a href="#" onclick="CheckConnectionUtils.checkConnectionUpdateValue( '${ server.value.ip }', '${ server.value.port}', 'conn_${ server.key }_1' )">Re-Ping</a><br>
																																	<a href="#" onclick="CheckConnectionUtils.connectViaCurrentAccount( '${server.value.index }', '${ server.value.ip }', '${ server.value.port}', 'conn_${ server.key }_2' )">Connect Via Account</a><br>
																													  				<a href="#">Check Status</a><br>
																													  				<a href="">Verify</a><br>
																													  				<a href="">Wipe</a><br>
																													  				<a href="/admin/server/edit?server=${ server.key }">Edit</a><br>
																													  			</td>
																													  			<td id="connected_opt_${ server.key }">
																													  			</td>
								<td>
									<table>
										<tr><th>Location</th><th>Type</th><th>Version</th><th>Uptime</th><th>Options</th></tr>
										<tr>
											<td>192.168.2.225</td><td>Neo4j</td><td>2.3.3</td><td>443:43:34</td>
																												<td>
																													<a href="">Backup</a><br>
																													<a href="">Detailed Information</a><br>
																													<a href="">Wipe</a><br>
																												</td> 
										</tr>
										
									</table>
								</td>
							</tr>
						</c:forEach>
						
						<tr>
							<td><a href="/admin/server/add">Add New Server</a><br></td>
						</tr>
					</table>
	              		
				  </c:when>
				  <c:otherwise>
				        <p style="color:red"> Please Enter a database </p>
				  		
				  </c:otherwise>
			  </c:choose>
			  
			  
				
			</div>   
				
              <c:choose>
				  <c:when test="${not empty userList }">
				  		<p> You database contains </p>
	              		 <table border ='2'>
	                   		 <tr><th>user</th><th>Group</th></tr>
	                         <c:forEach items="${userList}" var="item">                
	                              <tr><td>${item.username }</td><td>${item.group }</td></tr>                  
	                         </c:forEach> 
	                	</table>
	                	<br/>
	                	 Do You want to reset the Admin password? <input type="button" value="Yes" id="butreset" onclick="ConfigurationUtils.show()"/><br/>
	                	 
	                	 <div id="resetPWD" style="display:none; visibility:hidden">
	                	    <input type="hidden" name="userroot" id="userroot" value="${sessionScope.user.loggedInUser }"/>
	                	    <input type="hidden" name="ip" id="ip" value="${sessionScope.user.ip }"/>
	                	    New Password: <input type="password" id="rpassword"/><br/>
	                	    Confirm password: <input type="password" id="rpassword2"/><span id="pwd_msg"></span><br/><br/>
	                	    Input Root Password : <input type="password" name="rootpwd" id="rootpwd"/><span id="rootpwd1_msg"></span><br/>
	                	    <input type="submit"  value="Reset password " onclick="ConfigurationUtils.resetPWD()"/>
	                	 </div>
				  </c:when>
				  <c:otherwise>
				        <p style="color:red"> Your database is empty </p>
				  		<div id="create_admin"> You need to Create Admin user  :<br/>
				  		   <table >
                             <tr><td><input type="hidden" name="userroot" id="userroot" value="${sessionScope.user.loggedInUser }"/></td>
                             <td><input type="hidden" name="ip" id="ip" value="${sessionScope.user.ip }"/></td></tr>

                             <tr><td>Input <b>Admin</b> Username :</td><td><input type="text"  id="romeuser" value="RomenextAdmin"/> <span id="romeuser_msg"></span></td></tr>
                             <tr><td>Input <b>Admin</b> password :</td><td> <input type="password" id="romepassword" name="romepassword" value=""/><span id="romepassword_msg"></span></td><br /></tr>
                             <tr><td></td><td></td></tr>
                             <tr><td>Input <b>${sessionScope.user.loggedInUser }</b> Password :</td><td> <input type="password" name="rootpwd" id="rootpwd"/><span id="rootpwd_msg"></span></td></tr><br/>
                             <tr><td colspan="2"><input type="submit" class="" value="Create" onclick="ConfigurationUtils.createAdmin()"/></td></tr>
                           </table> 
               			</div> 
				  </c:otherwise>
			  </c:choose>
            </div>   
            <div class="col-sm-1" id="right-bar">
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
    
    <c:forEach items="${sessionScope.rmn_servers }" var="server" varStatus="counter">
    	<script>
		CheckConnectionUtils.checkConnectionUpdateValue( '${ server.value.ip }', '${ server.value.port}', 'conn_${ server.key }_1' );
		CheckConnectionUtils.connectViaCurrentAccount( '${server.value.index }', '${ server.value.ip }', '${ server.value.port}', 'conn_${ server.key }_2' );
    	</script>
	</c:forEach>
    
</html>
