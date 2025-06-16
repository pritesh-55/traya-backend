const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const Report = require("../models/Report");
const Order = require("../models/Order");

exports.createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { phoneNumber, shipping, billing, paymentMethod, couponCode } =
      req.body;

    // 1. Get report with products
    const report = await Report.findOne({ publicId: req.params.publicId })
      .populate({
        path: "recommendedProducts",
        select: "price",
        options: { lean: true },
      })
      .lean()
      .session(session);

    if (!report) throw new ApiError(404, "Report not found");

    // 2. Prepare order items with price snapshots
    const orderItems = report.recommendedProducts.map((item) => ({
      product: item._id,
      priceAtOrderTime: item.price,
      quantity: 1,
    }));

    // 3. Calculate amounts
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.priceAtOrderTime * item.quantity,
      0,
    );
    const tax = subtotal * 0.18; // 18% GST
    const discount = couponCode ? subtotal * 0.1 : 0; // 10% discount if coupon (Intentionally skipped the coupon validation logic)
    const total = subtotal + tax - discount;

    // 4. Create order
    const order = new Order({
      user: report.user,
      report: report._id,
      phoneNumber,
      shipping,
      billing: billing || shipping,
      paymentInfo: {
        method: paymentMethod,
        orderId: `order_${Date.now()}`,
      },
      orderItems,
      couponCode,
      subtotal,
      tax,
      discount,
      total,
    });

    await order.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order placed successfully",
      orderNumber: order.orderNumber,
    });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    next(e);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate("orderItems.product")
      .lean();

    if (!order) throw new ApiError(404, "Order not found");

    order.orderItems = order.orderItems.map((item) => ({
      ...item.product,
      price: item.priceAtOrderTime, // Overwrite current prices with order-time prices
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (e) {
    next(e);
  }
};
