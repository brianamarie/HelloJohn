var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require("fs");

var podcastSchema = mongoose.Schema({
  path: String,
  date: {
    type: Date,
    default: Date.now()
  },
  description: String
});

var podcastModel = mongoose.model("podcasts", podcastSchema, "podcasts");

router.get('/getFiles', function(req, res, next) {
  fs.readdir("./public/audio", function(err, files){
    if (err){
      console.error(err);
      res.redirect("/");
    } else {
      res.json(files);
    }
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin/action/:action/:data*', function(req, res, next){
  if (req.user){
    next();
  } else {
    next(new Error(401));
  }
},function(req,res,next){
  switch(req.params.action){
    case "update":
      console.log(data);

    break;
  };
});

router.get('/admin', function(req, res, next){
  console.log(req.user);
  if (req.user){
    next();
  } else {
    next(new Error(401));
  }
},function(req,res,next){
  res.render("admin");
});

router.get('/login', function(req, res, next){
  res.render("login");
});

module.exports = router;
