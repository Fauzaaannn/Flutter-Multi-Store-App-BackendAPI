const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  state: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  locality: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;