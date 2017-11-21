const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ArmyModel = {};

// mongoose.Types.ObjectID
// converts string to a mongo id
const convertId = mongoose.Types.ObjectId;
const setListName = (listName) => _.escape(listName).trim();
const setListFaction = (listFaction) => _.escape(listFaction).trim();
const setListArmy = (listArmy) => _.escape(listArmy).trim();
const setListSubFaction = (listSubFaction) => _.escape(listSubFaction).trim();

const ArmySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  listName: {
    type: String,
    required: true,
    trim: true,
    set: setListName,
  },
  listFaction: {
    type: String,
    required: true,
    trim: true,
    set: setListFaction,
  },
  listArmy: {
    type: String,
    required: true,
    trim: true,
    set: setListArmy,
  },
  listSubFaction: {
    type: String,
    required: true,
    trim: true,
    set: setListSubFaction,
  },
  listPoints: {
    type: Number,
    min: 0,
    required: true,
  },
  listPower: {
    type: Number,
    min: 0,
    required: false,
  },


});

ArmySchema.statics.toAPI = (doc) => ({
  listName: _.unescape(doc.listName),
  listFaction: doc.listFaction,
  listArmy: doc.listArmy,
  listSubFaction: doc.listSubFaction,
  listPoints: doc.listPoints,
  listPower: doc.listPower,
});

ArmySchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return ArmyModel.find(search).select('listName listFaction listArmy listSubFaction listPoints listPower id').exec(callback);
};

ArmySchema.statics.findById = (objId, callback) => {
  const search = {
    _id: convertId(objId),
  };

  return ArmyModel.findOne(search).exec(callback);
};

ArmyModel = mongoose.model('Army', ArmySchema);

module.exports.ArmyModel = ArmyModel;
module.exports.ArmySchema = ArmySchema;
