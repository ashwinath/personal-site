var express        = require('express'),
    path           = require('path'),
    app            = express(),
    mainController = require('./controllers/main');

const PORT = process.env.PORT || 3000;

// Settings
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// ROUTES
app.use('/', mainController);

// BLOG REDIRECT
app.get('/blog', (req, res) => {
  res.redirect('https://blog.ashwinchat.com');
});

// Listener
app.listen(PORT, () => {
  console.log('Serving you on port ' + PORT);
});
