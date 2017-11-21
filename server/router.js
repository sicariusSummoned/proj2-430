const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.get('/delete/:domoId', mid.requiresSecure, controllers.Domo.deleteDomo);
  app.get('/delete/:armyId', mid.requiresSecure, controllers.Army.deleteArmy);

  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  // app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/getArmies', mid.requiresLogin, controllers.Army.getArmies);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  // app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  // app.post('/maker', mid.requiresLogin, controllers.Domo.make);

  app.get('/maker', mid.requiresLogin, controllers.Army.armyPage);
  app.post('/maker', mid.requiresLogin, controllers.Army.makeArmy);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
