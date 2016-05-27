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
	this.getImage(this.data);
};

Imgur.prototype.selectSubKey = function(data){

    var sub = [];
    for (var i = 0, len = this.keyWords.length; i < len; i++) {

        var regex = new RegExp(this.keyWords[i]+'(.*)$');
        var arrMatches = data['text'].match(regex);

        if(arrMatches[1] !== null){
            sub.push(arrMatches[1].trim());
        };
    }
    
    return sub;
}

Imgur.prototype.getImage = function(data){

    var self = this;
    var subKey = self.selectSubKey(data);

    if(subKey in self.subs === false){
        console.log('[Imgur] inexistent key: "'+subKey+'"');
        self.bot.postMessage(self.data.channel, 'Désolé je n\'ai pas ça ¯\\_(ツ)_/¯' , self.bot.params);
        return;
    }

    var sub = self.subs[subKey];

    if(Array.isArray(sub)){
        sub = sub[self.getRandomIntInclusive(0, sub.length-1)];
    }

    var url = 'https://api.imgur.com/3/gallery/r/'+sub;

    request({
        url: url,
        headers: {
            "Authorization" : self.token
        },
        json: true
    }, function(err, response, body) {
        var result = self.getRandomIntInclusive(0,body.data.length-1);

        if(result !== undefined){
            self.bot.postMessage(self.data.channel, body.data[result].link, self.bot.params);
        }
    });
};

Imgur.prototype.getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
};

module.exports = Imgur;