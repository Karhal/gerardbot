'use strict';

var fs = require("fs");
var path = require('path');
var util = require('util');
var Bot = require('slackbots');
var request = require('request');

class GerardBot extends Bot {

    constructor(params){
        super(params);
        this.params = {as_user: true};
        this.modules = this.loadModules();
    };

    run() {
        console.info(this.modules.length+' modules loaded');

        this.on('start', this._onStart);
        this.on('message', this._onMessage);
    }

    _onStart(data){
        this._loadBotUser();
    };

    _onMessage(data){

        if(this._isMessage(data) && this._isTheMessageForMe(data) && !this._isItMe(data)){
            this._parseText(data);
        }
    };

    _parseText (data){

        for(var i = 0; i < this.modules.length; i++){
            this.modules[i].setData(data);
            this.modules[i].manage();
        }
    };

    _loadBotUser () {
        var self = this;
        this.user = this.users.filter(function (user) {
            return user.name === self.name;
        })[0];
    };

     getDirectories (srcpath) {
        srcpath = path.resolve(__dirname, srcpath);
      return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
      });
    };

    _isMessage (data){
    	return data.type === 'message' && Boolean(data.text);
    };

    _isChannelConversation (data){
    	return typeof data.channel === 'string' && data.channel[0] === 'C';
    };

    _isItMe (data){
        return data.username === this.user.id;
    };

    _isTheMessageForMe (data){
        return data.text.toLowerCase().indexOf('@'+this.user.id.toLowerCase()) > -1;
    };

    loadModules = function(){

        var modules = [];
        var modulesDirectories = this.getDirectories('modules');

        for(var i = 0; i < modulesDirectories.length; i++){
            var moduleName = modulesDirectories[i];
            var module = require(path.resolve(__dirname+'/modules/'+moduleName+'/', moduleName)+'.js');
            module = new module(this);
            modules.push(module);
        }

        return modules;
    };

}

module.exports = GerardBot;
