'use strict';

const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  inventoryCount: { type: Number, required: true },
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;
