'use strict';

const express = require('express');

const Collection = require('../../models/collection.js');
const productSchema = require('../../models/store/product-schema');
const product = new Collection(productSchema);

const router = express.Router();

router.get('/product', getAllProduct);
router.get('/product/:id', getOneProduct);
router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

async function getAllProduct(req, res) {
  let getProduct = await product.read();
  res.status(200).json(getProduct);
}

function getOneProduct(req, res) {
  product.read(req.params.id)
    .then(product => res.status(200).json(product))
    .catch(error => res.status(500).send('id not in db'));
}

function createProduct(req, res) {
  product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(error => res.status(500).send('error creating product'));
}

function updateProduct(req, res) {
  product.update(req.params.id, req.body)
    .then(product => res.status(200).json(product))
    .catch(error => res.status(500).send('error updating product '));
}

function deleteProduct(req, res) {
  product.delete(req.params.id)
    .then(response => res.status(200).json(response));
}

module.exports = router;
