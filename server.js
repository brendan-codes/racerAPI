let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');

let app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect('mongodb://localhost/RaceR1');


let RaceSchema = new mongoose.Schema({
	raceName: String,
	milesDistance: Number,
	metersDistance: Number,
	startLat: Number,
	startLong: Number,
	endLat: Number,
	endLong: Number 
})

let TimeSchema = new mongoose.Schema({
	_raceid: String,
	startTime: String,
	endTime: String
})

let names1 = ["Roquefort", "Havarti", "Provolone", "Gruyere", "Emmentaler", "Monterey Jack", "Brie", "Mozzarella", "Camembert", "Manchego", "Muenster", "Colby", "Asiago", "Cotija", "Ricotta"]
let names2 = ["Run", "Gauntlet", "Dash", "Gambit", "Speedway", "Bend", "Corridor", "Derby", "Circuit", "Turnpike", "Route", "Way", "Ascent", "Exodus", "Trek", "Expedition"]

let Race = mongoose.model('Race', RaceSchema);


app.get('/races', function(req, res){
	console.log('YOU RACES!')
	res.json({message: "All races!"})
})

app.post('/new/race', function(req, res){
	let newRace = new Race(req.body)
	console.log(newRace);

	// random name here
	var randomCheese = names1[Math.floor(Math.random()*names1.length)];
	var randomRace = names2[Math.floor(Math.random()*names2.length)];

	let raceName = "The ${randomCheese} ${randomRace}"

	newRace.save(function(err){
		if(err){ res.json({error: "error"})}
		else{ res.json({message: "success!"})}
	})

})

app.listen(8003, function(){
	console.log("App on 8003")
})


