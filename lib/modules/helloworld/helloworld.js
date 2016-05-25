var util = require('util');
var config = require('./config.js');
var Module = require('./../../../bin/module.js');

var Helloworld = function Constructor(bot) {
	this.bot = bot;
	this.data = null;
	this.keyWords = config.keywords;
};
util.inherits(Helloworld, Module);

Helloworld.prototype.getAnswer = function() {
	this.bot.postMessage(this.data.channel, 'Hello world!', this.bot.params);
};

module.exports = Helloworld;