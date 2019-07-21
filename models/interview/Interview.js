const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  date: {
    type : Date,
    default: Date.now
  },
  vacancy: {
    type: Schema.Types.ObjectId,
    ref: 'Vacancy'
  },
  interviewer: {
    type: String,
  },
  interviewers: []
});
mongoose.model('Interview', InterviewSchema);

module.exports = mongoose.model('Interview');

