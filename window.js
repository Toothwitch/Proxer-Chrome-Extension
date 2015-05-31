var background = chrome.extension.getBackgroundPage();
chrome.browserAction.setBadgeBackgroundColor({color: "#212121"});
document.addEventListener('DOMContentLoaded', function() {
	var content = "";
	if(background.loggedIn){
		content = 'Benachrichtigungen:<br>';
		content += 'AltesPN: '+background.altPN;
		content += '<br>NeuesPN: '+background.newPN;
		content += '<br>Freundschaftsanfragen: '+background.friends;
		content += '<br>News: '+background.news;
		content += '<br>Sonstiges: '+background.other;
		document.getElementById("content").innerHTML = content;
	}else{
		content = '<input type="text" id="username" placeholder="Nutzername" ></input>';
		content += '<input type="password" id="pass" placeholder="Passwort"></input>';
	}
});


document.onkeydown = function(e){
	if(e.keyCode == 13){
		if(!background.loggedIn){
			var username = document.getElementById("username").value;
			alert(username);
			var pass = document.getElementById("pass").value;
			alert(pass);
			document.getElementById("content").innerHTML = "Processing...";
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "https://proxer.me/login?format=json&action=login", true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					// JSON.parse does not evaluate the attacker's scripts.
					var resp = JSON.parse(xhr.responseText);
					alert(xhr.responseText);
					alert(resp.message);
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
	}else{
	}
}


