var mongoose = require('mongoose');

var schema = mongoose.Schema({
  twitterAPIKey: { type: String, default: '' },
  discordAPIKey: { type: String, default: '' },
  lineAPIKey: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('keys', schema);