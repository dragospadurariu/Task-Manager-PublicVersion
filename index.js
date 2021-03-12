const express = require('express');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const socketio = require('socket.io');

require('./src/db/mongoose');

const userRouter = require('./src/routers/user.routes');
const dashboardRouter = require('./src/routers/dashboard.routes');
const columnRouter = require('./src/routers/column.routes');
const taskRouter = require('./src/routers/task.routes');
const labelRouter = require('./src/routers/label.routes');
const errorHandler = require('./src/error/api-error.handler');

//Server configuration
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const io = socketio(server);

//Routes
app.use(express.json());
app.use(userRouter);
app.use(dashboardRouter);
app.use(columnRouter);
app.use(taskRouter);
app.use(labelRouter);
app.use(errorHandler);

console.log(process.env.NODE_ENV);

//Leasen to io event
io.on('connection', (socket) => {
  console.log('New WS connetion...');

  socket.emit('message', 'It is working');
});

//Serve static assets in production
console.log(__dirname);
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(port, () => {
  console.log(chalk.green(`Server is up on port ${port}`));
});
