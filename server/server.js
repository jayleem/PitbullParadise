const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

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

//Setup routes **important to be below bodyParser else it wont work properly**
//
const routes = require('./routes');
app.use('/', routes);

//Start Server 
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//callbacks for errors
db.once('open', () => {
    server.listen(3000, () => {
        console.log('Server running on port 3000');
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