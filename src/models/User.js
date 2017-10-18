const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Here is not possible use an arrow function because 'this' must point to module.
function generateSalt(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (e, hash) => {
      if (e) return next(err);
      user.password = hash;
      next();
    });
  });
}

function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, callback);
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
});

UserSchema.pre('save', generateSalt);
UserSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('user', UserSchema);
