var express = require('express');
var router = express.Router();

/* GET ping. */
router.get('/', (req, res) => {
  res.json({title: 'Bisikin - LINE Webhook', status: 'OK'});
});

module.exports = router;
