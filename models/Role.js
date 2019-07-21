const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);

const RoleSchema = new mongoose.Schema({
  role_number: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  }
});
mongoose.model('Role', RoleSchema);

module.exports = mongoose.model('Role');
