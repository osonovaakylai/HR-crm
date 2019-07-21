const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidatesStatusSchema = new Schema({
  name: {
    type: String
  }
});
mongoose.model('CandidatesStatus', CandidatesStatusSchema);

module.exports = mongoose.model('CandidatesStatus');
