'use strict';

const express = require('express');

const Collection = require('../../models/collection.js');
const categorySchema = require('../../models/store/category-schema.js');
const category = new Collection(categorySchema);

const router = express.Router();

router.get('/category', getAllCategory);
router.get('/category/:id', getOneCategory);
router.post('/category', createCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

async function getAllCategory(req, res) {
  let getCategory = await category.read();
  res.status(200).json(getCategory);
}

function getOneCategory(req, res) {
  category.read(req.params.id)
    .then(category => res.status(200).json(category))
    .catch(error => res.status(500).send('id not in db'));
}

function createCategory(req, res) {
  category.create(req.body)
    .then(category => res.status(201).json(category))
    .catch(error => res.status(500).send('error creating category'));
}

function updateCategory(req, res) {
  category.update(req.params.id, req.body)
    .then(category => res.status(200).json(category))
    .catch(error => res.status(500).send('error updating category '));
}

function deleteCategory(req, res) {
  category.delete(req.params.id)
    .then(response => res.status(200).json(response));
}

module.exports = router;
