const express = require('express');
const chalk = require('chalk');
require('./db/mongoose');
const userRouter = require('./routers/user.routes');
const dashboardRouter = require('./routers/dashboard.routes');
const columnRouter = require('./routers/column.routes');
const taskRouter = require('./routers/task.routes');
const errorHandler = require('./error/api-error.handler');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(dashboardRouter);
app.use(columnRouter);
app.use(taskRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(chalk.green(`Server is up on port ${port}`));
});
