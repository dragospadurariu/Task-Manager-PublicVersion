"use strict";

var express = require('express');

var http = require('http');

var path = require('path');

var chalk = require('chalk');

var socketio = require('socket.io');

require('./src/db/mongoose');

var userRouter = require('./src/routers/user.routes');

var dashboardRouter = require('./src/routers/dashboard.routes');

var columnRouter = require('./src/routers/column.routes');

var taskRouter = require('./src/routers/task.routes');

var labelRouter = require('./src/routers/label.routes');

var errorHandler = require('./src/error/api-error.handler'); //Server configuration


var app = express();
var server = http.createServer(app);
var port = process.env.PORT;
var io = socketio(server); //Routes

app.use(express.json());
app.use(userRouter);
app.use(dashboardRouter);
app.use(columnRouter);
app.use(taskRouter);
app.use(labelRouter);
app.use(errorHandler);
console.log(process.env.NODE_ENV); //Leasen to io event

io.on('connection', function (socket) {
  console.log('New WS connetion...');
  socket.emit('message', 'It is working');
}); //Serve static assets in production

console.log(__dirname);

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express["static"]('client/build'));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(port, function () {
  console.log(chalk.green("Server is up on port ".concat(port)));
});