'use strict';

const express = require('express');

const Collection = require('../models/collection.js');
const familySchema = require('../models/family-schema.js');
const family = new Collection(familySchema);

const router = express.Router();

router.get('/family', getAllFamily);
router.get('/family/:id', getOneFamilyMember);
router.post('/family', createFamilyMember);
router.put('/family/:id', updateFamilyMember);
router.delete('/family/:id', deleteFamilyMember);

async function getAllFamily(req, res) {
  let getFamily = await family.read();
  res.status(200).json(getFamily);
}

function getOneFamilyMember(req, res) {
  family.read(req.params.id)
    .then(familyMember => res.status(200).json(familyMember))
    .catch(error => res.status(500).send('id not in db'));
}

function createFamilyMember(req, res) {
  family.create(req.body)
    .then(familyMember => res.status(201).json(familyMember))
    .catch(error => res.status(500).send('error creating family member'));
}

function updateFamilyMember(req, res) {
  family.update(req.params.id, req.body)
    .then(familyMember => res.status(200).json(familyMember))
    .catch(error => res.status(500).send('error updating family member'));
}

function deleteFamilyMember(req, res) {
  family.delete(req.params.id)
    .then(response => res.status(200).json(response));
}

module.exports = router;
