var express = require('express');
const PublicController = require('../controllers/PublicController');

var router = express.Router();

router.get('/product-list', PublicController.publicProductList);
router.get('/product-details/:id', PublicController.publicProductDetails);

module.exports = router;
