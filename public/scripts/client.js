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
        <p class = "tweet-content">${escape(tweet.content.text)}</p>
        <footer> 
          <span>${getDate(tweet.created_at)} ago</span>
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
    $(".tweets-container").empty();
    for (const item of tweets) {
      const tweet = createTweetElement(item);
      $(".tweets-container").prepend(tweet);
    }
  };
  renderTweets(data);

  
  const submitButton = () => {
    $(".tweet-form").submit(function(event) {
      event.preventDefault();
      const text = $("#tweet-text").val();
      if (text.length === 0) {
        $(".error-container").text("Error: Cannot post an empty tweet");
        $(".error-container").css("border-color", "red");
        
      } else if (text.length > 140) {
        $(".error-container").text("Error: Character limit exceeded");
        $(".error-container").css("border-color", "red");
      } else {
        const dataEntry = $(this).serialize();
        $.ajax("/tweets/", {method : 'POST', data: dataEntry})
          .then(() => {
            $("#tweet-text").val("");
            $(".counter").val(140);
            $(".error-container").css("border-color", "#f4f1ec");
            $(".error-container").text("");
            loadTweets();
            
          });
      }
      
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


  const escape = string => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };

});

//get date function(instruction from stackoverflow)
const getDate = milliseconds => {
  const datePosted = new Date(milliseconds);
  const dateNow = new Date().getTime();
  const time = Math.abs(dateNow - datePosted);
  let sum;
  if (time < 1000 * 60) {
    sum = Math.floor(time / (1000));
    unit = "S";
  } else if (time < 1000 * 60 * 60) {
    sum = Math.floor(time / (1000 * 60));
    unit = "m";
  } else if (time < 1000 * 60 * 60 * 60) {
    sum = Math.floor(time / (1000 * 60 * 60));
    unit = "h";
  } else {
    sum = Math.floor(time / (1000 * 60 * 60 * 60));
    unit = "d";
  }
  
  return `${sum} ${unit}`;
};





  