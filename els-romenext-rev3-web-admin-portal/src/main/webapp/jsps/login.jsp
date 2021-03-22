<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
  <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" maximum-scale=1.0, user-scalable=no" >
	<meta name="keyword" content="Romenext"/>
	<title>Admin Portal Template</title>
	 <!-- Bootstrap CSS  JS --> 
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- Add icon library -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!-- Custom styles -->
	<style type="text/css">
		<%@include file="/assets/css/custom-style.css" %>
	</style>
	
   </head>
   

  <body>
    <div class="container" style="text-align:center">
    <br/><br/><br/>
    <div id="parent">
      <form class="login-form" action="/admin/login" method="post">        
      	<input type="hidden" value="semi" id="login_type_id" name="login_type"/>
        <div class="login-wrap">
           <h3>ROMENeXt Administration</h3>
           <h5>@ ${api_url} <br> Server name[ ${boxname} ]</h5>
           
           <% if(request.getParameter("error")== null){ %>
              <div class="error">${error }</div>
              <%} %>
              
              
            <div id="semi_login_id">
            	<div class="input-group">
	              <span class="input-group-addon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
	                  <input type="text" class="form-control" placeholder="Username" name="username" autofocus value="${username }">
	            </div>
	            <div class="input-group">
	                <span class="input-group-addon"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
	                <input type="password" class="form-control" placeholder="Password" name="password" value="superman">
	            </div>
	           
	            <label class="checkbox">
	                <input type="checkbox" value="remember-me"> Remember me
	                <span class="pull-right"> <a href="#"> Forgot Password?</a></span>
	            </label>
	             <div  style="text-align:center">
	            <button id="loginAdminsemi" class="btn btn-primary btn-md" type="submit">Login</button>
	<!--             <button id="signupAdmin" class="btn btn-primary btn-md" type="submit">Signup</button> -->
	            </div>
            </div>  
            
            
            <div id="full_login_id" style="display:none">
            	 <div class="input-group">
	                <span class="input-group-addon"><i class="fa fa-server" aria-hidden="true"></i> Metadata &nbsp;&nbsp;&nbsp;</span>
	                <input type="text" class="form-control" placeholder="" name="ip" value="${ip }">
	                <span class="input-group-addon"><i class="icon_key_alt"></i>Port</span>
	                <input type="text" class="form-control" placeholder="3306" name="port" value="${port }">
	            </div>  
	              
	            <div class="input-group">
	              <span class="input-group-addon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
	                  <input type="text" class="form-control" placeholder="Username" name="full_username" autofocus value="${username }">
	            </div>
	            <div class="input-group">
	                <span class="input-group-addon"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
	                <input type="password" class="form-control" placeholder="Password" name="full_password" value="superman">
	            </div>
	             <div  style="text-align:center">
	            <button id="loginAdminfull" class="btn btn-primary btn-md" type="submit">Login</button>
	<!--             <button id="signupAdmin" class="btn btn-primary btn-md" type="submit">Signup</button> -->
	            </div>
            </div>
        </div>
      </form>
      </div>
    </div>
     <footer class="footer">
    	<div id="full_login_link_id" class="container">
        	<p class="text-muted"><a href="#" onclick="toggleFullLogin()">Full Login</a></p>    	
    	</div>  
		<div id="semi_login_link_id" class="container" style="display:none">
        	<p class="text-muted"><a href="#" onclick="toggleSemiLogin()">Account Login</a></p>    	
    	</div>  
    </footer>
  </body>
  <script>
  
  function toggleFullLogin() {
	  // toggle the form
	$("#login_type_id").val("full");
	  
	$("#full_login_id").toggle();  
	$("#semi_login_id").toggle();  
	
	
	$("#full_login_link_id").toggle();  
	$("#semi_login_link_id").toggle();  

  }

  function toggleSemiLogin() {
	  $("#login_type_id").val("semi");
	  
		$("#full_login_id").toggle();  
		$("#semi_login_id").toggle();  
		
		$("#semi_login_link_id").toggle();  
		$("#full_login_link_id").toggle();  
	  }
  </script>
</html>

