const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    env = require('dotenv').config({ "path": "./process.env" });

//Setup mongoose connection
//
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI || 'mongodb://localhost/default';
mongoose.connect(uri,
    {
        //user: process.env.USER,
        //pass: process.env.PASSWORD,
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
    `http://localhost:${process.env.PORT}`,
    `https://localhost:${process.env.PORT}`,
    'http://localhost:4200',
    'https://localhost:4200',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://pitbullparadise.herokuapp.com/',
    'https://pitbullparadise.herokuapp.com/'
];
var corsOptions = {
    origin: (origin, callback) => {
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

//Setup routes must be below bodyParser
//
const routes = require('./routes');
const path = require ('path');
var staticRoot = path.join(__dirname, '..', 'dist', 'PitbullParadiseApp');//root directory of compiled app
//api routes
//
app.use('/api', routes);
//Serve static folder
//
app.use(express.static(staticRoot));
//Send index.html
// 
app.get('*', function(req, res) {
    res.sendFile(path.join(staticRoot,'index.html'));
});

//Start Server 
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//callbacks for errors
db.once('open', () => {
    server.listen(process.env.PORT || 3000, () => {
        process.env.PORT ? console.log(`Server listening on port ${process.env.port}`) : console.log('Server listening on port 3000');
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