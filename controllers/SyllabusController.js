const Syllabus = require("../models/SyllabusModel");
var mongoose = require("mongoose");
var fs = require("fs");
const apiResponse = require("../helpers/apiResponse");

mongoose.set("useFindAndModify", false);

// Syllabus Schema
function SyllabusData(data) {
  this.id = data._id;
  this.tradeId = data.tradeId;
  this.tradeName = data.tradeName;
  this.labelId = data.labelId;
  this.labelName = data.labelName;
  this.language = data.language;
  this.isDisabled = data.isDisabled;
  this.syllabusName = data.syllabusName;
  this.uploadedSyllabus = data.uploadedSyllabus;
  this.uploadedTestPlan = data.uploadedTestPlan;
  this.developmentOfficer = data.developmentOfficer;
  this.manager = data.manager;
  this.activeDate = data.activeDate;
}

/**
 * Syllabus List.
 *
 * @returns {Object}
 */
exports.syllabusList = [
  // auth,
  async (req, res) => {
    try {
      await Syllabus.find({ isDisabled: false }).then((syllabus) => {
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          syllabus
        );
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Syllabus Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.syllabusDetail = [
  async (req, res) => {
    try {
      await Syllabus.findOne({ _id: req.params.id }).then((syllabus) => {
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          syllabus
        );
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * syllabus Add.

 * @returns {Object}
 */
exports.syllabusAdd = [
  async (req, res) => {
  
    try {
      const syllabusName = `syllebus${Date.now()}`;
      const testPlanName = `testPlan${Date.now()}`;
      const syllabusPath = `http://${req.get(
        'host'
      )}/files/asset/${syllabusName}.pdf`;

      const testplanPath = `http://${req.get(
        'host'
      )}/files/asset/${testPlanName}.pdf`;

      var syllabus = new Syllabus({
        tradeId: req.body.tradeId,
        tradeName: req.body.tradeName,
        labelId: req.body.labelId,
        labelName: req.body.labelName,
        language: req.body.language,
        syllabusName: req.body.syllabusName,
        syllabusPath: syllabusPath,
        testPlanPath: testplanPath,
        uploadedSyllabus: req.body.uploadedSyllabus,
        uploadedTestPlan: req.body.uploadedTestPlan,
        developmentOfficer: req.body.developmentOfficer,
        manager: req.body.manager,
        activeDate: req.body.activeDate
      });

      await syllabus.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        let syllabusData = new SyllabusData(syllabus);
         fs.writeFileSync(
          "./files/asset/" + syllabusName + ".pdf", 
          req.body.syllabusBase64.split(',')[1],
          "base64"
        ); 
         fs.writeFileSync(
          "./files/asset/" + testPlanName + ".pdf",
          req.body.testPlanBase64.split(',')[1],
          "base64"
        );

        return apiResponse.successResponseWithData(
          res,
          "Syllabus add Success.",
          syllabusData
        );
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Syllabus update.
 *
 
 * @returns {Object}
 */
exports.syllabusUpdate = [
  async (req, res) => {
    try {

      const syllabusName = `syllebus${Date.now()}`;
      const testPlanName = `testPlan${Date.now()}`;
      const syllabusPath = `http://${req.get(
        'host'
      )}/files/asset/${syllabusName}.pdf`;
      
      const testplanPath = `http://${req.get(
        'host'
      )}/files/asset/${testPlanName}.pdf`;
      var syllabus = new Syllabus({
        tradeId: req.body.tradeId,
        tradeName: req.body.tradeName,
        labelId: req.body.labelId,
        labelName: req.body.labelName,
        language: req.body.language,
        syllabusName: req.body.syllabusName,
        syllabusPath: syllabusPath,
        testPlanPath: testplanPath,
        uploadedSyllabus: req.body.uploadedSyllabus,
        uploadedTestPlan: req.body.uploadedTestPlan,
        developmentOfficer: req.body.developmentOfficer,
        manager: req.body.manager,
        activeDate: req.body.activeDate
      });
      await Syllabus.findById(req.params.id, function (err, foundSyllabus) {
        if (foundSyllabus === null) {
          return apiResponse.notFoundResponse(
            res,
            "Syllabus not exists with this id"
          );
        } else {
          Syllabus.updateOne(
            {
              _id: req.params.id,
              isDisabled: false,
            },
            {
              $set: {
                tradeId: req.body.tradeId,
                tradeName: req.body.tradeName,
                labelId: req.body.labelId,
                labelName: req.body.labelName,
                language: req.body.language,
                syllabusName: req.body.syllabusName,
                syllabusPath: syllabusPath,
                testPlanPath: testplanPath,
                uploadedSyllabus: req.body.uploadedSyllabus,
                uploadedTestPlan: req.body.uploadedTestPlan,
                developmentOfficer: req.body.developmentOfficer,
                manager: req.body.manager,
                activeDate: req.body.activeDate
              },
            },
            function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              } else {
                let syllabusData = new SyllabusData(syllabus);
                fs.writeFileSync(
                  "./files/asset/" + syllabusName + ".pdf", 
                  req.body.syllabusBase64.split(',')[1],
                  "base64"
                ); 
                 fs.writeFileSync(
                  "./files/asset/" + testPlanName + ".pdf",
                  req.body.testPlanBase64.split(',')[1],
                  "base64"
                );
                return apiResponse.successResponseWithData(
                  res,
                  "Syllabus update Success.",
                  syllabusData
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

/**
 * Product Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.syllabusDelete = [
  async (req, res) => {
    try {
      await Syllabus.findById(req.params.id, function (err, foundSyllabus) {
        if (foundSyllabus === null) {
          return apiResponse.notFoundResponse(
            res,
            "Syllabus not exists with this id"
          );
        } else {
          Syllabus.updateOne(
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
                  "Syllabus delete Success."
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
