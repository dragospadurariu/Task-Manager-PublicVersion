"use strict";

var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    "default": false
  },
  description: {
    type: String,
    "default": null
  },
  comments: [{
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    user: {
      userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: {
        type: String
      }
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      "default": Date.now
    }
  }, {
    timestamps: true
  }],
  dueDate: {
    type: Date,
    "default": null
  },
  label: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Label',
    "default": null
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column'
  },
  dashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dashboard'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
var Task = mongoose.model('Task', taskSchema);
module.exports = Task;