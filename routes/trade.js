var express = require('express');
const tradeController = require('../controllers/TradeController');

var router = express.Router();

router.post('/', tradeController.TradeAdd);
router.get('/', tradeController.tradeList);
router.delete('/:id', tradeController.tradeDelete);

module.exports = router;
