const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

// mongoose.Types.ObjectID
// converts string to a mongo id
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setFaction = (faction) => _.escape(faction).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  faction: {
    type: String,
    required: true,
    trim: true,
    set: setFaction,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },

});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  faction: doc.faction,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return DomoModel.find(search).select('name age faction id').exec(callback);
};

DomoSchema.statics.findById = (objId, callback) => {
  const search = {
    _id: convertId(objId),
  };

  return DomoModel.findOne(search).exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;

