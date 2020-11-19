/* eslint-disable no-undef */
$(document).ready(function() {
  $(".container").on("mouseover","article", () => {
    $(this).css("box-shadow", "10px 10px rgba(64, 87, 161, 0.5)", "color", "#545149bd");
  });
});