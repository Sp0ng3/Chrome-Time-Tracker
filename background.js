
chrome.browserAction.setBadgeBackgroundColor({ color: [77, 165, 223, 0] });

//NOW THE DIRTY CODE ENDS, AND THE CLEAN SPLEAN CODE IS BELOW BY THE AMAZING MILAN

//Time variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeString = "";
var timeAbv = "";


var LEGACYHOURS = 0;
var LEGACYMINUTES = 0;
var LEGACYSECONDS = 0;

var ALLhours = 0;
var ALLminutes = 0;
var ALLseconds = 0;

var timeTotal = "";

var SWITCH = false;
var RETRIVED = false;

function main(){
	setTimeout(function(){
		seconds += 1;
		if(seconds > 60){
			seconds -= 60;
			minutes += 1;
		}
		if(minutes > 60){
			minutes -= 60;
			hours += 1;
		}
		
		timeString = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
		timeAbv = hours.toString() + ":" + minutes.toString();
		chrome.browserAction.setBadgeText({text: timeAbv});
		
		if (SWITCH == true && RETRIVED == false){
			chrome.storage.local.get('UHOURS', function(result){
				//console.log("hours gotten");
				//console.log(result.UHOURS);
				LEGACYHOURS = result.UHOURS;
				
			});
			chrome.storage.local.get('UMINUTES', function(result){
				//console.log("minutes gotten");
				//console.log(result.UMINUTES);
				LEGACYMINUTES = result.UMINUTES;
			});
			chrome.storage.local.get('USECONDS', function(result){
				//console.log("seconds gotten");
				//console.log(result.USECONDS);
				LEGACYSECONDS = result.USECONDS - 1;
			});
			RETRIVED = true;
			
			
			
		}
		ALLhours = LEGACYHOURS + hours;
		ALLminutes = LEGACYMINUTES + minutes;
		ALLseconds = LEGACYSECONDS + seconds;
		timeTotal = ALLhours.toString() + ":" + ALLminutes.toString() + ":" + ALLseconds.toString();
		//Save total time
		
		chrome.storage.local.set({'UHOURS':ALLhours, 'UMINUTES': ALLminutes, "USECONDS": ALLseconds}, function(){
			//console.log("TIME SAVED");
		});
		
		
		
		//Change the DOCUMENT
		var poppy = chrome.extension.getViews({
			type: "popup"
		});
		for (var i = 0; i < poppy.length; i++){
			poppy[i].document.getElementById('time').innerHTML = timeString;
			poppy[i].document.getElementById('atime').innerHTML = timeTotal;
		}
		
		SWITCH = true;
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
main();
