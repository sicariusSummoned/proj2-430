const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ModelModel = {};

// mongoose.Types.ObjectID
// converts string to a mongo id
const convertId = mongoose.Types.ObjectId;
//modelName is a reserved keyword. This is my workaround.
const setModelGnome = (modelGnome) => _.escape(modelGnome).trim();
const setModelStats = (modelStats) => _.escape(modelStats).trim();
const setModelUpgrades = (modelUpgrades) => _.escape(modelUpgrades).trim();


const ModelSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Unit',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  //modelName is a reserved keyword. This is my workaround.
  modelGnome: {
    type: String,
    required: true,
    trim: true,
    set: setModelGnome,
  },
  modelStats: {
    type: String,
    required: true,
    trim: true,
    set: setModelStats,
  },
  modelPoints: {
    type: Number,
    min: 0,
    required: true,
  },
  modelQuantity: {
    type: Number,
    min: 0,
    required: false,
  },
  modelUpgrades: {
    type: String,
    required: true,
    trim: true,
    set: setModelUpgrades,
  },
  modelUpgradesCost: {
    type: Number,
    min: 0,
    required: false,
  },
});

ModelSchema.statics.toAPI = (doc) => ({
  modelName: doc.modelName,
  modelStats: doc.modelStats,
  modelPoints: doc.modelPoints,
  modelQuantity: doc.modelQuantity,
  modelUpgrades: doc.modelUpgrades,
  modelUpgradesCost: doc.modelUpgradesCost,
});

ModelSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return ModelModel
    .find(search)
    .select('modelName modelStats modelPoints modelQuantity modelUpgrades modelUpgradesCost id')
    .exec(callback);
};

ModelSchema.statics.findById = (objId, callback) => {
  const search = {
    _id: convertId(objId),
  };

  return ModelModel.findOne(search).exec(callback);
};

ModelModel = mongoose.model('Model', ModelSchema);

module.exports.ModelModel = ModelModel;
module.exports.ModelSchema = ModelSchema;
