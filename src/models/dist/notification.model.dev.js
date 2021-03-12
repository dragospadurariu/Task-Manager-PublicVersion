"use strict";

var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isRead: {
    type: Boolean,
    required: true
  },
  link: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
var Noticiation = mongoose.model('Notifiation', notificationSchema);
module.exports = Noticiation;