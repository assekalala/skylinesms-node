var request = require('request');

var _apiKey;
var skylinesms = {};


skylinesms.setApiKey = function(apiKey) {
    _apiKey = apiKey
};

skylinesms.send_message = function (phoneNumber, message, from_ = null) {

	if (!_apiKey){
		throw new Error("No API Key was provided");
    }
    
    var from = (from_ != null) ? from_ : "SKYLINESMS";

    var options = {
        method: 'POST',
        url : "http://skylinesms.com/api/v2/json/messages?token=" + _apiKey,
        headers : {
            "Content-Type" : "application/json",
        },
        body: "{ \"to\":\"" + phoneNumber + "\", \"message\":\"" + message + "\", \"from\":\"" + from + "\"}"
    };
    var callback = function (error, response, body) {
        if (error) console.log("Error: " + error);
        console.log(body);
    };

    request(
        options,
        callback
    );
};

skylinesms.check_status = function(messageId){

    if (!_apiKey){
		throw new Error("No API Key was provided");
    }
    
    var options = {
        method: 'GET',
        url : "http://skylinesms.com/api/v2/json/delivery?token=" + _apiKey + "&reference=" + messageId,
        headers : {
            "Content-Type" : "application/json"
        }
    };
    var callback = function (error, response, body) {
        if (error) console.log("Error: " + error);
        console.log(body);
    };

    request(
        options,
        callback
    );
};

skylinesms.balance = function() {
    if (!_apiKey){
		throw new Error("No API Key was provided");
    }

    var options = {
        method: 'GET',
        url : "http://skylinesms.com/api/v2/json/balance?token=" + _apiKey,
        headers : {
            "Content-Type" : "application/json"
        }
    };

    var callback = function (error, response, body) {
        if (error) console.log("Error: " + error);
        console.log(body);
    };

    request(
        options,
        callback
    );
};

module.exports = skylinesms;