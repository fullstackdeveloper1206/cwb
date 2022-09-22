var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  email: { type: String, require: true, default: '' },
  callCenter: { type: String, require: true, default: '' },
  phone: { type: String, require: true, default: '' },
  password: { type: String, default: '' },
  role: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
  username: { type: String, default: '' },
  imgPath: { type: String, default: '' },
  contracts: [{ type: mongoose.Schema.Types.String, ref: 'contracts' }],
});

module.exports = mongoose.model('users', usersSchema);