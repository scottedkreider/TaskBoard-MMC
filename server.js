// Load Node modules
var express = require('express');
const ejs = require('ejs');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
const router = express.Router();

// Initialise Express
var app = express();

// Initialize DB
MongoClient.connect("mongodb+srv://scottedkreider:m7SedKrcsehgtj&m@cluster0.xfkqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(client => {
        console.log(`Connected to the DB`);
        const db = client.db("semester-info");
        const semesterInfo = db.collection(`semesters`);
    })
    .catch(error => console.error(error));



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
router.get('/', (req, res) => {
    res.render('pages/index');
});

// // Root route
// router.post('/semester', (req, res) => {
//     console.log(req.body);
// });