
 var form_div = document.getElementById("form");
 var option_div = document.getElementById("options");
 var bookmark_div = document.getElementById("bookmark");

document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {

    if (!chrome.runtime.error) {
      if(items.data) {
      form_div.style.display = "none";
      //option_div.style.display = "block";
      //bookmark_div.style.display = "none";
      console.log(items);
      document.getElementById("data").innerText = items.data;
    }
    }
  });

  //get url of the current tab
  getURL();
}
//get url for bookmark-start
function getURL() {

  chrome.runtime.getBackgroundPage(function(eventPage) {
          // Call the getPageInfo function in the background page, passing in
          // our onPageDetailsReceived function as the callback. This injects
          // content.js into the current tab's HTML
          eventPage.getPageDetails(onPageDetailsReceived);
      });
}

function onPageDetailsReceived(pageDetails)  {
    // document.getElementById('title').value = pageDetails.title;
    // document.getElementById('url').value = pageDetails.url;
    // document.getElementById('summary').innerText = pageDetails.summary;
    console.log(pageDetails.url)
    document.getElementById('url').value = pageDetails.url;
}
//get url for bookmark-end


document.getElementById("set").onclick = function() {
  var d = document.getElementById("text").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
  //window.close();
}
