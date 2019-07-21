const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelNameSchema = new Schema({
  name: {
    type: String
  }
});
mongoose.model('LevelName', LevelNameSchema);

module.exports = mongoose.model('LevelName');
