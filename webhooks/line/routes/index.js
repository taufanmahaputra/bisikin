import express from 'express';

const router = express.Router()

/* GET ping. */
router.get('/', (req, res) => {
  res.json({title: 'Bisikin - LINE Webhook', status: 'OK'});
});

module.exports = router;
