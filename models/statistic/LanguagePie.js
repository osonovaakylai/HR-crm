const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguagePieSchema = new Schema({
  key: {
    type : Date,
    default: Date.now
  },
  value: {
    type : Number,
    default: 100
  }
});
mongoose.model('LanguagePie', LanguagePieSchema);

module.exports = mongoose.model('LanguagePie');

