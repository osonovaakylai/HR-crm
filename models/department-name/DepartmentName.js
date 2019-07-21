const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);

const DepartmentNameSchema = new Schema({
  name: {
    type: String
  }
});
mongoose.model('DepartmentName', DepartmentNameSchema);

module.exports = mongoose.model('DepartmentName');
