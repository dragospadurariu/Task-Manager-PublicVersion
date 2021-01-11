"use strict";

var express = require('express');

var chalk = require('chalk');

require('./db/mongoose');

var userRouter = require('./routers/user.routes');

var dashboardRouter = require('./routers/dashboard.routes');

var columnRouter = require('./routers/column.routes');

var taskRouter = require('./routers/task.routes');

var errorHandler = require('./error/api-error.handler');

var app = express();
var port = process.env.PORT;
app.use(express.json());
app.use(userRouter);
app.use(dashboardRouter);
app.use(columnRouter);
app.use(taskRouter);
app.use(errorHandler);
app.listen(port, function () {
  console.log(chalk.green("Server is up on port ".concat(port)));
});