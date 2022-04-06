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

var port_number = process.env.PORT || 3000;
// Port website will run on
app.listen(port_number,() => {
    console.log(`Listening on port ${port_number}`);
});

// Root route
app.get('/', (req, res) => {
    res.render('pages/index');
});