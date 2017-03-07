var express      = require('express'),
    session      = require('express-session'),
    router       = express.Router(),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    portfolio    = require('../data/portfolio'),
    flash        = require('connect-flash'),
    EmailManager = require('../mediators/EmailManager');

const FLASH_SUCCESS         = 'success',
      FLASH_SUCCESS_MESSAGE = 'Your message has been successfully sent!';

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(cookieParser('secret'));
router.use(bodyParser.json());
router.use(flash());
router.use(session({cookie: {maxAge: 60000}}))

// MAIN PAGE
router.get('/', (req, res) => {
  res.render('mainPage/index', { portfolio: portfolio, success: req.flash(FLASH_SUCCESS) });
});

// CONTACT ME
router.post('/contact', (req, res) => {
  var contactObject = req.body.contact;
  var subject = '[WEBSITE]' + contactObject.name + ' has contacted you!';
  var success = EmailManager.sendEmail(subject, contactObject, EmailManager.formatContactMe)
  // this indicator is to show that it has post successfully
  req.flash(FLASH_SUCCESS, FLASH_SUCCESS_MESSAGE);
  res.redirect('/');
});

module.exports = router;
