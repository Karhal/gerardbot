var config = {};

config.keywords = ['show me', 'picture of'];
config.imgurAuth = process.env.IMGUR_API_KEY || 'Client-ID imgur_api_key';
config.subs = {
	'chiens': 'dogs',
	'chats': 'cats',
	'paresseux': 'sloths',
	'pets': [
		'cats', 
		'dogs'
		]
}
module.exports = config;