'use strict';

const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true},
});

const familyModel = mongoose.model('family', familySchema);

module.exports = familyModel;
