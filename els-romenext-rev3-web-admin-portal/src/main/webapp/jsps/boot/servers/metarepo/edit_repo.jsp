<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib uri="http://java.sun.com/jsp/jstl/functions"
prefix="fn" %> <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />

    <title>ROMENEXT Design</title>

    <!--    Imported CSS  -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
    />
    <link
      rel="stylesheet"
      href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.css"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
    />

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
      <%@include file="/assets/js/ValidateForms.js" %>
    </script>

    <!-- nice scroll -->
    <script type="text/javascript">
      <%@include file="/assets/js/libs/jquery.nicescroll.js" %>
    </script>
    <!-- jquery knob -->
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
  </head>
  <body>
    <jsp:include page="/jsps/headers/topBar.jsp"></jsp:include>
    <div class="main">
      <br />
      <br />
      <div class="container">
        <!--        <div class="container-fluid"> -->
        <!--        <div class="row"> -->
        <%--
        <jsp:include page="/jsps/headers/leftNavHeader.jsp"></jsp:include> --%>

        <h2 class="sub-header">Editing Repo : ${editrepo.name }</h2>
        <div class="table-responsive">
          <form
            class="edit-repo-form"
            name="edit_repo_form"
            action="/admin/boot/server/repo/edit"
            method="post"
            onsubmit="return(ValidateForms.editRepo('edit'));"
          >
            <input type="hidden" name="edit_serverid" value="${ serverId }" />
            <input
              type="hidden"
              name="edit_metadataid"
              value="${ editmetadata.id }"
            />
            <input type="hidden" name="edit_repoid" value="${ editrepo.id }" />
            <div class="login-wrap">
              <% if(request.getParameter("error")== null){ %>
              <div style="color: red">${error }</div>
              <%} %>
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fa fa-server" aria-hidden="true"></i> Name
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  name="edit_name"
                  value="${editrepo.name }"
                />
                <span class="msg_err" id="err_edit_name"></span>
              </div>
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fa fa-server" aria-hidden="true"></i>IP</span
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  name="edit_ip"
                  value="${editrepo.ip }"
                />
                <span class="msg_err" id="err_edit_ip"></span>
              </div>
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fa fa-server" aria-hidden="true"></i
                  >Description</span
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  name="edit_desc"
                  value="${editrepo.description }"
                />
                <span class="msg_err" id="err_edit_desc"></span>
              </div>
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fa fa-server" aria-hidden="true"></i>Username</span
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  name="edit_username"
                  value="${editrepo.username }"
                />
                <span class="msg_err" id="err_edit_username"></span>
              </div>
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fa fa-unlock-alt" aria-hidden="true"></i
                ></span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  name="edit_password"
                  value=""
                />
                <span class="msg_err" id="err_edit_password"></span>
              </div>
              <div style="text-align: center">
                <button
                  id="editRepo"
                  class="btn btn-primary btn-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <br />
          <a
            id="cancel"
            class="btn btn-default btn-sm"
            type="button"
            href="/admin/boot/server/manage"
            >Cancel</a
          >
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
  </body>
</html>
