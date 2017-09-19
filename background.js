//This dirty segment of code was done by Colin
chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
chrome.browserAction.setBadgeText({text: '1'});
alert("I am running you mother lover");
chrome.browserAction.setBadgeText({text: '2'});
//NOW THE DIRTY CODE ENDS, AND THE CLEAN SPLEAN CODE IS BELOW BY THE AMAZING MILAN
var seconds = 2;
var minutes = 0;
var hours = 0;
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
		chrome.browserAction.setBadgeText({text: hours.toString() + ":" + minutes.toString() + ":" + seconds.toString()}) 
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
main();
