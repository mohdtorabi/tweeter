/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
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

























