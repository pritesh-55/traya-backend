const router = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const schemaValidator = require("../middlewares/schemaValidator");
const parsePayload = require("../middlewares/parsePayload");
const validateImage = require("../middlewares/validateImage");

const hairTestController = require("../controllers/hairTestController");
const { submitHairTestSchema } = require("./schema/body");

router.post(
  "/",
  upload.single("image"),
  parsePayload,
  validateImage,
  schemaValidator({ body: submitHairTestSchema }),
  hairTestController.submitHairTest,
);

module.exports = router;
