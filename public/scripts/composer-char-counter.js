$(document).ready(function() {
  console.log("are you working?");
  $("#tweet-text").keydown(function(event) {
    console.log(event); //The this keyword is a reference to the button
    const counter = $(this).parent().children().children("output");
    const charCount = $(this).val().length;
    counter.text(140 - charCount);

    if (140 - charCount < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
});

























