const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    dashboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dashboard',
    },
  },
  {
    timestamps: true,
  }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
