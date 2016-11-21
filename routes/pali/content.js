var express = require('express');
var router = express.Router();
var fs = require("fs");
var file = "./data/pali.sqlite";
var exists = fs.existsSync(file);


/* GET  /content?volume=01&page=0001  */

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
        "select * from main where volume = $v and page = $p", 
        {$v: req.param('volume'), $p: req.param('page')}, 
        function(err, row) {
          if (err) {
            console.log(err);
            res.status(500).send("INTERNAL ERROR");
            return next;
          } else {
            contents.push({
              _id:row._id,
              volume:row.volume,
              page:row.page,
              items:row.items,
              content:row.content
            })
          }
        }, function() {
          res.json(contents);                        
          db.close();
        });
      
  });
});

module.exports = router;
