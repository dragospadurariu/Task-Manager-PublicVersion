"use strict";

var mongoose = require('mongoose');

var columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  dashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dashboard'
  }
}, {
  timestamps: true
});
var Column = mongoose.model('Column', columnSchema);
module.exports = Column;