const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dashboard = require('./dashboard.model');
const chalk = require('chalk');
const ApiError = require('../error/ApiError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is mandatory'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is mandatory'],
      unique: true,
      trim: true,
      lowercase: true,
      async validate(value) {
        if (!validator.isEmail(value))
          throw new Error(
            'Please enter your email address in format yourname@example.com'
          );

        // const emailCount = await mongoose.models.User.countDocuments({
        //   email: value,
        // });
        // console.log(chalk.yellow(emailCount));
        // if (emailCount) {
        //   throw new Error('Email already exists');
        // }
      },
    },
    password: {
      type: String,
      required: [true, 'Password is mandatory'],
      trim: true,
      minLength: [6, 'The password should have at least 6 characters'],
      validate(value) {
        if (value.includes('password')) {
          throw new Error('Password must be different than password');
        }
      },
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    tokens: [{ token: { type: String, required: true } }],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('dashboard', {
  ref: 'Dashboard',
  localField: '_id',
  foreignField: 'owner',
});

// userSchema.path('email').validate(async (email) => {
//   const emailCount = await mongoose.models.User.countDocuments({ email });
//   console.log(chalk.yellow(emailCount));
//   return !emailCount;
// }, 'Email already exists');

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  // await user.update();

  return token;
};

userSchema.statics.findByCredentials = async (email, password, next) => {
  const user = await User.findOne({ email });

  if (!user) return next(ApiError.badRequest(['Invalid credentials'], 2));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(ApiError.badRequest(['Invalid credentials'], 2));

  return user;
};
//Hash the plain text password
userSchema.pre('save', async function (next) {
  const user = this;

  user.isModified('password')
    ? (user.password = await bcrypt.hash(user.password, 8))
    : null;
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Dashboard.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
