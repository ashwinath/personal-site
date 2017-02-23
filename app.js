var express        = require('express'),
    app            = express(),
    mainController = require('./controllers/main')

const PORT = 3000;

// Settings
app.set('view engine', 'ejs');

// ROUTES
app.use('/', mainController);

// Listener
app.listen(PORT, () => {
  console.log('Serving you on port ' + PORT);
});
