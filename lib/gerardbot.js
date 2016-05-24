'use strict';

var fs = require("fs");
var path = require('path');
var util = require('util');
var Bot = require('slackbots');
var request = require('request');

var params = {
    icon_emoji: ':hamburger:'
};

var GerardBot = function Constructor(settings) {
    this.settings = settings;
};
util.inherits(GerardBot, Bot);

GerardBot.prototype.run = function () {

    GerardBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

GerardBot.prototype._onMessage = function(data){

	if(this._isMessage(data) && this._isTheMessageForMe(data) && !this._isItMe(data)){
		this._parseText(data);
	}
};

GerardBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

GerardBot.prototype._isMessage = function(data){
	return data.type === 'message' && Boolean(data.text);
};

GerardBot.prototype._isChannelConversation = function(data){
	return typeof data.channel === 'string' && data.channel[0] === 'C';
};

GerardBot.prototype._isItMe = function(data){
	return data.username === this.user.id;
};

GerardBot.prototype._isTheMessageForMe = function(data){
	return data.text.toLowerCase().indexOf('gérard') > -1 || data.text.toLowerCase().indexOf('gerard') > -1;
};

GerardBot.prototype._onStart = function(data){
	this._loadBotUser();
};

GerardBot.prototype._parseText = function(data){

    var modulesDirectories = this.getDirectories('modules');

    for(var i = 0; i < modulesDirectories.length; i++){
        var moduleName = modulesDirectories[i];
        var module = require(path.resolve(__dirname+'/modules/'+moduleName+'/', moduleName)+'.js');
        module = new module(this,data);
    }
};

GerardBot.prototype.getDirectories = function(srcpath) {
    srcpath = path.resolve(__dirname, srcpath);
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

module.exports = GerardBot;