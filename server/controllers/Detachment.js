const models = require('../models');
const Detachment = models.Detachment;

const detachmentPage = (req, res) => {
  //This also needs to point at the army not account?
  Detachment.DetachmentModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.render('app', {
      detachments: docs,
      csrfToken: req.csrfToken(),
    });
  });
};

const makeDetachment = (req, res) =>{
  if(!req.body.detachmentType || req.body.detachmentPoints){
    return res.status(400).json({
      error: 'ERROR! All fields must be filled!',
    });
  }
  
  console.log('sending detachment to mongo:');
  console.dir(req.body);
  
  const detachmentData = {
    detachmentType: req.body.detachmentType,
    detachmentPoints: req.body.detachmentPoints,
    detachmentPower: req.body.detachmentPower,
    owner: req.session.account._id, //This needs to point to the army not account. how?
  };
  
  const newDetachment = new Detachment.DetachmentModel(detachmentData);
  
  const detachmentPromise = newDetachment.save();
  
  detachmentPromise.then(() => res.json({
    redirect:'/detachment',
  }));
  
  detachmentPromise.catch((err) =>{
    console.log(err);
    if(err.code === 11000) {
      return res.status(400).json({
        error: 'This detachment already exists?',
      });
    }
    return res.status(400).json({
      error: 'An error has occurred',
    });
  });
  return detachmentPromise;
};

const deleteDetachment = (request, response) => {
  const req = request;
  const res = response;
  
  const search = {
    _id: req.params.detachmentId,
  };
  
  return Detachment.DetachmentModel.findOneAndRemove(search, (err) =>{
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.redirect('/detachment');
  });
};

const getDetachments = (request, response) => {
  const req = request;
  const res = response;
  
  //This should also link by the army ID not account id
  return Detachment.DetachmentModel.findByOwner(req.session.account._id, (err, docs) =>{
    if(err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    
    return res.json({
      detachments: docs,
    });
  });
};

module.exports.makeDetachment  = makeDetachment;
module.exports.getDetachments = getDetachments;
module.exports.detachmentPage = detachmentPage;
module.exports.deleteDetachment = deleteDetachment;