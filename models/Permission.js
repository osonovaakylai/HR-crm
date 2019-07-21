const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);

const PermissionSchema = new mongoose.Schema({
  role_number: {
    type: Number
  },
  list: []

});
mongoose.model('Permission', PermissionSchema);

module.exports = mongoose.model('Permission');
