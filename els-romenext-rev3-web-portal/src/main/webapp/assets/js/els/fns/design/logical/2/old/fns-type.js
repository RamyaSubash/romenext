/**
 * 
 */

// =============================================================================================
// function showOrHideTypePropDetails(id) {
// var typeDetail, buttonDetail, typePropDetailButton, propDetailHide;
// typeDetail = 'type_prop_detail_' + id;
// ;
// buttondetail = 'type_prop_detail_button_' + id
// typePropDetailButton = document.getElementById(buttondetail);
// propDetailHide = document.getElementById(typeDetail).style.display == "none";
//
// if (propDetailHide == true) {
// $("#" + typeDetail).show();
// typePropDetailButton.innerHTML = "Hide Details";
//
// } else {
// $("#" + typeDetail).hide();
// typePropDetailButton.innerHTML = "Show Details";
//
// }
// }
////
// function showOrHideAllTypePropertiesDetails(typeId) {
//
// var typePropDetailButton = document
// .getElementById('type_prop_detail_button_' + typeId);
// var propDetailHide = typeMapViaId[typeId].typeProperties
//
// for ( var key in typeMapViaId[typeId].typeProperties) {
// var propId = typeMapViaId[typeId].typeProperties[key].id;
// var typeDetail = 'type_prop_detail_' + propId;
// var propDetailHide = document.getElementById(typeDetail).style.display ==
// "none";
// if (propDetailHide == true) {
// $("#" + typeDetail).show();
// } else {
// $("#" + typeDetail).hide();
// }
// }
//
// if (propDetailHide == true) {
// typePropDetailButton.value = "Hide Details";
// } else {
// typePropDetailButton.value = "Show Details";
// }
//
// }
//// ==================================================================================================
// function AddTypeProperties() { // the selected name of the type is saved in
// the
// // Global variable
// // var type = typeMap[nametype];
//
// var typeName = typeMapViaId[listTypeIds[0]].name;
// var typeId = typeMapViaId[listTypeIds[0]].id;
//
// var Form, formHeader, formFooter, newProperty, properties, inputs = '';
// // console.log("Type name is " +nametype);
// Form = document.createElement('div');
//
// formHeader = "<form id='typeProps' method='post'>";
//
// inputs += "<div id='typeName'><label>Type Selected: </label>" + typeName
// + "<input type='hidden' name='typeid' value='" + typeId
// + "'/><input type='hidden' name='typename' value='" + typeName
// + "'/></div>";
// inputs += "<button type='button' class='btn btn-success btn-xs'
// onclick='addProperties()'>Add property</button>";
//
// formFooter = "<div id='propertiesFields'></div>";
// formFooter += "<input id='save_type_prop_button' type='button' value='Save
// properties' class='btn btn-success btn-xs'
// onclick='saveTypeProperties(form)'>";
// formFooter += "<input type='button' value='Cancel' class='btn btn-success
// btn-xs' onclick='(new DesignLogicalRenderer()).showTypePropertiesByTypeId("
// + typeId + ");'></form>";
// Form.innerHTML = formHeader + inputs + formFooter;
//
// $('#typeForm').empty();
// $('#typeForm').append(Form);
//
// newProperty = document.createElement('div');
// properties = "<hr/><table>";
// properties += "<tr><th>Name & Type:</th><td><input type='text' name='name'
// size='10' />";
// properties += "<select name='propertyType' onchange='(new
// DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
// + "<option value='STRING'>TEXT</option>"
// + "<option value='INTEGER'>INTEGER</option>"
// + "<option value='DOUBLE'>DOUBLE</option>"
// + "<option value='DATE'>DATE</option>"
// + "<option value='BOOLEAN'>BOOLEAN</option>"
// + "<option value='FILE'>FILE</option>"
// + "<option value='CURRENCY'>CURRENCY</option>"
// + "<option value='STATUS'>STATUS</option>"
// + "<option value='PARENTVALUE'>PARENTVALUE</option>"
// + "<option value='CONCAT'>CONCAT</option>" + "</select></td></tr>";
//
// properties += "<tr><th> isMandatory: </th><td>";
// properties += "<input type='checkbox' name='isMandatory'>";
//
// properties += "</td></tr>";
// properties += "<tr><th> isUnique: </th><td>";
// properties += "<input type='checkbox' name='isUnique'>";
//
// properties += "</td></tr>";
// properties += "<tr><th>Default Value:</th><td> <input type='text'
// name='defaultValue' onkeypress='' value='' defaultValue=''
// onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
// properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue'
// /></td></tr>";
// properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue'
// /></td></tr></table>";
//
// newProperty.innerHTML = properties;
//
// document.getElementById('propertiesFields').appendChild(newProperty);
// if (document.getElementById('propertiesFields').innerHTML != '') {
// document.getElementById("save_type_prop_button").style.visibility =
// 'visible';
// }
// }
// //
// =====================================================================================
// //
// ======================================================================================================
// This is used for displaying properties for TYPE and Rule
// ======================================================================================================
// function addProperties() {
// var newProperty = document.createElement('div');
// var properties = "<hr/><table>";
// properties += "<tr><th>Name & Type:</th><td><input type='text' name='name'
// size='10' />";
// properties += "<select name='propertyType' onchange='(new
// DesignLogicalRenderer()).repopulateDefaultPropertyValue(this);'>"
// + "<option value='INTEGER'>INTEGER</option>"
// + "<option value='DOUBLE'>DOUBLE</option>"
// + "<option value='DATE'>DATE</option>"
// + "<option value='STRING'>TEXT</option>"
// + "<option value='BOOLEAN'>BOOLEAN</option>"
// + "</select></td></tr>";
//
// properties += "<tr><th> isMandatory:</th><td>";
// properties += "<input type='checkbox' name='isMandatory'>";
// properties += "</td></tr>";
//
// properties += "<tr><th> isUnique: </th><td>";
// properties += "<input type='checkbox' name='isUnique'>";
// properties += "</td></tr>";
//
// properties += "<tr><th>Default Value:</th><td> <input type='text'
// name='defaultValue' onkeypress='' value='' defaultValue=''
// onchange='GlobalHTMLUtils.setDefaultValueForInput(this);'/></td></tr>";
// properties += "<tr><th>Max Value:</th><td> <input type='text' name='maxValue'
// /></td></tr>";
// properties += "<tr><th>Min Value:</th><td> <input type='text' name='minValue'
// /></td></tr></table>";
//
// newProperty.innerHTML = properties;
// document.getElementById('propertiesFields').appendChild(newProperty);
//
// }
//
// //
// ################################################################################
// // ==========================SAVE TYPE PROPERTIES
// ==================================
// ========================= Updated Version with MetaData
// ========================
// ################################################################################
// function saveTypeProperties(form) {
//
// var jsonData = {}, typeProperties = [], property = {}, typename, typeId,
// initcolor;
// // Retrieve type fields from form
// $(form).find('div#typeName').find(':input').each(function(i, field) {
// jsonData[field.name] = field.value;
// });
// // remove typename from JSON
// typename = jsonData["typename"];
// typeId = jsonData["typeid"];
// delete jsonData['typename'];
// initcolor = typeMap[typename].color;
// // Retrieve Type properties fields from form
//
// $(form)
// .find('div#propertiesFields')
// .find('div')
// .each(
// function(i, propDiv) {
// $(propDiv)
// .find(':input')
// .each(
// function(i, field) {
// if ((field.type != 'submit' && field.type != 'radio')
// || field.checked) {
// if (field.name == 'isMandatory'
// || field.name == 'isUnique') {
// if (field.checked == true) {
// property[field.name] = 'true';
// } else {
// property[field.name] = 'false';
// }
// } else {
// property[field.name] = field.value;
// }
// }
// });
//
// typeProperties.push(property);
// property = {};
// });
// // attach properties to JSON
// jsonData = typeProperties;
//
// var successFunction = function(data) {
// data.color = initcolor;
// tdvCy.filter('node[name="' + data.name + '"]').data(data);
// console.log("Type Properties create success. data: " + data.name);
// // (new DesignLogicalRenderer()).emptyAll();
//
// typeMap[data.name] = data; // / update the typeMap && typebar
// typeMapViaId[data.id] = data;
//
// // (new DesignLogicalRenderer()).initTypeDesignBar('typelist');
// (new DesignLogicalRenderer()).initTypeDesignBar(typeMapViaId,
// 'typelist');
//
// $("#create_type").dialog("option", "title", "Type Details");
// $('#typeForm').empty();
// TypePropertyUtils.displayTypeProperties($('#typeForm'), data, true);
// };
//
// var failFunction = function(xhr, status, error) {
// (new DesignLogicalRenderer()).emptyAll();
// document.getElementById('typeForm').textContent = "Error Type properties not
// saved";
// };
//
// var apis = new TypePropertyApi();
// apis.addTypeProperties(typeMapViaId[typeId], jsonData, successFunction,
// failFunction);
//
// }
// //
// #########################################################################################
// // ========================== This to update TYPE info and its Properties
// //
// #########################################################################################
// function UpdateTypeForm() {
// var Form, type, formHeader, formFooter, hasGeo, Props, inputs = '';
//
// Form = document.createElement('div');
// type = typeMapViaId[listTypeIds[0]];
//
// formHeader = "<form id='updateTypeDialog'>";
//
// inputs += "<table id='typeName'>";
// inputs += "<tr><td colspan='2'><input type='hidden' name='typeId' value='"
// + type.id + "'></td></tr>";
// $
// .each(
// type,
// function(key, value) {
//
// if (key == 'id') {
// inputs += "<tr><th>" + key
// + "</th><td><input type='hidden' name ='"
// + key + "' value='" + value
// + "' /></td></tr>";
// } else if (key == "name") {
// inputs += "<tr><th>"
// + key
// + "</th><td><input type='text' name ='"
// + key
// + "' value='"
// + value
// + "'/><input type='hidden' name ='oldName' value='"
// + value + "'/></td></tr>";
// } else if (key == "classification") {
// inputs += "<tr><th>" + key
// + "</th><td><input type='text' name ='"
// + key + "' value='" + value
// + "'/></td></tr>";
// } else if (key == 'isRoot') {
// inputs += "<tr><th>"
// + key
// + ":</th><td><input type='hidden' name='isRoot' value='true'/></td></tr>";
//
// }
// });
//
// // set value
// var ownerId = 123;
// inputs += "<tr><td colspan='2'><input type='text' name='owner' value='"
// + ownerId
// + "' style='visibility:hidden; position:absolute; top:-100px;' /></td></tr>";
//
// // ============= Enable Decorators for Type
// // ==================================
// // Hard code the id for geo view now
// hasGeo = false;
// for (var i = 0; i < type.decorators.length; i++) {
// if (type.decorators[i] == 4) { // Hard code the id for geo view now
// hasGeo = true;
// break;
// }
// }
// inputs += "<tr><td colspan='2'>Geo View&nbsp;&nbsp;<label
// class=\"switch\"><input id=\"geoActivator\" name=\"geoActivator\"
// type=\"checkbox\" value=\"4\"";
// if (hasGeo == true) {
// inputs += "checked=\"checked\"";
// }
// inputs += "><div class=\"slider round\"></div></label><br></td></tr>";
//
// Props = type.typeProperties;
// if (Props == null) {
// inputs += "<tr><th colspan='2'> No properties added </th></tr></table>";
// } else {
// inputs += "<tr><th colspan='2' style='background-color: #CDEEDD'>
// Properties:</th></tr></table>";
// $
// .each(
// Props,
// function(key, value2) {
// inputs += "<table id='propertiesFields'>";
// $
// .each(
// value2,
// function(key, value) {
// if (key == 'id') {
// inputs += "<input type='hidden' name='propertyId' value='"
// + value + "'>";
// } else if (key == 'name') {
// inputs += "<tr><th>"
// + key
// + "</th><td><input type='text' name='name' value='"
// + value
// + "'/></td></tr>";
// } else if (key == 'isMandatory'
// || key == 'isUnique') {
// inputs += "<tr><th>" + key
// + ":</th>";
// inputs += "<td><input type='checkbox' name='"
// + key + "' ";
// if (value == true) {
// inputs += "checked";
// }
// inputs += "></td></tr>";
// } else if (key == 'propertyType') {
// inputs += "<tr><th>"
// + key
// + "</th><td><select name='"
// + key
// + "'><option value='INTEGER' ";
//
// if (value == "INTEGER") {
// inputs += "selected='selected'";
// }
// inputs += ">INTEGER</option><option value='DOUBLE' ";
//
// if (value == "DOUBLE") {
// inputs += "selected='selected'";
// }
// inputs += ">DOUBLE</option><option value='DATE' ";
//
// if (value == "DATE") {
// inputs += "selected='selected'";
// }
// inputs += ">DATE</option><option value='STRING' ";
//
// if (value == "STRING") {
// inputs += "selected='selected'";
// }
// inputs += ">TEXT</option><option value='BOOLEAN' ";
//
// if (value == "BOOLEAN") {
// inputs += "selected='selected'";
// }
// inputs += ">BOOLEAN</option><option value='FILE' ";
//
// if (value == "FILE") {
// inputs += "selected='selected'";
// }
// inputs += ">FILE</option><option value='CURRENCY' ";
//
// if (value == "CURRENCY") {
// inputs += "selected='selected'";
// }
// inputs += ">CURRENCY</option></select></td></tr>";
//
// } else {
// if ((key != 'id')
// && (key != 'romeDecoPropId')
// && (key != 'validValues')) {
// inputs += "<tr><th>"
// + key
// + "</th><td><input type='text' name='"
// + key
// + "' value='"
// + value
// + "'/></td></tr>";
// }
// }
// });
// inputs += "<tr><td colspan='2'>---------------------------------</td></tr>";
// });
// }
//
// // <!-- Allow form submission with keyboard without duplicating the dialog
// // button -->
// formFooter = "<tr><td><input type='button' value='Update Type' class='btn
// btn-primary btn-xs' onclick='(new
// DesignLogicalRenderer()).saveUpdateTypeByGroup(form)' /></td>";
// formFooter += "<td><input type='button' value='Cancel' class='btn btn-primary
// btn-xs' onclick='(new DesignLogicalRenderer()).showTypePropertiesByTypeId("
// + type.id + ")'></td></tr><table></form>";
// Form.innerHTML = formHeader + inputs + formFooter;
//
// $("#create_type").dialog("open");
// $('#typeForm').empty();
//
// $("#create_type").dialog("option", 'title', 'Update Type');
// $('#typeForm').append(Form);
//
// }
//
// // =========================== UPDATE TYPE & Properties
// // =============================
// //
// ===================================================================================
// function saveUpdateType(form) {
// var jsonData = {}, typeproperties = [], jsonProperty = {}, decos = [],
// foundError = false, oldName, typeId, initcolor;
//
// $(form)
// .find('table#typeName')
// .find(':input')
// .each(
// function(i, field) {
// if ((field.type != 'submit') && (field.type != 'radio')
// || field.checked) {
// if ((field.name == 'id')
// || (field.name == 'oldName')
// || (field.name == 'name')
// || (field.name == 'classification')
// || (field.name == 'owner')
// || (field.name == 'isRoot')) {
// if (field.name == 'name' && !field.value) {
// console.log("Missing Value for type Name.");
// $('#typeForm')
// .append(
// "<br/><p style='color:red'>Missing Value for Type name : ");
// foundError = true;
// }
//
// if (field.name == 'isRoot') {
// jsonData[field.name] = field.value;
// } else {
// jsonData[field.name] = field.value;
// }
//
// }
// }
//
// if (field.name == 'geoActivator') {
// if (document.getElementById('geoActivator').checked == true) {
// decos.push($(this).val());
// }
// }
//
// });
//
// typeId = jsonData["id"];
//
// if (foundError) {
// return;
// }
// jsonData['decorators'] = decos;
//
// // remove original typename to pass as path parameter
// oldName = jsonData["oldName"];
//
// initcolor = typeMapViaId[typeId].color;
// delete jsonData['oldtypename'];
// // ADD VALIDATION HERE
// $(form).find('table#propertiesFields').each(
// function(i, propDiv) {
// $(propDiv).find(':input').each(
// function(i, field) {
// if (field.type != 'submit'
// || field.value != 'Cancel') {
//
// if ((field.name == 'propertyType')
// && (field.value == 'TEXT')) {
// jsonProperty[field.name] = 'STRING';
// } else {
// if (field.name == 'isMandatory'
// || field.name == 'isUnique') {
// if (field.checked == true) {
// jsonProperty[field.name] = "true";
// } else {
// jsonProperty[field.name] = "false";
// }
// } else {
// jsonProperty[field.name] = field.value;
// }
// // jsonProperty[field.name] = field.value;
// }
//
// }
// });
// typeproperties.push(jsonProperty);
// jsonProperty = {};
// })
// jsonData.properties = typeproperties;
// console.log(jsonData);
//
// var successFunction = function(data) {
// data.color = initcolor;
// tdvCy.filter('node[name="' + data.name + '"]').data(data);
// console.log("Type Properties update success. data: " + data.name);
//
// (new DesignLogicalRenderer()).emptyAll();
//
// if (oldName != data.name) {
// delete typeMap[oldName]; // remove old value
// }
// typeMap[data.name] = data; // / update the typeMap && typebar
// typeMapViaId[data.id] = data; // added the new type map keyed on id
//
// // (new DesignLogicalRenderer()).initTypeDesignBar('typelist');
// (new DesignLogicalRenderer()).initTypeDesignBar(typeMapViaId,
// 'typelist');
//
// $("#create_type").dialog("option", "title", "Type Details");
// $("#typeForm").empty();
// TypePropertyUtils.displayTypeProperties($('#typeForm'), data, true);
//
// tdvCy.$('#' + data.id + '').data('name', data.name);
//
// };
//
// var failFunction = function(xhr, status, error) {
// (new DesignLogicalRenderer()).emptyAll();
// document.getElementById('typeForm').textContent = "Error Type properties not
// updated";
// $('#console-log').append(
// "<p style='color:red'>Error Type properties not updated: "
// + xhr.responseText);
// };
//
// var apis = new apiRomeNext();
//
// apis.saveUpdateType(typeId, jsonData, successFunction, failFunction);
//
// }