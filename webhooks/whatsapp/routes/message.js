import express from 'express'
import whatsapp from '../modules/whatsapp'

const router = express.Router()

router.post('/', (req, res) => {
  const userId = req.body.to
  const text = req.body.text

  whatsapp.sendReplyMessage(userId, text)
    .then(() => res.json({message: `Successfully sent the message to ${userId}`, status: 'OK', code: 5}))
    .catch(() => res.json({message: 'Cannot send the message', status: 'ERROR', code: 1}))
})

module.exports = router