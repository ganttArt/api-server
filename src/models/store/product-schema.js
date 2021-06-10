'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  inventoryCount: { type: Number, required: true },
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
