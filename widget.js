var buttonClicked = true;

// button click event to toggle form
$("button").click(function() {
  //if button is clicked
  if(buttonClicked === true){
    $("button").animate({"bottom": "290px"}, "slow");
    $("form").slideDown("slow");
    buttonClicked=false;
  }
  //if button is clicked again
  else {
    buttonClicked = true;
    $("button").delay(500).animate({"bottom": "40px"}, "slow");
    $("form").delay(500).slideUp("slow");
  }
});

// mouse over event to convert circle button to rect button
var mouseleave = false;
$("button").mouseover(function() {
  $("#feedback-widget").css( {
  //circle to rect
    'border-radius':'0',
    'width':'300px',
    'height':'50px',
  });
  $("i").hide();
  $("p").show();

  mouseleave = false;
});

//mouse out event to convert rect button back to circle
$("button").mouseout(function() {
  if (buttonClicked === true) {
    $("#feedback-widget").css( {
      //rect to circle
      'width': '50px',
      'height': '50px',
      '-moz-border-radius': '50px',
      '-webkit-border-radius': '50px',
      'border-radius': '50px'
    });
    $("p").hide();
    $("i").show();
  } else {
    $("#feedback-widget").css( {
        //circle to rect
        'border-radius':'0',
        'width':'300px',
        'height':'50px'
    });
    $("p").show();
  }
  mouseleave = true;
});

$("#feedback-submit-btn").on('click', function() {
  var page_path = window.location.pathname;
  var improve = $("#improve").val();
  var feedback = $("#feedback").val();
  var reaction = $(".fa.selected").attr('id').split('-')[1];
  $.post("http://localhost:3000/api/v1/feedback", {"page": page_path, "reaction": reaction, "improve": improve , "feedback": feedback});
});

//reaction button click event
$('.fa-reaction').click(function(){
  $(this).siblings().removeClass("selected");
  $(this).toggleClass("selected");
});
