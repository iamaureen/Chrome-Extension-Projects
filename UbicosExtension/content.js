  var data = {}
  var array = []
$(document).ready(function(){
  console.log("page loaded successfully")
  //data structure to store all user interaction log for one page

  data['url'] = document.location.href
  //if user visits a question page, get the question id
  if(document.location.href.includes("question")){
    var res = document.location.href.split("/");
    data['questionID'] = res[4]
    console.log(res[4])
  }
  data['time'] = new Date().toLocaleTimeString()


  //console.log(document.location.href)
  //console.log(new Date().toLocaleTimeString())

  //detects whether user clicks on search textbox -
  //when user is not logged in
  $('div.sg-search').click(function() {
    // array.push("user attempted to search")
    // data['activity'] = array
    array.push("user attempted search")
    console.log("user attempted search")

    });

    //when user is logged in - detect if user wants to ask a question
    //in case of class name with space, put . in the place of space
    $('a.add-task.sg-button-primary.sg-button-primary--alt.js-ask-question-button').click(function(){
      array.push("Add question button clicked")
      console.log("Add question button clicked")

    });
    //user hovering questions - works
    // $('a.sg-text.sg-text--standout.brn-stream-question__content.js-question').click(function(){
    //   console.log("user is hovering over the question")
    // });

 });


//https://stackoverflow.com/questions/28627111/how-to-call-a-function-before-leaving-page-with-javascript
//https://stackoverflow.com/questions/9973816/why-is-jquery-unload-not-working-in-chrome-and-safari

 $(window).bind("beforeunload",function(){
    console.log("leaving")
    data['activity'] = array

    //save in the local storage
    chrome.storage.sync.set({ "log": data }, function(){
      //  A data saved callback omg so fancy
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });

    //get all the item from chrome local storage
    chrome.storage.sync.get("log", function(items) { // null implies all items
       // Convert object to a string.
       var result = JSON.stringify(items);
       console.log(result)
       $.ajax({
         type: 'POST',
         contentType: 'application/json',
         url: 'http://127.0.0.1:8000/postLOG/',
         data: result,
         success: function (data, textStatus, xhr) {
                   console.log(data);
           },
           error: function (xhr, textStatus, errorThrown) {
                     console.log('Error in Operation');
           }

       });


   });
});
