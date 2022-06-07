const Product = require('../models/ProductModel');
const apiResponse = require('../helpers/apiResponse');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Product Schema
function ProductData(data) {
  this.id = data._id;
  this.title = data.title;
  this.description = data.description;
}

/**
 * Product List.
 *
 * @returns {Object}
 */
exports.publicProductList = async (req, res) => {
  try {
    await Product.find(
      { isDisabled: false },
      {
        title: 1,
        description: 1,
        imagePath: 1,
      },
      {
        $sort: {
          _id: -1,
        },
      }
    ).then((products) => {
      if (products.length > 0) {
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          products
        );
      } else {
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          []
        );
      }
    });
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};
/**
 * Product Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.publicProductDetails = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return apiResponse.successResponseWithData(res, 'Operation success', {});
  }
  try {
    await Product.findOne(
      { _id: req.params.id, isDisabled: false },
      {
        title: 1,
        description: 1,
        imagePath: 1,
      }
    ).then((product) => {
      if (product !== null) {
        let productData = new ProductData(product);
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          productData
        );
      } else {
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          {}
        );
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};
