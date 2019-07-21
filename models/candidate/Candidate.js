const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  skype: {
    type: String,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'DepartmentName'
  },
  experience: {
    type: String,
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'LevelName'
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'CandidatesStatus'
  },
  comment: {
    type : String,
  },
  attachedCV: {
    type: Schema.Types.ObjectId,
    ref: 'Attachment'
  },
  date: {
    type : Date,
    default: Date.now
  },
});
mongoose.model('Candidate', CandidateSchema);

module.exports = mongoose.model('Candidate');

