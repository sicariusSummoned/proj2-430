const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DetachmentModel = {};

// mongoose.Types.ObjectID
// converts string to a mongo id
const convertId = mongoose.Types.ObjectId;
const setDetachmentType = (detachmentType) => _.escape(detachmentType).trim();

const DetachmentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Army',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  detachmentType: {
    type: String,
    required: true,
    trim: true,
    set: setDetachmentType,
  },
  detachmentPoints: {
    type: Number,
    min: 0,
    required: true,
  },
  detachmentPower: {
    type: Number,
    min: 0,
    required: false,
  },


});

DetachmentSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  points: doc.points,
  faction: doc.faction,
  subfaction: doc.subfaction,
});

DetachmentSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return DetachmentModel.find(search).select('name age faction id').exec(callback);
};

DetachmentSchema.statics.findById = (objId, callback) => {
  const search = {
    _id: convertId(objId),
  };

  return DetachmentModel.findOne(search).exec(callback);
};

DetachmentModel = mongoose.model('Detachment', DetachmentSchema);

module.exports.DetachmentModel = DetachmentModel;
module.exports.DetachmentSchema = DetachmentSchema;
