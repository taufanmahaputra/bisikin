import Config from '../config'
import * as telegram from '../modules/telegram'

const express = require('express');
const router = express.Router();

/* GET ping. */
router.get('/', (req, res) => {
  res.json({title: 'Bisikin - Telegram Webhook', status: 'OK'});
});

router.post(`/bot${Config.telegram.token}`, (req, res) => {
  telegram.bot.processUpdate(req.body);
  res.sendStatus(200);
});

module.exports = router;
