var util = require('util');
var request = require('request');
var config = require('./config.js');
var Module = require('./../../../bin/module.js');

var radius = config.radius;
var OfficeGeolocation = config.myplace;
var GoogleApiKey = config.googlemaps_api_key;

var Restaurant = function Constructor(bot) {
	this.bot = bot;
	this.data = null;
	this.keyWords = config.keywords;
};
util.inherits(Restaurant, Module);

Restaurant.prototype.getAnswer = function() {
	this.getNearbyFood(this.data);
};

Restaurant.prototype.getNearbyFood = function(data){

    if(radius === undefined || radius === null){
        var radius = 1000;
    }

    var placesJSON;
	var self = this;
    var propertiesObject = { location: OfficeGeolocation, radius:radius, types:'restaurant', key: GoogleApiKey , opennow: true };
    
    request({
        url:'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        qs: propertiesObject
    }, function(err, response, body) {
      
        if(err) { 
            console.log(err); 
            return; 
        }

        placesJSON = JSON.parse(body);

        //TODO: exclude pharmacy, retail store etc
        var randomFoodPlace = placesJSON.results[Math.floor(Math.random()*placesJSON.results.length)];

        request({
            url: 'https://maps.googleapis.com/maps/api/place/details/json',
            qs: { placeid: randomFoodPlace['place_id'], key: GoogleApiKey}
        }, function(err2, response2, body2) {

            var ChosenPlaceDetails = JSON.parse(body2);
            var string = 'Je vous propose le '+ChosenPlaceDetails.result['name'];

            for (var prop in ChosenPlaceDetails.result){
                if(prop == 'rating'){
                    string = string+' Noté '+ChosenPlaceDetails.result['rating']+'/5';
                }
                if(prop == 'formatted_phone_number'){
                    string = string+' | '+ChosenPlaceDetails.result['formatted_phone_number'];
                }
            }
            string = string+' '+ChosenPlaceDetails.result['url'];
            self.bot.postMessage(self.data.channel, string, self.bot.params);
        });
    });
}

module.exports = Restaurant;
