'use strict';

var config = require('../config.js');
var GerardBot = require('../lib/gerardbot.js');

var gerardbot = new GerardBot(
{
	token: config.bot_api_key,
	name: config.botname
});

gerardbot.run();