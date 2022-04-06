// Load Node modules
var express = require('express');
const ejs = require('ejs');
const path = require('path');

// Initialise Express
var app = express();

// Render static files
console.log(__dirname + '/public');
app.use("/public",express.static(path.join(__dirname,'/public')));

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