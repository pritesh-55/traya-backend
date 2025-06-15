const router = require("express").Router();
const schemaValidator = require("../middlewares/schemaValidator");

const orderController = require("../controllers/orderController");
const { reportPublicIdSchema, orderNumberSchema } = require("./schema/params");
const { placeOrderSchema } = require("./schema/body");

router.post(
  "/:publicId",
  schemaValidator({
    params: reportPublicIdSchema,
    body: placeOrderSchema,
  }),
  orderController.createOrder,
);

router.get(
  "/:orderNumber",
  schemaValidator({ params: orderNumberSchema }),
  orderController.getOrder,
);

module.exports = router;
