var express = require("express");
const SyllebusController = require("../controllers/SyllabusController");

var router = express.Router();

router.post("/", SyllebusController.syllabusAdd);
router.get("/", SyllebusController.syllabusList);
router.get("/:id", SyllebusController.syllabusDetail);
router.put("/:id", SyllebusController.syllabusUpdate);
router.delete("/:id", SyllebusController.syllabusDelete);

module.exports = router;
