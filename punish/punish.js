const fs = require('fs');
const Database = require('better-sqlite3');

const db = new Database('/root/jkdata/db/data.db', { 
    //verbose: console.log 
});

punish();

function punish(){
    console.log("Start punish");
    var punishELO = 10;

    punishSaberELO(punishELO);
    punishFullForceELO(punishELO);
    console.log("End punish");
}

function getLeague(elo){
    let punishDay = '';
    if(elo <= 1199){
        punishDay = 30;
    }else if(elo >= 1200 && elo <= 1299){
        punishDay = 6;
    }else if(elo >= 1300 && elo <= 1399){
        punishDay = 5;
    }else if(elo >= 1400 && elo <= 1499){
        punishDay = 4;
    }else if(elo >= 1500){
        punishDay = 3;
    }
    return punishDay;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function punishSaberELO(punishELO){

    var now = new Date();
    now = formatDate(now);

    var stmt = db.prepare(`SELECT player, color_player, max(date), elo, (julianday('now')-julianday(max(date))) as rest
    FROM saber_ranking
    group by player
    HAVING  rest >= 3
    order by date desc;`);
    var rows = stmt.all();
    rows.forEach(function callback(value, index) {
        
        var player = value.player;
        var color_player = value.color_player;
        var elo = value.elo;
        var rest = value.rest;

        var punishDay = getLeague(elo);

        console.log('PLAYER: '+player);
        console.log('ELO: '+elo);
        console.log('rest: '+rest);
        console.log('punishDay: '+punishDay);
        console.log('punishELO: '+punishELO);
        console.log('date: '+now);

        var finalPunish = Math.round(((rest/punishDay)*punishELO));

        console.log('finalPunish: '+finalPunish);

        var stmt = db.prepare('INSERT INTO saber_ranking(date,player,color_player,elo) VALUES(?,?,?,?)');
        var info = stmt.run(now,player,color_player,elo-finalPunish);
        console.log(`PUNISH RANKED: DETECT winner ` +player+ ` with elo: ` +elo+ ` new punish elo: `+elo-finalPunish);
       
        
    });
}

function punishFullForceELO(punishELO){

    var now = new Date();
    now = formatDate(now);

    var stmt = db.prepare(`SELECT player, color_player, max(date), elo, (julianday('now')-julianday(max(date))) as rest
    FROM full_force_ranking
    group by player
    HAVING  rest >= 3
    order by date desc;`);
    var rows = stmt.all();
    rows.forEach(function callback(value, index) {
        
        var player = value.player;
        var color_player = value.color_player;
        var elo = value.elo;
        var rest = value.rest;

        var punishDay = getLeague(elo);

        console.log('PLAYER: '+player);
        console.log('ELO: '+elo);
        console.log('rest: '+rest);
        console.log('punishDay: '+punishDay);
        console.log('punishELO: '+punishELO);
        console.log('date: '+now);

        var finalPunish = Math.round(((rest/punishDay)*punishELO));

        console.log('finalPunish: '+finalPunish);

        var stmt = db.prepare('INSERT INTO full_force_ranking(date,player,color_player,elo) VALUES(?,?,?,?)');
        var info = stmt.run(now,player,color_player,elo-finalPunish);
        console.log(`PUNISH RANKED: DETECT winner ` +player+ ` with elo: ` +elo+ ` new punish elo: `+elo-finalPunish);
       
        
    });
}