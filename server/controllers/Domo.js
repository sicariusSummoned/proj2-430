const models = require('../models');
const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.render('app', {
      domos: docs,
      csrfToken: req.csrfToken(),
    });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.faction) {
    return res.status(400).json({
      error: 'RAWR! Name, Faction, and age are required',
    });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    faction: req.body.faction,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({
    redirect: '/maker',
  }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Domo already exists.',
      });
    }

    return res.status(400).json({
      error: 'An error occurred',
    });
  });

  return domoPromise;
};

const deleteDomo = (request, response) => {
  const req = request;
  const res = response;

  const search = {
    _id: req.params.domoId,
  };


  return Domo.DomoModel.findOneAndRemove(search, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.redirect('/maker');
  });
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.json({
      domos: docs,
    });
  });
};

module.exports.make = makeDomo;
module.exports.getDomos = getDomos;
module.exports.makerPage = makerPage;
module.exports.deleteDomo = deleteDomo;
