const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  app.get('/delete/:armyId', mid.requiresSecure, controllers.Army.deleteArmy);
  app.get('/deleteDetachment/:detachmentId/:armyId',
          mid.requiresSecure,
          controllers.Detachment.deleteDetachment);
  app.get('/deleteUnit/:unitId/:detachmentId', mid.requiresSecure, controllers.Unit.deleteUnit);
  app.get('/deleteModel/:modelId/:unitId', mid.requiresSecure, controllers.Model.deleteModel);


  app.get('/getArmies', mid.requiresLogin, controllers.Army.getArmies);
  app.get('/getDetachments/:armyId', mid.requiresLogin, controllers.Detachment.getDetachments);
  app.get('/getUnits/:detachmentId', mid.requiresLogin, controllers.Unit.getUnits);
  app.get('/getModels/:unitId', mid.requiresLogin, controllers.Model.getModels);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Army.armyPage);
  app.post('/maker', mid.requiresLogin, controllers.Army.makeArmy);

  app.get('/detachments/:armyId', mid.requiresLogin, controllers.Detachment.detachmentPage);
  app.post('/detachments/:armyId', mid.requiresLogin, controllers.Detachment.makeDetachment);

  app.get('/units/:detachmentId', mid.requiresLogin, controllers.Unit.unitPage);
  app.post('/units/:detachmentId', mid.requiresLogin, controllers.Unit.makeUnit);

  app.get('/models/:unitId', mid.requiresLogin, controllers.Model.modelPage);
  app.post('/models/:unitId', mid.requiresLogin, controllers.Model.makeModel);

  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  
};

module.exports = router;
