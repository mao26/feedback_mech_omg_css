var buttonClicked = true;

// button click event to toggle form
$("button").click(function() {
    //if button is clicked
    if(buttonClicked==true){
        $("button").animate({"bottom": "420px"}, "slow");
        $("form").slideDown("slow");
        buttonClicked=false;
    }
    //if button is clicked again
    else{
        buttonClicked = true;
        $("button").animate({"bottom": "40px"}, "slow");
        $("form").slideUp("slow");
    }
});

// mouse over event to convert circle button to rect button
var mouseleave = false;
$("button").mouseover(function(){
    $("#feedback-widget").css({
        //circle to rect
        'border-radius':'0', 
        'width':'300px', 
        'height':'50px'});
    $("i").hide();
    $("p").show();
    
    mouseleave = false;
});

//mouse out event to convert rect button back to circle
$("button").mouseout(function() {
    if (buttonClicked==true){
        $("#feedback-widget").css({
            //rect to circle
            'width': '50px',
            'height': '50px',
            '-moz-border-radius': '50px',
            '-webkit-border-radius': '50px',
            'border-radius': '50px'});
        $("p").hide();
        $("i").show();
    } else {
        $("#feedback-widget").css({
            //circle to rect
            'border-radius':'0', 
            'width':'300px', 
            'height':'50px'});
        $("p").show();
    }
    mouseleave = true;
});

$("#feedback-submit-btn").on('click', function() {
  var page_path = window.location.pathname;
  var improve = $("#improve").val();
  var feedback = $("#feedback").val();
  $.post("http://localhost:3000/api/v1/feedback", {"page": page_path, "improve": improve , "feedback": feedback});
});

var reactionSelected = false;
//reaction button click event
$('.fa').click(function(){
    //if no reaction selected
    if(reactionSelected==false){
        var myClass = $(this).attr("class").split(' ')[1];
        $('.' + myClass).css("color","#D2BA33");
        reactionSelected = true;
    } 
    //if a reaction is already selected
    else {
        //deselecting an reaction
        if($(this).css("color")=="rgb(210, 186, 51)"){
            $(this).css("color","rgb(132, 132, 132)");
            reactionSelected = false;
        }
        //selecting another reaction
        else{
            $(".fa").css("color", "rgb(132, 132, 132)");
            $(this).css("color", "#D2BA33");
            reactionSelected = true;
        }
    }
});
