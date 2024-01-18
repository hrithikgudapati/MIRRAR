const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  additionalCost: { type: Number, required: true },
  stockCount: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('Variant', variantSchema);
