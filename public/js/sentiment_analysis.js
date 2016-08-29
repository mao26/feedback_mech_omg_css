var sentiment = require('sentiment');
var array;
$(document).ready(function () {
  $.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
    var array = data;
    var i;
    var top_height;
    var text_length = 0;
    var doc_root = document.getElementById("list_div");
    for (i = 0; i < array.length; i++) {
      console.log(array[i]);
      var comment_ui = document.createElement("div");
      var brek = document.createElement('br');
      comment_ui.setAttribute("id", "comment-ui-block");
      comment_ui.setAttribute("class", "comment-ui-block w3-padding-250 w3-center");
      top_height = 60 * i;
      if (array[i].comment != null) {
        var comment_text = document.createElement("div");
        var text = "Comment: ";
        comment_text.textContent = text;
        comment_text.setAttribute("style", "font-weight: bold; color: #267b82 ");
        comment_ui.appendChild(comment_text);
        var comment = document.createElement("span");
        comment.textContent = array[i].comment;
        comment.setAttribute("style", "color: #4b4b4b !important");
        comment_text.appendChild(comment);
        text_length += text.length;
      }
      if (array[i].page != null) {
        var comment_text = document.createElement("div");
        var text = "Page: ";
        comment_text.textContent = text;
        comment_text.setAttribute("style", "font-weight: bold; color: #267b82");
        comment_ui.appendChild(comment_text);
        var page = document.createElement("span");
        page.setAttribute("style", "color : #4b4b4b !important");
        page.textContent = array[i].page;
        comment_text.appendChild(page);
        text_length += text.length;
      }
      /*  MAKE THE FOLLOWING DOM ELEMENTS    
      <i id="reaction-happy" class="fa fa-reaction fa-smile-o"></i>
      <i id="reaction-frown" class="fa fa-reaction fa-meh-o"></i>
      <i id="reaction-meh" class="fa fa-reaction fa-frown-o"></i>
      */
      if (array[i].reaction != null) {
        var reaction = array[i].reaction;
        var img = document.createElement('i');
        if (reaction === "frown") {
          img.setAttribute("class", "fa fa-reaction fa-frown-o");
        }
        if (reaction === "meh") {
          img.setAttribute("class", "fa fa-reaction fa-meh-o");
        }
        if (reaction === "happy") {
          img.setAttribute("class", "fa fa-reaction fa-smile-o");
        }
        img.setAttribute("style", "font-weight: bold; color: #267b82; font-size: 40px; padding: 10px;");
        comment_ui.appendChild(img);
      }
      if (array[i].feedback != null) {
        var comment_text = document.createElement("div");
        var text = "Feedback: ";
        comment_text.textContent = text;
        comment_text.setAttribute("style", "font-weight: bold; color: #267b82");
        comment_ui.appendChild(comment_text);
        var iDiv = document.createElement('span');
        iDiv.setAttribute("id", "feedback-block");
        iDiv.setAttribute("class", "feedback-block w3-round-xlarge w3-padding-250 w3-center");
        iDiv.setAttribute("width", "100px");
        iDiv.setAttribute("height", "300px");
        iDiv.setAttribute("style", "color : #4b4b4b !important");
        comment_text.appendChild(iDiv);
        iDiv.textContent = array[i].feedback;
        text_length += text.length;
      }
      var height_to_add_for_text = (text_length / 100);
      if (height_to_add_for_text > 1) top_height += 60;
      if (height_to_add_for_text > 2) top_height += 120;
      console.log(text_length);
      console.log(height_to_add_for_text);
      if (i == 1) {
        comment_ui.setAttribute("style", "background : #E6EFF0; text-align:center; margin-bottom: 15px; padding: 20px 20px 20px 20px; position: relative; left : 0; float: right; height: 200px; width:48%; margin-top: -25px; overflow: scroll");
      } else if (i % 2 == 0) { //if even
        comment_ui.setAttribute("style", "background : #E6EFF0; text-align:center;  margin-bottom: 15px; padding: 20px 20px 20px 20px; position: relative; right : 0; float: left; height: 200px; width: 48%; margin-right: 10px; overflow: scroll");
      } else { //if odd
        comment_ui.setAttribute("style", "background : #E6EFF0; text-align:center; margin-bottom: 15px; padding: 20px 20px 20px 20px; position: relative; left : 0; float: right; height: 200px; width:48%; overflow: scroll");
      }
      var comment_text = document.createElement("div");
      var text = "Sentiment score: ";
      comment_text.textContent = text;
      comment_text.setAttribute("style", "font-weight: bold; color: #267b82");
      comment_ui.appendChild(comment_text);
      var sentiment_text = document.createElement('span');
      sentiment_text.setAttribute("id", "feedback-block");
      sentiment_text.setAttribute("class", "feedback-block w3-round-xlarge w3-padding-250 w3-center");
      sentiment_text.setAttribute("width", "100px");
      sentiment_text.setAttribute("height", "300px");
      sentiment_text.setAttribute("style", "color : #4b4b4b !important; padding-bottom : 10px");
      comment_text.appendChild(sentiment_text);
      sentiment_score = sentiment(array[i].feedback);
      console.log(sentiment_score);
      sentiment_text.textContent = sentiment_score.score;
      text_length += text.length;
      doc_root.appendChild(comment_ui);
      doc_root.appendChild(brek);
    }
    //set the height of the parent div so that the appended list will fit inside of the list
    doc_root.height += top_height + "px";
  });
})