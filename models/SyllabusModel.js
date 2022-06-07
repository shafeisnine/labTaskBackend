var mongoose = require("mongoose");

var SyllabusSchema = new mongoose.Schema({
  tradeId: {
    type: Number,
    required: true,
  },
  tradeName: {
    type: String,
    required: true,
  },
  labelId: {
    type: String,
    required: true,
  },
  labelName: {
    type: String,
    required: true,
  },
  language: {
    type: [
      {
        languageName: {
          type: String,
        },
        shortName : {
          type: String,
        }
      },
    ],
    default: [],
  },
  syllabusName: {
    type: String,
    required: true,
  },
  syllabusPath: {
    type: String,
    required: true,
  },
  testPlanPath: {
    type: String,
    required: true,
  },
  uploadedSyllabus: {
    type: String,
    required: true,
  },
  uploadedTestPlan: {
    type: String,
    required: true,
  },
  developmentOfficer: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  activeDate: {
    type: Date,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Syllabus", SyllabusSchema);
