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

6. connect extension with the server
Added a button in the Option page, "connect to server"
an ajax call is made to the (django) server that POSTS some data and 
server sends back a response

TODO:
https://developer.chrome.com/extensions/messaging
https://developer.chrome.com/extensions/content_scripts
