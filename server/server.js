const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    env = require('dotenv').config({ "path": "./process.env" }),
    path = require('path');

//Directory of the static files
var staticRoot = path.join(__dirname, "..", "dist", "PitbullParadiseApp");//root directory of built app deployed on heroku/locally
//Landing Page
//
app.get("/", function (req, res) {
    res.sendFile('index.html', { root: staticRoot });
});
//Serve static files
//
app.use(express.static(staticRoot));

//Setup mongoose connection
//
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI || 'mongodb://localhost/default';
mongoose.connect(uri,
    {
        user: process.env.USER,
        pass: process.env.PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

var db = mongoose.connection;
db.once('open', () => {
    console.log('connected');
});

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

//Setup routes **important to be below bodyParser else it wont work properly**
//
const routes = require('./routes');
const { static } = require('express');
app.use('/', routes);

//Start Server 
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//callbacks for errors
db.once('open', () => {
    server.listen(process.env.PORT || 3000, () => {
        console.log('Server listening');
    });
});

//Setup sockets.io
//
app.set('socketio', io);
io.sockets.on('connection', socket => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', message => {
        console.log('message received: ', message);
        socket.emit('response', { 'data': 'Hello!' });
    });
})

module.exports.app;