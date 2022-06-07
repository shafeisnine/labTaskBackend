const Label = require("../models/LabelModel");
var mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");
mongoose.set("useFindAndModify", false);

// Label Schema
function LabelData(data) {
  this.id = data._id;
  this.tradeId = data.tradeId;
  this.labelName = data.labelName;
  this.isDisabled = data.isDisabled;
}

/**
 * Label List.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.labelList = [
  // auth,
  async (req, res) => {
    //  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //    return apiResponse.successResponseWithData(res, 'Operation success', {});
    //  }
    try {
      await Label.find(
        { tradeId: req.params.id, isDisabled: false },
        {
          labelName: 1,
          tradeId: 1,
        }
      ).then((label) => {
     
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          label
        );
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Label Add.
 *
 * @param {number}      tradeId
 * @param {string}      labelName
 *
 * @returns {Object}
 */
exports.LabelAdd = [
  async (req, res) => {
    try {
      var label = new Label({
        tradeId: req.body.tradeId,
        labelName: req.body.labelName,
      });

      await label.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        let labelData = new LabelData(label);

        return apiResponse.successResponseWithData(
          res,
          "Label Data add Success.",
          labelData
        );
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Label Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.labelDelete = [
  async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   return apiResponse.validationErrorWithData(
    //     res,
    //     "Invalid Error.",
    //     "Invalid ID"
    //   );
    // }
    try {
      await Label.findById(req.params.id, function (err, foundLabel) {
        if (foundLabel === null) {
          return apiResponse.notFoundResponse(
            res,
            "Label not exists with this id"
          );
        } else {
          Label.updateOne(
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
                  "Label delete Success."
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
