import express from 'express';
const router = express.Router();
import line from '../modules/line';

/* POST webhook. */
router.post('/', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve({message: 'Wrong message registration type', status: 'ERROR', code: 2});
  }
  console.log(event)
  return line.client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'Successfully registered'
  });
}

module.exports = router;
