const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async value => {
        const user = await User.findOne({email: value});
        if (user) return false;
      },
      message: 'This user is already registered'
    }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: null | String,

  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin']
  },

  token: {
    type: String,
    required: true,
  }

});

const SALT_FACTORY = 10;

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_FACTORY);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, option) => {
    delete ret.password;
    return ret;
}});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
}

const User = mongoose.model('User' ,UserSchema);

module.exports = User;