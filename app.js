var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/download:podcastName', function(req, res, next){
  var podcastName = req.params.podcastName;
  res.download('/Users/Briana/WebstormProjects/HelloJohn/public/audio/' + podcastName, 'Moraccan_Mint_You_Bitch.mp3', function(err){
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
      console.error(err);
      res.redirect('/');
    } else {
      // decrement a download credit, etc.
    }
  });
});

app.use('/downloadMint', function(req, res, next){
  res.download('/Users/Briana/WebstormProjects/HelloJohn/public/audio/Moraccan_Mint_You_Bitch.mp3', 'Moraccan_Mint_You_Bitch.mp3', function(err){
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
      console.error(err);
      res.redirect('/');
    } else {
      // decrement a download credit, etc.
    }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});

module.exports = app;
