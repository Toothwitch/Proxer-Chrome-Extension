var background = chrome.extension.getBackgroundPage();
chrome.browserAction.setBadgeBackgroundColor({color: "#212121"});
document.addEventListener('DOMContentLoaded', function() {
	var content = "";
	//document.getElementsByTagName("html").style.height = (screen.availHeight / 5);
	//document.getElementsByTagName("html").style.width = (screen.availWidth / 2);
	if(background.loggedIn){
		content = 'Benachrichtigungen:<br>';
		content += 'AltesPN: '+background.altPN;
		content += '<br>NeuesPN: '+background.newPN;
		content += '<br>Freundschaftsanfragen: '+background.friends;
		content += '<br>News: '+background.news;
		content += '<br>Sonstiges: '+background.other;
		content += '<br>Design: '+ background.cookie;
		document.getElementById("content").innerHTML = content;
	}else{
		content = '<input type="text" id="username" placeholder="Nutzername" ></input>';
		content += '<input type="password" id="pass" placeholder="Passwort"></input>';
		document.getElementById("content").innerHTML = content;
	}
});

document.onkeydown = function(e){
	if(e.keyCode == 13){
		if(!background.loggedIn){
			var username = document.getElementById("username").value;
			var pass = document.getElementById("pass").value;
			document.getElementById("content").innerHTML = "Processing...";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "https://proxer.me/login?format=json&action=login", true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var resp = JSON.parse(xhr.responseText);
					if(resp.error == 0){
						document.getElementById("content").innerHTML = "Willkommen "+username.toString()+"!";
						background.checkLogin();
					}else{
						document.getElementById("content").innerHTML = "Fehler";
					}
				}
			}
			var data = new FormData();
			data.append('username', username);
			data.append('password', pass);
			xhr.send(data);
		}
	}
}


