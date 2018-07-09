var express = require('express');
var router = express.Router();
var database = require('./transaction.js');
//const summay = require('../dataProcess/summary.js');

router.post("/load", (req, res, next) => {
  const db = new database(req.body.uid);
  var name = req.body.name;
  db.load(name, function(data) {
    res.send({
      data: summay(data)
    });
  });

});

router.post("/save", (req, res, next) => {
  var name = req.body.name;
  var uid = req.body.uid;
  const db = new database(uid);
  db.load('tmp', function(data){
    db.save(data, name, function () {
      res.send('Save success');
    });
  });
});


router.post('/list', (req, res, next) => {
  var uid = req.body.uid;
  const db = new database(uid);

  db.list(function (saveList) {
    res.send({
      data: saveList
    });
  });
});

router.post('/sessionOut', (req, res, next) => {
  var uid = req.body.uid;
  const db = new database(uid);
  db.delete('tmp');
  res.send('s')
});

module.exports = router;