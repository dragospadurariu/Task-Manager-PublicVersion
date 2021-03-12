const mongoose = require('mongoose');
const Task = require('./task.model');

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

columnSchema.pre('remove', async function (next) {
  const column = this;
  await Task.deleteMany({ column: column._id });
  next();
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
