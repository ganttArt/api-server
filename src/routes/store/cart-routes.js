'use strict';

const express = require('express');

const Collection = require('../../models/collection.js');
const cartSchema = require('../../models/store/cart-schema.js');
const cart = new Collection(cartSchema);

const router = express.Router();

router.get('/cart', getAllCartItems);
router.get('/cart/:id', getOneCartItem);
router.post('/cart', createCartItem);
router.put('/cart/:id', updateCartItem);
router.delete('/cart/:id', deleteCartItem);

async function getAllCartItems(req, res) {
  let getCart = await cart.read();
  res.status(200).json(getCart);
}

function getOneCartItem(req, res) {
  cart.read(req.params.id)
    .then(cart => res.status(200).json(cart))
    .catch(error => res.status(500).send('id not in db'));
}

function createCartItem(req, res) {
  cart.create(req.body)
    .then(cart => res.status(201).json(cart))
    .catch(error => res.status(500).send('error creating cart'));
}

function updateCartItem(req, res) {
  cart.update(req.params.id, req.body)
    .then(cart => res.status(200).json(cart))
    .catch(error => res.status(500).send('error updating cart '));
}

function deleteCartItem(req, res) {
  cart.delete(req.params.id)
    .then(response => res.status(200).json(response));
}

module.exports = router;
