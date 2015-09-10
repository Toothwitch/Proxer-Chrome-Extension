var loggedIn = false;
var altPN = 0;
var newPN = 0;
var friends = 0;
var news = 0;
var other = 0;
var cookie = "";
var updated = false;
var popups = chrome.extension.getViews({type: "popup"});
function updateCookie(){
	chrome.cookies.get({url: "http://proxer.me", name: "style"}, function(data){
		cookie = data.value;
	});
}
chrome.cookies.onChanged.addListener(function(){
	updateCookie();
});
updateCookie();
function checkLogin(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://proxer.me/login?format=json&action=login", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var resp = JSON.parse(xhr.responseText);
			if(resp.error == 0 || (resp.error == 1 && (resp.code != 1 || resp.code != 2)){//benötigt optimierung nach tests... 
				loggedIn = true;
				getNotifications();
			}else{
				loggedIn = false;
			}
		}
	}
	xhr.send();
}
function getNotifications(){
	if(loggedIn == true){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://proxer.me/notifications?format=raw&s=count", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var resp = xhr.responseText.split('#');
				if(resp[0]==0){
					altPN = resp[1];
					newPN = resp[2];
					friends = resp[3];
					news = resp[4];
					other = resp[5];
					var count = 0;
					count += parseInt(altPN);
					count+= parseInt(newPN);
					count+= parseInt(friends);
					count+= parseInt(news);
					count+= parseInt(other);
					var out = "";
					out += count;
					chrome.browserAction.setBadgeText({
						text: out
					});
					chrome.browserAction.setBadgeBackgroundColor({color: "#212121"});
				}
			}
		}
		xhr.send();
	}
}
checkLogin();
setInterval(getNotifications, 600000);