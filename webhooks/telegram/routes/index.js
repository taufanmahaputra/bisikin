require('dotenv').config()

var express = require('express');
var router = express.Router();
var telegram = require('../modules/telegram')

/* GET ping. */
router.get('/', (req, res) => {
  res.json({title: 'Bisikin - Telegram Webhook', status: 'OK'});
});

router.post(`/bot${telegram.TOKEN}`, (req, res) => {
  telegram.bot.processUpdate(req.body);
  res.sendStatus(200);
});

module.exports = router;
