$(document).ready(function() {
  $(".container").on("mouseover","article", () => {
    console.log("working?");
    $(this).css("box-shadow", "10px 10px rgba(64, 87, 161, 0.5)", "color", "#545149bd");
  });


});