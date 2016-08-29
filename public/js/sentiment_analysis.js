var sentiment = require('sentiment');

console.log("hello sentiment");
$.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
    var i;
    var array = data;
    for (i = 0; i < array.length; i++) {
        var sent_for_object = sentiment(array[i].feedback);
        console.log(sent_for_object);
        console.log(array[i].reaction);
    }
});

