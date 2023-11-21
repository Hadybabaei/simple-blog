const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  lastname: String,
  password: String,
  otp: String,
  otp_expiry: Date,
  phone_number: Number,
  emailVerification: Boolean,
  phoneVerification: Boolean,
  salt: String,
  role: {
    type: String,
    default: "user",
  },
  country: String,
  countryTag: String,
  last_login: Date,
});

usersSchema.plugin(timeStamp);
usersSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.otp;
    delete ret.otp_expiry;
    delete ret.salt;
    delete ret.role, delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.last_login;
    return ret;
  },
});

const userModel = mongoose.model("Users", usersSchema);

module.exports = userModel;
