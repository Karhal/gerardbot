var config = {};

config.myplace = '00,0000,00,0000';
config.googlemaps_api_key = process.env.GOOGLE_API_KEY || 'google_api_key';
config.radius = 1000; //in meters
config.keywords = ['foo', 'bar'];

module.exports = config;