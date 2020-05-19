var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var app = express();

var db = new sqlite3.Database('/root/jkdata/db/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.use(express.static(__dirname + '/front'));

app.get('/API/stats-ffa', function (req, res, next) {
  var sql = `select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
    select winner, count(winner) as win from ffa
    group by winner)
    join (
    select loser, count(loser) as lose from ffa
    group by loser) ON winner = loser
    order by win DESC`;
  var params = []
  db.all(sql, function(err, rows) {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      console.log(rows);
      res.json({
        "message":"success",
        "data":rows
      })
  });
});

app.get('/API/stats-saber-duel', function (req, res, next) {
  var sql = `select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
    select winner, count(winner) as win from saber_duel
    group by winner)
    join (
    select loser, count(loser) as lose from saber_duel
    group by loser) ON winner = loser
    order by win DESC`;
  var params = []
  db.all(sql, function(err, rows) {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      console.log(rows);
      res.json({
        "message":"success",
        "data":rows
      })
  });
});

app.get('/API/stats-full-force-duel', function (req, res, next) {
  var sql = `select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
    select winner, count(winner) as win from full_force_duel
    group by winner)
    join (
    select loser, count(loser) as lose from full_force_duel
    group by loser) ON winner = loser
    order by win DESC`;
  var params = []
  db.all(sql, function(err, rows) {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      console.log(rows);
      res.json({
        "message":"success",
        "data":rows
      })
  });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});