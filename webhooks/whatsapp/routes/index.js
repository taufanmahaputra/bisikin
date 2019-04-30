var express = require('express');
var router = express.Router();

const accountSid = 'AC0c97d33ee4a3329441c18542958d70fc';
const authToken = 'f11f16e4f43736beb6ba218ce91f1686';
const client = require('twilio')(accountSid, authToken);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body)

  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: 'Hello there!',
      to: req.body.From
    })
    .then(message => console.log(message));

  res.json('')
});

module.exports = router;
