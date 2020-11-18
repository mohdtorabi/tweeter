/* eslint-disable no-undef */
const data = [];

$(document).ready(function() {
  const createTweetElement = (tweet) => {
    const $tweet = $(`
      <article class= "tweet">
        <header class= "container-header">
          <div class = "image-name">
            <img class = "header-img" src="${tweet.user.avatars}"> 
            <h3>${tweet.user.name}</h3>
          </div>
          <span class="tweet-account">${tweet.user.handle}</span>
        </header>
        <p class = "tweet-content">${tweet.content.text}</p>
        <footer> 
          <span>${tweet.created_at} days ago</span>
          <div>
            <button class = "symbols" type="button">&#9873</button>
            <button class = "symbols" type="button">&#9850</button>
            <button class = "symbols" type="button">&#9829</button>
          </div>
        </footer>
      </article>`);
    return $tweet;
    
  };
  
  const renderTweets = (tweets) => {
    for (const item of tweets) {
      console.log(item);
      const tweet = createTweetElement(item);
      $(".tweets-container").prepend(tweet);
    }
  };
  renderTweets(data);

  const submitButton = () => {
    $(".tweet-form").submit(function(event) {
      const dataEntry = $(this).serialize();
      event.preventDefault();
      $.ajax("/tweets/", {method : 'POST', data: dataEntry})
        .then(() => {
          console.log("this is working");
        });
    });
  };
  submitButton();

  const loadTweets = () => {
    $.ajax("/tweets/")
      .then((data) => {
        renderTweets(data);
      });
  };
  loadTweets();
    
});





  