How to run ::
load the extension in the browser
in the extension page of chrome browser, select Insepct views: background.html
this background.html will show the console logs for the extension

the response of the server is shown in the browser console (right click on the browser, select inspect views)

Features done in this extension
1. turning the body of the current tab red
2. count number of tabs open in the browser
3. create a new tab with specified url upon pressing the extension
4. handling options.html and options.js file; chrome.storage (option.js) requires storage in the permission.
// https://developer.chrome.com/extensions/overview
// https://developer.chrome.com/extensions/options
// https://stackoverflow.com/questions/17998123/chrome-storage-sync-undefined
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
5. read html content of a specific url once the extension is clicked.
use content.js in this case, since we want to access a web page
instruction is sent from background.js to content.js
once extension is installed, reload the desired website, then press the browser extension
html will be displayed in console
note:TODO: unable to print console.log from content.js
note:TODO: icon is not being displayed

6. connect extension with the server <through options.html>
Added a button in the Option page, "connect to server"
an ajax call is made to the (django) server that POSTS some data and
server sends back a response

7. connect extension with the server <through content.js/background.js>
make an ajax call when the browser icon is pressed.
content.js: along with sending msg to background.js it connects with the server
and sends data and displays data in browser console.
background.js: output the data returned from content.js in extension
console, after that an ajax call is made to connect with the server
ques: which is the best way to connect with the server?
added jquery.min.js in the manifest. it has to be added before
content.js/background.js to maintain the order of execution.

8. chrome storage api
- created popup.html to ask for user name input
- stored into chrome storage
- retrieve the stored value, according to value obtained show/hid div element
(unable to see the storage in developers tool, used this way: https://stackoverflow.com/questions/11922964/how-do-i-view-the-storage-of-a-chrome-extension-ive-installed )

TODO:
https://developer.chrome.com/extensions/messaging
https://developer.chrome.com/extensions/content_scripts
