chrome.browserAction.setBadgeBackgroundColor({ color: [77, 165, 223, 0] });

//Time variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeString = "";
var timeAbv = "";

var saveSecond = 0;
var saveMinute = 0;
var saveHour = 0;

var LEGACYHOURS = 0;
var LEGACYMINUTES = 0;
var LEGACYSECONDS = 0;

if(localStorage.getItem("UHOURS") != null){
	 LEGACYHOURS = localStorage.getItem("UHOURS");
}
if(localStorage.getItem("UMINUTES") != null){
	LEGACYMINUTES = localStorage.getItem("UMINUTES");
	if(LEGACYMINUTES > 60){
		LEGACYMINUTES = 0;
		LEGACYMINUTES += 1;
	}
}
if(localStorage.getItem("USECONDS") != null){
	LEGACYSECONDS = localStorage.getItem("USECONDS");
	if(LEGACYSECONDS > 60){
		LEGACYSECONDS = 0;
		LEGACYMINUTES += 1;
	}
}

var ALLhours = 0;
var ALLminutes = 0;
var ALLseconds = 0;

var timeTotal = "";



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
		
		
		
		
		ALLhours = LEGACYHOURS + hours;
		
		
		ALLseconds = LEGACYSECONDS + seconds;
		if(ALLseconds > 60){
			ALLseconds = 0;
			ALLminutes += 1;
		}
		
		ALLminutes = LEGACYMINUTES + minutes;
		if(ALLminutes > 60){
			ALLminutes = 0;
			ALLhours += 1;
		}
		
		
		timeTotal = LEGACYHOURS.toString() + ":" + LEGACYMINUTES.toString() + ":" + LEGACYSECONDS.toString();		
		
		//SAVE TIME
		saveSecond = LEGACYSECONDS + seconds;
		if(saveSecond > 60){
			saveSecond = 0;
			saveMinute += 1;
		}
		if(saveMinute > 60){
			saveMinute = 0;
			saveHour += 1;
		}
		localStorage.setItem("UHOURS", LEGACYHOURS + hours);
		localStorage.setItem("UMINUTES", LEGACYMINUTES + minutes);
		localStorage.setItem("USECONDS", LEGACYSECONDS + seconds);
		
		//Change the DOCUMENT
		var poppy = chrome.extension.getViews({
			type: "popup"
		});
		for (var i = 0; i < poppy.length; i++){
			poppy[i].document.getElementById('time').innerHTML = timeString;
			poppy[i].document.getElementById('atime').innerHTML = timeTotal;
		}
		
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
main();
