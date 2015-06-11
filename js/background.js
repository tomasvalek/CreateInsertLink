/*
 * File:	  	background.js
 * Date:   		17.03.2015
 * Author:   	Tomas Valek
 * Desc.:   	Add "InsertLink" to context menu, AddListener for click on context menu.
				Get data from clipboard (over textarea sandbox). Open popup window.
*/

//console.log("background.js");

//Global variables
var clipboardContent;	//for popup.js
var tabId;				//for popup.js
var popupWindowId;		//for popup.js

//Add context menu after install extension
chrome.runtime.onInstalled.addListener(function() {

	var context = "editable";		//contex menu is available only in edit forms
	var title = "CreateInsert link tag";
	chrome.contextMenus.create({
		"title": title,
		"contexts":[context],
		"id": "context" + context,
		'onclick': onClickHandler	//callback
	});
});

//onClick from contextMenu
function onClickHandler(info, tab){

	clipboardContent = getContentFromClipboard();			//get data from clipBoard
	/*console.log('clipboardContent: ' + clipboardContent);
	console.log(info);
	console.log(tab);*/

	tabId = tab.id;											//save ID tab

	//Popup window fro Chrome. First is window created and after it sends the message.
	chrome.windows.create({
		url: 'popup.html',
		type: 'popup',
		width: 500,
		height: 200
  	}, function(window) {
		popupWindowId = window.id;	//save ID created popup window.
	});
}

//Copy data from clipboard to textarea (sandbox) and return it.
function getContentFromClipboard() {
	var result = '';
	var sandbox = document.getElementById('sandbox');
	sandbox.value = '';
	sandbox.select();
	if (document.execCommand('paste')) {
		result = sandbox.value;
		//console.log('got value from sandbox: ' + result);
	}
	sandbox.value = '';
	return result;
}
