// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);

    // set fso = CreateObject("Scripting.FileSystemObject");
    // set s = fso.CreateTextFile("C:\test.txt", True);
    // s.writeline(domContent);
    // s.Close();
}

var url = "https://brainly.com/"

  // Called when the user clicks on the browser action.
  chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log(tab.id)
    //the following statement prints "undefined"
    //if activeTab permission is not stated in json file
    console.log(tab.url)

    //1. turning the body of the current tab red
    //need to add activeTab permission
    /*  console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });*/

    //2. count number of tabs open in the browser
    //no need to add the activeTab permission for this
   /*  chrome.tabs.query({windowType:'normal'}, function(tabs) {
      console.log('Number of open tabs in all normal browser windows:',tabs.length);
   });*/

     //3. create a new tab with specified url upon pressing the extension
     /* chrome.tabs.create({url: "https://www.pinterest.com/"}); */

     //5. get DOM content of a specific website
     // ...check the URL of the active tab against our pattern and...
     if (url == (tab.url)) {
         // ...if it matches, send a message specifying a callback too
         //console.log(document.all[0].outerHTML); // outputs background.html content, since this js is tied with this
         chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
     }

});
