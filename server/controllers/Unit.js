const models = require('../models');
const Unit = models.Unit;

const unitPage = (req, res) =>{
  Unit.UnitModel.findByOwner(req.params.detachmentId,(err,docs) =>{
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    
    return res.render('units', {
      units: docs,
      csrfToken: req.csrfToken(),
    });
  });
};

const makeUnit = (req, res) => {
  console.log('arrived at making unit');
  
  if(!req.body.unitType || !req.body.unitPoints || !req.body.unitName){
    return res.status(400).json({
      error: 'Error! All fields must be filled!',
    });
  }
  
  console.log('sending unit to mongo:');
  console.dir(req.body);
  
  const unitData = {
    unitName: req.body.unitName,
    unitType: req.body.unitType,
    unitPoints: req.body.unitPoints,
    unitPower: req.body.unitPower,
    unitUpgrades: req.body.unitUpgrades,
    unitUpgradesCost: req.body.unitUpgradesCost,
    unitSpecialRules: req.body.unitSpecialRules,
    owner: req.params.detachmentId,
  };
  
  const newUnit = new Unit.UnitModel(unitData);
  
  const unitPromise = newUnit.save();
  
  unitPromise.then(() => res.json({
    redirect: '/units/:detachmentId',
  }));
  
  unitPromise.catch((err) =>{
    console.log(err);
    if(err.code === 11000) {
      return res.status(400).json({
        error: 'This unit already exists?',
      });
    }
    return res.status(400).json({
      error: 'An error has occurred',
    });
  });
  return unitPromise;
};

const deleteUnit = (request, response) => {
  const req = request;
  const res = response;
  
  const search = {
    _id : req.params.unitId,
  };
  
  console.log('deleting a unit');
  console.dir(search);
  
  return Unit.UnitModel.findOneAndRemove(search,(err) => {
    if(err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.redirect(`/units/${req.params.detachmentId}`);
  });
};

const getUnits = (request, response) =>{
  console.log('getting units');
  const req = request;
  const res = response;
  
  return Unit.UnitModel.findByOwner(req.params.detachmentId,(err,docs) =>{
    if(err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.json({
      units: docs,
    });
  });
};

module.exports.makeUnit = makeUnit;
module.exports.getUnits = getUnits;
module.exports.unitPage = unitPage;
module.exports.deleteUnit = deleteUnit;