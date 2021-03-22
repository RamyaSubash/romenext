        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="/admin/boot/dashboard2">Dashboard</a></li>
            <li class="dropdown"><a href="#">Settings</a></li>
            <li class="dropdown">
            	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">${sessionScope.ROMENEXT_SESS_USER_TKNS.loggedInUser } ${sessionScope.ROMENEXT_SESS_USER_TKNS.username } Profile<span class="caret"></span></a> 
		          <ul class="dropdown-menu">
		            <li><a href="/admin/logout">Logout</a></li> 
		          </ul>
            
            </li>
            <li class="dropdown">
            	 <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About <span class="caret"></span></a>
		          <ul class="dropdown-menu">
		            <li>Version ${sessionScope.manifest.version }</li>
		            <li role="separator" class="divider"></li>
		            <li>Build Time ${sessionScope.manifest.dateString }</li>
		          </ul>
            </li>
            
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>