const crypto = require("crypto");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      default: function () {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const random = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 chars
        return `TRAYA-${date}-${random}`;
      },
    },
    shipping: { type: addressSchema, required: true },
    billing: { type: addressSchema, required: true },
    paymentInfo: {
      method: { type: String, enum: ["razorpay", "snapmint"], required: true },
      orderId: { type: String },
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        priceAtOrderTime: { type: Number, required: true },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    couponCode: String,
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

orderSchema.index({ user: 1, status: 1 });
// orderSchema.index({ 'paymentInfo.orderId': 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Order", orderSchema);
