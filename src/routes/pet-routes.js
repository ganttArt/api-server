'use strict';

const express = require('express');

const Collection = require('../models/collection.js');
const petSchema = require('../models/pet-schema');
const pet = new Collection(petSchema);

const router = express.Router();

router.get('/pet', getAllPets);
router.get('/pet/:id', getOnePet);
router.post('/pet', createPet);
router.put('/pet/:id', updatePet);
router.delete('/pet/:id', deletePet);

async function getAllPets(req, res) {
  let getPet = await pet.read();
  res.status(200).json(getPet);
}

function getOnePet(req, res) {
  pet.read(req.params.id)
    .then(pet => res.status(200).json(pet))
    .catch(error => res.status(500).send('id not in db'));
}

function createPet(req, res) {
  console.log(req.body)
  pet.create(req.body)
    .then(pet => res.status(201).json(pet))
    .catch(error => res.status(500).send('error creating pet'));
}

function updatePet(req, res) {
  pet.update(req.params.id, req.body)
    .then(pet => res.status(200).json(pet))
    .catch(error => res.status(500).send('error updating pet'));
}

function deletePet(req, res) {
  pet.delete(req.params.id)
    .then(response => res.status(200).json(response));
}

module.exports = router;
