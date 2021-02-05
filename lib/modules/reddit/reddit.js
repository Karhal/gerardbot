var util = require('util');
var request = require('request');
var config = require('./config.js');
var Module = require('./../../../bin/module.js');

var Reddit = function Constructor(bot) {
	this.bot = bot;
	this.data = null;
	this.keyWords = config.keywords;
    this.token = config.RedditAuth;
    this.subs = config.subs;
};
util.inherits(Reddit, Module);

Reddit.prototype.getAnswer = function() {
	this.getImage(this.data);
};

Reddit.prototype.selectSubKey = function(data){

    var sub = [];
    for (var i = 0, len = this.keyWords.length; i < len; i++) {

        var regex = new RegExp(this.keyWords[i]+'(.*)$');
        var arrMatches = data['text'].match(regex);

        if(arrMatches!= null  && arrMatches[1] !== null){
            var results = arrMatches[1].trim().match(/[A-z]+/);

            if( results !== undefined && Array.isArray(results) && results[0] !== undefined){
                sub.push(results[0]);
            }
        }
    }

    return sub;
};

Reddit.prototype.getImage = function(data){

    var self = this;
    var subKey = self.selectSubKey(data);

    if(subKey in self.subs === false){
        console.log('[Reddit] inexistent key: "'+subKey+'"');
        self.bot.postMessage(self.data.channel, 'Non' , self.bot.params);
        return;
    }

    var sub = self.subs[subKey];

    if(Array.isArray(sub)){
        sub = sub[self.getRandomIntInclusive(0, sub.length-1)];
    }

    var url = 'https://www.reddit.com/r/'+sub+'.json?sort=top&t=month';

    try {
        request({
            url: url,
            json: true
        }, function(err, response, body) {

            var selectedPost = self.getRandomIntInclusive(0,body.data.children.length-1);
            var image = body.data.children[selectedPost].data.url;

            if(image !== undefined){
                self.bot.postMessage(self.data.channel, image, self.bot.params);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

Reddit.prototype.getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
};

module.exports = Reddit;
