CREATE TABLE ffa (
	date DATE NOT NULL,
   	winner TEXT NOT NULL,
	color_winner TEXT NOT NULL,
	loser TEXT NOT NULL,
	color_loser TEXT NOT NULL
);

CREATE TABLE saber_duel (
	date DATE NOT NULL,
   	winner TEXT NOT NULL,
	color_winner TEXT NOT NULL,
	loser TEXT NOT NULL,
	color_loser TEXT NOT NULL,
	health INTEGER NOT NULL,
	shield INTEGER NOT NULL
);

CREATE TABLE full_force_duel (
	date DATE NOT NULL,
   	winner TEXT NOT NULL,
	color_winner TEXT NOT NULL,
	loser TEXT NOT NULL,
	color_loser TEXT NOT NULL,
	health INTEGER NOT NULL,
	shield INTEGER NOT NULL
);

CREATE TABLE saber_ranking (
	date DATE NOT NULL,
   	player TEXT NOT NULL,
	color_player TEXT NOT NULL,
	elo INTEGER NOT NULL
);

CREATE TABLE full_force_ranking (
	date DATE NOT NULL,
   	player TEXT NOT NULL,
	color_player TEXT NOT NULL,
	elo INTEGER NOT NULL
);



--query para saber ratio

select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
select winner, count(winner) as win from ffa
group by winner)
join (
select loser, count(loser) as lose from ffa
group by loser) ON winner = loser
order by win DESC



SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT winner, color_winner, count(winner) as win from ffa
GROUP BY winner)
JOIN (
SELECT loser, color_loser, count(loser) AS lose FROM ffa
GROUP BY loser) ON winner = loser
WHERE win+lose >300
ORDER BY ratio DESC;


SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT winner, color_winner, count(winner) as win from saber_duel
GROUP BY winner)
JOIN (
SELECT loser, color_loser, count(loser) AS lose FROM saber_duel
GROUP BY loser) ON winner = loser
WHERE win+lose >100
ORDER BY ratio DESC;


SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT  winner, color_winner, count(winner) as win from full_force_duel
GROUP BY winner)
JOIN (
SELECT loser, color_loser, count(loser) AS lose FROM full_force_duel
GROUP BY loser) ON winner = loser
WHERE win+lose >100
ORDER BY ratio DESC;



SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT date, winner, color_winner, count(winner) as win from ffa
WHERE date > date('now','-1 month')
GROUP BY winner)
JOIN (
SELECT date, loser, color_loser, count(loser) AS lose FROM ffa
WHERE date > date('now','-1 month')
GROUP BY loser) ON winner = loser
WHERE win+lose >300
ORDER BY ratio DESC;

SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT date, winner, color_winner, count(winner) as win from saber_duel
WHERE date > date('now','-1 month')
GROUP BY winner)
JOIN (
SELECT date, loser, color_loser, count(loser) AS lose FROM saber_duel
WHERE date > date('now','-1 month')
GROUP BY loser) ON winner = loser
WHERE win+lose >50
ORDER BY ratio DESC;

SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT date, winner, color_winner, count(winner) as win from full_force_duel
WHERE date > date('now','-1 month')
GROUP BY winner)
JOIN (
SELECT date, loser, color_loser, count(loser) AS lose FROM full_force_duel
WHERE date > date('now','-1 month')
GROUP BY loser) ON winner = loser
WHERE win+lose >50
ORDER BY ratio DESC;

CREATE TABLE saber_ranking (
	last_duel DATE NOT NULL,
   	player TEXT NOT NULL,
	color_player TEXT NOT NULL,
	type TEXT NOT NULL,
	elo INTEGER NOT NULL
);

INSERT INTO saber_ranking VALUES ('2020-01-01','admin','admin','provisional',1200);

select max(last_duel) as max from saber_ranking;

select * from saber_duel where date > last_duel

--Verify existing player
SELECT player, type, elo FROM saber_ranking WHERE player = 'winner';
SELECT player, type, elo FROM saber_ranking WHERE player = 'loser';
--if winner exist
SELECT type FROM saber_ranking WHERE player = 'winner';
    --if type is provisional then
    select count(*) as count from saber_duel WHERE winner = '' AND lose = '' AND date < '';
        --if count = 0 then
        INSERT INTO saber_ranking values ('date','player','color_player','provisional',1200);
        --if count <0 And >20 then
        UPDATE saber_ranking SET lastduel = '', elo = elo+1500+400
        WHERE player = 'winner';
        UPDATE saber_ranking SET lastduel = '', elo = elo+1400-400
        WHERE player = 'loser';
        --else
        UPDATE saber_ranking SET lastduel = '',



select * from saber_ranking


SELECT max(date) as date, player,  elo FROM saber_ranking
Group by player
order by elo DESC;

SELECT max(date) as date, player,  elo FROM full_force_ranking
Group by player
order by elo DESC;



select *  from full_force_duel
select *  from full_force_ranking where player = 'Pension solidaria'

SELECT max(date) as date, player,  elo FROM saber_ranking
Group by player
order by elo DESC;

SELECT max(date) as date, player,  elo FROM full_force_ranking
Group by player
order by elo DESC;


SELECT date, winner, color_winner, loser, color_loser FROM full_force_duel ORDER BY date;

SELECT * FROM saber_ranking WHERE player = '»Corr Skirata«';

SELECT count(*) as count FROM full_force_ranking WHERE player = '*Cassus*' AND date < '2020-04-20 02:37:36'



SELECT winner, color_winner, win, lose,  win*1.0/(win+lose) AS ratio FROM (
SELECT winner, color_winner, count(winner) as win from ffa
GROUP BY winner)
JOIN (
SELECT loser, color_loser, count(loser) AS lose FROM ffa
GROUP BY loser) ON winner = loser
WHERE win+lose >300
ORDER BY ratio DESC;