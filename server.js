// Load Node modules
var express = require('express');
const ejs = require('ejs');

// Initialise Express
var app = express();

// Render static files
app.use(express.static(__dirname + '/public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Port website will run on
app.listen(5000,() => {
    console.log("Listening on port 5000");
});

// Root route
app.get('/', (req, res) => {
    res.render('pages/index');
});