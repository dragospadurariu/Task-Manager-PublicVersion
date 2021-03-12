const mongoose = require('mongoose');
const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  colorCode: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dashboard',
    required: true,
  },
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;
