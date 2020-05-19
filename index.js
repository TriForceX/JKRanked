const fs = require('fs');
const readline = require('readline');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/root/jkdata/db/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

var readOptions = { 'flags': 'r'
  , 'encoding': 'latin1'
  , 'mode': 0666
  , 'bufferSize': 4 * 1024
  };

const readInterface = readline.createInterface({
    input: fs.createReadStream('/root/.local/share/openjk/japlus/games.log',readOptions),
    //output: process.stdout,
    console: false
});

readInterface.on('line', function(line, callback) {
    var kill = line.includes("Kill:");
    var duel = line.includes("DUEL END:");
    if(kill){
        processFFAKill(line);
    }
    if(duel){
        processDuel(line);
    }
    
});

function processDuel(line){
    var full_force_duel = line.includes("FULL FORCE DUEL END:");
    if(full_force_duel){
        processFullForceDuel(line);
    }else{
        processSaberDuel(line);
    }

    
}

function processSaberDuel(line){
    var date = line.slice(0, 19);
    date = date.replace("- ","-0").replace("- ","-0").replace("  "," 0").replace(": ",":0").replace(": ",":0").replace(": ",":0");
    
    var non_date = line.slice(37, 500);
    
    var none_score = non_date.replace(/.+:/,"");
    
    var none_left_for = none_score.replace(" left for winner","");
    var player_health_shield = none_left_for.split("! ==>  ");
    var players = player_health_shield[0];
    var health_shield = player_health_shield[1];

    var player = players.split(" @@@PLDUELWINNER ");
    if (typeof player[0] !== 'undefined'){
        var color_winner = player[0].trim();
        var winner = color_winner.replace(/\^\d/g,"");
    }
    if (typeof player[1] !== 'undefined'){
        var color_loser = player[1].trim();
        var loser = color_loser.replace(/\^\d/g,"");
    }

    if (typeof health_shield !== 'undefined'){
        health_shield = health_shield.replace("^5","").replace("^5","").replace(" ^7Health","").replace(" ^7Armor","");
        health_shield = health_shield.split(" ");

        if (typeof health_shield[0] !== 'undefined'){
            var health = health_shield[0].trim();
        }
        if (typeof health_shield[1] !== 'undefined'){
            var shield = health_shield[1].trim();
        }

        valid = isValid(winner,loser);

        if(valid){
            var query = `INSERT INTO saber_duel(date,winner,color_winner,loser,color_loser,health,shield) VALUES(?,?,?,?,?,?,?)`;
            db.run(query, [date,winner,color_winner,loser,color_loser,health,shield], function(err) {
                if (err) {
                return console.log(err.message);
                }
                console.log(`A row has been inserted with winner: ` +winner );
            });
        }
    }
}

function processFullForceDuel(line){
    var date = line.slice(0, 19);
    date = date.replace("- ","-0").replace("- ","-0").replace("  "," 0").replace(": ",":0").replace(": ",":0").replace(": ",":0");
    
    var non_date = line.slice(48, 500);
    
    var none_score = non_date.replace(/.+:/,"");
    
    var none_left_for = none_score.replace(" left for winner","");
    var player_health_shield = none_left_for.split("! ==>  ");
    var players = player_health_shield[0];
    var health_shield = player_health_shield[1];

    var player = players.split(" @@@PLDUELWINNER ");
    if (typeof player[0] !== 'undefined'){
        var color_winner = player[0].trim();
        var winner = color_winner.replace(/\^\d/g,"");
    }
    if (typeof player[1] !== 'undefined'){
        var color_loser = player[1].trim();
        var loser = color_loser.replace(/\^\d/g,"");
    }

    if (typeof health_shield !== 'undefined'){
        health_shield = health_shield.replace("^5","").replace("^5","").replace(" ^7Health","").replace(" ^7Armor","");
        health_shield = health_shield.split(" ");

        if (typeof health_shield[0] !== 'undefined'){
            var health = health_shield[0].trim();
        }
        if (typeof health_shield[1] !== 'undefined'){
            var shield = health_shield[1].trim();
        }

        valid = isValid(winner,loser);

        if(valid){
            var query = `INSERT INTO full_force_duel(date,winner,color_winner,loser,color_loser,health,shield) VALUES(?,?,?,?,?,?,?)`;
            db.run(query, [date,winner,color_winner,loser,color_loser,health,shield], function(err) {
                if (err) {
                return console.log(err.message);
                }
                console.log(`A row has been inserted with winner: ` +winner );
            });
        }
    }
}

function processFFAKill(line){
    var date = line.slice(0, 19);
    date = date.replace("- ","-0").replace("- ","-0").replace("  "," 0").replace(": ",":0").replace(": ",":0").replace(": ",":0");
    
    var non_date = line.slice(33, 500);
    
    var none_score = non_date.replace(/.+:/,"");
    
    var none_by_mod = none_score.replace(/by\s\w+/,"");
    var player = none_by_mod.split(" killed ");
    if (typeof player[0] !== 'undefined'){
        var color_winner = player[0].trim();
        var winner = color_winner.replace(/\^\d/g,"");
    }
    if (typeof player[1] !== 'undefined'){
        var color_loser = player[1].trim();
        var loser = color_loser.replace(/\^\d/g,"");
    }

    valid = isValid(winner,loser);

    if(valid){
        var query = `INSERT INTO ffa(date,winner,color_winner,loser,color_loser) VALUES(?,?,?,?,?)`;
        db.run(query, [date,winner,color_winner,loser,color_loser], function(err) {
            if (err) {
            return console.log(err.message);
            }
            console.log(`A row has been inserted with winner: ` +winner );
        });
    }
}

function isValid(winner,loser){
    var valid = true;
    if(winner.includes("Padawan")){
        valid = false;
    }
    if(winner.includes("<world>")){
        valid = false;
    }
    if(loser == "" || loser == " "){
        valid = false;
    }
    return valid;
}

function cleanLog(){
    fs.writeFile('/root/.local/share/openjk/japlus/games.log', '', function(){console.log('Log Deleted')});
}

setTimeout(cleanLog, 500);
