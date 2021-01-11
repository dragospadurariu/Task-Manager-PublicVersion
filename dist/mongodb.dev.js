"use strict";

var chalk = require('chalk');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ObjectID = _require.ObjectID;

var connectionURL = 'mongodb://127.0.0.1:27017';
var databaseName = 'task-manager';
MongoClient.connect(connectionURL, {
  useNewUrlParser: true
}, function (error, client) {
  if (error) return console.log(chalk.red('Unable to connect to database'));
  console.log(chalk.bgGreen.black('Connecting correctly!'));
  var db = client.db(databaseName);
  var updatePromise = db.collection('users').updateOne({
    _id: new ObjectID('5fcb3411ff5ab232287e0d87')
  }, {
    $set: {
      name: 'Irina Volchivscaia'
    }
  });
  updatePromise.then(function (result) {
    console.log(result);
  })["catch"](function (error) {
    console.log(error);
  });
});