const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  faculty: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //calls .trim() on the value to get rid of whitespace
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 11,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  age: {
    type: String,
    required: true,
    trim: true
  },
  sex: {
    type: String,
    required: true,
    trim: true
  },
  totalScore: {
    type: Number,
    default: 100
  }
});

//this enforces emails to be unique!
UserSchema.plugin(uniqueValidator);

//this function will be called before a document is saved
UserSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  //we generate the salt using 12 rounds and then use that salt with the received password string to generate our hash
  bcrypt
    .genSalt(12)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

module.exports = mongoose.model("User", UserSchema);
