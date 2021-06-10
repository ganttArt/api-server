'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  displayName: { type: String, required: true },
  normalizedName: { type: String, required: true },
  description: { type: String, required: true },
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
