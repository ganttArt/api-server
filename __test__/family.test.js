'use strict';

require('@code-fellows/supergoose');

const Collection = require('../src/models/collection');
const FamilySchema = require('../src/models/family-schema');
const family = new Collection(FamilySchema);

describe('Family CRUD Actions', () => {
  it('can create a new family member', () => {
    let obj = { name: 'test name 1', relation: 'test relation 1'};
    let expected = { name: 'test name 1', relation: 'test relation 1'};

    return family.create(obj)
      .then(record => {
        Object.keys(obj).forEach(item => {
          expect(record[item]).toEqual(expected[item])
        });
      });
  });

  it('can read a single family member', () => {
    let obj = { name: 'test name 2', relation: 'test relation 2'};
    let expected = { name: 'test name 2', relation: 'test relation 2'};
    
    return family.create(obj)
      .then(record => {
        return family.read(record._id)
          .then(item => {
            Object.keys(obj).forEach(key => {
              expect(item[key]).toEqual(expected[key]);
            });
          });
      });
  });

  it('can read all family members', () => {
    return family.read()
      .then(familyMembers => {
        expect(familyMembers[0].name).toEqual('test name 1');
        expect(familyMembers[0].relation).toEqual('test relation 1');
        expect(familyMembers[1].name).toEqual('test name 2');
        expect(familyMembers[1].relation).toEqual('test relation 2');
      });
  });

  it('can update a family member', () => {
    let obj = { name: 'test name 3', relation: 'test relation 3'};
    let updated = { name: 'test name 3.5', relation: 'test relation 3.5'};

    return family.create(obj)
      .then(record => {
        return family.update(record._id, updated)
          .then(person => {
            Object.keys(updated).forEach(key => {
              expect(person[key]).toEqual(updated[key]);
            });
          });
      });
  });

  it('can delete a family member', () => {
    let obj = { name: 'test name 4', relation: 'test relation 4'};

    return family.create(obj)
      .then(record => {
        return family.delete(record._id)
          .then(info => {
            expect(info.name).toEqual(obj.name);
            expect(info.record).toEqual(obj.record);
          });
      });
  });
});
