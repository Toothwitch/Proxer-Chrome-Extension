var background = chrome.extension.getBackgroundPage();
var backgrounds = ["#5E5E5E", "#000","#F3FBFF", "#7EC9DA"];
var colors = ["#CCCCCC", "#D8DBD6","#000", "#404040"];
var style = 0;
chrome.browserAction.setBadgeBackgroundColor({color: "#212121"});
window.onload = function() {
	updateColors();
}
function updateColors(){
	console.log("happened");
	style = 0;
		switch(background.cookie){
			case "grey":
				style = 0;
				break;
			case "black":
				style = 1;
				break;
			case "old_blue":
				style = 2;
				break;
			case "pantsu":
				//*avoid nosebleed*
				style = 3;
				break;
			default : 
				style = 0;
				break;
	}
	document.getElementsByTagName("html")[0].style.background = backgrounds[style];
	document.getElementsByTagName("html")[0].style.color = colors[style];
}
document.addEventListener('DOMContentLoaded', function() {
	var content = "";
	document.getElementsByTagName("html")[0].style.height = (screen.availHeight / 5)+ "px";
	document.getElementsByTagName("html")[0].style.width = (screen.availWidth / 5)+ "px";
	document.getElementsByTagName("body")[0].style.height = (screen.availHeight / 5)+ "px";
	document.getElementsByTagName("body")[0].style.width = (screen.availWidth / 5)+ "px";
	updateColors();
	
	if(background.loggedIn){
		content = '<table width="100%" height="100%"><tr><td colspan="2" align="center">Benachrichtigungen:</td></tr>';
		content += '<tr><td>AltesPN:</td><td>'+background.altPN + '</td></tr>';
		content += '<tr><td><a href="https://proxer.me/messages" style="text-decoration: none;" name="link">NeuesPN:</a></td><td>'+background.newPN + '</td></tr>';
		content += '<tr><td><a href="https://proxer.me/user/my/connections" style="text-decoration: none;" name="link">Freundschaftsanfragen:</a></td><td>'+background.friends + '</td></tr>';
		content += '<tr><td><a href="https://proxer.me/news" style="text-decoration: none;" name="link">News:</a></td><td>'+background.news + '</td></tr>';
		content += '<tr><td>Sonstiges:</td><td>'+background.other + '</td></tr></table>';
		document.getElementById("content").innerHTML = content;
		var links = document.getElementsByName("link");//augenkrebs...
		for(var i=0;i< links.length; i++){
			links[i].style.color = colors[style];
			(function () {
				var ln = links[i];
				var location = ln.href;
				ln.onclick = function () {
					chrome.tabs.create({active: true, url: location});
				};
			})();
		}
    }else{
		content = '<table width="100%" height="100%"><tr height="100%"><td align="center">Login</td></tr><tr height="100%"><td align="center"><input type="text" id="username" placeholder="Nutzername" ></input></td></tr>';
		content += '<tr height="100%"><td align="center"><input type="password" id="pass" placeholder="Passwort"></input></td></tr></table>';
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