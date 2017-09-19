
chrome.browserAction.setBadgeBackgroundColor({ color: [77, 165, 223, 0] });

//NOW THE DIRTY CODE ENDS, AND THE CLEAN SPLEAN CODE IS BELOW BY THE AMAZING MILAN

//Time variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeString = "";



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
		
		
		//Change the DOCUMENT
		var poppy = chrome.extension.getViews({
			type: "popup"
		});
		for (var i = 0; i < poppy.length; i++){
			poppy[i].document.getElementById('time').innerHTML = timeString;
		}
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
main();
