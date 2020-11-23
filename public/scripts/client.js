/* eslint-disable no-undef */
const data = [];

$(document).ready(function() {
  $(".error-container").hide();
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
          <span>${getDate(tweet.created_at)}</span>
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
        $(".error-container").show();
      } else if (text.length > 140) {
        $(".error-container").text("Error: Character limit exceeded");
        $(".error-container").show();
      } else {
        const dataEntry = $(this).serialize();
        $.ajax("/tweets/", {method : 'POST', data: dataEntry})
          .then(() => {
            $("#tweet-text").val("");
            $(".counter").val(140);
            $(".error-container").hide();
            $(".text-box").focus();

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
const getDate = (milliseconds) => {
  const datePosted = new Date(milliseconds);
  const dateNow = new Date().getTime();
  const time = Math.abs(dateNow - datePosted);
  let sum;
  let unit;
  if (time < 1000 * 60) {
    sum = Math.floor(time / (1000));
    unit = 'second ago';
    if (sum > 1 && unit === 'second ago') {
      unit = 'seconds ago';
    }
  } else if (time < 1000 * 60 * 60) {
    sum = Math.floor(time / (1000 * 60));
    unit = 'minute ago';
    if (sum > 1 && unit === 'minute ago') {
      unit = 'minutes ago';
    }
  } else if (time < 1000 * 60 * 60 * 24) {
    sum = Math.floor(time / (1000 * 60 * 60));
    unit = 'hour ago';
    if (sum > 1 && unit === 'hour ago') {
      unit = 'hours ago';
    }
  } else if (time < 1000 * 60 * 60 * 24 * 30) {
    sum = Math.floor(time / (1000 * 60 * 60 * 24));
    unit = 'day ago';
    if (sum > 1 && unit === 'day ago') {
      unit = 'days ago';
    }
  } else if (time < 1000 * 60 * 60 * 24 * 30 * 12) {
    sum = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
    unit = 'month ago';
    if (sum > 1 && unit === 'day ago') {
      unit = 'months ago';
    }
  } else {
    sum = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
    unit = 'year ago';
    if (sum > 1 && unit === 'year ago') {
      unit = 'years ago';
    }
  }

  return `${sum} ${unit}`;
};