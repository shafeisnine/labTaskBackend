var express = require('express');
const ProductController = require('../controllers/ProductController');

var router = express.Router();

router.post('/', ProductController.productAdd);
router.get('/', ProductController.productList);
router.get('/:id', ProductController.productDetail);
router.put('/:id', ProductController.productUpdate);
router.delete('/:id', ProductController.productDelete);

module.exports = router;
