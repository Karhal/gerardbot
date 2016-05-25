var config = {};

config.keywords = ['foo', 'bar'];
config.imgurAuth = process.env.IMGUR_API_KEY || 'Client-ID imgur_api_key';
config.subs = [
	'dogs', 
	'cats', 
	'sloths'
	];
module.exports = config;