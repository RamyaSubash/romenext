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
	  
 
    
    <!-- nice scroll -->
	<script type="text/javascript">
		<%@include file="/assets/js/libs/jquery.nicescroll.js" %>
	</script>
    
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>  
 
    <!--   LOCAL JS  --> 
	<script type="text/javascript">
		<%@include file="/assets/js/els/utils/BootSideMenu.js" %>
		<%@include file="/assets/js/ValidateForms.js" %>
	</script>
 
         
</head>
<body>
	<jsp:include page="/jsps/headers/topBar.jsp"></jsp:include>


   <div class="main">
       <br/>
       <br/>      	 
      <div class="container">
           <div class="logo">
				<img src="/admin/assets/img/admin_icons/add-server.png" width="100px"/>
		  </div>

           <h4 >Add Metadata</h4>
          <div class="form-content">
          		 <form class="add_server_form"  name="add_server_form" action="/admin/boot/server/add2" method="post" onsubmit="return(ValidateForms.addServer2('add'));" >        				 			           
			           <% if(request.getParameter("error")== null){ %>
			              <div style="color:red">${error }</div>
			           <%} %>			           
			           <div class="input-group">
			                <span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i> Box Name </span>
			                <input type="text" class="form-control" placeholder="" name="add_boxname" value="${addserver.boxname }">
			                <span  class="msg_err" id="err_add_boxname"></span>
			            </div> 
			           <div class="input-group">
							<span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i> IP </span>
			                <input type="text" class="form-control" placeholder="" name="add_ip" value="${addserver.ip }">
			                 <span  class="msg_err" id="err_add_ip"></span>
						</div>
			            <div class="input-group">    
			                <span class="input-group-addon"><i class="icon_key_alt"></i>Port</span>
			                <input type="text" class="form-control" placeholder="3306" name="add_port" value="${addserver.port }">
			                 <span class="msg_err" id="err_add_port"></span>
			            </div>
			           <div class="input-group">
							<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i> Account Username: </span>
			                <input type="text" class="form-control" placeholder="" name="add_username" value="${addserver.username }">
			                <span  class="msg_err" id="err_add_username"></span>
						</div>
			            <div class="input-group">   
 							<span class="input-group-addon"><i class="fa fa-unlock-alt" aria-hidden="true"></i>Password:</span>
                			<input type="password" class="form-control" placeholder="" name="add_password" value="">
                			 <span  class="msg_err" id="err_add_password"></span>
			            </div>
					    <div class="input-group">
			                <span class="input-group-addon"><i class="fa fa-database" aria-hidden="true"></i> Schema Name </span>
			                <input type="text" class="form-control" placeholder="" name="add_schema" value="${addserver.schema }"> 
                            <span class="msg_err" id="err_add_schema"></span>
			            </div> 
						
			           <div  style="text-align:center">
			                <button id="addServer" class="btn btn-primary btn-md" type="submit">Add</button>
			           </div>
			      </form>
				<br/>
			<a  id="cancel"  class="btn btn-default btn-sm" type="button"  href="/admin/boot/dashboard2" >Cancel</a>
          </div>
     </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
  
  </body>
</html>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </body>
</html>