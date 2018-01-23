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
	milesDistance: String,
	metersDistance: String,
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

	Race.find({}, function(err, results){
		if(err){
			console.log(err)
			res.json({err: "error!"})
		}else{
			res.json(results)
		}
	})
})

app.get('/testjson', function(req, res){



	var data = {
			    "success": {
			        "total": 1
			    },
			    "contents": {
			        "quotes": [
			            {
			                "quote": "Life is 10% what happens to us and 90% how we react to it.",
			                "length": "58",
			                "author": "Dennis P. Kimbro",
			                "tags": [
			                    "inspire",
			                    "life",
			                    "react"
			                ],
			                "category": "inspire",
			                "date": "2018-01-23",
			                "permalink": "https://theysaidso.com/quote/Rgr8XkxeCnH360fvmK5YIgeF/dennis-p-kimbro-life-is-10-what-happens-to-us-and-90-how-we-react-to-it",
			                "title": "Inspiring Quote of the day",
			                "background": "https://theysaidso.com/img/bgs/man_on_the_mountain.jpg",
			                "id": "Rgr8XkxeCnH360fvmK5YIgeF"
			            }
			        ],
			        "copyright": "2017-19 theysaidso.com"
			    }
			}
	res.json(data);
})

app.post('/new/race', function(req, res){
	console.log(req.body);
	let newRace = new Race(req.body)

	// random name here
	var randomCheese = names1[Math.floor(Math.random()*names1.length)];
	var randomRace = names2[Math.floor(Math.random()*names2.length)];

	let raceName = `The ${randomCheese} ${randomRace}`

	newRace.raceName = raceName;

	console.log(newRace);

	newRace.save(function(err){
		if(err){ 
			console.log(err);
			res.json({error: "error"})
		}else{ 
			res.json({message: "success!"})
		}
	})

})

app.listen(8003, function(){
	console.log("App on 8003")
})


