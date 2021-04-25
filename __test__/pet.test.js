'use strict';

require('@code-fellows/supergoose');

const Collection = require('../src/models/collection');
const PetSchema = require('../src/models/pet-schema');
const pet = new Collection(PetSchema);

describe('Family CRUD Actions', () => {
  it('can create a new pet', () => {
    let obj = { name: 'test name 1', species: 'test species 1'};
    let expected = { name: 'test name 1', species: 'test species 1'};

    return pet.create(obj)
      .then(record => {
        Object.keys(obj).forEach(item => {
          expect(record[item]).toEqual(expected[item])
        });
      });
  });

  it('can read a single pet', () => {
    let obj = { name: 'test name 2', species: 'test species 2'};
    let expected = { name: 'test name 2', species: 'test species 2'};
    
    return pet.create(obj)
      .then(record => {
        return pet.read(record._id)
          .then(item => {
            Object.keys(obj).forEach(key => {
              expect(item[key]).toEqual(expected[key]);
            });
          });
      });
  });

  it('can read all pets', () => {
    return pet.read()
      .then(pets => {
        expect(pets[0].name).toEqual('test name 1');
        expect(pets[0].species).toEqual('test species 1');
        expect(pets[1].name).toEqual('test name 2');
        expect(pets[1].species).toEqual('test species 2');
      });
  });

  it('can update a pet', () => {
    let obj = { name: 'test name 3', species: 'test species 3'};
    let updated = { name: 'test name 3.5', species: 'test species 3.5'};

    return pet.create(obj)
      .then(record => {
        return pet.update(record._id, updated)
          .then(animal => {
            Object.keys(updated).forEach(key => {
              expect(animal[key]).toEqual(updated[key]);
            });
          });
      });
  });

  it('can delete a pet', () => {
    let obj = { name: 'test name 4', species: 'test species 4'};

    return pet.create(obj)
      .then(record => {
        return pet.delete(record._id)
          .then(info => {
            expect(info.name).toEqual(obj.name);
            expect(info.record).toEqual(obj.record);
          });
      });
  });
});
