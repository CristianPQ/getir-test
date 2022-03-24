const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecordSchema = new Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [{ type: Number }],
});

module.exports.Record = mongoose.model("Record", RecordSchema);
