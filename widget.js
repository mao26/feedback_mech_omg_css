var feedbackOpen = false;

// mouse over event to convert circle button to rect button
$("#feedback-widget").mouseover(function() {
  if (!feedbackOpen) {
    $("#feedback-widget").addClass("rect-button")
    $("i").hide();
    $("p").show();
  }
});

//mouse out event to convert rect button back to circle
$("#feedback-widget").mouseout(function() {
  if (!feedbackOpen) {
    $("#feedback-widget").removeClass("rect-button")
    $("p").hide();
    $("i").show();
  }
});

// button click event to toggle form
$("#feedback-widget").click(function() {
  if (!feedbackOpen) {
    $("#feedback-widget").animate({"bottom": "290px"}, "slow");
    $(".feedback-module form").slideDown("slow");
    feedbackOpen = true;
  }
});

// close the form
$("#feedback-close, #feedback-submit-btn").on('click', function() {
  if (feedbackOpen) {
    $(".feedback-module form").slideUp("slow");
    $("#feedback-widget").animate({
                                   "bottom": "40px",
                                   "width": "50px",
                                   "border-radius": "50px"
                                  }, "slow");
    $("#feedback-widget").removeClass("rect-button");
    $("p").hide();
    $("i").fadeIn()
    event.stopPropagation(); // prevent widget click from registering
    feedbackOpen = false;
  }
});

//reaction button click event
$('.fa-reaction').click(function(){
  $(this).siblings().removeClass("selected");
  $(this).toggleClass("selected");
});

$("#feedback-submit-btn").on('click', function() {
  var page_path = window.location.pathname;
  var feedback = $("#feedback").val();
  var reaction = $(".fa.selected").attr('id').split('-')[1];
  $.post("http://localhost:3000/api/v1/feedback", {"page": page_path, "reaction": reaction, "feedback": feedback})
    .done(function() {
      if (feedback && reaction) {
        $("#widget-icon").removeClass("fa-comment-o");
        $("#widget-icon").addClass("fa-check-circle-o");
        $("#feedback-widget").addClass("feedback-success");
        $(".feedback-module").delay(1800).fadeOut();
      }
    });
});
