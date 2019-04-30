import express from 'express'
import whatsapp from '../modules/whatsapp'

const router = express.Router()

router.post('/', (req, res) => {
  handleEvent(req.body).then((result) => res.json(result))
})

const handleEvent = (event) => {
  const replyToken = event.From
  const mobilePhone = event.From

  const message = event.Body
  const keyword = message.split(' ')[0]
  const text = message.slice(keyword.length + 1).split('#')

  switch (keyword) {
    case '/register':
      return handleRegisterEvent(replyToken, text)
    case '/subscribe':
      return handleSubscribeEvent(replyToken, mobilePhone, text)
    case '/activate':
      return handleActivateEvent(replyToken, text, true)
    case '/deactivate':
      return handleActivateEvent(replyToken, text, false)
    default:
      return whatsapp.sendReplyWrongCommandMessage(replyToken)
  }
}

const isValidParameters = (params) => {
  return params.indexOf('') === -1 && params.length === 3
}

const handleRegisterEvent = async (replyToken, text) => {
  if (!isValidParameters(text)) {
    return whatsapp.sendReplyWrongCommandMessage(replyToken)
  }

  const fullName = text[0]
  const username = text[1]
  const password = text[2]

  const response = await whatsapp.insertNewUser(fullName, username, password)
  return whatsapp.sendReplyMessage(replyToken, response)
}

const handleSubscribeEvent = async (replyToken, mobilePhone, text) => {
  if (!isValidParameters(text)) {
    return whatsapp.sendReplyWrongCommandMessage(replyToken)
  }

  const username = text[0]
  const password = text[1]
  const companyToken = text[2]

  const response = await whatsapp.subscribeCompany(username, password, companyToken, mobilePhone)
  return whatsapp.sendReplyMessage(replyToken, response)
}

const handleActivateEvent = async (replyToken, text, status) => {
  if (!isValidParameters(text)) {
    return whatsapp.sendReplyWrongCommandMessage(replyToken)
  }

  const username = text[0]
  const password = text[1]
  const companyToken = text[2]

  const response = await whatsapp.activatePlatformSpecificCompany(username, password, companyToken, status)
  return whatsapp.sendReplyMessage(replyToken, response)
}

module.exports = router