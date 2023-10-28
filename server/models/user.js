const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  plants: [{ type: Schema.Types.ObjectId, ref: 'Plant' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
