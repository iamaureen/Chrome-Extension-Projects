

console.log('you\'r in the world of content.js');
//5.Listen for messages from backgroud.js
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }
});
