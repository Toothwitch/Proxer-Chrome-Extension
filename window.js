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
		content = '<div class="benwrapper" height="100%" width="100%"><div id="titlebo"><div id="ueberschrift" class="ueber"><div style="width:100%;height:100%">Benachrichtungen</div></div></div>';
		content += '<div class="contentwrapper"><div class="nachrichtwrapper" id="hervor"><div class="nachrichttitle">PN alt</div><div class="nachrichtzahl" name="nzahl">'+backgroundscript.altPN + '</div></div>';
		content += '<div class="nachrichtwrapper" id="hervor"><a href="https://proxer.me/messages" target="_blank" name="link" tabindex="-1"><div class="nachrichtlinktitle" name="nlink">PN neu</div><div class="nachrichtzahl" name="nzahl">'+backgroundscript.newPN + '</div></a></div>';
		content += '<div style="width:74px !important;margin-right:0px;" class="nachrichtwrapper" id="hervor"><a href="https://proxer.me/news#top" name="link" tabindex="-1" target="_blank"><div class="nachrichtlinktitle" name="nlink">News</div><div class="nachrichtzahl" name="nzahl">'+backgroundscript.news + '</div></a></div>';
		content += '<div style="width:178px;" class="nachrichtwrapper" id="hervor"><a href="https://proxer.me/user/my/connections" name="link" tabindex="-1" target="_blank"><div style="padding:4px 0px 3px;" class="nachrichtlinktitle" name="nlink">Freundschaftsanfragen</div><div class="nachrichtzahl" name="nzahl">'+backgroundscript.friends + '</div></a></div>';
		content += '<div style="width:74px;margin-right:0;" class="nachrichtwrapper"><div style="padding:4px 0px 3px" class="nachrichttitle">Sonstiges</div><div class="nachrichtzahl" name="nzahl">'+backgroundscript.other + '</div></div></div></div>';
		document.getElementById("content").innerHTML = content;
		document.getElementById("ueberschrift").style.background = bgtitle[style];
		document.getElementById("titlebo").style.borderBottomStyle = "1px solid " + bordertitle[style];
		document.getElementById("shadow").style.textShadow = textshadow[style];
		
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
		content = '<table width="100%" height="100%" class="wrapper"><div class="bigicon"><a href="https://www.proxer.me" target="_blank" style="color:transparent;text-decoation:none;" tabindex="-1"><img src="icon_big.png" height="28" id="pic" width="*" alt=""></a></div><tr id="ueberschrift" width="100%"><td align="center" width="100%" style="padding:1px;color:white;" id="titlebo" ><div class="margin1">Login</div></td></tr><tr class="eingabe" width="100%"><td align="center" width="100%"><div class="margin"><input type="text" id="username" placeholder="Nutzername" tabindex="1"></input><input type="password" id="pass" placeholder="Passwort" tabindex="2"></input></div></td></tr></table>';
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
			document.getElementById("content").innerHTML = '<table style="position:absolute;left:0;right:0;top:0;bottom:0;height:100%;width:100%;"><tr><td><div  style="text-align:center;background-color:rgba(255, 255, 255, 0.84);color:black;padding:13px 0;box-shadow:0 1px 2px rgba(0, 0, 0, 0.1);margin:2px auto 0;border-radius:10px;width:75%;border-top:1px solid rgba(0, 0, 0, 0.03)">Processing&nbsp;&nbsp;</div></td></tr></table><table style="position:absolute;left:0;right:0;top:0;bottom:0;height:100%;width:100%;"><tr><td><div  style="text-align:center;padding:2px 4px 0 0;margin:0px auto 0;border-radius:10px;width:75%;"><img src="loading.gif" height="22" style="float:right;margin-right:13px;"></div></td></tr></table>';
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "https://proxer.me/login?format=json&action=login", true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var resp = JSON.parse(xhr.responseText);
					if(resp.error == 0 || (resp.error == 1 && resp.code === undefined)){//){
						document.getElementById("content").innerHTML = '<table style="position:absolute;left:0;right:0;top:0;bottom:0;height:100%;width:100%;margin-bottom:30px;" id="bgtitle"><tr><td style="font-size:17pt;text-align:center;margin-top:30px;"><div id="shadow" style="margin-bottom:18px;font-family:Noto Sans;line-height:1.1">Willkommen<br><span style="font-weight:bold;font-size:19pt;">'+username.toString()+'!</span></div></td></tr></table><div style="position:absolute;bottom:0;left:0;right:0;color:black;text-align:center;padding:5px;font-size:9pt;background-color:white;box-shadow: 0 0 2px black">Bitte schlie&szlig;e das Fenster um fortzufahren!</div>';
						backgroundscript.checkLogin()
						document.getElementById("shadow").style.textShadow = textshadow[style];
					}else{
						document.getElementById("content").innerHTML = '<div style="position:absolute;left:0;right:0;top:0;bottom:0;text-align:center;"><div style="font-size:22pt;margin-top:35px;padding:5px;border-left:0;border-right:0;">Fehler</div><div style="position:absolute;bottom:0;left:0;right:0;color:black;text-align:center;padding:5px;font-size:9pt;background-color:white;box-shadow: 0 0 2px black">Ein Fehler ist aufgetreten!<br>Bitte versuche es noch einmal.</div></div>';
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