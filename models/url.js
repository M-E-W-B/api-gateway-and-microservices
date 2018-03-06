const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
  "Url",
  new Schema({
    url: { type: String },
    slug: { type: String },
    count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
  })
);
