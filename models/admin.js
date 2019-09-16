var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const bcrypt = require("bcryptjs");

var AdminSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//this function will be called before a document is saved
AdminSchema.pre("save", function(next) {
  let admin = this;

  if (!admin.isModified("password")) {
    return next();
  }

  //we generate the salt using 12 rounds and then use that salt with the received password string to generate our hash
  bcrypt
    .genSalt(12)
    .then(salt => {
      return bcrypt.hash(admin.password, salt);
    })
    .then(hash => {
      admin.password = hash;
      next();
    })
    .catch(err => next(err));
});

var Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
