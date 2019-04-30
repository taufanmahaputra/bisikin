import express from 'express'

const router = express.Router()

/* GET ping. */
router.get('/', function(req, res) {
  res.json({ title: 'Bisikin - Whatsapp Webhook', status: 'OK' })
})

module.exports = router
