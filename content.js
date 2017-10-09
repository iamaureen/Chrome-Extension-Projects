

console.log('you are in the world of content.js');
//5.Listen for messages from backgroud.js
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
        //post_to_server();

    }
});

// Send a message containing the page details back to the background page
chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
    'summary': window.getSelection().toString()
});

function formToJSON() {
  return JSON.stringify({"name":"Ishrat3","description":"Ishrat Ahmed","price":"10.00"});
}

function post_to_server(){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://127.0.0.1:8000/products/',
    data: formToJSON(),
    success: function (data, textStatus, xhr) {
              console.log(data);
      },
      error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
      }

  });

}
