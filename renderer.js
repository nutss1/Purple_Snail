var fs = require('fs');		  
var sqlite3 = require('sqlite3').verbose();

var blocked_name = "";
var blocked_version = "";


function block() {

	
	blocked_name = document.getElementsByName("name")[0].value;
	blocked_version = document.getElementsByName("version")[0].value;
		
	if ((blocked_name == "") || (blocked_version == "")){
		alert("Invalid Data");
		return;
	}	

	try{
		var db = new sqlite3.Database('./scripts/database.db');
		db.run("INSERT INTO database (name, version) VALUES ('" + blocked_name + "', '" + blocked_version + "')");
	}
	catch(err){
		alert(err);
		return;
	}

	alert('Blocking rpms with: Name: "' + blocked_name + '" and Version: "' + blocked_version + '".');
}

