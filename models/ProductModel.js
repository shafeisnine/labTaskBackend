var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    currentDateTime: {
      type: Date,
      default: Date.now(),
    },
    updateInfo: {
      type: [
        {
          updatedAt: {
            type: Date,
          },
          updatedBy: {
            type: String,
          },
          remarks: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', ProductSchema);
