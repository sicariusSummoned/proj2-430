const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let UnitModel = {};

// mongoose.Types.ObjectID
// converts string to a mongo id
const convertId = mongoose.Types.ObjectId;
const setUnitName = (unitName) => _.escape(unitName).trim();
const setUnitType = (unitType) => _.escape(unitType).trim();
const setUnitUpgrades = (unitUpgrades) => _.escape(unitUpgrades).trim();
const setUnitSpecialRules = (unitSpecialRules) => _.escape(unitSpecialRules).trim();


const UnitSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Detachment',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  unitName: {
    type: String,
    required: true,
    trim: true,
    set: setUnitName,
  },
  unitType: {
    type: String,
    required: true,
    trim: true,
    set: setUnitType,
  },
  unitPoints: {
    type: Number,
    min: 0,
    required: true,
  },
  unitPower: {
    type: Number,
    min: 0,
    required: false,
  },
  unitUpgrades: {
    type: String,
    required: true,
    trim: true,
    set: setUnitUpgrades,
  },
  unitUpgradesCost: {
    type: Number,
    min: 0,
    required: false,
  },
  unitSpecialRules: {
    type: String,
    required: true,
    trim: true,
    set: setUnitSpecialRules,
  },
});

UnitSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  points: doc.points,
  faction: doc.faction,
  subfaction: doc.subfaction,
});

UnitSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return UnitModel.find(search).select('name age faction id').exec(callback);
};

UnitSchema.statics.findById = (objId, callback) => {
  const search = {
    _id: convertId(objId),
  };

  return UnitModel.findOne(search).exec(callback);
};

UnitModel = mongoose.model('Unit', UnitSchema);

module.exports.UnitModel = UnitModel;
module.exports.UnitSchema = UnitSchema;
