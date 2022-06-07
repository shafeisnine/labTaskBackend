var express = require('express');
const labelController = require('../controllers/LabelController');

var router = express.Router();

router.post('/', labelController.LabelAdd);
router.get('/:id', labelController.labelList);
router.delete('/:id', labelController.labelDelete);

module.exports = router;
