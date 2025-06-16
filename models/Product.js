const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["shampoo", "oil", "medicine"],
      required: true,
    },
    tags: {
      type: [String],
      enum: [
        "dandruff",
        "genetic",
        "stress",
        "nutritional",
        "hormonal",
        "early_stage",
        "advanced_stage",
        "scalp_health",
        "inflammation",
        "dry_scalp",
        "oily_scalp",
        "vitamin_deficiency",
        "sleep_issues",
      ],
      index: true,
    },
    benefits: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Compound index for faster category-based queries
productSchema.index({ category: 1, name: 1 });

module.exports = mongoose.model("Product", productSchema);
