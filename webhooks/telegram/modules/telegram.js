import TelegramBot from 'node-telegram-bot-api';
import Config from '../config'

const TOKEN = Config.telegram.token;

const bot = new TelegramBot(TOKEN);

bot.setWebHook(`https://bisikin-telegram.serveo.net/bot${TOKEN}`);

bot.on('message', function onMessage(msg) {
  console.log(msg)
  const replyToken = msg.chat.id;

  const message = msg.text;
  const keyword = message.split(' ')[0];
  const text = message.slice(keyword.length + 1).split('#');

  bot.sendMessage(msg.chat.id, msg.text);
});

export {
  bot
}