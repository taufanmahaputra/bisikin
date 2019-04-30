import express from 'express'
import whatsapp from '../modules/whatsapp'

const router = express.Router()

router.post('/', (req, res) => {
  handleEvent(req.body).then((result) => res.json(result))
})

const handleEvent = (event) => {
  const replyToken = event.From
  const mobile_phone = event.From

  const message = event.Body
  const keyword = message.split(' ')[0]
  const text = message.slice(keyword.length + 1).split('#')

  switch (keyword) {
    case '/register':
      return handleRegisterEvent(replyToken, text)
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

module.exports = router