const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const reportSchema = new mongoose.Schema({
  hairTest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HairTest',
    required: true,
    index: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  publicId: {
    type: String,
    index: true,
    unique: true,
    default: () => uuidv4()
  },
  causes: [String],
  recoveryTime: { type: Number, required: true, min: 3 }, // in months
  recommendedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

// Index for public URL access
// reportSchema.index({ publicId: 1 });

module.exports = mongoose.model('Report', reportSchema);