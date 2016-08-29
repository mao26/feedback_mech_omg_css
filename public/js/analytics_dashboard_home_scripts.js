/* File -       analytics_dashboard_home_scripts.js
 * Summary -    supporting scripts to implement functionality
 *              of the analytics_dashboard_home page
 *
 */
$(document).ready(function () {
    reactionTally();
    mostRatedPages();
    bestRatedPage();
    worstRatedPages();
});
/* reactionTally()
 * Counts the number of happy, neutral, and sad reactions
 * and displays them
 */
function reactionTally() {
    var happyCount = 0;
    var neutralCount = 0;
    var frownCount = 0;
    $.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
        // Iterate through the data and update the happy/neutral/sad counts
        $.each(data, function (key, value) {
            if (value.reaction == "happy") {
                ++happyCount;
            }
            else if (value.reaction == "meh") {
                ++neutralCount;
            }
            else if (value.reaction == "frown") {
                ++frownCount;
            }
            else {
                // do nothing
            }
        });
        $('#reaction-total-1').append(happyCount);
        $('#reaction-total-2').append(neutralCount);
        $('#reaction-total-3').append(frownCount);
        //console.log("Happy = [%d], meh = [%d], frown = [%d]", happyCount, neutralCount, frownCount);
    });
}
/* mostRatedPages() 
 * Finds the pages with the most happy reactions
 */
function mostRatedPages() {
    var pagemap = {};
    $.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
        // Iterate through the list of feedbacks and count each page entry
        $.each(data, function (key, value) {
            // Use a hashmap to tally the pages
            if (pagemap[value.page] == null) {
                //console.log("Adding [%s]", value.page);
                pagemap[value.page] = 1;
            }
            else {
                //console.log("Incrementing [%s]", value.page);
                ++pagemap[value.page];
            }
        });
        var mostratedpage = "";
        var mostratedpageratings = 0;
        $.each(pagemap, function (key, value) {
            if (value > mostratedpageratings) {
                mostratedpage = key;
                mostratedpageratings = value;
            }
            //console.log("Page = %s\nTotal Feedback = %s", key, value);
        });
        $('#most-rated-page').append(mostratedpage);
        $('#most-rated-page-ratings').append(mostratedpageratings);
    });
}
//////////////////
// bestRatedPage() 
// Finds the pages with the most happy reactions
//
function bestRatedPage() {
    //console.log("Calculating best rated page...");
    var happypagemap = {};
    $.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
        // Iterate through the list of feedbacks and count each page entry
        $.each(data, function (key, value) {
            // If the page doesn't exist, add it to the array
            if (happypagemap[value.page] == null) {
                console.log("Adding [%s]", value.page);
                happypagemap[value.page] = 0;
            }
            if (value.reaction == "happy") {
                ++happypagemap[value.page];
            }
        });
        // 
        var happiestpage = "placeholderpage.html";
        var happiestpageratings = 0;
        //
        $.each(happypagemap, function (key, value) {
            if (value > happiestpageratings) {
                happiestpage = key;
                happiestpageratings = value;
            }
            //console.log("Page = %s\nHappy Feedbacks = %s", key, value);
        });
        //console.log("Happiest page = %s, happies = %d", happiestpage, happiestpageratings);
        $('#best-page').append(happiestpage);
        $('#best-page-reaction-count').append(happiestpageratings);
    });
}
/* worstRatedPages()
 * Finds the pages with the most sad reactions
 */
function worstRatedPages() {
    //console.log("Calculating worst rated page...");
    var sadpagemap = {};
    $.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
        // Iterate through the list of feedbacks and count each page entry
        $.each(data, function (key, value) {
            // If the page doesn't exist, add it to the array
            if (sadpagemap[value.page] == null) {
                //console.log("Adding [%s]", value.page);
                sadpagemap[value.page] = 0;
            }
            if (value.reaction == "frown") {
                ++sadpagemap[value.page];
            }
        });
        // 
        var worstpage = "placeholderpage.html";
        var worstpageratings = 0;
        //
        $.each(sadpagemap, function (key, value) {
            if (value > worstpageratings) {
                worstpage = key;
                worstpageratings = value;
            }
            //console.log("Page = %s\Sad Feedbacks = %s", key, value);
        });
        //console.log("Worst page = %s, sads = %d", worstpage, worstpageratings);
        $('#worst-page').append(worstpage);
        $('#worst-page-reaction-count').append(worstpageratings);
    });
}
/* totalFeedback()
 * Counts the total number of feedbacks
 */
function totalFeedback() {}
/* mostVisitedPage()
 * Determines the pages that are most visited
 */
function mostVisitedPage() {
    var pagemap = {};
    $.getJSON("__pageobjectdatabaseurl_placeholder__", function (data) {
        // Iterate through the list of feedbacks and count each page entry
        $.each(data, function (key, value) {
            // Use a hashmap to tally the pages
            if (pagemap[value.docURI] == null) {
                //console.log("Adding [%s]", value.page);
                pagemap[value.page] = 1;
            }
            else {
                console.log("Incrementing [%s]", value.page);
                ++pagemap[value.docURI];
            }
        });
        $.each(pagemap, function (key, value) {
            //console.log("Page = %s\nPage views = %s", key, value);
        });
    });
}
/* mostVisitedCountry()
 * Determines the country that most visitors are from
 */
function mostVisitedCountry() {}