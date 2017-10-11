$(document).ready(function(){
  console.log("page loaded successfully")
  console.log(document.location.href)
  console.log(new Date().toLocaleTimeString())
  //detects whether user clicks on search textbox
  $('div.sg-search').click(function() {
    console.log("user attempted to search")

    });
    //get the text
    $('.brn-subjects-filter__list-element history').click(function(){
      console.log("history")
    });
 });
