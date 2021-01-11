"use strict";

var mongoose = require('mongoose'); // mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });


var URI = process.env.MANGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});