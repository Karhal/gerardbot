var config = {};

config.bot_api_key = process.env.BOT_API_KEY || 'slack_api_key';
config.botname = process.env.BOT_NAME || 'my_bot_name';

module.exports = config;