var backgroundscript = chrome.extension.getBackgroundPage();
var backgrounds = ["#5E5E5E", "#000","#F3FBFF", "#7EC9DA"];
var colors = ["white", "white","#02476E", "white"];
var bgtitle = ["#777777", "black", "#02476E", "#436D82"];
var bordertitle = ["#777", "white", "#02476E", "#436D82"];
var textshadow = ["0 1px 2px rgba(0, 0, 0, 0.5)", "0 1px 2px rgba(0, 0, 0, 0.5)", "0 0px 0px rgba(0, 0, 0, 0)", "0 1px 2px rgba(0, 0, 0, 0.5)"]

var style = 0;
chrome.browserAction.setBadgeBackgroundColor({color: "#212121"});
window.onload = function() {
	updateColors();
}
function updateColors(){
	console.log("happened");
	style = 0;
		switch(backgroundscript.cookie){
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
	
	if(backgroundscript.loggedIn){
		content = '<div id="application_wrapper"><table id="screen_upperpart" cellspacing="0" cellpadding="0"><tr><td id="screen_ueberschrift">Benachrichtigungen</td></tr></table>';
		content += '<table id="screen_underpart" cellpadding="0" cellspacing="0"><tr><td><table height="100%" width="100%" cellpadding="0" cellspacing="3" border="0" style="border-color:black;border-top:0;"><tr><td class="screen_tile" id="tile1"><table cellpadding="0" cellspacing="0" height="100%" width="100%"><tr><td class="screen_inner_up" id="tile1_inner_up">PN alt</td></tr><tr><td class="screen_inner_down" id="tile1_inner_down">'+backgroundscript.altPN + '</td></tr></table></td>';
		content += '<td class="screen_tile" id="tile2"><a href="http://www.proxer.me/messages"><table cellpadding="0" cellspacing="0" height="100%" width="100%"><tr><td class="screen_inner_up" id="tile2_inner_up">PN neu</td></tr><tr><td class="screen_inner_down" id="tile2_inner_down">'+backgroundscript.newPN + '</td></tr></table></a></td>';
		content += '<td class="screen_tile" id="tile3" width="*"><a href="https://proxer.me/news#top"><table cellpadding="0" cellspacing="0" height="100%" width="100%"><tr><td class="screen_inner_up" id="tile3_inner_up">News</td></tr><tr><td class="screen_inner_down" id="tile3_inner_down">'+backgroundscript.news + '</td></tr></table></a></td></tr>';
		content += '<tr><td class="screen_tile" id="tile4" colspan="2"><a href="https://proxer.me/user/my/connections"><table cellpadding="0" cellspacing="0" height="100%" width="100%"><tr><td class="screen_inner_up" id="tile4_inner_up">Freundschaftsanfragen</td></tr><tr><td class="screen_inner_down" id="tile4_inner_down">'+backgroundscript.friends + '</td></tr></table></a></td>';
		content += '<td class="screen_tile" id="tile6" width="*"><table cellpadding="0" cellspacing="0" height="100%" width="100%"><tr><td class="screen_inner_up" id="tile6_inner_up">Sonstiges</td></tr><tr><td class="screen_inner_down" id="tile6_inner_down">'+backgroundscript.other + '</td></tr></table></td></tr></table></td></tr></table>';
		document.getElementById("content").innerHTML = content;
		document.getElementById("ueberschrift").style.background = bgtitle[style];
		document.getElementById("titlebo").style.borderBottomStyle = "1px solid " + bordertitle[style];
		//document.getElementById("shadow").style.textShadow = textshadow[style];
		
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
		var counter = document.getElementsByName("nzahl");
		for(var i=0;i< counter.length; i++){
			(function () {
				var ct = counter[i];
				ct.style.background = "Pink";
			})();
		}
		
		
		
		//Resizing funktionalität... hier muss noch sehr stark aufgeräumt werden(nur testzwecke)
		document.getElementById('test1').onmousedown = function(ev) {			
			var self = this;
			ev = ev || event;
			var startX = 0;
			var startY = 0;
			this.startX = ev.pageX;
			this.startY = ev.pageY;
			document.onmousemove = function(e) {
				e = e || event;
				document.getElementsByTagName("html")[0].style.width = (parseInt(document.getElementsByTagName("html")[0].style.width.replace('px',''))+(self.startX - e.pageX)).toString()+'px';
				document.getElementsByTagName("html")[0].style.height = (parseInt(document.getElementsByTagName("html")[0].style.height.replace('px',''))-(self.startY - e.pageY)).toString()+'px';
				document.getElementsByTagName("body")[0].style.width = document.getElementsByTagName("html")[0].style.width;
				document.getElementsByTagName("body")[0].style.height = document.getElementsByTagName("html")[0].style.height;
			}
			this.onmouseup = function() {
				document.onmousemove = null;
			}
		}
		document.getElementById('test1').ondragstart = function() { return false }
		
    }else{
		content = '<div id="application_wrapper"><table id="screen_upperpart" cellspacing="0" cellpadding="0"><tr><td id="screen_ueberschrift"><table id="Logowrapper" cellpadding="0" cellspacing="0"><tr><td><div id="Logo"><a href="https://www.proxer.me/" target="_blank" title="Zu Proxer.me!" style="width:100%;height:100%"><img height="*" width="100%" alt="Proxer.me" src="icon_big.png"></a></div></td></tr></table><span id="Hello">Login</span></td></tr></table><table id="screen_underpart" cellpadding="0" cellspacing="0"><tr><td><input class="login" type="text" tabindex="1" id="benu" placeholder="Nutzername"><input class="login" type="password" tabindex="2" id="pass" placeholder="Passwort"></td></tr></table></div>';
		document.getElementById("content").innerHTML = content;
		document.getElementById("ueberschrift").style.background = bgtitle[style];
		document.getElementById("titlebo").style.borderBottom = "1px solid " + bordertitle[style];
		document.getElementById("shadow").style.textShadow = textshadow[style];
	}
});



document.onkeydown = function(e){
	if(e.keyCode == 13){
		if(!backgroundscript.loggedIn){
			var username = document.getElementById("username").value;
			var pass = document.getElementById("pass").value;
			document.getElementById("content").innerHTML = '<div id="application_wrapper"><table id="screen_underpart" cellpadding="0" cellspacing="0" style="height:100%"><tr><td><div class="loading">Processing</div><table id="loading_wrapper"><tr><td><img src="loading.gif" alt="loading_img" id="loading_img"></td></tr></table></td></tr></table></div>';
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "https://proxer.me/login?format=json&action=login", true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var resp = JSON.parse(xhr.responseText);
					if(resp.error == 0 || (resp.error == 1 && resp.code === undefined)){//){
						document.getElementById("content").innerHTML = '<div id="application_wrapper"><table id="screen_underpart" cellpadding="0" cellspacing="0" style="height:82%"><tr><td><div id="welcome">Willkommen</div><div id="welcome_id">'+username.toString()+'!</div><div class="undertale">Schlie&szlig;e kurz das Fenster um fortzufahren</div></td></tr></table></div>';
						backgroundscript.checkLogin()
						document.getElementById("shadow").style.textShadow = textshadow[style];
					}else{
						document.getElementById("content").innerHTML = '<div id="application_wrapper"><table id="screen_underpart" cellpadding="0" cellspacing="0" style="height:82%"><tr><td><div id="Issue">Error</div><div class="undertale">Ein Fehler ist aufgetreten!<br>Bitte versuche es noch einmal.</div></td></tr></table></div>';
						document.getElementById("shadow").style.textShadow = textshadow[style];
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