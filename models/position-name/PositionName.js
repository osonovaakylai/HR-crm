const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionNameSchema = new Schema({
  name: {
    type: String
  }
});
mongoose.model('PositionName', PositionNameSchema);

module.exports = mongoose.model('PositionName');
