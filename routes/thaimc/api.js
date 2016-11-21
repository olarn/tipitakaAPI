var express = require('express');
var router = express.Router();
var fs = require("fs");
var file = "./data/thaimc.sqlite";
var exists = fs.existsSync(file);

/* GET example data. */
router.get('/', function(req, res, next) {

  if(!exists) {
    res.status(404).send("404 DB NOT FOUND.");
    return next;
  }
  
  var sqlite = require("sqlite3").verbose();
  var db = new sqlite.Database(file);
  var results = [];
  
  db.serialize(function() {
    db.each("SELECT * from main limit 1", function(err, row) {
      results.push({
        _id:row._id,
        volume:row.volume,
        page:row.page,
        items:row.items,
        header:row.header,
        footer:row.footer,
        display:row.display,
        content:row.content 
      });
    }, function() {
      db.close();
      res.json(results);
    });
  });
});

module.exports = router;
