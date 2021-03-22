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

    <title>ROMENEXT Admin Portal</title>

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

    <!--  IMPORTED JS  -->
    <!-- <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	 -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.js"></script>  -->

    <!--   LOCAL CSS -->
    <style type="text/css">
      <%@include file="/assets/css/BootSideMenu.css" %>
            <%@include file="/assets/css/custom-style.css" %>
    </style>

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
      <br />
      <br />
      <br />
      <div class="container">
        <h2 class="sub-header">Editing Group : ${editgroup.username }</h2>
        <% if(request.getParameter("error")== null) { %>
        <div style="color: red">${error }</div>
        <%} %>
        <div class="table-responsive">
          <form
            class="form-horizontal"
            name="editGroupForm"
            action="/admin/boot/group/edit"
            method="post"
            onsubmit="return(ValidateForms.editGroup(event));"
          >
            <input type="hidden" name="serverHash" value="${ serverHash }" />
            <input type="hidden" name="groupHash" value="${ editgroup.hash }" />
            <input type="hidden" name="serverIndex" value="${ serverIndex }" />
            <div class="input-group">
              <span class="input-group-addon"
                ><i class="fa fa-server" aria-hidden="true"></i> Group Name
              </span>
              <input
                type="text"
                class="form-control"
                name="edit_groupname"
                value="${editgroup.username }"
              />
              <span class="msg_err" id="err_edit_groupname"></span>
            </div>
            <!-- 	            <div class="input-group"> -->
            <%--
            <span class="input-group-addon"
              ><i class="fa fa-users" aria-hidden="true"></i>Default Permission:
              ${editgroup.groupName }</span
            >
            --%>
            <!--                   <select class="form-control"  name="edit_groupbase"> -->
            <%--
            <c:forEach items="${ basegroups }" var="basegroup">
              --%> <%--
              <c:choose>
                --%> <%--
                <c:when test="${basegroup.username == editgroup.groupName}">
                  --%> <%--
                  <option value="${basegroup.username }" selected="selected">
                    ${basegroup.username }
                  </option>
                  --%> <%--
                </c:when>
                --%> <%--
                <c:otherwise>
                  --%> <%--
                  <option value="${basegroup.username }">
                    ${basegroup.username }
                  </option>
                  --%> <%--
                </c:otherwise>
                --%> <%--
              </c:choose>
              --%> <%--
            </c:forEach>
            --%>
            <!--                   </select> -->
            <!--                              <span  class="msg_err" id="err_edit_groupbase"></span> -->
            <!--                 </div>   -->

            <div style="text-align: center">
              <button
                id="editUser"
                class="btn btn-primary btn-sm"
                type="submit"
                name="action"
              >
                Update
              </button>
            </div>
          </form>
          <br />
          <a
            id="cancel"
            class="btn btn-default btn-sm"
            type="button"
            href="/admin/boot/server/manage?serverIndex=${ serverIndex }"
            >Cancel</a
          >
        </div>
      </div>
    </div>
  </body>
</html>
