// Load Node modules
var express = require('express');
const ejs = require('ejs');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");

// Initialise Express
var app = express();

// // Initialize DB
//  <copy instantiation here>
//     .then(client => {
//         console.log(`Connected to the DB`);
//         const db = client.db("semester-info");
//         const semesterInfo = db.collection(`semesters`);
//     })
//     .catch(error => console.error(error));



// Render static files
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

app.post('/semester', (req, res) => {
    console.log(req.body); 
});

app.get('/login', (req, res) => {
    console.log("Hello world");
    res.render('pages/login');
});


app.get('/tasklist', (req, res) => {
    console.log("Hello world");
    res.render('pages/tasklist');
});