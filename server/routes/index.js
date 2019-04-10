var express = require('express');
var router = express.Router();

/* GET Index. */
router.get('/', function(req, res) {
  res.json({title: 'Bisikin - API Service', status: 'OK'});
});

module.exports = router;
