"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    "default": false
  }
});
module.exports = Task;