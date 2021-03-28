/**
 * 
 */
function AllForms() {
}
AllForms.clearDiv = function() {
	$("#messages").empty();
}
AllForms.selectMD = function(ip) {

	$("div#divStatus").append(
			// Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
			$("<div/>", {
				id : "selectForm"
			}).append(
					$("<h4/>").text("Select Metadata "),
					$("<form/>", {
					}).append(
							$("<fieldset/>",{}).append(	
									$("<h4/>").text("Database Type: "),	
									$("<input/>", {
										type : 'radio',
										id : 'dbmysql',
										value : "3306",
										checked : 'checked',
									}),	
									$("<label/>", {
										html : "MySQL"
									}),										
									$("<br/>"),
									$("<input/>", {
										type : 'radio',
										id : 'dboracle',
										value : "1521",
									}),	
									$("<label/>", {}).append(
											$("<span/>", {
												id : "oracleport",
												html : "Oracle"
											})	
									),
									$("<br/>")
							),
							$("<div/>", {}).append(
//									$("<label/>", {
//										html : "Do you want to save it"
//									}),
//									$("<input/>", {
//										type : 'checkbox',
//										id : 'saveInList',
//										value : "true"
//									}),	
//									$("<br/>"),
									$("<label/>", {
										html : "Input IP: "
									}),
									$("<input/>", {
										type : 'text',
										id : 'selectip',
										autocomplete : false,
										required : "required",
										title    : "Format localhost or xxx.xxx.xxx.xxx",
									}),
									$("<span/>",{
										id : "validate_ip"
									}),
									$("<br/>"),
									$("<input/>", {
										type : 'button',
										id : 'btn_select',
										value : 'OK',
										onclick : 'ServerStatus.pingIP();'
									}),
									$("<input/>", {
										type : 'button',
										id : 'btn_scan',
										value : 'SCAN',
										onclick : 'ServerStatus.scanNetwork();'
									})
							)	
					),
					$("<a/>",{
						id : "btn_close",
						href : "#",
						html : "Close",
						onclick : 'ServerStatus.close();'
					})
				)
			)
	$("div[id='selectForm']").attr("class", 'mainForm');						
	$("input[id='btn_select']").attr("class", 'btn btn-primary');
	$("input[id='btn_scan']").attr("class", 'btn btn-primary');	
	$("input[id='selectip']").attr("onkeyup","ServerStatus.validateIp (event, 'selectip')");
	$("span[id='oracleport").attr("class", 'wrap');

}

AllForms.connectMD = function(ip, port) {

	$("div#divStatus").append(
		// Creating Form Div and Adding <h2> and <p> Paragraph Tag in it.
		$("<div/>", {
			id : "connectForm"
		}).append(
			$("<h4/>").text("Credentials for MysQL Server @ " + ip + ":" + port),
			$("<form/>", {
			}).append(
				$("<input/>", {
					type : 'hidden',
					id : 'ip',
					value : ip
				}),
				$("<input/>", {
					type : 'hidden',
					id : 'port',
					value : port
				}),
				$("<label/>", {
					html : "Account name"
				}),
				$("<input/>", {
					type : 'text',
					id : 'username',
					pattern : "/^\S*$/"
//					onkeyup : 'this.form.username.value.replace(/\s/g, "")'
				}),
				$("<span/>", {
					id : 'validate_username',
				}),
				$("<br/>"),

				$("<label/>", {
					html : "Password"
				}),
				$("<input/>", {
					type : 'password',
					id : 'password',
				}),
				$("<span/>", {
					id : 'validate_password',
				}),
				$("<br/>"),
				$("<label/>", {
					html : "Schema name"
				}),
				$("<input/>", {
					type : 'text',
					id : 'schema',
					pattern : "/^\S*$/",
//					onkeyup : 'this.form.username.value.replace(/\s/g, "")'
				}),
				$("<span/>", {
					id : 'validate_schema',
				}),
				$("<br/>"),
				$("<input/>", {
					type : 'button',
					id : 'btn_connect',
					value : 'Connect',
					onclick : 'ServerStatus.callCheckStatus();'
				}),
				$("<input/>", {
					type : 'button',
					id : 'btn_stop',
					value : 'Cancel',
					onclick : 'ServerStatus.close();'
				})
			)
		)
	);
	$("div[id='connectForm']").attr("class", 'mainForm');
	$("span[id^='validate_']").attr("class", 'err_msg');
	$("input[id='btn_connect']").attr("class", 'btn btn-primary');
	$("input[id='btn_stop']").attr("class", 'btn btn-primary');

}

AllForms.scanForm = function(startIP, endIP,  port) {
	$("div#messages").append(
		$("<div/>", {
			id : "scanForm"
		}).append(
			$("<form/>", {
			}).append(
				$("<label/>", {
					id : 'errMsg'
				}),	
				$("<br/>"),
				$("<label/>", {
					html : "From"
				}),	
				$("<span/>", {
					name: "vip"
				}).append(
					$("<input/>", {
						type : 'text',
						id : 'startip',
						title : "Format  xxx.xxx.xxx.xxx",
						value : startIP
					})
				),
				$("<label/>", {
					html : "To"
				}),
				$("<span/>", {
					name: "vip"
				}).append(
					$("<input/>", {
						type : 'text',
						id : 'endip',
						title : "Format  xxx.xxx.xxx.xxx",
						value : endIP
					})
				),
				$("<br/>"),
				$("<input/>", {
					type : 'button',
					id : 'btn_start',
					value : 'Start',
					onclick : 'ServerStatus.doScan();'
				}),
				$("<input/>", {
					type : 'button',
					id : 'btn_stop',
					value : 'Stop',
					onclick : 'ServerStatus.cancelScan();'
				}),
				
				$("<br/>"),
				$("<div/>", {
					id: "errorScan"
				}).append(
						$("<iframe/>", {
							width : "400",
							height : "200",
							name   : "errorText",
							id     : "errorText",
							scrolling : "auto"
						})
						),
						$("<br/>"),
						$("<br/>"),
				$("<div/>", {
					id: "resultScan"
				})
				
			)
		)
	)
	$("input[id='btn_start']").attr("class", 'btn btn-primary');
	$("input[id='btn_stop']").attr("class", 'btn btn-primary');
	$("input[id='startip']").attr("onkeyup","ServerStatus.newvalidateIp (event, 'startip')");
	$("input[id='startip']").attr("onblur","ServerStatus.setEndIP (event, 'startip')");
	
	$("input[id='endip']").attr("onkeyup","ServerStatus.newvalidateIp (event, 'endip')");
	$("span[name='vip").attr("class", "isvalid");
	$( "#errorText" ).contents().find( "body" ).css( "background-color", "#000000" );
	$( "#errorText" ).contents().find( "body" ).css( "color", "#ffffff" );
	
	
}

AllForms.statusForm = function( ip ) {
	$("div#divStatus").append(
		$("<div/>", {
			id : "statusForm"
		}).append(
				$("<label/>", {
					html : "Metadata Status for :"+ ip
				}),	
				$("<div />", {
					id : 'green',
				}),
				
				$("<div/>", {
					id : 'yellow',
				}),
				
				$("<div/>", {
					id : 'red',
				})
				
			)
		)
	$("div[id='green']").attr("class", 'lamp');	
	$("div[id='red']").attr("class", 'lamp');	
	$("div[id='yellow']").attr("class", 'lamp');	
	
}

// NOT used 

AllForms.saveMDForm = function(ip, port, username, pwd, schema, innodb) {

	$("div#messages").append(
		$("<form/>", {
			name : "addServer",
			method : "post",
			action : "/admin/boot/server/add3"
		}).append(
			$("<input/>", {
				type : 'hidden',
				id : 'add_ip',
				value : ip
			}),
			$("<input/>", {
				type : 'hidden',
				id : 'add_port',
				value : port
			}),
			$("<input/>", {
				type : 'hidden',
				id : 'add_username',
				value : username
			}),
			$("<input/>", {
				type : 'hidden',
				id : 'add_pwd',
				value : pwd
			}),
			$("<input/>", {
				type : 'hidden',
				id : 'add_schema',
				value : schema
			}),
			$("<input/>", {
				type : 'hidden',
				id : 'add_innodb',
				value : innodb
			}),
			$("<br/>"),
			$("<input/>", {
				type : 'submit',
				id : 'btn_save',
				value : 'Save',
			})

		)
	)

	$("input[id='btn_save']").attr("class", 'btn btn-primary');
	//	$("input[id='btn_save']").attr("onclick", "location.href='/admin/boot/server/add3'");

}