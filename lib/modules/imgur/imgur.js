var util = require('util');
var request = require('request');
var config = require('./config.js');
var Module = require('./../../../bin/module.js');

var Imgur = function Constructor(bot) {
	this.bot = bot;
	this.data = null;
	this.keyWords = config.keywords;
    this.token = config.imgurAuth;
    this.subs = config.subs;
};
util.inherits(Imgur, Module);

Imgur.prototype.getAnswer = function() {
	this.getBoobs(this.data);
};

Imgur.prototype.getBoobs = function(data){

	var self = this;
    var sub = self.subs[self.getRandomIntInclusive(0, self.subs.length-1)];
    console.log('sub:'+sub);
    var url = 'https://api.imgur.com/3/gallery/r/'+sub;

    request({
        url: url,
        headers : {
            "Authorization" : self.token
        },
        json:true
    }, function(err, response, body) {
        self.bot.postMessage(self.data.channel, body.data[self.getRandomIntInclusive(0,body.data.length-1)].link, self.bot.params);
    });
};

Imgur.prototype.getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
};

module.exports = Imgur;