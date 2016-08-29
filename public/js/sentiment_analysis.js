var sentiment = require('sentiment');
var array;

console.log("hello sentiment");
$.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
  var i;
  array = data;
  for (i = 0; i < array.length; i++) {
    var sent_for_object = sentiment(array[i].feedback);
    //console.log(sent_for_object);
    //console.log(array[i].reaction);
    console.log(sent_for_object);
    var doc_root = document.getElementById("sentiment-score-1");
    doc_root.textContent = "new content";
    console.log(doc_root);
    /*var brek = document.createElement('br');
    var comment_ui = document.createElement("tr");
    var td = document.createElement("td");
    td.textContent = "hello";
    comment_ui.appendChild(td);
    doc_root.appendChild(comment_ui);*/
  }
});