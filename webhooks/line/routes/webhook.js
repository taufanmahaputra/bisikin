import express from 'express';
const router = express.Router();
import line from '../modules/line';

/* POST webhook. */
router.post('/', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const handleEvent = (event) => {
  const replyToken = event.replyToken;
  const lineId = event.source.userId;

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve()
  }

  const message = event.message.text;
  const keyword = message.split(' ')[0];
  const text = message.slice(keyword.length + 1).split('#');
  
  switch (keyword) {
    case '/register':
      return handleRegisterEvent(replyToken, text)
    case '/subscribe':
      return handleSubscribeEvent(replyToken, lineId, text)
    case '/activate':
      return handleActivateEvent(replyToken, text, true)
    case '/deactivate':
      return handleActivateEvent(replyToken, text, false)
    case '/keywords':
      return handleKeywordEvent(replyToken)
    case '/help':

    default:
      return line.sendReplyWrongCommandMessage(replyToken);
  }
}

const handleRegisterEvent = async (replyToken, text) => {
  const fullName = text[0]
  const username = text[1]
  const mobilePhone = text[2]


  const response = await line.insertNewUser(fullName, username, mobilePhone)
  return line.sendReplyMessage(replyToken, response);
}

const handleSubscribeEvent = async (replyToken, lineId, text) => {
  const username = text[0]
  const password = text[1]
  const companyToken = text[2]

  const response = await line.subscribeCompany(username, password, companyToken, lineId)
  return line.sendReplyMessage(replyToken, response)
}

const handleActivateEvent = async (replyToken, text, status) => {
  const username = text[0]
  const password = text[1]
  const companyToken = text[2]

  const response = await line.activatePlatformSpecificCompany(username, password, companyToken, status)
  return line.sendReplyMessage(replyToken, response)
}

const handleKeywordEvent = (replyToken) => {
  const body = `These are the keywords available. All keywords filled with arguments separated by hashtag:
  -    /register
       FULL_NAME#USERNAME#WHATSAPP_NUMBER
       
  -    /subscribe  |  /activate  |  /deactivate
       USERNAME#PASSWORD#COMPANY_TOKEN
       
  -    /help
  `

  return line.sendReplyMessage(replyToken, body);
}

module.exports = router;
