const Product = require('../models/ProductModel');
const {
  productAddValidate,
  productUpdateValidate,
} = require('../validate/product-validation.js');
const apiResponse = require('../helpers/apiResponse');
const auth = require('../middlewares/jwt');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.set('useFindAndModify', false);

// Product Schema
function ProductData(data) {
  this.id = data._id;
  this.title = data.title;
  this.description = data.description;
  this.imagePath = data.imagePath;
  this.isDisabled = data.isDisabled;
  this.createdAt = data.createdAt;
  this.createdBy = data.createdBy;
}

/**
 * Product List.
 *
 * @returns {Object}
 */
exports.productList = [
 // auth,
  async (req, res) => {
    try {
      await Product.find(
        { isDisabled: false },
        {
          title: 1,
          description: 1,
          imagePath: 1,
          createdAt: 1,
          createdBy: 1,
          isDisabled: 1,
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
  },
];

/**
 * Product Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.productDetail = [
 // auth,
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.successResponseWithData(res, 'Operation success', {});
    }
    try {
      await Product.findOne(
        { _id: req.params.id },
        {
          title: 1,
          description: 1,
          imagePath: 1,
          createdAt: 1,
          createdBy: 1,
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
  },
];

/**
 * Product Add.
 *
 * @param {string}      title
 * @param {string}      description
 *
 * @returns {Object}
 */
exports.productAdd = [
 // auth,
  async (req, res) => {
    try {
      const { error } = productAddValidate.validate(req.body);
      if (error) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          error.details[0].message
        );
      }

      const imageName = `product${Date.now()}`;
      const imagePath = `http://${req.get(
        'host'
      )}/files/productImage/${imageName}.jpg`;

      var product = new Product({
        title: req.body.title,
        description: req.body.description,
        imagePath: imagePath,
        createdAt: Date.now(),
        createdBy: "shafe",
      });

      await product.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        let productData = new ProductData(product);
        fs.writeFileSync(
          './files/productImage/' + imageName + '.jpg',
          req.body.base64Data,
          'base64'
        );
        return apiResponse.successResponseWithData(
          res,
          'Product add Success.',
          productData
        );
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Product update.
 *
 * @param {string}      title
 * @param {string}      description
 *
 * @returns {Object}
 */
exports.productUpdate = [
 // auth,
  async (req, res) => {
    try {
      const { error } = productUpdateValidate.validate(req.body);
      if (error) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          error.details[0].message
        );
      }

      var product = new Product({
        title: req.body.title,
        description: req.body.description,
        _id: req.params.id,
      });

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        );
      } else {
        await Product.findById(req.params.id, function (err, foundProduct) {
          if (foundProduct === null) {
            return apiResponse.notFoundResponse(
              res,
              'Product not exists with this id'
            );
          } else {
            Product.updateOne(
              {
                _id: req.params.id,
                isDisabled: false,
              },
              {
                $set: {
                  title: req.body.title,
                  description: req.body.description,
                },
                $push: {
                  updateInfo: {
                    updatedBy: req.firstName,
                    updatedAt: Date.now(),
                    remarks: `Product updated by ${req.firstName}`,
                  },
                },
              },
              function (err) {
                if (err) {
                  return apiResponse.ErrorResponse(res, err);
                } else {
                  let productData = new ProductData(product);
                  return apiResponse.successResponseWithData(
                    res,
                    'Product update Success.',
                    productData
                  );
                }
              }
            );
          }
        });
      }
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
exports.productDelete = [
 // auth,
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.validationErrorWithData(
        res,
        'Invalid Error.',
        'Invalid ID'
      );
    }
    try {
      await Product.findById(req.params.id, function (err, foundProduct) {
        if (foundProduct === null) {
          return apiResponse.notFoundResponse(
            res,
            'Product not exists with this id'
          );
        } else {
          Product.updateOne(
            {
              _id: req.params.id,
              isDisabled: false,
            },
            {
              $set: {
                isDisabled: true,
              },
              $push: {
                updateInfo: {
                  updatedBy: req.firstName,
                  updatedAt: Date.now(),
                  remarks: `Product deleted by ${req.firstName}`,
                },
              },
            },

            function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              } else {
                return apiResponse.successResponse(
                  res,
                  'Product delete Success.'
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
