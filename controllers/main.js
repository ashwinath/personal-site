const express        = require('express'),
      bodyParser     = require('body-parser'),
      flash          = require('connect-flash'),
      cookieParser   = require('cookie-parser'),
      session        = require('express-session'),
      portfolio      = require('../data/portfolio'),
      workHistory    = require('../data/workHistory'),
      EmailManager   = require('../mediators/EmailManager'),
      {cookieSecret} = require('../credentials/credentials');

const router                      = express.Router(),
      FLASH_SUCCESS               = 'success',
      FLASH_SUCCESS_MESSAGE       = 'Your message has been successfully sent!',
      FLASH_FAILURE               = 'failure',
      FLASH_FAILURE_MESSAGE       = 'Your message was not sent! Please send me an email at ashwinath@hotmail.com',
      FLASH_FAILURE_EMPTY_MESSAGE = 'Please do not try to POST an empty message! Thank you.',
      GET_REQUEST_LOG             = 'Received GET request.';

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(cookieParser(cookieSecret));
router.use(bodyParser.json());
router.use(flash());
router.use(session({cookie: {maxAge: 60000}}))

// MAIN PAGE
router.get('/', (req, res) => {
  console.log(`[${new Date()}][${req.headers['user-agent']}] ${GET_REQUEST_LOG}`);
  res.render('mainPage/index', 
    { 
      portfolio: portfolio, 
      success: req.flash(FLASH_SUCCESS), 
      failure: req.flash(FLASH_FAILURE),
      workHistoryList: workHistory
    }
  );
});

// CONTACT ME
router.post('/contact', (req, res) => {
  var contactObject = req.body.contact;
  console.log(contactObject);
  if(contactObject.message && contactObject.name && contactObject.email) {
    var subject = '[WEBSITE]' + contactObject.name + ' has contacted you!';
    EmailManager.sendEmail(subject,
                           contactObject, 
                           EmailManager.formatContactMe, 
                           (err, info) => {
      if(err) {
        console.log('Error sending email: ' + err);
        req.flash(FLASH_FAILURE, FLASH_FAILURE_MESSAGE);
      } else {
        console.log('Email sent successfully');
        req.flash(FLASH_SUCCESS, FLASH_SUCCESS_MESSAGE);
      }
      res.redirect('/');
    });
  } else {
    // Some naughty person tried to post an empty message.
    req.flash(FLASH_FAILURE, FLASH_FAILURE_EMPTY_MESSAGE);
    res.redirect('/');
  }
});

module.exports = router;
