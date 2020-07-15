const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express();

//Setup mongoose connection
//
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/default';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;

//Setup body parser
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Setup CORS options
//
var whitelist = [
    'http://localhost:4200',
    'https://localhost:4200'
];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            //return callback('false', false);
            return callback(null, true);
        }
    },
    credentials: true
}
app.use(cors(corsOptions));

//Set up routes **important to be below bodyParser else it wont work properly**
//
const routes = require('./routes');
app.use('/', routes);

//Start Server 
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//callbacks for errors
db.once('open', () => {
    app.listen(3000);
    console.log('Server started, listening on port 3000.');
});

module.exports.app;