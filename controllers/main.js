var express    = require('express'),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    EmailManager = require('../mediators/EmailManager');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

// MAIN PAGE
router.get('/', (req, res) => {
  res.render('mainPage/index');
});

// CONTACT ME
router.post('/contact', (req, res) => {
  var contactObject = req.body.contact;
  var subject = '[WEBSITE]' + contactObject.name + ' has contacted you!';
  var success = EmailManager.sendEmail(subject, contactObject, EmailManager.formatContactMe);
  res.send("Success!")
});

module.exports = router;
