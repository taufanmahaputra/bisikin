import express from 'express';
const router = express.Router();
import line from '../modules/line';

/* POST push message. */
router.post('/', (req, res) => {
  const userId = req.body.to;
  const text = req.body.text;

  line.client.pushMessage(userId, { type: 'text', text: text })
    .then(() => res.json({messsage: `Successfully sent the message to ${userId}`, status: 'OK', code: 5}))
    .catch(() => res.json({message: 'Cannot send the message', status: 'ERROR', code: 1}))

});

module.exports = router;
