var express = require('express'),
    router  = express.Router();

// MAIN PAGE
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
