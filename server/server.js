const fs = require('fs');
const readline = require('readline');
const EloRating = require('elo-rating');
const Database = require('better-sqlite3');

const db = new Database('/root/jkdata/db/data.db', { 
    //verbose: console.log 
});


async function processLineByLine() {
    const readOptions = { 'flags': 'r'
    , 'encoding': 'latin1'
    , 'mode': 0666
    , 'bufferSize': 4 * 1024
    };
    const input = fs.createReadStream('/root/.local/share/openjk/japlus/games.log',readOptions);

    const rl = readline.createInterface({
      input: input,
      crlfDelay: Infinity
    });
    

    for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
        var kill = line.includes("Kill:");
        var duel = line.includes("DUEL END:");
        
        if(kill){
            processFFAKill(line);
        }
        if(duel){
            processDuel(line);
        }
    }

    console.log("Finish ReadLog and insert!");
    fs.writeFile('/root/.local/share/openjk/japlus/games.log', '', function(){console.log('Log Deleted')});
    insertSaberRanked();
    insertFullForceRanked();
  
};

processLineByLine();

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
            //Add battle to saber_duel
            const stmt = db.prepare('INSERT INTO saber_duel(date,winner,color_winner,loser,color_loser,health,shield) VALUES(?,?,?,?,?,?,?);');
            const info = stmt.run(date,winner,color_winner,loser,color_loser,health,shield);
            console.log(`SABER DUEL: Battle inserted with winner: ` +winner+ ` and loser: ` +loser);    
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
            //Add battle to full_force_duel
            const stmt = db.prepare('INSERT INTO full_force_duel(date,winner,color_winner,loser,color_loser,health,shield) VALUES(?,?,?,?,?,?,?);');
            const info = stmt.run(date,winner,color_winner,loser,color_loser,health,shield);
            console.log(`FULL FORCE DUEL: Battle inserted with winner: ` +winner+ ` and loser: ` +loser);    
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
        //Add battle to ffa
        const stmt = db.prepare('INSERT INTO ffa(date,winner,color_winner,loser,color_loser) VALUES(?,?,?,?,?);');
        const info = stmt.run(date,winner,color_winner,loser,color_loser);
        console.log(`FFA: Kill inserted with winner: ` +winner+ ` and loser: ` +loser);    
    }
}

function isValid(winner,loser){
    var valid = true;

    if (typeof winner !== 'undefined'){
        if(winner.includes("Padawan")){
            valid = false;
        }
        if(winner.includes("<world>")){
            valid = false;
        }
        if(winner == "" || winner == " " || winner == "  "){
            valid = false;
        }
    }else{
        valid = false;
    }

    if (typeof loser !== 'undefined'){
        if(loser.includes("Padawan")){
            valid = false;
        }
        if(loser.includes("<world>")){
            valid = false;
        }
        if(loser == "" || loser == " " || loser == "  "){
            valid = false;
        }
    }else{
        valid = false;
    }

    return valid;
}

function insertSaberRanked(){
    //Check if winner exist
    console.log("Start saber ranked insertion");

    //get the max date from saber ranking -------------------------------------
    var stmt = db.prepare('SELECT max(date) as max from saber_ranking;');
    var row = stmt.get();
    var max = row.max;

    var stmt = db.prepare('SELECT date, winner, color_winner, loser, color_loser FROM saber_duel WHERE date > ? ORDER BY date;');
    var rows = stmt.all(max);
    rows.forEach(function callback(value, index) {
        var date = value.date;
        var winner = value.winner;
        var color_winner = value.color_winner;
        var loser = value.loser;
        var color_loser = value.color_loser;
    
        var winner_elo = 1200;
        var loser_elo = 1200;
        var winner_exist = false;
        var loser_exist = false
        var winner_count = 0;
        var loser_count = 0;
    
        //check if winner exist ------------------------------------
        var stmt = db.prepare('SELECT count(*) as count FROM saber_ranking WHERE player = ? AND date < ?;');
        var row = stmt.get(winner,date);
        if(row.count > 0){ 
            winner_exist = true;
        }
        //----------------------------------------------------------

        //check if loser exist -------------------------------------
        var stmt = db.prepare('SELECT count(*) as count FROM saber_ranking WHERE player = ? AND date < ?;');
        var row = stmt.get(loser,date);
        if(row.count > 0){ 
            loser_exist = true;
        }
        //-----------------------------------------------------------

        //Winner is apt - have more than 10 duels? ---------------------------------
        if(winner_exist){
            var stmt = db.prepare('SELECT count(*) as count FROM saber_duel where date < ? AND (winner = ? OR loser = ?);');
            var row = stmt.get(date, winner, winner);
            winner_count = row.count;
        }
        //-----------------------------------------------------------

        //Loser is apt - have more than 10 duels? ---------------------------------
        if(loser_exist){
            var stmt = db.prepare('SELECT count(*) as count FROM saber_duel where date < ? AND (winner = ? OR loser = ?);');
            var row = stmt.get(date, loser, loser);
            loser_count = row.count;
        }
        //-----------------------------------------------------------

        //Get last winner duel ELO ---------------------------------
        if(winner_count >=10){
            var stmt = db.prepare('SELECT max(date), elo FROM saber_ranking WHERE player = ?;');
            var row = stmt.get(winner);
            winner_elo = row.elo;
        }
        //-----------------------------------------------------------

        //Get last loser duel ELO ---------------------------------
        if(loser_count >=10){
            var stmt = db.prepare('SELECT max(date), elo FROM saber_ranking WHERE player = ?;');
            var row = stmt.get(loser);
            loser_elo = row.elo;
        }

        var difference =  EloRating.ratingDifference(winner_elo, loser_elo); 
        var factorK = 20;

        if(Math.abs(difference) <= 150 ) {
            factorK = 24;
        }else{
            factorK = 8;
        }

        var result = EloRating.calculate(winner_elo, loser_elo, true, factorK);
        var new_winner_elo = result.playerRating;
        var new_loser_elo = result.opponentRating;

        var stmt = db.prepare('INSERT INTO saber_ranking(date,player,color_player,elo) VALUES(?,?,?,?)');
        var info = stmt.run(date,winner,color_winner,new_winner_elo);
        console.log("Winner exist: "+winner_exist);
        console.log(`RANKED: DETECT winner ` +winner+ ` with elo: ` +winner_elo);
        console.log(`RANKED: INSERT winner ` +winner+ ` with elo: ` +new_winner_elo);
        
        
        var stmt = db.prepare('INSERT INTO saber_ranking(date,player,color_player,elo) VALUES(?,?,?,?)');
        var info = stmt.run(date,loser,color_loser,new_loser_elo);
        console.log("Loser exist: "+loser_exist);
        console.log(`RANKED: DETECT loser ` +loser+ ` with elo: ` +loser_elo);
        console.log(`RANKED: INSERT loser ` +loser+ ` with elo: ` +new_loser_elo);
       
        
    });
    console.log("Finish saber ranked insertion");
}

function insertFullForceRanked(){
    //Check if winner exist
    console.log("Start full force ranked insertion");

    //get the max date from saber ranking -------------------------------------
    var stmt = db.prepare('SELECT max(date) as max from full_force_ranking;');
    var row = stmt.get();
    var max = row.max;

    var stmt = db.prepare('SELECT date, winner, color_winner, loser, color_loser FROM full_force_duel WHERE date > ? ORDER BY date;');
    var rows = stmt.all(max);
    rows.forEach(function callback(value, index) {
        var date = value.date;
        var winner = value.winner;
        var color_winner = value.color_winner;
        var loser = value.loser;
        var color_loser = value.color_loser;
    
        var winner_elo = 1200;
        var loser_elo = 1200;
        var winner_exist = false;
        var loser_exist = false
        var winner_count = 0;
        var loser_count = 0;
    
    
        //check if winner exist ------------------------------------
        var stmt = db.prepare('SELECT count(*) as count FROM full_force_ranking WHERE player = ? AND date < ?;');
        var row = stmt.get(winner,date);
        if(row.count > 0){ 
            winner_exist = true;
        }
        //----------------------------------------------------------

        //check if loser exist -------------------------------------
        var stmt = db.prepare('SELECT count(*) as count FROM full_force_ranking WHERE player = ? AND date < ?;');
        var row = stmt.get(loser,date);
        if(row.count > 0){ 
            loser_exist = true;
        }
        //-----------------------------------------------------------

        //Winner is apt - have more than 10 duels? ---------------------------------
        if(winner_exist){
            var stmt = db.prepare('SELECT count(*) as count FROM full_force_duel where date < ? AND (winner = ? OR loser = ?)');
            var row = stmt.get(date, winner, winner);
            winner_count = row.count;
        }
        //-----------------------------------------------------------

        //Loser is apt - have more than 10 duels? ---------------------------------
        if(loser_exist){
            var stmt = db.prepare('SELECT count(*) as count FROM full_force_duel where date < ? AND (winner = ? OR loser = ?)');
            var row = stmt.get(date, loser, loser);
            loser_count = row.count;
        }
        //-----------------------------------------------------------

        //Get last winner duel ELO ---------------------------------
        if(winner_count >=10){
            var stmt = db.prepare('SELECT max(date), elo FROM full_force_ranking WHERE player = ?;');
            var row = stmt.get(winner);
            winner_elo = row.elo;
        }
        //-----------------------------------------------------------

        //Get last loser duel ELO ---------------------------------
        if(loser_count >=10){
            var stmt = db.prepare('SELECT max(date), elo FROM full_force_ranking WHERE player = ?;');
            var row = stmt.get(loser);
            loser_elo = row.elo;
        }
        //-----------------------------------------------------------

        var difference =  EloRating.ratingDifference(winner_elo, loser_elo); 
        var factorK = 20;

        if(Math.abs(difference) <= 150 ) {
            factorK = 24;
        }else{
            factorK = 8;
        }

        var result = EloRating.calculate(winner_elo, loser_elo, true, factorK);
        var new_winner_elo = result.playerRating;
        var new_loser_elo = result.opponentRating;

        var stmt = db.prepare('INSERT INTO full_force_ranking(date,player,color_player,elo) VALUES(?,?,?,?)');
        var info = stmt.run(date,winner,color_winner,new_winner_elo);
        console.log("Winner exist: "+winner_exist);
        console.log(`RANKED: DETECT winner ` +winner+ ` with elo: ` +winner_elo);
        console.log(`RANKED: INSERT winner ` +winner+ ` with elo: ` +new_winner_elo);
    
    
        var stmt = db.prepare('INSERT INTO full_force_ranking(date,player,color_player,elo) VALUES(?,?,?,?)');
        var info = stmt.run(date,loser,color_loser,new_loser_elo);
        console.log("Loser exist: "+loser_exist);
        console.log(`RANKED: DETECT loser ` +loser+ ` with elo: ` +loser_elo);
        console.log(`RANKED: INSERT loser ` +loser+ ` with elo: ` +new_loser_elo);
        
        

    });
    console.log("Finish full force ranked insertion");
}




