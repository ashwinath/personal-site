var express = require('express'),
    router  = express.Router();

// MAIN PAGE
router.get('/', (req, res) => {
  res.render('mainPage/index');
});

module.exports = router;
