const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    comments: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
      {
        timestamps: true,
      },
    ],
    dueDate: {
      type: Date,
      default: null,
    },

    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
    },

    dashboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dashboard',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
