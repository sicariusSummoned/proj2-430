const models = require('../models');
const Army = models.Army;

const armyPage = (req, res) => {
  Army.ArmyModel.findByOwner(req.session.account_id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.render('app', {
      armies: docs,
      csrfToken: req.csrfToken(),
    });
  });
};

const makeArmy = (req, res) => {
  if (!req.body.listName || !req.body.listFaction || !req.body.listArmy || !req.body.listPoints) {
    return res.status(400).json({
      error: 'ERROR! All fields must be filled!',
    });
  }

  console.log('sending to mongo:');
  console.dir(req.body);

  const armyData = {
    listName: req.body.listName,
    listFaction: req.body.listFaction,
    listArmy: req.body.listArmy,
    listSubFaction: req.body.listSubFaction,
    listPoints: req.body.listPoints,
    listPower: req.body.listPower,
    owner: req.session.account._id,
  };

  const newArmy = new Army.ArmyModel(armyData);

  const armyPromise = newArmy.save();

  armyPromise.then(() => res.json({
    redirect: '/maker',
  }));

  armyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'This army already exists!',
      });
    }

    return res.status(400).json({
      error: 'An error has occurred',
    });
  });
  return armyPromise;
};

const deleteArmy = (request, response) => {
  const req = request;
  const res = response;

  const search = {
    _id: req.params.armyId,
  };

  return Army.ArmyModel.findOneAndRemove(search, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }
    return res.redirect('/maker');
  });
};

const getArmies = (request, response) => {
  const req = request;
  const res = response;

  return Army.ArmyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }


    return res.json({
      armies: docs,
    });
  });
};

module.exports.makeArmy = makeArmy;
module.exports.getArmies = getArmies;
module.exports.armyPage = armyPage;
module.exports.deleteArmy = deleteArmy;
