var mongoose = require('mongoose');

var TradeSchema = new mongoose.Schema(
  {

    tradeId: {
      type: Number,
      required: true,
    },
    tradeName: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  }
);

module.exports = mongoose.model('Trade', TradeSchema);
