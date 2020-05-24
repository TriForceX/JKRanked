var express = require('express');
var app = express();

const Database = require('better-sqlite3');

const db = new Database('/root/jkdata/db/data.db', { 
    //verbose: console.log 
});


app.use(express.static(__dirname + '/front'));

app.get('/API/stats-ffa', function (req, res, next) {
  var sql = `SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
    SELECT winner, color_winner, count(winner) as win from ffa
    GROUP BY winner)
    JOIN (
    SELECT loser, color_loser, count(loser) AS lose FROM ffa
    GROUP BY loser) ON winner = loser
    WHERE win+lose >300
    ORDER BY ratio DESC`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

app.get('/API/stats-saber-duel', function (req, res, next) {
  var sql = `select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
    select winner, count(winner) as win from saber_duel
    group by winner)
    join (
    select loser, count(loser) as lose from saber_duel
    group by loser) ON winner = loser
    order by win DESC;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

app.get('/API/stats-full-force-duel', function (req, res, next) {
  var sql = `select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
    select winner, count(winner) as win from full_force_duel
    group by winner)
    join (
    select loser, count(loser) as lose from full_force_duel
    group by loser) ON winner = loser
    order by win DESC;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

app.get('/API/saber_ELO', function (req, res, next) {
  var sql = `SELECT max(date) as date, player, elo FROM saber_ranking
  Group by player
  order by elo DESC;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

app.get('/API/full_force_ELO', function (req, res, next) {
  var sql = `SELECT max(date) as date, player, elo FROM full_force_ranking
  Group by player
  order by elo DESC;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

//Lamer of the week
app.get('/API/lofw', function (req, res, next) {
  var sql = `SELECT color_winner, count(winner) as win from ffa
  where date > datetime('now', 'start of day', 'weekday 1', '-7 day')
  GROUP BY winner
  ORDER BY win desc
  LIMIT 1;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

//Noob of the week
app.get('/API/notw', function (req, res, next) {
  var sql = `SELECT color_loser, count(loser) as lose from ffa
  where date > datetime('now', 'start of day', 'weekday 1', '-7 day')
  GROUP BY loser
  ORDER BY lose desc
  LIMIT 1;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

//saber ELO level
app.get('/API/saber_elo_level', function (req, res, next) {
  var sql = `select player, elo, saber_exp FROM (
    SELECT winner, color_winner, win+lose wl, (win*40)+(lose*10) as saber_exp FROM (
    SELECT winner, color_winner, count(winner) as win from saber_duel
    GROUP BY winner)
    JOIN (
    SELECT loser, color_loser, count(loser) AS lose FROM saber_duel
    GROUP BY loser) ON winner = loser)
  JOIN
    (SELECT max(date) as date, player, elo FROM saber_ranking
  Group by player) on winner = player
  ORDER BY elo DESC;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

//FF ELO level
app.get('/API/ff_elo_level', function (req, res, next) {
  var sql = `select player, elo, ff_exp FROM (
    SELECT winner, color_winner, win+lose wl, (win*40)+(lose*10) as ff_exp FROM (
    SELECT winner, color_winner, count(winner) as win from full_force_duel
    GROUP BY winner)
    JOIN (
    SELECT loser, color_loser, count(loser) AS lose FROM full_force_duel
    GROUP BY loser) ON winner = loser)
  JOIN
    (SELECT max(date) as date, player, elo FROM full_force_ranking
  Group by player) on winner = player
  ORDER BY elo DESC;`;
  var stmt = db.prepare(sql);
  var data = stmt.all();
  
  res.json({
    "message":"success",
    "data":data
  })
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});