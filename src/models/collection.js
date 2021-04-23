'use strict';

class Collection {
  constructor(dataModel) {
    this.model = dataModel;
  }

  create(record) {
    let newRecord = new this.model(record);
    return newRecord.save();
  }

  read(_id) {
    if (_id) {
      return this.model.findOne({ _id });
    } else {
      return this.model.find({});
    }
  }

  update(_id, record) {
    return this.model.findByIdAndUpdate(_id, record, { new: true })
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }
}

module.exports = Collection;
