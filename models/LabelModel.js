var mongoose = require('mongoose');

var LabelSchema = new mongoose.Schema(
  {

    tradeId: {
      type: Number,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  }
);

module.exports = mongoose.model('Label', LabelSchema);
