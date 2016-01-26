var express = require("express");
var config = require('./config');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get("/binich", function (req, res) {
	res.send(JSON.stringify({'binich':'ja'}))
})

app.listen(3001, function () {
	console.log("Bananae listening on port 3001")
	console.log("who: " + config.wo)
})
