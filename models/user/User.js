const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const UserSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    default: ''
  },
  work_position: {
    type: String,
  },
  role_number: {
    type: Number
  }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');

