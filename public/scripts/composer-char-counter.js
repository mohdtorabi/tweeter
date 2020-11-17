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










/* $("#btn").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });
  
  $("#btn").on('click', () => {
    console.log(this); //The this keyword here refers to something else!
  }); */
















  /* $(document).ready(function() {
    $("#tweet-text").on("keydown", function() {
      const counter = $(this).parent().find(".counter");
  
      const charCount = this.value.length;
      counter.html(140 - charCount);
      
      if (140 - charCount < 0) {
        counter.css("color", "red");
      } else {
        counter.css("color", "#545149");
      }
    });
  }); */