<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib uri="http://java.sun.com/jsp/jstl/functions"
prefix="fn"%> <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

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
      <div class="row">
        <jsp:include page="/jsps/headers/leftNavHeader.jsp"></jsp:include>

        <h2 class="sub-header">Section title</h2>
        <div class="table-responsive">
          <br /><br />
          <form
            class="login-form"
            action="/admin/boot/server/scan"
            method="post"
          >
            <input type="hidden" name="edit_id" value="${ id }" />

            <div class="input-group">
              <span class="input-group-addon"
                ><i class="fa fa-server" aria-hidden="true"></i>Start IP</span
              >
              <input
                type="text"
                class="form-control"
                placeholder=""
                name="scan_ip_min"
                id="scan_ip_min_id"
                value="192.168.2.226"
              />
              <span class="input-group-addon"
                ><i class="icon_key_alt"></i>End IP</span
              >
              <input
                type="text"
                class="form-control"
                placeholder="3306"
                name="scan_ip_max"
                id="scan_ip_max_id"
                value="192.168.2.255"
              />
            </div>
            <div class="input-group">
              <span class="input-group-addon"
                ><i class="fa fa-server" aria-hidden="true"></i>Port</span
              >
              <input
                type="text"
                class="form-control"
                placeholder=""
                name="scan_port"
                id="scan_port_id"
                value="3306"
              />
            </div>

            <div style="text-align: center">
              <button
                id="loginAdmin"
                class="btn btn-primary btn-md"
                type="button"
                onclick="startNewScan()"
              >
                Start Scan
              </button>
              <button
                id="loginAdmin"
                class="btn btn-primary btn-md"
                type="button"
                onclick="stopScan()"
              >
                Stop Scan
              </button>
            </div>
          </form>
          <div><span id="error_msg"></span></div>
          <div>
            <table
              border="1"
              id="output_table"
              class="table table-hover table-condensed"
            >
              <thead>
                <tr>
                  <th>IP Address</th>
                  <th>Status</th>
                  <th>Ping Result</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody id="output_body"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>
      window.jQuery ||
        document.write(
          '<script src="../../assets/js/vendor/jquery.min.js"><\/script>'
        );
    </script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>

    <script>
      function startNewScan() {
        console.log("STARTING NEW SCAN");

        var sock = new WebSocket(
          "ws://${sessionScope.api_url }/admin/boot/socket/server/scan"
        );

        var startIP = $("#scan_ip_min_id");
        var endIP = $("#scan_ip_max_id");
        var port = $("#scan_port_id");

        var msg = {
          usertoken: "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }",
          action: "START",
          scan_ip_start: startIP.val(),
          scan_ip_end: endIP.val(),
          scan_port: port.val(),
        };

        sock.onopen = function (event) {
          console.log("open");
          sock.send(JSON.stringify(msg));
        };

        sock.onmessage = function (e) {
          console.log("message", e.data);

          // attempt to parse the json response
          var msg = JSON.parse(e.data);

          if (msg.pingstatus == "error") {
            console.log("Message was error: " + msg.msg);
            $("#error_msg").text(msg.msg);
          } else if (msg.pingstatus == "good") {
            console.log("mesage", msg);
            var output = "<tr><td>" + msg.ip + "</td><td>";

            if (msg.accepting == true) {
              output +=
                "<span style='color:green;font-weight:bold'>YES</td><td>" +
                msg.ping +
                "</td><td><a href='/admin/boot/server/add?ip=" +
                msg.ip_num +
                "&port=" +
                msg.port +
                "'>Add Server</a></td></tr>";
            } else {
              output +=
                "<span style='color:red;font-weight:bold'>NO</td><td>n/a</td><td>n/a</td></tr>";
            }

            $("#output_table tbody").after(output);
          }
        };

        sock.onclose = function () {
          console.log("CLOSING STARTING?");
        };
      }

      function stopScan() {
        console.log("STOP SCAN");

        var sock = new WebSocket(
          "ws://${sessionScope.api_url }/admin/boot/socket/server/scan"
        );

        var msg = {
          usertoken: "${sessionScope.ROMENEXT_SESS_USER_TKNS.username }",
          action: "STOP",
        };

        sock.onopen = function (event) {
          console.log("open");
          sock.send(JSON.stringify(msg));
          sock.close();
        };

        sock.onclose = function () {
          console.log("STOP THE STOPFUNCTION");
        };
      }
    </script>
  </body>
</html>
