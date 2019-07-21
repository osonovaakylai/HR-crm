const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeLineSchema = new Schema({
  key: {
    type : Date,
    default: 1527394160.401
  },
  value: {
    type : Number,
    default: 100
  }
});
mongoose.model('ResumeLine', ResumeLineSchema);

module.exports = mongoose.model('ResumeLine');

