let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');

let app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect('mongodb://localhost/RaceR');


let RaceSchema = new mongoose.Schema({
	startLat: Number,
	startLong: Number,
	endLat: Number,
	endLong: Number 
})

let TimeSchema = new mongoose.Schema({
	_raceid: String
	startTime: String,
	endTime: String
})

let Race = mongoose.model('Race', RaceSchema);


app.get('/races', function(req, res){
	console.log('YOU RACES!')
	res.json({message: "All races!"})
})

app.post('/new/race', function(req, res){
	let newRace = new Race(req.body)
	console.log(newRace);

	newRace.save(function(err){
		if(err){ res.json({error: "error"})}
		else{ res.json({message: "success!"})}
	})

})

app.listen(8003, function(){
	console.log("App on 8003")
})


