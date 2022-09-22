var mongoose = require('mongoose');

var schema = mongoose.Schema({
  shopId: { type: Number, default: '' },
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  keywords: { type: String, default: '' },
  running: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  lastStarted: {type: Date, default: null},
});

module.exports = mongoose.model('accounts', schema);