<script>
// var hostname = "http://localhost/";
//var apiBaseUrl = "http://localhost/api/";
//var hostname = "http://192.168.2.151/";
// var apiBaseUrl = "http://192.168.1.9/api/";
var hostname = "http://<%= session.getAttribute("host_url") %>/";
var apiBaseUrl = "http://<%= session.getAttribute("api_url") %>/api/";
// apiBaseUrl = "http://localhost/api/";
var webguiBaseUrl = "http://<%= session.getAttribute("api_url") %>/webgui/";
</script>