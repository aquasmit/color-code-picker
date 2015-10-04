
module.exports.init = init;

function init(){

//Print help
function printHelp(){
	console.log("");
	console.log("Usage:");
	console.log("=====");
	console.log("");
	console.log("node ./app.js --<args>=<value>");
	console.log("");
	console.log("agrs:");
	console.log("=====");
	console.log("");	
	console.log("--help 			     prints this help");
	console.log("--color=<color-name>	     prints the hex color code for <color-name>");
}

//filestream module to read json files
var fs = require('fs');

//Use package minimist and slice (remove) the first two arguments. Then assign the thrid argument to variable 'color'. 
var args = require("minimist")(process.argv.slice(2),{string : "color"});

//If argument is other than --help or --color then print help & exit.
if(args.help || !args.color){
	printHelp();
	process.exit(1);
}

//save value of argument 'color' in a variable.
var color = args.color;

////////////////////////////Get color code from color name & check if that is websafe or not///////////////////

	var colorbank;
	var safecodes;

	fs.readFile('json/websafecolors.json','utf8',function(err,data){

		if(err) throw err;
		safecodes = JSON.parse(data);

		fs.readFile('json/colors.json','utf8',function(err,datax){
			if(err) throw err;
			colorbank = JSON.parse(datax);
			//console.log(colorbank);

			var result = getColorCode(color);
			console.log("");
			if(result.success === true) {
				console.log("Color Code: "+result.code);
				
			}	
			console.log(result.response_str);
		});




	});





//get color code from color name. This funcation can also be called from app.js if you want to build this web based instead of command line utility.
var getColorCode = function(color){

	if(color == undefined) { return { success:false, code: "", response_str: "Please enter color name. Use --help for more info.'"}; }

	if (typeof colorbank[color.toLowerCase()] != 'undefined') {

			var result = colorbank[color.toLowerCase()];
			var c = result.replace('#',"");
			var response_str;
			if(safecodes.indexOf(c)) {

				response_str = "This is a Web Safe color.";

			} else {
				response_str = "This is not a Web Safe color.";
			}
			return { success:true, code: colorbank[color.toLowerCase()], response_str : response_str};
			        		

    } else {

    	return { success:false, code: "", response_str: "This color could not be not found in colors.json"};

    }    

};

}
