const { Schema, model } = require("mongoose");

const bookmarkSchema = Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = model("Bookmark", bookmarkSchema);
