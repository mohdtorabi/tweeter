$(document).ready(function() {
  const navButton = $(".nav-button");
  const topButton = $(".back-to-top-button");
  const newTweet = $(".newTweet");
  const text = newTweet.find("#tweet-text");

  topButton.hide();

  $(document).scroll(function() {
    if ($(this).scrollTop() >= 290) {
      navButton.fadeOut();
      topButton.fadeIn();
    } else {
      navButton.fadeIn();
      topButton.fadeOut();
    }
  });

  topButton.click(function() {
    newTweet.show();
    text.focus();
    topButton.blur();
    $(document).scrollTo(0, 0);
  });
});