module.exports = (app) => {
  const Router = require('koa-router');
  const bodyParser = require('koa-bodyparser')
  const router = new Router();

  const {getRecord , newRecord , deleteRecord} = require('../controllers')


  router
  .get('/goods/:id', getRecord)
  .post('/goods', bodyParser() ,newRecord)
  .delete('/goods/:id' , deleteRecord);

  app.use(router.routes())
  app.use(router.allowedMethods());

}