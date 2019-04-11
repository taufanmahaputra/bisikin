import * as telegram from '../modules/telegram'


class Telegram {
  __init = () => {
    telegram.bot.on('message', function onMessage(msg) {
      const replyToken = msg.chat.id;
      const telegramId = msg.from.id;

      const message = msg.text;
      const keyword = message.split(' ')[0];
      const text = message.slice(keyword.length + 1).split('#');

      switch (keyword) {
        case '/register':
          return handleRegisterEvent(replyToken, text)
        case '/subscribe':
          return handleSubscribeEvent(replyToken, telegramId, text)
        // case '/activate':
        //   return handleActivateEvent(replyToken, text, true)
        // case '/deactivate':
        //   return handleActivateEvent(replyToken, text, false)
        // case '/keywords':
        //   return handleKeywordEvent(replyToken)
        // case '/help':

        default:
          return telegram.sendReplyWrongCommandMessage(replyToken);
      }
    });

    const handleRegisterEvent = async (replyToken, text) => {
      const fullName = text[0]
      const username = text[1]
      const mobilePhone = text[2]


      const response = await telegram.insertNewUser(fullName, username, mobilePhone)
      return telegram.sendReplyMessage(replyToken, response);
    }

    const handleSubscribeEvent = async (replyToken, telegramId, text) => {
      const username = text[0]
      const password = text[1]
      const companyToken = text[2]

      const response = await telegram.subscribeCompany(username, password, companyToken, telegramId)
      return telegram.sendReplyMessage(replyToken, response)
    }
  }
}

export default new Telegram()