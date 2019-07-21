const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TotalSchema = new Schema({
  interviews: {
    type: Number,
    required: true,
    default: 0
  },
  telInterviews: {
    type: Number,
    required: true,
    default: 0
  },
  hired: {
    type: Number,
    required: true,
    default: 0
  },
  totalCV: {
    type: Number,
    required: true,
    default: 0
  }
});
mongoose.model('Total', TotalSchema);

module.exports = mongoose.model('Total');

