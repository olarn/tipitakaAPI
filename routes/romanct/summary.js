var express = require('express');
var router = express.Router();
var fs = require("fs");
var file = "./data/romanct.sqlite";
var exists = fs.existsSync(file);

/* GET total volumes  */
router.get('/totalVolumes', function(req, res, next) {
  if(!exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }
  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(file);

  db.serialize(function() {
    db.each("select count(distinct volume) as total_volumn from main", function(err, row) {
        res.json({message: row.total_volumn});                
      });    
    }, function() {
      db.close();
    });  
});

/* GET  /totalPages?volume=01  */

router.get('/totalPages', function(req, res, next) {
  
  if(!exists) {
    res.json({message:"404 DB NOT FOUND."});
    return next;
  }
  if (!req.param('volume')) {
    res.status(500).send('Wrong API format');
    return next;
  }
  
  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(file);
  db.serialize(function() {

      db.each("select count(page) as total_page from main where volume = $v", {$v: req.param('volume')}, function(err, row) {    
        if (err) {
          console.log(err);
          res.status(500).send("INTERNAL ERROR");
          return next;
        } else {
          res.json({totalPages: row.total_page});                        
        }
      }, function() {
        db.close();
      });
      
  });
});

module.exports = router;
