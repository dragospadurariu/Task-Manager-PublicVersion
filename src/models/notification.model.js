const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isRead: {
      type: Boolean,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Noticiation = mongoose.model('Notifiation', notificationSchema);
module.exports = Noticiation;
