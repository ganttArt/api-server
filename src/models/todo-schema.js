'use strict';

const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  complete: { type: Boolean, default: false},
  text: { type: String, required: true },
  difficulty: { type: Number, required: true },
  assignee: { type: String, required: true }
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;
