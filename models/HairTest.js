const mongoose = require('mongoose');

const hairTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hairLossStage: {
    type: String,
    enum: ['stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6'],
    required: true
  },
  familyHistory: {
    type: String,
    enum: ['mother', 'father', 'both', 'none']
  },
  dandruff: {
    type: String,
    enum: ['no', 'mild', 'heavy', 'psoriasis', 'seborrheic']
  },
  sleep: {
    type: String,
    enum: ['peaceful', 'disturbed', 'difficult']
  },
  stress: {
    type: String,
    enum: ['none', 'low', 'moderate', 'high']
  },
  acidityOrGas: Boolean,
  energyLevels: {
    type: String,
    enum: ['high', 'low', 'very-low']
  },
  takingSupplements: Boolean,
  scalpImageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('HairTest', hairTestSchema);