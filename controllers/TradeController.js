const Trade = require("../models/TradeModel");
var mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");
var fs = require("fs");
mongoose.set("useFindAndModify", false);

// Product Schema
function TradeData(data) {
  this.id = data._id;
  this.tradeId = data.tradeId;
  this.tradeName = data.tradeName;
  this.isDisabled = data.isDisabled;
}

/**
 * Trade List.
 *
 * @returns {Object}
 */
exports.tradeList = [
  async (req, res) => {
    try {
      await Trade.find(
        { isDisabled: false },
        {
          tradeId: 1,
          tradeName: 1,
          isDisabled: 1,
        },
        {
          $sort: {
            tradeId: -1,
          },
        }
      ).then((trades) => {
        if (trades.length > 0) {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            trades
          );
        } else {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            []
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Product Add.
 *
 * @param {string}      tradeId
 * @param {string}      tradeName
 *
 * @returns {Object}
 */
exports.TradeAdd = [
  async (req, res) => {
    try {
      var trade = new Trade({
        tradeId: req.body.tradeId,
        tradeName: req.body.tradeName,
      });

      await trade.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        let tradeData = new TradeData(trade);

        return apiResponse.successResponseWithData(
          res,
          "trade add Success.",
          tradeData
        );
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Trade Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.tradeDelete = [
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid ID"
      );
    }
    try {
      await Trade.findById(req.params.id, function (err, foundTrade) {
        if (foundTrade === null) {
          return apiResponse.notFoundResponse(
            res,
            "Trade not exists with this id"
          );
        } else {
          Trade.updateOne(
            {
              _id: req.params.id,
              isDisabled: false,
            },
            {
              $set: {
                isDisabled: true,
              },
            },

            function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              } else {
                return apiResponse.successResponse(
                  res,
                  "Trade delete Success."
                );
              }
            }
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
