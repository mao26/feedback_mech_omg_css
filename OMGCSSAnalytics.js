/*
Include ifvisible.js
Include OMGCSSAnalytics.js
Include fingerprint2.js
Include TimeMe.js

In theory, this will serve as both a library and an analytics solution.
It has a couple global variables to point to server locations and a user ID.

The script starts on load by declaring the final object to be sent to the
database, and an initialization script calls methods in this library to
populate it, some synchronous, some asynchronous.

On page unload, the object(s) are sent to the DB
*/

/*-------------------------------Variables--------------------------------*/
//global Variables
var clientIP = "";
var clientUID = "";
var geoAPIkey = "https://freegeoip.net/json/";
var ipRequestServer = "http://54.183.84.147:3000/api/v1/ip";
var url_userdata = "http://54.183.84.147:3000/api/v1/analytics";
var url_timedata = "http://54.183.84.147:3000/api/v1/analytics/time";

//Empty object to return to DB
var UserObject = {
	"uuid": null, //Main identification information
	"geolocationinfo": null,
	"fingerprint": null
};

var PageObject = {
	"uuid": null, //Smaller object for time on page
	"timeonpage": 0,
  "docreferrer": "",
	"docURI": "",
	"timestamp": ""
};

var GeoObject = {}; //Output from the geolocation server.

/*-------------------------Onload and On unload events------------------*/
//On document load, make server requests. populate currently blank objects
$(document).ready(function starterFunction() {
	//Begin Time counter object from Timeme.js
	TimeMe.setIdleDurationInSeconds(15);
	TimeMe.setCurrentPageName(window.parent.location.href);
	TimeMe.initialize();
	//run asynchronous commands to get geo and ip information
	getClientIPGEO(ipRequestServer, geoAPIkey);
	getFingerprint();
	//More stuff!
	PageObject.docreferrer = getDocumentReferrer();
	PageObject.docURI = getDocumentURI();
});

$(window).unload(function () {
	//On window unload, fill out time on page and post objects to DB
	PageObject.timeonpage = TimeMe.js.getTimeOnCurrentPageInSeconds();
	PageObject.timestamp = getTimeStamp();

	$.post(url_userdata, UserObject)
	$.post(url_timedata, PageObject)
});

/*------------------------- Data Gathering functions --------------------*/
//getDocumentReferrer returns a string with the document referrer
function getDocumentReferrer() {
	return document.referrer;
}

//getDocumentURI returns the URI of the current page
function getDocumentURI() {
	return window.parent.location.href;
}

//Gets client IP address from custom server, then uses that to get geolocation info
function getClientIPGEO(ipServer, geoServer) {
	$.get(ipServer, function getIP(ipstring) {
		clientIP = ipstring; //sets global variable to this callback IP
		$.get(geoServer + clientIP.substring(7, clientIP.length), function getGeo(jsonGeolocation) {
			GeoObject = jsonGeolocation; //populate geo object
			UserObject.geolocationinfo = jsonGeolocation; //populate field in user object
		});
	});
}

//Fingerprint function. generates a list of 'answers' and also a unique id
function getFingerprint() {
	new Fingerprint2().get(function (result, components) {
		clientUID = result;
		UserObject.uuid = result; //fingerprint uid populated for both datas
		PageObject.uuid = result;
		UserObject.fingerprint = components;
		// components is an array of all fingerprinting components used
		console.log(components);
		console.log(result);
	});
}

/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 */

function getTimeStamp() {
// Create a date object with the current time
  var now = new Date();
// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
// If hour is 0, set it to 12
  time[0] = time[0] || 12;
// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

//Creates a unique string for a UUID with reg expression. Different per page visit.
/*
function createFakeGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
            , v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
*/
