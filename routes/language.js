var express = require("express");
const languageController = require("../controllers/LanguageController");

var router = express.Router();

router.post("/", languageController.LanguageAdd);
router.get("/", languageController.LanguageList);
router.delete("/:id", languageController.LanguageDelete);

module.exports = router;
