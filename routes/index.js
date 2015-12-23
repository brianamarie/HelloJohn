var express = require('express');
var router = express.Router();

var fs = require("fs");

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

module.exports = router;
