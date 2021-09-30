const mongoose = require("mongoose");


// mongoDb schema contains name,email,password,date,category,job_id
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Map,
    of: { type: Array },
  },

  job_id: { type: Array },
});

module.exports = mongoose.model("user", UserSchema);
