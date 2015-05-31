var loggedIn = false;
var altPN = 0;
var newPN = 0;
var friends = 0;
var news = 0;
var other = 0;

function checkLogin(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://proxer.me/login?format=json&action=login", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			// JSON.parse does not evaluate the attacker's scripts.
			var resp = JSON.parse(xhr.responseText);
			if(resp.error == 0){
				loggedIn = true;
			}else{
				loggedIn = false;
				alert("not logged in....");
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
					//erfolgreich
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
				}else{
					//failed
				}
			}
		}
		xhr.send();
	}else{
		//nicht eingeloggt...
	}
}


checkLogin();

setTimeout(getNotifications, 10000);
setInterval(getNotifications, 600000);
