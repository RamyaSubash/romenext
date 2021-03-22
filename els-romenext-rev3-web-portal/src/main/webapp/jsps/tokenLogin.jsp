<html>
  <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" maximum-scale=1.0, user-scalable=no" >
	<meta name="keyword" content="Romenext"/>
	<title>Login Token Webgui Portal</title>
	 <!-- Bootstrap CSS  JS --> 
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- Custom styles -->
	<link rel="stylesheet" href="/webguiportal/assets/css/custom-style.css">
	<!-- Add icon library -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   </head>

  <body>
    <div class="container">
    <br/><br/><br/>
    
      <form class="login-form" action="/webguiportal/tokenlogin" method="post" enctype="multipart/form-data">        
        <div class="login-wrap">
           <h3>Romenext Login Token Web Portal</h3>
           <% if(request.getParameter("error")== null){ %>
              <div style="color:red">${error }</div>
              <%} %>
            
              
			<div class="input-group">
                <span class="input-group-addon"><i class="fa fa-server" aria-hidden="true">Login Token</i></span>
                 <input type="file" name="login_file" accept=".sec" autofocus>
            </div>
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>

                <input type="password" class="form-control" placeholder="Enter Password" name="password" value="">

            </div>


            <label class="checkbox">
                <input type="checkbox" value="remember-me"> Remember me
                <span class="pull-right"> <a href="#"> Forgot Password?</a>&nbsp;&nbsp;&nbsp;</span>
                <span class="pull-right"> <a href="/webguiportal/login"> Login via Fields</a>&nbsp;&nbsp;&nbsp;</span>
                
            </label>
             <div  style="text-align:center">
            <button id="loginAdmin" class="btn btn-primary btn-md" type="submit">Login</button>
            <button id="signupAdmin" class="btn btn-primary btn-md" type="submit">Signup</button>
            </div>
        </div>
      </form>
    </div>
    <footer class="footer">
    </footer>
  </body>
</html>
