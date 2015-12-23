var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');

mongoose.connect("mongodb://control:whatever@ds061464.mongolab.com:61464/podcasts");
mongoose.connection.on('error', function () {
  console.error(
      'MongoDB Connection Error. Please make sure that MongoDB is running.'
  );
});

var usersSchema = mongoose.Schema({
  "username": String,
  "password": String
});

usersSchema.methods.comparePassword = function(user, candidatePassword, cb){
  //bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
  //  if (err) { return cb(err); }
  //  cb(null, isMatch);
  //});
  if (user.password === candidatePassword){
    cb(null, true);
  } else {
    cb("not a match");
  }
};

var usersModel = mongoose.model('users', usersSchema, 'users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');

app.use(session({
  secret: "nodots",
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));


passport.use(new LocalStrategy({ usernameField: 'username', passwordField : 'password' }, function(username, password, done) {
  usersModel.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) return done(null, false, { message: 'username ' + username + ' not found'});
    usersSchema.methods.comparePassword(user, password, function(err, isMatch) {
      if (isMatch) {
        return done(user, null);
      } else {
        return done(false, null, { message: 'Invalid password.' });
      }
    });
  });
}));

var routes = require('./routes/index');
var users = require('./routes/users');

passport.use(new LocalStrategy(
    function(username, password, done) {
      userModel.findOne({ username: username }, function(err, user) {
        if (err) {
          console.error(err);
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/users', users);

app.use('/download/:podcastName', function(req, res, next){
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

app.post('/login', function(req, res, next) {
  var returnTo = req.params.returnTo;
  passport.authenticate('local', function(user, err, info) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log('errors', { msg: info.message });
      res.redirect('/login');
    }
    else {
      req.logIn(user, function (err) {
        if (err) {
          console.error(err);
          return next(err);
        }
        res.redirect('/');
      });
    }
  })(req, res, next);
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



var listener = app.listen(3001, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});

module.exports = app;
