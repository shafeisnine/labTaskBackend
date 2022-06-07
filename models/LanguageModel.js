var mongoose = require("mongoose");

var LanguageSchema = new mongoose.Schema({
  languageName: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Language", LanguageSchema);
