'use strict';

const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true},
});

const petModel = mongoose.model('pet', petSchema);

module.exports = petModel;
