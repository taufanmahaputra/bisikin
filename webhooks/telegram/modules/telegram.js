const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN);

bot.setWebHook(`https://be4b49ea.ngrok.io/bot${TOKEN}`);

bot.on('message', function onMessage(msg) {
  bot.sendMessage(msg.chat.id, msg.text);
});

module.exports = {
  TOKEN,
  bot
}