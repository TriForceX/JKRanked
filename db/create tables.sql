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



--query para saber ratio

select winner, loser, win, lose,  win*1.0/(win+lose) as ratio from (
select winner, count(winner) as win from ffa
group by winner)
join (
select loser, count(loser) as lose from ffa
group by loser) ON winner = loser
order by win DESC