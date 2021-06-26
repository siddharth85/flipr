const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema({});

module.exports = mongoose.model("agenda", AgendaSchema);
