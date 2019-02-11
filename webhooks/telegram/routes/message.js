var express = require('express');
var router = express.Router();
var telegram = require('../modules/telegram');

/* POST push message. */
router.post('/', (req, res) => {
  const userId = req.body.to;
  const text = req.body.text;

  telegram.bot.sendMessage(userId, text, {parse_mode: 'markdown'})
    .then(() => res.json({messsage: `Successfully sent the message to ${userId}`, status: 'OK', code: 5}))
    .catch(() => res.json({message: 'Cannot send the message', status: 'ERROR', code: 1}))
});

module.exports = router;
