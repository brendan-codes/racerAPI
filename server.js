let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');

let app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/RaceR');


let RaceSchema = new mongoose.Schema({
	startLat: String,
	startLong: String,
	endLat: String,
	endLong: String 
})

let Race = mongoose.model('Race', RaceSchema);


app.get('/races', function(req, res){
	console.log('YOU RACES!')
	res.json({message: "All races!"})
})

app.post('/new/race', function(req, res){



	console.log(req.body)

	res.json({message: "You added a race!"})
})

app.listen(8003, function(){
	console.log("App on 8003")
})


