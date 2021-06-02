'use strict';

const express = require('express');

const Collection = require('../models/collection.js');
const todoSchema = require('../models/todo-schema');
const todo = new Collection(todoSchema);

const router = express.Router();

router.get('/todo', getAllTodos);
router.get('/todo/:id', getOneTodo);
router.post('/todo', createTodo);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

async function getAllTodos(req, res) {
  let gettodo = await todo.read();
  res.status(200).json(gettodo);
}

function getOneTodo(req, res) {
  todo.read(req.params.id)
    .then(todo => res.status(200).json(todo))
    .catch(error => res.status(500).send('id not in db'));
}

function createTodo(req, res) {
  console.log(req.body)
  todo.create(req.body)
    .then(todo => res.status(201).json(todo))
    .catch(error => res.status(500).send('error creating todo'));
}

function updateTodo(req, res) {
  todo.update(req.params.id, req.body)
    .then(todo => res.status(200).json(todo))
    .catch(error => res.status(500).send('error updating todo'));
}

function deleteTodo(req, res) {
  todo.delete(req.params.id)
    .then(response => res.status(200).json(response));
}

module.exports = router;
