const router = require("express").Router();
const schemaValidator = require("../middlewares/schemaValidator");

const reportController = require("../controllers/reportController");
const { reportPublicIdSchema } = require("./schema/params");

router.get(
  "/:publicId",
  schemaValidator({ params: reportPublicIdSchema }),
  reportController.getHairTestReport,
);

module.exports = router;
