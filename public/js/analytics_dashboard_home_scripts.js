/* File -       analytics_dashboard_home_scripts.js
 * Summary -    supporting scripts to implement functionality
 *              of the analytics_dashboard_home page
 *
 */
$(document).ready(function () {
    reactionTally();
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
        console.log("Happy = [%d], meh = [%d], frown = [%d]", happyCount, neutralCount, frownCount);
    });
}
/* bestRatedPages() 
 * Finds the pages with the most happy reactions
 */
function bestRatedPages() {
    var pagemap = {};
    $.getJSON("http://54.183.84.147:3000/api/v1/feedback", function (data) {
        // Iterate through the list of feedbacks and count each page entry
        $.each(data, function (key, value) {
            // Use a hashmap to tally the pages
            if (pagemap[value.page] == null) {
                pagemap[value.page] = 1;
            }
            else {
                ++pagemap[value.page];
            }
        });
        $.each(pagemap, function (key, value) {
            console.log(pagemap[value]);
        });
    });
}
/* worstRatedPages()
 * Finds the pages with the most sad reactions
 */
function worstRatedPages() {}
/* totalFeedback()
 * Counts the total number of feedbacks
 */
function totalFeedback() {}
/* mostVisitedPage()
 * Determines the pages that are most visited
 */
function mostVisitedPage() {}
/* mostVisitedCountry()
 * Determines the country that most visitors are from
 */
function mostVisitedCountry() {}