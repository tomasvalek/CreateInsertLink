/*
 * File:	  	contentscript.js
 * Date:   		17.03.2015
 * Author:   	Tomas Valek
 * Desc.:   	Content script. It can access to DOM model.
*/

//console.log('contentScript');

//Listener for messages to correct tab.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.data)
		insertTextAtCursor(request.data); //paste data
});

/**
 * Paste text to cursor position.
 * Taken from:
 * http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
 */
function insertTextAtCursor(text) {
	var el = document.activeElement;
	var val = el.value;
	var endIndex;
	var range;
	var doc = el.ownerDocument;
	if (typeof el.selectionStart === 'number' &&
		typeof el.selectionEnd === 'number') {
		endIndex = el.selectionEnd;
		el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
		el.selectionStart = el.selectionEnd = endIndex + text.length;
	} else if (doc.selection !== 'undefined' && doc.selection.createRange) {
		el.focus();
		range = doc.selection.createRange();
		range.collapse(false);
		range.text = text;
		range.select();
	}
}
