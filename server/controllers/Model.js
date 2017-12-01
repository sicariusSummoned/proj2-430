const models = require('../models');
const Model = models.Model;

const modelPage = (req, res) =>{
  Model.ModelModel.findByOwner(req.params.unitId,(err,docs) =>{
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    
    return res.render('models', {
      models: docs,
      csrfToken: req.csrfToken(),
    });
  });
};

const makeModel = (req, res) => {
  if(!req.body.modelName || !req.body.modelPoints || !req.body.modelQuantity){
    return res.status(400).json({
      error: 'Error! All fields must be filled!',
    });
  }
  
  console.log('sending model to mongo:');
  console.dir(req.body);
  
  const modelData = {
    modelGnome: req.body.modelName,
    modelStats: req.body.modelStats,
    modelPoints: req.body.modelPoints,
    modelQuantity: req.body.modelQuantity,
    modelUpgrades: req.body.modelUpgrades,
    modelUpgradesCost: req.body.modelUpgradesCost,
    owner: req.params.unitId, 
  };
  
  console.log('modelData:');
  console.dir(modelData);
  
  const newModel = new Model.ModelModel(modelData);
  
  const modelPromise = newModel.save();
  
  modelPromise.then(() => res.json({
    redirect: '/models/:unitId',
  }));
  
  modelPromise.catch((err) =>{
    console.log(err);
    if(err.code === 11000) {
      return res.status(400).json({
        error: 'This model already exists?',
      });
    }
    return res.status(400).json({
      error: 'An error has occurred',
    });
  });
  return modelPromise;
};

const deleteModel = (request, response) => {
  const req = request;
  const res = response;
  
  const search = {
    _id : req.params.modelId,
  };
  
  console.log('deleting a model');
  console.dir(search);
  
  return Model.ModelModel.findOneAndRemove(search,(err) => {
    if(err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.redirect(`/models/${req.params.unitId}`);
  });
};

const getModels = (request, response) =>{
  console.log('getting models');
  const req = request;
  const res = response;
  
  return Model.ModelModel.findByOwner(req.params.unitId,(err,docs) =>{
    if(err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.json({
      models: docs,
    });
  });
};

module.exports.makeModel = makeModel;
module.exports.getModels = getModels;
module.exports.modelPage = modelPage;
module.exports.deleteModel = deleteModel;