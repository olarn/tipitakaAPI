var express = require('express');
var router = express.Router();
var fs = require("fs");
var file = "./data/thaibt.sqlite";
var exists = fs.existsSync(file);


/* GET  /content?volume=1&page=1  */

router.get('/', function(req, res, next) {
  
  if(!exists) {
    res.json({message:"404 DB NOT FOUND."});
    return next;
  }
  if (!req.param('volume') || !req.param('page')) {
    res.status(500).send('Wrong API format');
    return next;
  }
  
  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(file);
  var contents = [];
  
  db.serialize(function() {

      db.each(
        "select * from speech where book = $v and page = $p", 
        {$v: req.param('volume'), $p: req.param('page')}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              volume:row.book,
              page:row.page,
              title:row.title,
              content: row.content 
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
});

module.exports = router;
