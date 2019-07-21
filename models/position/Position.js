const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: 'DepartmentName'
  },
  amount: {
    type: Number,
    required: true
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: 'PositionName'
  },
  requirement: {
    type: String
  },
  requirements: [],

  skill: {
    type: String
  },
  skills: [],

  level: {
    type: Schema.Types.ObjectId,
    ref: 'LevelName'
  },
  general: {
    type: String
  },
  status: {
    type: String
  },
  date: {
    type : Date,
    default: Date.now
  },
  creator: {
    type: String,
    required: true
  }
});
mongoose.model('Position', PositionSchema);

module.exports = mongoose.model('Position');

