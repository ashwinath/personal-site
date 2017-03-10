const express        = require('express'),
      router         = express.Router(),
      session        = require('express-session'),
      bodyParser     = require('body-parser'),
      flash          = require('connect-flash'),
      cookieParser   = require('cookie-parser'),
      {cookieSecret} = require('../credentials/credentials'),
      portfolio      = require('../data/portfolio'),
      EmailManager   = require('../mediators/EmailManager');

const FLASH_SUCCESS         = 'success',
      FLASH_SUCCESS_MESSAGE = 'Your message has been successfully sent!',
      FLASH_FAILURE         = 'failure',
      FLASH_FAILURE_MESSAGE = 'Your message was not sent! Please send me an email at ashwinath@hotmail.com';

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(cookieParser(cookieSecret));
router.use(bodyParser.json());
router.use(flash());
router.use(session({cookie: {maxAge: 60000}}))

// MAIN PAGE
router.get('/', (req, res) => {
  res.render('mainPage/index', { portfolio: portfolio, success: req.flash(FLASH_SUCCESS), failure: req.flash(FLASH_FAILURE) });
});

// CONTACT ME
router.post('/contact', (req, res) => {
  var contactObject = req.body.contact;
  var subject = '[WEBSITE]' + contactObject.name + ' has contacted you!';
  EmailManager.sendEmail(subject, contactObject, EmailManager.formatContactMe, (err, info) => {
    if(err) {
      console.log('Error sending email: ' + err);
      req.flash(FLASH_FAILURE, FLASH_FAILURE_MESSAGE);
    } else {
      console.log('Email sent successfully');
      req.flash(FLASH_SUCCESS, FLASH_SUCCESS_MESSAGE);
    }
    res.redirect('/');
  });
  // this indicator is to show that it has post successfully
});

module.exports = router;
