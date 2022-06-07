const Language = require("../models/LanguageModel");
var mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");
mongoose.set("useFindAndModify", false);

// Language Schema
function LanguageData(data) {
  this.id = data._id;
  this.languageName = data.languageName;
  this.shortName = data.shortName;
  this.isDisabled = data.isDisabled;
}

/**
 * Trade List.
 *
 * @returns {Object}
 */
exports.LanguageList = [
  async (req, res) => {
    try {
      await Language.find(
        { isDisabled: false },
        {
          languageName: 1,
          shortName: 1,
          isDisabled: 1,
        }
      ).then((languages) => {
        if (languages.length > 0) {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            languages
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
exports.LanguageAdd = [
  async (req, res) => {
    try {
      var language = new Language({
        languageName: req.body.languageName,
        shortName: req.body.shortName,
      });

      await language.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        let languageData = new LanguageData(language);

        return apiResponse.successResponseWithData(
          res,
          "language add Success.",
          languageData
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
exports.LanguageDelete = [
  async (req, res) => {
    try {
      await Language.findById(req.params.id, function (err, foundLanguage) {
        if (foundLanguage === null) {
          return apiResponse.notFoundResponse(
            res,
            "Language not exists with this id"
          );
        } else {
          Language.updateOne(
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
                  "Language delete Success."
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
