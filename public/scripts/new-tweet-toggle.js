$(document).ready(function() {
  const button = $(".nav-button");
  const up = button.find("div").find(".up");
  const down = button.find("div").find(".down");
  const newTweet = $(".newTweet");
  const text = newTweet.find("#tweet-box");

  newTweet.hide();
  up.hide();

  button.click(function() {
    if (newTweet.is(":hidden")) {
      down.hide();
      up.show();
      newTweet.slideDown(function() {
        text.focus();
      });
      button.blur();
    } else {
      up.hide();
      down.show();
      newTweet.slideUp();
      button.blur();
    }
  });
});