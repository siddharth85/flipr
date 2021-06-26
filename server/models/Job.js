const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({});

module.exports = mongoose.model("job", JobSchema);
