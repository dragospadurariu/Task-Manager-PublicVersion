const mongoose = require('mongoose');
const Column = require('./column.model');

const dashboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
    users: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        email: { type: String },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

dashboardSchema.pre('remove', async function (next) {
  const dashboard = this;
  await Column.deleteMany({ dashboard: dashboard._id });
  next();
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
