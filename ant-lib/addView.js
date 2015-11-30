/**
 * addView
 * adds a view to config.json's view List
 * Not perfect, as it is only trained to add the new viewID to the view
 * property.
 *
 * Arguments:
 *   folder to config.json
 *   viewID
**/
var arg = process.argv;

// The first two arguments are 'node' and the script to run
var folder = arg[2] || '';
var viewID = arg[3] || '';

if ( folder == '' ) {
	console.error("Folder to config.json not specified");
	process.exit();
} else if (folder.length-1 == folder.lastIndexOf('/')){
	// Strip final '/' from it
	folder = folder.substring(0,folder.length);
	console.log ('folder');
}
if ( viewID == '' ) {
	console.error("No ViewID specified");
	process.exit();
}

// Require the fs functions
var fs = require('fs');
// Read config.json and turn it into an object
var data = fs.readFileSync (folder+'/config.json',{encoding:"utf-8"});
var config = JSON.parse(data);

// Add the new view 
config.views.push(viewID);

// Save the new file
var newFile = fs.writeFileSync (folder+'/config.json',JSON.stringify(config,null,"\t"));

// Bob's your uncle