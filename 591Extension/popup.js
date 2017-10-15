
 var form_div = document.getElementById("form");
 var option_div = document.getElementById("options");
 var bookmark_div = document.getElementById("bookmark");

 var name;
 var url;
 var tags;

document.body.onload = function() {

//notification code start ref: https://developer.chrome.com/apps/app_codelab_alarms
  var opt = {
    type: 'list',
    title: 'keep burning',
    message: 'Primary message to display',
    priority: 1,
    items: [{ title: '', message: ''}],
    iconUrl:'icon.png'

};


chrome.notifications.create('id', opt, function(id) {

  chrome.notifications.onClicked.addListener(function(id, byUser) {
       chrome.tabs.create({url: "http://www.google.com"});
   });
});

//notification code end

  chrome.storage.sync.get("data", function(items) {

    if (!chrome.runtime.error) {
      if(items.data) {
      form_div.style.display = "none";
      //get the username
      console.log(items);
      name = items.data;
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
    url = pageDetails.url;
    document.getElementById('url').value = pageDetails.url;
}
//get url for bookmark-end

//when set but is clicked after entering username
document.getElementById("set").onclick = function() {
  var d = document.getElementById("text").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
  //window.close();
}

document.getElementById("addBookmark").onclick = function() {
  console.log("clicked add bookmark")
  //content
  tags = document.getElementById('tags').value;

  content = {
    username: name,
    url: url,
    tags: tags
  }
  content = JSON.stringify(content)

  //add info to the the database
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://127.0.0.1:8000/bookmarkPost/',
    data: content,
    success: function (data, textStatus, xhr) {
              console.log(data);
              //show notification - it will show notification locally
              //https://stackoverflow.com/questions/35655817/chrome-desktop-notification-to-all-usershttps://stackoverflow.com/questions/35655817/chrome-desktop-notification-to-all-users
              //push notification for web: https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web
              //gcm for chrome extension instead of push notification: https://stackoverflow.com/questions/35699566/chrome-extension-with-service-worker-receiving-push-notifications
              //example another project: https://medium.freecodecamp.org/i-wanted-real-time-github-push-notifications-so-i-built-a-chrome-extension-7e6be0611e4
      },
      error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
      }

  });
}

//detect change event in the tag input textfield, and suggest tags
$('#tags').keyup(function(event) {
  //TODO: add bot here (!)
  if(document.getElementById("tags").value.length > 0){
    //TODO: randomize response
    document.getElementById("tagsugg").innerText = "want to be more specific?";
  }
  else{
    document.getElementById("tagsugg").innerText = "";
  }
})
