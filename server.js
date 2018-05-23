const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./server/utils/message');
const publicPath = path.join(__dirname, '/public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var hbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
io.on('connection', (socket) => {
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
