const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema({
  filename: {
    type: String,
  },
  originalname: {
    type: String,
  },
  size: {
    type: Number
  }
});
mongoose.model('Attachment', AttachmentSchema);

module.exports = mongoose.model('Attachment');

