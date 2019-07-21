const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
  tarif: {
    type: String,
  },
  topic: {
    type: String,
  },
  vacancyName: {
    type: String,
  },
  city: {
    type: String,
  },
  requirement: {
    type: String,
  },
  optional: {
    type: String,
  },
  address: {
    type: String,
  },
  education: {
    type : String,
  },
  schedule: {
    type : String,
  },
  experience: {
    type : String,
  },
  condition: {
    type : String,
  },
  responsibility: {
    type : String,
  },
  other: {
    type : String,
  },
  salary: {
    type : String,
  },
  employmentType: {
    type : String,
  },
  socialMedia: [],
  attachedFile: {
    type: Schema.Types.ObjectId,
    ref: 'Attachment'
  },
  status: {
    type : String,
  },
  date: {
    type : Date,
    default: Date.now
  },
});
mongoose.model('Vacancy', VacancySchema);

module.exports = mongoose.model('Vacancy');

