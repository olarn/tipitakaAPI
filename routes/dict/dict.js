var express = require('express');
var router = express.Router();
var fs = require("fs");

var thai_file =      "./dict/thaidict.sqlite";
var pali_thai_file = "./dict/pali_thai.sqlite";
var eng_file =       "./dict/engdict.sqlite";

/* GET Thai Translation. */

router.get('/thai2thai/:search', function(req, res, next) {

  var thai_exists = fs.existsSync(thai_file);
  if(!thai_exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }

  if (!req.param('search')) {
    res.status(500).send("WRONG API");
    return next;
  }

  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(thai_file);
  var contents = [];

  db.serialize(function() {

      db.each(
        "select head, translation from thai where head like $search order by head", 
        {$search: '%' + req.param('search') + '%'}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              head:row.head,
              translation:row.translation
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
  });

  /* GET Pali to Thai Translation. */

  router.get('/pali2thai/:search', function(req, res, next) {

  var pali_exists = fs.existsSync(pali_thai_file);
  if(!pali_exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }

  if (!req.param('search')) {
    res.status(500).send("WRONG API");
    return next;
  }

  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(pali_thai_file);
  var contents = [];

  db.serialize(function() {

      db.each(
        "select head, translation from pali_thai where head like $search order by head", 
        {$search: '%' + req.param('search') + '%'}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              head:row.head,
              translation:row.translation
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
});

  /* GET Thai to Pali Translation. */

router.get('/thai2pali/:search', function(req, res, next) {

  var pali_exists = fs.existsSync(pali_thai_file);
  if(!pali_exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }

  if (!req.param('search')) {
    res.status(500).send("WRONG API");
    return next;
  }

  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(pali_thai_file);
  var contents = [];

  db.serialize(function() {

      db.each(
        "select head, translation from pali_thai where translation like $search order by head", 
        {$search: '%' + req.param('search') + '%'}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              head:row.head,
              translation:row.translation
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
});

  /* GET Pali to Eng Translation. */

router.get('/pali2eng/:search', function(req, res, next) {

  var eng_exists = fs.existsSync(eng_file);

  if(!eng_exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }

  if (!req.param('search')) {
    res.status(500).send("WRONG API");
    return next;
  }

  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(eng_file);
  var contents = [];

  db.serialize(function() {

      db.each(
        "select head, translation from english where head like $search order by head", 
        {$search: '%' + req.param('search') + '%'}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              head:row.head,
              translation:row.translation
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
});

/* GET Eng to bali Translation. */

router.get('/eng2pali/:search', function(req, res, next) {

  var eng_exists = fs.existsSync(eng_file);

  if(!eng_exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }

  if (!req.param('search')) {
    res.status(500).send("WRONG API");
    return next;
  }

  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(eng_file);
  var contents = [];

  db.serialize(function() {

      db.each(
        "select head, translation from english where translation like $search order by head", 
        {$search: '%' + req.param('search') + '%'}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              head:row.head,
              translation:row.translation
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
});

module.exports = router;