var buttonClicked = true;
$("button").click(function () {
    //if button is clicked
    if(buttonClicked){
        $("form").slideDown("slow");
        buttonClicked=false;
    }
    //if button is clicked again
    else{
        buttonClicked = true;
        $("form").slideUp("slow");
    }
});

$("button").mouseover(function(){
    $("i").hide();
    $("p").show();
});

$("button").mouseout(function() {
    if (buttonClicked){
        $("p").hide();
        $("i").show();
    } else {
        $("#feedback-widget").css({
            'border-radius':'0', 
            'width':'300px', 
            'height':'50px'});
        $("p").show();
        
    }
});