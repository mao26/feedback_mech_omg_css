var buttonClicked = true;
$("button").click(function () {
    //if button is clicked
    if(buttonClicked==true){
        $("form").slideDown("slow");
        buttonClicked=false;
    }
    //if button is clicked again
    else{
        buttonClicked = true;
        $("form").slideUp("slow");
    }
});

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