

console.log('you are in the world of content.js');

// Send a message containing the page details back to the background page
chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
    'summary': window.getSelection().toString()
});
