const fs = require('fs');
const http = require('http');
const https = require('https');
var express = require('express');
var app = express();
var cors = require('cors');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/skirata.pro/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/skirata.pro/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/skirata.pro/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const Database = require('better-sqlite3');

const db = new Database('/root/jkdata/db/data.db', { 
    //verbose: console.log 
});

// Use CORS FROM with Express
app.use(cors());

app.use(express.static(__dirname + './../front/dist/jedi-knight-league',{ dotfiles: 'allow' }));

app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))

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
  var sql = `select color_winner, elo, saber_exp FROM (
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
  var sql = `select color_winner, elo, ff_exp FROM (
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

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
