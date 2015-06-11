/*
 * File:	  	popup.js
 * Date:   		17.03.2015
 * Author:   	Tomas Valek
 * Desc.:   	JS for popup window.
*/


//console.log("popup.js");

var bg = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js

//We can access to DOM, because include this script is after <body> tag
document.getElementById("title").value = bg.clipboardContent;

//OnClick Success button
document.getElementById("submit").addEventListener("click", function(){
	var title = document.getElementById("title").value;
	var url = document.getElementById("url").value;

/*	console.log("title:"+title);
	console.log("url:"+url);
	console.log("tabID:"+bg.tabId);*/

	var tag = '<a href="'+url+'">'+title+'</a>';

	//Send message to tab for paste HTML tag
	chrome.tabs.sendMessage(bg.tabId, {
		data: tag
	});

	chrome.windows.remove(bg.popupWindowId);
});
